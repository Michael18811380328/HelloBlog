# How to clean your Docker data

31 March, 2021

800 words, 4-minute read

Docker makes no configuration changes to your system … *but it can use a significant volume of disk space*. Use it for a short while and you may be shocked to see some scary usage statistics returned when entering:

```bash
docker system df
```



Fortunately, Docker allows you to reclaim disk space from unused images, containers, and volumes.

## Periodic pruning 

To safely remove stopped containers, unused networks, and dangling images it’s a *good idea* to run the following command every so often:

```bash
docker system prune
```



A slightly more risky option is:

```bash
docker system prune -a
```



This also wipes any image not associated with a running container. That can be a little drastic but Docker will re-download any image it requires. The first attempt will be a little slower but the image is then cached for further use.

The following sections describe additional ways to remove specific items.

## Image eviction 

A Docker *image* is a disk snapshot of an application such as a web server, language runtime, or database management system. You can view all images, both active and dangling (those not associated with a container), by entering:

```bash
docker image ls -a
```



A Docker image can be deleted by entering:

```bash
docker image rm <name_or_id>
```



Any number of images can be added to this command – separate them with a space character.

## Container cleaning 

A Docker *container* is a running instance of an image and any number of containers can be started from the same one. Containers are usually small because they are stateless and reference the image’s file system. View all containers, both running and stopped, by entering:

```bash
docker container ls -a
```



You can only delete a container once it has been stopped. Stop containers by entering:

```bash
docker container stop <name_or_id>
```



Containers can then be deleted by entering:

```bash
docker container rm <name_or_id>
```



Again, any number of space-separated container names/IDs can be added to this command.

It’s rarely necessary to retain stopped containers. The [`--rm` option](https://docs.docker.com/engine/reference/run/#clean-up---rm) can be added to any `docker run` command to automatically delete a container once it terminates.

## Network neatening 

Containers can be attached to a Docker-managed *network* so they can communicate with each other. These are configuration files which do not use much disk space. View all Docker networks by entering:

```bash
docker network ls
```



One or more unused networks can be deleted by entering:

```bash
docker network rm <name_or_id>
```



Again, any number of space-separated network names/IDs can be added to this command.

## Volume vaporisation 

A Docker *volume* is a virtual disk image. It must be attached to a running container so it can save files or other state information between restarts. Volume sizes depend on the application using it, but a typical database will require several hundred megabytes of space even when it’s mostly empty.

View all Docker-managed disk volumes by entering:

```bash
docker volume ls
```



Removing a Docker volume will wipe it’s data forever! *There is no going back.*

If you’re developing a database-driven application it’s usually practical to retain one or more data dumps which can be used to re-create a specific set of records. Most database client tools provide a dump or export facility, such as the **Export** link in [Adminer](https://www.adminer.org/).

Most database systems will provide a backup tool such as [`mysqldump` utility](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html) in MySQL. These can be executed on a running container using the [`docker exec` command](https://docs.docker.com/engine/reference/commandline/exec/).

The following Linux/macOS command backs up a MySQL database named `mydb` running on a container named `mysql` to a file named `backup.sql`. The MySQL `root` user with the password `mysecret` is used:

```bash
docker exec mysql /usr/bin/mysqldump -u root -pmysecret mydb \
  > backup.sql
```



the equivalent command for Windows PowerShell:

```bash
docker exec mysql /usr/bin/mysqldump -u root -pmysecret -r mydb | \
  Set-Content backup.sql
```



You can also  data files to or from a running container with the [`docker cp` command](https://docs.docker.com/engine/reference/commandline/cp/). This is passed source and destination paths where containers are referenced by their name/ID followed by a colon and their path, e.g.

```bash
docker cp mycontainer:/some/file ./host/directory
```



Assuming your data is safe, you can delete any unused volume by entering:

```bash
docker volume rm <name>
```



All unused Docker volumes – *those not currently attached to a running container* – can be removed with:

```bash
docker volume prune
```



Alternatively, `docker volume prune -a` will delete them all. *You did back-up first, didn’t you?..*

## Full clean start 

Every unused container, image, volume, and network can be wiped with a single command:

```bash
docker system prune -a --volumes
```



Add `-f` if you want to force the wipe without a confirmation prompt. Your system will be back to a pristine state without any Docker data.





