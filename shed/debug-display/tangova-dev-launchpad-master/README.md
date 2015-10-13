# tangova-dev-launchpad
A shell cordova app with the tangova tango bindings plugin and maximally permissive security settings so that development code can be live-loaded from an http server.

## What this comes with
* [tangova project tango bindings](https://github.com/PyryM/tangova)
* Crosswalk webview
* Very lenient security settings so you can redirect the app with window.location=devhost/devcode.html
* A convenient url box so you can redirect the app without having to open a remote debugging console

## Building
`./init.sh`
`cordova build android --release`

## Running/installing
Through cordova: `cordova run android`

## Setting up your app for remote loading
Cordova creates a number of .js files that it needs to be able to get in order to use its plugins. After building, these reside in `platforms/android/assets/www`. For convenience (so you can develop on a machine without having to install cordova), this built folder is committed in the repo in `remote_www/`-- simply copy those files into the directory that you will be serving your app from.