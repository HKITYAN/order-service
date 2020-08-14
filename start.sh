#!/bin/bash
if [ "$1" == "-d" ] 
then 
    echo "Start project in watch mode"
    export MYSQL_ROOT_PASSWORD=secretpassword
    export MYSQL_DATABASE=order_delivery
    docker-compose -f docker-compose-dev.yml up --build
else 
    echo "Run built project, no development change will be reflected"
    export MYSQL_ROOT_PASSWORD=secretpassword
    export MYSQL_DATABASE=order_delivery
    docker-compose up --build
fi 