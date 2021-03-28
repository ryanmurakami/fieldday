# Field Day

## Overview
This demo app is for the EC2 Field Day course. The app is called _Field Day_ and simulates field day events for a group of characters representing AWS Services.

## Project explanation
The app is able to run all alone in EC2 without connecting to any outside services. During the video course, learners will configure the correct permissions for the app to be able to connect to DynamoDB to push data and ElastiCache to cache sessions. This is done in a fallback pattern when the app starts (eg. Try to connect to DynamoDB, on failure, set a flag and save locally).

## Development
Install dependencies with

```
npm install
```

### Running the Application

```
npm run start
```

Access in `localhost:3000`

### Server & Client Development
For client development with active API, the Express server needs to be activated separately. 

Using two terminals run
```
npm run start
```

Server will be `localhost:3000`

Client will be `localhost:8080`
