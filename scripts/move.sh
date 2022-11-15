#!/bin/bash

rm -rf ../Michael18811380328.github.io/used/site
rm -rf ../Michael18811380328.github.io/important/site

# move helloSite rendered HTML to github webpage
cp -r ./used/site ../Michael18811380328.github.io/used
cp -r ./important/site ../Michael18811380328.github.io/important

# future iamges 有两个文件夹，最好资源文件和原始网页分开
rm -rf ../Michael18811380328.github.io/images/site
cp -r ./images/site ../Michael18811380328.github.io/images

cp ./index.html ../Michael18811380328.github.io/
