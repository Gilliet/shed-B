#!/bin/bash
textReset=$(tput sgr0)
textGreen=$(tput setaf 2)
message_info () {
  echo "${textGreen}[tangova-dev-launchpad]${textReset} $1"
}

message_info "Creating necessary directories..."
mkdir plugins
mkdir platforms

message_info "Adding platforms..."
cordova platform add android

message_info "Adding plugins..."
cordova plugin add cordova-plugin-crosswalk-webview
cordova plugin add https://github.com/PyryM/Tangova