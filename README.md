# developing

## To install JS dependencies:

npm install .

## To build and serve a dev server:

npm run start

## Software configuration
* Obtain a Google client API key from the Google developers console and add it to the file 'index.html' as the CLIENT_API_ID
* Find the Google calendar resource IDs for each room that will be included in the system (for more information about calendar resources see the help page here https://support.google.com/a/answer/1686462?hl=en )
* Add each room shape and resource ID to the config file in the 'config/' directory, and then import and re-export it from 'constants/FloorplanConfig'. See the example ShoeFloorplanConfig.js

## Hardware Configuration
* Mount a tablet outside a conference room or in a location of your choosing
* Navigate to your BookIt hosting location. Here at EnergySavvy, we host it at https://meeting-rooms.evoworx.org.
* Optionally navigate to /sethome to choose the home page that should be redirected to after a specified timeout (default is 10 minutes; this can be configured in code). This allows a particular tablet to be dedicated to a particular room.

## License
This software is under the MIT license (see LICENSE.md)
