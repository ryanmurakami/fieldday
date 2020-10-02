# EC2 Field Day

## Overview
This demo app is for the EC2 Field Day course. The app is called _Field Day_ and simulates field day events for a group of characters representing AWS Services.

## Project explanation
The course is going to be teaching learners how to use EC2. To do that, I want to have a fun app that they can deploy and work with. They won't be modifying the app at all, so it will need to be done.

The learners will be doing things like:
- Deploying to EC2 manually
- Auto-scaling & load balancing the app
- Configuring the instance role to give access to other AWS services (DynamoDB)
- Deploying the app in a Docker container
- Configuring the CloudWatch agent to send logs to CloudWatch

The app should be able to run all alone in EC2 without connecting to any outside services. Once the learner's have configured the correct permissions for the app, it should connect to DynamoDB to push data. This will be done in a fallback pattern when the app starts (eg. Try to connect to DynamoDB, on failure, set a flag and save locally).