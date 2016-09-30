# developing

## To install JS dependencies:

npm install .


## Software configuration 
* Obtain a Google client API key from the Google developers console and add it to the file 'index.html' as the CLIENT_API_ID
* Find the Google calendar resource IDs for each room that will be included in the system (for more information about calendar resources see the help page here https://support.google.com/a/answer/1686462?hl=en )
* Add each room shape and resource ID to the config file in the 'config/' directory, and then import and re-export it from 'constants/FloorplanConfig'. See the example ShoeFloorplanConfig.js

## To build and serve a dev server:

npm run start
