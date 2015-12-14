#super_auto_calib_tiles.py: script for running the moisture sensing tile demo. 
#
#First runs the calibration routine: prompts the user to select the corners of
#the area to project onscreen, then calculates a homography between the known
#shape of the area and the shape defined by the picked points.
#
#Next, listens over a serial connection for messages from an Arduino that
#indicate if any tile has a spill. It collects one message per tile from the
#Arduino a time to form a group of messages. If a tile is not represented in
#this group, its spot in the generated image is dark. Otherwise, the spot for
#each represented tile will be a pulsating square to act as a warning.

#related files: roughMux.ino

import numpy as np
import cv2
import math
import random
import serial
from time import sleep

# this just handles actually showing the window 
# and the dots where you've clicked
class SelectView:
    def __init__(self, winname, imsize):
        self.im = np.zeros((imsize, imsize, 3), dtype=np.uint8)
        self.clicks = []
        self.winname = winname
        cv2.namedWindow(self.winname)
        cv2.setMouseCallback(self.winname, self.mouseHandler, 0)

    def addClick(self, x, y):
        self.clicks.append((x,y))

    def mouseHandler(self, event, x, y, flags, params):
        if event == cv2.EVENT_LBUTTONDOWN:
            self.addClick(x, y)

    def renderWindow(self):
        self.dispim = self.im.copy()
        for (x, y) in self.clicks:
            cv2.circle(self.dispim, (int(x), int(y)), 8, (255,255,255), 2)
        cv2.imshow(self.winname, self.dispim)

    def finishSelection(self):
        cv2.destroyWindow(self.winname)

# this handles the actual math for computing the homography
def compute_homography(srcpoints, destpoints):
    src_pts = np.array([ list(p) for p in srcpoints ], dtype=np.float32).reshape(1,-1,2)
    dst_pts = np.array([ list(p) for p in destpoints ], dtype=np.float32).reshape(1,-1,2)

    M, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
    print(M)
    return M

def compute_perspective(srcpoints, destpoints):
    src_pts = np.array([ list(p) for p in srcpoints ], dtype=np.float32).reshape(1,-1,2)
    dst_pts = np.array([ list(p) for p in destpoints ], dtype=np.float32).reshape(1,-1,2)

    return cv2.getPerspectiveTransform(src_pts, dst_pts)

def warp_image(srcim, H, invert=False):
    if invert:
        Hp = np.linalg.inv(H)
    else:
        Hp = H

    return cv2.warpPerspective(srcim, Hp, (srcim.shape[0], srcim.shape[1]))

def draw_tiles(image, tilevalues, nrows, ncols,howlong):
	pos = 0
	tilesize = round(1024/nrows) 
	hm = abs((howlong % 20) - 10)
	for row in range(nrows):
		for col in range(ncols):
			value = tilevalues[pos]
			x0 = col * tilesize
			x1 = x0 + tilesize
			y0 = row * tilesize
			y1 = y0 + tilesize
			color = int(value * ((255.0/10.0)*hm))#(255.0)
			cv2.rectangle(image, (x0,y0), (x1,y1), (color,color,0), -1)			
			pos += 1

if __name__ == '__main__':
    imsize = 1024

    # get correspondences through 'gui'
    clickview = SelectView("selectview", imsize)
    while True:
        clickview.renderWindow()
        if len(clickview.clicks) == 4:
            break
        keycode = cv2.waitKey(30)
    clickview.finishSelection()
    print(clickview.clicks)

    # compute perspective transform (you can save M to reuse later)
    destpoints = [(0,0), (imsize,0), (imsize,imsize), (0, imsize)]
    M = compute_perspective(clickview.clicks, destpoints)

    #tiles go!
    image = np.zeros((1024, 1024, 3), dtype=np.uint8) #NOTE: if you change this, make corresponding change in draw_tiles()

    cv2.imshow("image", image)

    
    nrows = 3
    ncols = 3
    total_vals = nrows * ncols

    frequencies = [random.random() for i in range(total_vals)]
    offsets = [random.random() for i in range(total_vals)]
    t = 0.0

    #new stuff: keyboard input and serial input
    nw = cv2.namedWindow("image",cv2.WINDOW_FULLSCREEN)
    
    k = -1
    ser=serial.Serial(port=7, baudrate=9600,timeout=0.1) #port = n-1 if Arduino is in COM(n)
    howlong = 0; 
  
    while k == -1:
            tilevalues = [0 for x in range(total_vals)]
            ser.flushInput()
            ser.flushOutput()
            for pin in range(total_vals): 
                    serInEnc = ser.readline()
                    serIn= serInEnc.decode()
                    print(serIn)
                    #unmarshal that string!!!
                    if (serIn.count(".") > 0):
                            parsies = serIn.split(".") #python is nice
                            print(parsies[0])
                            if ((parsies[0]).isdigit()):
                                    tilevalues[int(parsies[0])] = (int(parsies[1]) < 1024)
                    
            if all([v == 0 for v in tilevalues]):
                howlong = 0
            else:
                howlong = howlong + 1 
            draw_tiles(image, tilevalues, nrows, ncols,howlong)


            # warp image
            #M defined above but here is a backup
            #M = np.array([[  7.29851497e+00,   2.94889494e-01,  -3.13990961e+03],
            # [ -1.96203413e-01,   1.46662052e+01,  -6.16677139e+03],
            # [ -3.09259879e-04,   3.14524255e-03,   1.00000000e+00]])
            
            warpimage = warp_image(image, M, True)

            cv2.imshow("image", warpimage)


            sleep(0.01)

            k = cv2.waitKey(10)


    
