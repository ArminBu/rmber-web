# rmber-web

  simple web-presentation and small backend for bug report.

# Development Environment

  This is a manual to install this repository for development purpose.

  1. Install npm, bower, gulp, mongoDB globaly
  2. Open terminal

    ```
    $ cd ~ && git clone https://github.com/Stejnar/rmber-web.git
    $ cd rmber-web
    $ npm install
    $ bower install
    $ mkdir ~/Databases && mkdir ~/Databases/rmber
    $ cd ~/Databases/rmber && touch logfile.txt
    $ mongod --port 4001 --dbpath "/home/my_account/Databases/rmber"
        --logpath "/home/my_account/Databases/rmber/logfile.txt" [--fork]
        ( I don't recommend to fork for development )
    $ cd ~/rmber-web && gulp dev
    ```

  3. Go to [localhost:9000](http://localhost:9000/)
<<<<<<< HEAD
=======

# Examples

 Seed database via curl:

```
$ curl -X POST -d "{\"api\": \"21\", \"manufacturer\": \"LG\", \"model\": \"LGE\", \"msg\": \"Fatal Exception\", \"stacktrace\": \"so damn fatal\"}" http://localhost:9000/report --header "Content-Type:application/json"
```
>>>>>>> ca91801408a3c2f76a13a1f20b485f3ef5f5b030
