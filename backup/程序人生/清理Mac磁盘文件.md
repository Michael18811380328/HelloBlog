# How to Free Disk Space on MacBook used for Development

主要内容：如何清空 mac 磁盘：统计磁盘使用；清空多余缓存；删除旧日志；减少 docker 使用空间

原文时间：2021-01-05

原文链接：https://pawelurbanek.com/macos-free-disk-space#commento

Hire me

I'm available to conduct a performance tuning and security audit of your Rails app.

[More details](https://pawelurbanek.com/#rails-performance-tuning)

Installing or updating an app (_ahem, ahem XCode…_) on macOS is sometimes surprisingly difficult because of missing disk space. In this blog post, I’ll describe various ways to quickly and safely clean vast amounts of storage on a Mac Book used for web development.

I’ve recently performed the same analysis and cleanup on my MacBook Pro. As a result, I’ve managed to free tens of GBs of storage and could finally update XCode to the newest version.

## Analyze your disk usage

注：这个软件发布者没有经过苹果认证，本地无法打开

The best way to identify where the bulk of your storage space is allocated is to use [Disk Inventory X](http://www.derlien.com/) application. On macOS, the simplest way to install it is to use the [Homebrew Cask](https://formulae.brew.sh/cask/disk-inventory-x).

```
brew install --cask disk-inventory-x
```

The program offers straightforward UI allowing you to at a glance examine your storage usage:

![Disk Invantory X UI](https://pawelurbanek.com/assets/disk-x-inventory-54eaae6e085279e12b464d65942832197270949f77bb530c038932949d4af941.png)

Let’s now discuss the lowest hanging fruits in reducing storage usage.

## Remove redundant applications cache

清空磁盘缓存：本地 yarn 有 10G 缓存，各大浏览器有 2G 缓存，这是不少的存储空间。

也就是为什么 yarn 安装包比 npm 快很多的原因。

On my computer the significant bulk of unnecessary data was in the `~/Library/Caches` folder. I’ve noticed hundreds of MBs related to _Yarn_ that I did not use for a year or so. Apparently, many applications are keen to cache data while neglecting to do the cleanup afterward.

![macOS cache usage before cleanup](https://pawelurbanek.com/assets/cache-before-3c0eb04faa3d22370a0d79ce639de8e66fc6581f5d1ae913ea2578c1dbc03322.png)

macOS cache usage before cleanup

You can thoroughly purge the cache using the following commands:

```
cd ~/Library/Caches
rm -rf *
```

Alternatively, you can cherry-pick which cache folders to remove. I’ve been regularly doing the total cache cleanups for a couple of months now. Other than the temporary system slowdown, I did not notice any issues.

Obviously, the cache will rebuild itself over time. But it does not grow to the same size even after a more extended period. After removing over _30GB_ of cache, the `Caches` folder size increased to only around _2GB_ after the week of regularly using the computer.

![macOS cache usage after cleanup](https://pawelurbanek.com/assets/cache-after-236358b8e3c414b7682b1366351c02249e412744a578d28d5474fc3f5fd1063a.png)

macOS cache usage a week after cleanup

## Remove old log files

I work mostly with Ruby on Rails on my desktop. While using _Disk Inventory X_, I’ve discovered that running the local tests continuously appends content to the `log/test.log` file.

![Overgrown Rails test log file](https://pawelurbanek.com/assets/rails-test-logs-ab4fd91e07d1c510d83d9f9f2f4ea1298d261b2e0444d42a014c69499356783b.png)

Overgrown Rails log file

I can imagine other stacks similarly silently consuming the disk space. _Disk Inventory X_ is invaluable in identifying and fixing such cases.

## Reduce Docker disk space usage

![Docker funny meme](https://pawelurbanek.com/assets/docker-disk-space-49e49e66d640c9ea4a11ae8938198d241ea1ef5702c71e9756d83c21ba90efde.png)

[Docker](https://www.docker.com/) has a bad reputation for devouring large amounts of disk space. You can check how much of your disk space Docker has acquired so far by running:

```
docker system df

TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          17        4         2.115GB   1.577GB (74%)
Containers      6         1         138.4MB   0B (0%)
Local Volumes   19        5         1.564GB   1.347GB (86%)
Build Cache     0         0         0B        0B
```

Now run `docker images` to see which images are taking up most of the disk space:

```
docker images

REPOSITORY     TAG          IMAGE ID      CREATED        SIZE
pihole/pihole  latest       4642d275ab73  4 months ago   296MB
postgres       11.8-alpine  a7f73db0b977  6 months ago   156MB
postgres       12.3-alpine  17150f4321a3  6 months ago   157MB
postgres       9.6-alpine   45f463e53bc1  6 months ago   36.1MB
alpine         latest       a24bb4013296  7 months ago   5.57MB
postgres       12.2-alpine  ae192c4d3ada  8 months ago   152MB
postgres       9.6.17       529a7b20fb73  8 months ago   200MB
postgres       11.6-alpine  89ae06c2ad76  11 months ago  152MB
```

On my computer, I’ve had various versions of the `postgres` image, each taking a considerable amount of space. You can remove the Docker image by running the following command:

```
docker rmi -f IMAGE_ID
```

From my experience, images usually take most of the disk space. However, if you’d like to do a more global cleanup including Docker containers, networks, and cache, use this command:

```
docker system prune
```

The total cleanup works for me because all my local Docker projects can be easily recreated using seed data. Make sure to double-check if you don’t have data that will be difficult to recover before removing a container or a volume.

Check out the [Docker documentation](https://docs.docker.com/config/pruning/) to read more about other pruning commands.

## Summary

I hope those tips will help you to clean the vast amounts of disk space easily. Regularly checking the _Disk Inventory X_ for unnecessary disk usage bloats is the a good practice that will help you keep your disk usage in order.

I'm available to conduct a performance tuning and security audit of your Rails app.
