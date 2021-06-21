# Convert an MOV file to GIF

本案例仅限个人使用，学习 Ruby

原始资源链接：https://github.com/chrisjmendez/convert-mov-to-gif

Mac OS 下将 mov 视频转换成 gif 动画的小工具

实际上就是使用 ruby 运行 bash 命令，转换器是 homebrew 第三方库提供

Convert MOV files into animated GIF's for quick preview and e-mail friendly sharing.

# Getting Started

This was designed for Mac OS X users.

## Install Homebrew

[Homebrew](http://www.chrisjmendez.com/2016/01/10/installing-homebrew-on-mac-os-x/) is a package manager for Mac OS x. You will need this to later download a few open source libraries.

## Install FFmpeg

Using homebew, you will need to install `ffmpeg`. This is the tool that will compress your existing .mov file.

```
brew install ffmpeg
```

## Install Quartz

Quartz is required to use the next package, Gifsicle.

```
brew cask install xquartz
```

## Install Gifsicle

```
brew install gifsicle
```

------

# Run Ruby Script

I created a Convert class that will do all the work. I also made it Object Oriented so that you can later decide to integrate it into a larger application.

```
ruby Converter.rb
```

------

# Final Thoughts

Using this simple class as my base, I can easily integrate this into a Rake Task or maybe use `FileList` to do more work with string manipulation. Hopefully this simple tutorial shows you that the possibilities are infinite using Ruby, Shell, and home-brew.

------

# Resources

- If you want to learn more about how `%x` works in Ruby, read [this tutorial](https://simpleror.wordpress.com/2009/03/15/q-q-w-w-x-r-s/)