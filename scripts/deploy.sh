#!/usr/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd $DIR/..

source /home/ubuntu/.bashrc
npm install --only=prod
pm2 restart ecosystem.config.js
