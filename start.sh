#!/bin/bash
if [ "$1" == "-d" ] 
then 
    echo "Start project in watch mode"
    docker-compose -f docker-compose-dev.yml up --build
else 
    echo "Run built project, no development change will be reflected"
    docker-compose up --build
fi 