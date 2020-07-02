#!/bin/sh
git add .
git commit -m "heroku deployment"
git push -f heroku master
