#!/bin/bash

function usage() {
    echo "    Michael An's Blog builder"
    echo "    It runs mkdocs build on the code and build markdown docs to HTML files"
    echo "    To build while file:"
    echo "      ./build.sh"
    echo "    To check a directory:"
    echo "      ./build.sh xxx"
}

# 编译某个文件夹
function builddir() {
    echo "build start------"
    # 表示第一个参数
    cd $1 && mkdocs build
    sleep 3
    echo "build end------"
}

# 编译全部的文件夹
function build() {
    echo "build start------"
    cd book && mkdocs build
    sleep 5
    cd ../leetcode && mkdocs build 
    sleep 15
    cd ../frontend && mkdocs build 
    sleep 15
    cd ../backend && mkdocs build
    sleep 15
    cd ../personal && mkdocs build
    sleep 10
    echo "build end------"
    echo -e "\n\n"
    exit 1
}

# $# 表示参数的数量
# 如果没有传参数，直接运行 build 函数
if [[ $# == 0 ]]; then
    build;
fi

# 如果传一个参数
if [[ $# == 1 ]]; then
    # 如果传递的是 -h，输出帮助文字；其他命令下，输出错误
    if [[ $1 == "-h" || $1 == "--help" ]]; then
        usage;
        exit 1
    else
        # 直接在后面添加函数的参数，不需要括号
        builddir $1;
        exit 1
    fi
fi

# 如果传参数量大于1，那么返回错误
if [[ $# > 1 ]]; then
    echo "Your input is error"
    echo "please use './build.sh -h' to get help."
    exit 1
fi
