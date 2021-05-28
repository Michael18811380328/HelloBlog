#!/bin/bash

# delete old HTML
rm -rf ../Michael18811380328.github.io/book/site
rm -rf ../Michael18811380328.github.io/frontend/site
rm -rf ../Michael18811380328.github.io/backend/site
rm -rf ../Michael18811380328.github.io/personal/site
rm -rf ../Michael18811380328.github.io/leetcode/site

# move HTML to github webpage
cp -r ./book/site ../Michael18811380328.github.io/book
cp -r ./frontend/site ../Michael18811380328.github.io/frontend
cp -r ./backend/site ../Michael18811380328.github.io/backend
cp -r ./personal/site ../Michael18811380328.github.io/personal
cp -r ./leetcode/site ../Michael18811380328.github.io/leetcode

# delete generated HTML
# rm -rf ./book/site
# rm -rf ./frontend/site
# rm -rf ./backend/site
# rm -rf ./personal/site
# rm -rf ./leetcode/site
