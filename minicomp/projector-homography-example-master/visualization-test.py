import numpy as np
import cv2
import cv
import math
import random

def draw_tiles(image, tilevalues, nrows, ncols):
	pos = 0
	tilesize = 150
	for row in range(nrows):
		for col in range(ncols):
			value = tilevalues[pos]
			x0 = col * tilesize
			x1 = x0 + tilesize
			y0 = row * tilesize
			y1 = y0 + tilesize
			color = int(value * 255.0)
			cv2.rectangle(image, (x0,y0), (x1,y1), (0,0,color), -1)			
			pos += 1

if __name__ == '__main__':
	image = np.zeros((1024, 1024, 3), dtype=np.uint8)

	cv2.circle(image, (100,200), 20, (0,255,255), -1)
	cv2.rectangle(image, (300,300), (400,400), (0,0,255), -1)

	nrows = 6
	ncols = 6
	total_vals = nrows * ncols

	frequencies = [random.random() for i in range(total_vals)]
	offsets = [random.random() for i in range(total_vals)]
	t = 0.0
	while True:
		t += 0.1
		tilevalues = [math.cos(v + t + o)*0.5 + 0.5 for (v,o) in zip(frequencies,offsets)]
		draw_tiles(image, tilevalues, nrows, ncols)

		cv2.imshow("image", image)
		cv.WaitKey(30)