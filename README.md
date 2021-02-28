# duck

## How to build

Run build.sh
```sh
$ ./build.sh
```
If that doesn't work...
```sh
$ ./node_modules/.bin/tsc
```

## How to run
If you're planning on running the bot on your own, you have to change `TOKEN` in the `.env` file to your own Discord bot token.
### Nodemon (might need sudo)
```sh
$ npm i nodemon -g
$ nodemon
```
### PM2
Start
```sh
$ pm2 start . --name=duck
```
Restart
```sh
$ pm2 restart duck
```
