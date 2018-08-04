#!/bin/bash

echo "some npm scripts will run here"
/wait-for-it.sh db:3306

npm run migrate:up

npm start
