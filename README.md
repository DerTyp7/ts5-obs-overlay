# Teamspeak5-OBS-Overlay

This is a overlay for OBS to show the current talking clients in your Teamspeak 5 Channel.  
This App uses the new "Remote Apps" feature of Teamspeak 5.

![image](https://github.com/DerTyp876/ts5-obs-overlay/assets/76851529/d0ab06f2-1a36-479d-826f-bd4bd3d405b7)



- [Teamspeak5-OBS-Overlay](#teamspeak5-obs-overlay)
  - [Setup](#setup)
  - [Setup (Developer)](#setup-developer)

## Setup

1. Download the `index.html` of the latest release from [here](https://github.com/DerTyp876/ts5-obs-overlay/releases/tag/v1.0.0)  
   ![image](https://github.com/DerTyp876/ts5-obs-overlay/assets/76851529/04dc3a66-c493-429b-b4ae-44bade473ad6)
2. Go into the Teamspeak 5 Settings and enable "Remote Apps"  
   ![image](https://github.com/DerTyp876/ts5-obs-overlay/assets/76851529/b31bc553-fde2-46ab-b07c-d3c81339cc7d)

3. Add a new Browser Source to your OBS Scene  
  ![image](https://github.com/DerTyp876/ts5-obs-overlay/assets/76851529/0198b468-bb96-4b65-bdd4-3d6bb3ef7d25)  
  ![image](https://github.com/DerTyp876/ts5-obs-overlay/assets/76851529/58ad399f-5344-456f-b243-6e267b489fd5)

4. Tick the checkbox "Local File" and select the downloaded `index.html`  
     4.1. Set the width and height to your desired size (e.g. 1920x1080 OR 1280x720)  
   ![image](https://github.com/DerTyp876/ts5-obs-overlay/assets/76851529/5ad8ce69-645b-45e7-acc3-ce7ba8d7f8ab)

5. You should now receive a notification in Teamspeak 5 that the app is allowed to connect to your Teamspeak 5 client. Allow it. (If you don't get a notification, restart Teamspeak 5 and OBS -> try again)  
![image](https://github.com/DerTyp876/ts5-obs-overlay/assets/76851529/40faa435-e128-415f-98eb-a9e8809e8f65)

## Setup (Developer)

1. Clone this repository
2. Run `npm install`
3. To start the development server run `npm run dev`
