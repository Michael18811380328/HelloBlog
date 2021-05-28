#!/bin/bash

# move HTML to github webpage
cp -r ./book/site ../Michael18811380328.github.io/book/site
cp -r ./frontend/site ../Michael18811380328.github.io/frontend/site
cp -r ./backend/site ../Michael18811380328.github.io/backend/site
cp -r ./personal/site ../Michael18811380328.github.io/personal/site
cp -r ./leetcode/site ../Michael18811380328.github.io/leetcode/site

# delete generated HTML
rm -rf ./book/site
rm -rf ./frontend/site
rm -rf ./backend/site
rm -rf ./personal/site
rm -rf ./leetcode/site
