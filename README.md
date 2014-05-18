# Docker Playground

This repository is intended for people who want to test-drive [docker](http://docker.io). It provides a [Vagrant](http://www.vagrantup.com/) box with docker installed.

## Prerequisites

* [Vagrant](http://www.vagrantup.com/downloads.html)
* [VirtualBox](https://www.virtualbox.org/wiki/Downloads)

## Usage

```bash
$ vagrant up
$ vagrant ssh
```

## OK, Now What?

Try running an interactive shell session in a container:
```bash
$ docker run -i -t ubuntu:trusty /bin/bash
root@<container-id>$ 
```
Try modifying the container:
```bash
root@<container-id>$ echo 'Hello World!' > /hello.txt
```

Now, exit the session and inspect the container history:
```bash
root@<container-id>$ exit
$ docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED              STATUS    ...
<container-id>      ubuntu:trusty       /bin/bash           About a minute ago   Exit 0    ...
```

Inspect the container delta:
```bash
$ docker diff <container-id>
A /hello.txt
A /.bash_history
C /dev
C /dev/stdout
C /dev/stdin
C /dev/core
C /dev/stderr
C /dev/console
C /dev/ptmx
C /dev/fd
```

Create a new image from these changes:
```bash
$ docker commit <container-id> yourname/helloworld
```

Create a new container based on your image:
```bash
$ docker run -i -t yourname/helloworld /bin/bash
root@<container-id>$ cat hello.txt
Hello World!
root@<container-id>$
```

## What Else Can I Do?

Create a Dockerfile for nodejs. First, create a file named 'Dockerfile':
```
FROM ubuntu:trusty

RUN apt-get install -y nodejs
```

Build an image!
```bash
$ docker build -t yourname/nodejs .
```

Create a 'source' directory containing a small JS program:
```bash
$ mkdir source/
$ cat <<EOF > source/main.js
var http = require('http');

var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});
server.listen(8000);
EOF
```

Then, start a nodejs container using that directory as a volume, redirecting port 8080 on your host to port 8000 in the container:
```bash
$ docker run -v $(pwd)/source:/source -p 8080:8000 yourname/nodejs nodejs /source/main.js' 
```

Point your browser to http://localhost:8080. You should get a response from you node application.

## Where To Go From Here

Have a look at the [Docker documentation](http://docs.docker.io/). Explore the [Docker Index](https://index.docker.io/) for some interesting images. And have fun :-)
