#!/bin/bash

show_info_text(){
  clear
  echo "**************************************************************"
  echo "* This script sets up a web server at http://localhost:8000  *"
  echo "* You can use it when your browser shows Cross Origin Policy *"
  echo "* errors which prevent you from running the web audio files  *"
  echo "**************************************************************"
}

start_web_browser(){
  sleep 1
  open http://localhost:8000 &
}

start_web_server(){
  killall python 2>/dev/null
  python -m SimpleHTTPServer 8000
# this command DOES NOT FORK
}

change_to_command_working_directory(){
  cd `dirname $0`
}

# ####################################################################

show_info_text
change_to_command_working_directory
start_web_browser &
start_web_server
