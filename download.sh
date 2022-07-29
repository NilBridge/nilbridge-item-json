#!/bin/bash
echo "https://void.bedrock.dev/resources/$1.zip"

function get_char()
{
  SAVEDSTTY=`stty -g`
  stty -echo
  stty cbreak
  dd if=/dev/tty bs=1 count=1 2> /dev/null
  stty -raw
  stty echo
  stty $SAVEDSTTY
}

enable_pause=1

function pause()
{
  if [ "x$1" != "x" ]; then
    echo $1
  fi
  if [ $enable_pause -eq 1 ]; then
    echo "Press any key to continue!"
    char=`get_char`
  fi
}

curl https://void.bedrock.dev/resources/$1.zip --output ./tmp/$1.zip

#tar xvf ./tmp/$1.zip -C ./resources/

unzip -d ./resources/ ./tmp/$1.zip

#pause "ok"