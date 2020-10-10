# EC2 Field Day

## Overview
This demo app is for the EC2 Field Day course. The app is called _Field Day_ and simulates field day events for a group of characters representing AWS Services.

## Project Designs

https://www.figma.com/file/bvoQxBRtVDSvbH44qLOCHv/Site-Design?node-id=0%3A1

## Project explanation
The course is going to be teaching learners how to use EC2. To do that, I want to have a fun app that they can deploy and work with. They won't be modifying the app at all, so it will need to be done.

The learners will be doing things like:
- Deploying to EC2 manually
- Auto-scaling & load balancing the app
- Configuring the instance role to give access to other AWS services (DynamoDB)
- Deploying the app in a Docker container
- Configuring the CloudWatch agent to send logs to CloudWatch

The app should be able to run all alone in EC2 without connecting to any outside services. Once the learner's have configured the correct permissions for the app, it should connect to DynamoDB to push data. This will be done in a fallback pattern when the app starts (eg. Try to connect to DynamoDB, on failure, set a flag and save locally).

## Development
Install dependencies with

```
npm run install-all
```

### server development

```
npm run start-all
```
Access in `localhost:5000`

### client development
for client development with active API, the Express server needs to be activated separately. Using two terminal run

```
npm run start
```
on both the `root` folder and the `client` folder. Any new dependencies needed for the client will need to be installed from the `client` folder.

server will be `localhost:5000`


client will be `localhost:8080`
