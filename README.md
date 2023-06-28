# Teamspeak5-OBS-Overlay

This is a overlay for OBS to show the current talking clients in your Teamspeak 5 Channel.  
This App uses the new "Remote Apps" feature of Teamspeak 5.

## Setup

1. Download the `index.html` of the latest release from [here](https://github.com/DerTyp876/ts5-obs-overlay/releases/tag/v1.0.0)
2. Go into the Teamspeak 5 Settings and enable "Remote Apps"
3. Add a new Browser Source to your OBS Scene
4. Tick the checkbox "Local File" and select the downloaded `index.html`
5. Set the width and height to your desired size (e.g. 1920x1080 OR 1280x720)
6. You should now got a notification in Teamspeak 5 to allow the App to connect to your Teamspeak 5 Client. Allow it. (If you don't get a notification, restart Teamspeak 5 and OBS -> try again)

## Setup (Developer)

1. Clone this repository
2. Run `npm install`
3. To start the development server run `npm run dev`
