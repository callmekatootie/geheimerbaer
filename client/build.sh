#/bin/bash

# Heroku deployment requires vue-cli-service, which is a dev dependency
# Heroku won't install dev dependencies by default. Hence this script

npm install --only=dev
npm install
npm run build
