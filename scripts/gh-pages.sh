#!/usr/bin/env bash

PROJECT_NAME=barcode-tool

echo "Building GH-Pages content."

ng build --prod --output-path docs --base-href /$PROJECT_NAME/

cp ./docs/index.html ./docs/404.html
