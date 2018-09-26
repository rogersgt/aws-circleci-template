# aws-circleci-template
Quick start template for AWS infrastructure and CircleCi integration

### Environment Variables
Environment variables are listed in the `sample.env`. If `NODE_ENV` is not set to `production`,
scripts will load a local `.env` file, if it exists. To create an `.env` file, copy the sample
and fill in the values that you want.

### Getting started
* Fork this repo
* Create an AWS account
* Create a CircleCi account
* Follow your forked repo in CircleCi
* Create an IAM user for CircleCi in AWS
* Add the environment keys listed in the `sample.env` in CircleCi

### Environments
This repo starts you out with 3 environments
- local: used for developing locally (it still applies scripts using the provided AWS credentials)
- development: Any merges/commits into the `dev` branch will deploy to the development environment
- production: Any merges/commits into the `master` branch will deploy into the production environment
