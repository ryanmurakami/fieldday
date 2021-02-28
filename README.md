# Field Day

## Overview
This demo app is for the EC2 Field Day course. The app is called _Field Day_ and simulates field day events for a group of characters representing AWS Services.

## Project explanation
The app is able to run all alone in EC2 without connecting to any outside services. During the video course, learners will configure the correct permissions for the app to be able to connect to DynamoDB to push data and ElastiCache to cache sessions. This is done in a fallback pattern when the app starts (eg. Try to connect to DynamoDB, on failure, set a flag and save locally).

## Development
Install dependencies with

```
npm run install-all
```

### running the application

```
npm run start
```
modify the `.env` file to use configured table name.

Access in `localhost:5000`

### server & client development
for client development with active API, the Express server needs to be activated separately. Using two terminal run

```
npm run start
```
on both the `root` folder and the `client` folder. Any new dependencies needed for the client will need to be installed from the `client` folder.

server will be `localhost:5000`

client will be `localhost:8080`
