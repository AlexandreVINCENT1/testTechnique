#!/bin/bash

function build ()
{
    pip install -r ./server/requirements.txt
    cd client
    npm i
}

function launch ()
{
    cd client
    npm start &
    cd ..
    export FLASK_APP=server/app.py
    python3 -m flask run -h localhost -p 8080
}

if [ $1 == "install" ]
then
    build
    echo "Client and Server installed"
elif [ $1 == "launch" ]
then
    echo "Starting Client and Server"
    launch
elif [ $1 == "-h" ]
then
    echo "commands: install, launch or -h"
else
    echo "Bad arguments"
fi