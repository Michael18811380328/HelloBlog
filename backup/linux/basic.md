# Linux 的用法

## 权限

- SUID：如果设置该权限，user 的执行位从 x 变为 s。它表示执行时，就拥有文件所有者的权限，比如所有者是 root，则执行时其他用户也会拥有 root 的权限。该权限只对可执行文件有效，对目录设置该权限无效。如果 s 为小写，表示执行位同时设置，否则执行位就没有设置。
- GUID：如果设置该权限，group 的执行位从 x 变为 s。它表示执行时，就拥有文件所在组的权限。该权限可以对目录设置，该目录中创建的文件都会继承目录的同组权限。
- sticky bit：other 的执行位从 x 变为 t。该权限只对目录有效。在一个多人可以读写的目录，任何人都可以删除文件，即使他对该文件并没有写权限。设置了 sticky bit 后，只有该文件的所有者才能删除该文件，这对/tmp 这样的目录很有作用。

```bash
# adds the SUID permission to file.txt
$ chmod u+s file.txt

# removes the GUID permission from file.txt
$ chmod g-s file.txt

# adds the sticky bit to the "folder" directory
$ chmod o+t folder

# Special permissions can be assigned right alongside regular permissions
$ chmod ug+rw,u+s,ugo-x file.txt
```

使用八进制表示权限时，可以在正常的三个八进制数前加一个数字，表示特殊权限，默认是 0。

```bash
$ chmod 755 file.txt
# 等同于
chmod 0755 file.txt
```

在这个位置上，SUID 为 4，GUID 为 2，Sticky 为 1。

```bash
# 设置GUID权限
$ chmod 2770 foldername
```
