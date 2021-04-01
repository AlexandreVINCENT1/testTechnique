#!/bin/bash

function build () {
    export FLASK_APP=server/app.py
    cd client
    npm i
}

function launch () {
    cd client
    npm start &
    cd ..
    python3 -m flask run -h localhost -p 8080
}

if [ $1 == "install" ]; then
    build()
    echo "Client and Server installed"

elif [ $1 == "launch" ]; then
    echo "Starting Client and Server"
    launch()
fi