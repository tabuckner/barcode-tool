#!/usr/bin/env bash

PROJECT_NAME=barcode-tool

echo "Building GH-Pages content."

ng build --prod --output-path docs --base-href /$PROJECT_NAME/

cp ./docs/index.html ./docs/404.html

echo "Adding timestamp to footer."

cd ./docs

APP_FILES=$( ls -1 | grep ".*chunk\.js\|main\..*\.js")
DEPLOY_TIMESTAMP=$(date +%m/%d/%Y\ %H:%M:%S)
sed -i -e "s|{{DEPLOY_TIMESTAMP}}|$DEPLOY_TIMESTAMP|g" $APP_FILES
for i in *.js-e; do rm ${i}; done;

cd ../
