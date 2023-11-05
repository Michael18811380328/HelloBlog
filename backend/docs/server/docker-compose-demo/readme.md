# Docker Compose

docker-compose 练习案例，原始链接：https://www.runoob.com/docker/docker-compose.html

Compose 是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。

如果你还不了解 YML 文件配置，可以先阅读 YAML 入门教程。

Compose 使用的三个步骤：

1. 使用 Dockerfile 定义应用程序的环境。
2. 使用 docker-compose.yml 定义构成应用程序的服务，这样它们可以在隔离环境中一起运行。
3. 最后，执行 docker-compose up 命令来启动并运行整个应用程序。

其他常用命令

```bash
docker exec -it 容器名称 bash
docker run -it 镜像名称 bash
# 本地有 node 的镜像，但是没有 node 的容器，所以第二行可以运行

docker port dtable-mysql 查看容器端口映射
3306/tcp -> 0.0.0.0:3306

docker start/stop 容器名称 打开或者关闭容器
```
