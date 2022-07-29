#!/bin/bash
echo $1

if [ ! -d "/web" ]; then
  mkdir /web
fi
if [ ! -d "/tmp" ]; then
  mkdir /tmp
fi
if [ ! -d "/resources" ]; then
  mkdir /resources
fi

set version=$1

curl https://void.bedrock.dev/resources/$1.zip --output ./tmp/$1.zip

tar -xf ./tmp/$1.zip -C ./resources/

