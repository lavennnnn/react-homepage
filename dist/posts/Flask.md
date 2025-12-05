# Flask

## 一、项目配置

### 1.1 debug 模式

在开发Flask项目时，开启 debug 模式后，如果代码发生修改，我们只要按 ctr1+s，Flask就会重新加载项目，而不需要关闭再打开项目，并且如果项目运行过程中出现了bug，也会将错误信息显示在浏览器或 PyCharm 控制台，方便我们查看。在 PyCharm 中可以编辑项目配置，勾选 DEBUG，即可开启 debug 模式。

### 1.2 设置 host 和 port

Host代表的是主机，Port代表的是端口号。先拿一个实际例子来简单解释一下Host和Port。比如百度首页网址为https://www.baidu.com:443，其中冒号前面的www.baidu.com即为Host，冒号后面的443即为Port，而百度首页网址用的是https协议，因为https协议默认监听的是443端口，所以我们生活中在访问百度首页网址的时候，即使没有写明443端口，浏览器也会请求百度服务器的443端口，即通过https://www.baidu.com也可以访问到百度首页。我们在自己电脑上运行完Flask项目后，就可以看到控制台输出Running on http://127.0.0.1:5000，这里host使用的是127.0.0.1，代表只有本机可以访问，而port是5000，代表以后访问要通过5000端口访问。在Pycharm中可以通过以下方式修改Host和Port。

![image-20251206010204266](../images/image-20251206010204266.png)