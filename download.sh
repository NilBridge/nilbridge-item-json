#!/bin/bash

cat latest.txt | while read line
do
    echo "https://void.bedrock.dev/resources/$line.zip"
    curl https://void.bedrock.dev/resources/$line.zip --output ./tmp/$line.zip
    unzip -d ./resources/ ./tmp/$line.zip
done < latest.txt



#function get_char()
# {
#  SAVEDSTTY=`stty -g`
#  stty -echo
#  stty cbreak
#  dd if=/dev/tty bs=1 count=1 2> /dev/null
#  stty -raw
#  stty echo
#  stty $SAVEDSTTY
#}

# enable_pause=1

#function pause()
# {
#  if [ "x$1" != "x" ]; then
#    echo $1
#  fi
#  if [ $enable_pause -eq 1 ]; then
#    echo "Press any key to continue!"
#    char=`get_char`
#  fi
#}



#tar xvf ./tmp/$1.zip -C ./resources/



#pause "ok"