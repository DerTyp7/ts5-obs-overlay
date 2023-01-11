
# A OBS-Overlay for TeamSpeak5
Made with the "Remote App" feature of TeamSpeak5
- [A OBS-Overlay for TeamSpeak5](#a-obs-overlay-for-teamspeak5)
  - [Setup](#setup)
  - [Update](#update) 
    - [Use script](#use-script)
    - [Manually](#manually)
  - [Configuration](#configuration)
  - [Troubleshooting](#troubleshooting)
    - [Option 1:](#option-1)
    - [Option 2:](#option-2)
    - [Option 3:](#option-3)

>**_WARNING:_** This overlay works only show the first server you were connected to.

## Setup
1. Download the [latest release](https://github.com/DerTyp876/ts5-obs-overlay/releases/latest) of this project & extract the archive to a folder of your choice
2. Open your TeamSpeak5 client and go to 
`settings -> Remote Apps`
3. Enable the "Remote Apps" feature
![image](https://user-images.githubusercontent.com/76851529/197849050-d4e28b8e-c150-4462-8871-f77ec672ee49.png)

4. Open your OBS Studio & add a new **browser source** to your scene
![image](https://user-images.githubusercontent.com/76851529/197849644-9396fb9c-4943-4cb2-a511-062ffcd60404.png)

5. In the properties of your new browser source, select the Local File check box
6. Click "Browse" next to the newly apperared "Local file" field
7. Now select the in step 1 downloaded `overlay.html`
8. Set the "Width" to `2000` and the "Height" to `1000` (This is just my own preference. If you have better values, use them)  
![image](https://user-images.githubusercontent.com/76851529/197849886-679b200b-6d42-439e-bce6-44c6df67ffcc.png)  

9. Now connect to a TeamSpeak server and check if it works. You need to **accept** the remote app in your TeamSpeak notifications  
![image](https://user-images.githubusercontent.com/76851529/197850151-ad057277-fe3d-427e-b21b-1d2b4875c70b.png)  
**Done**
## Update
### Use script
If you want to update the project automatically, just double-click the "update.bat" file **OR** open a new console in the project directory and run the "update.ps1" command.  
If you encounter problems because of the microsoft execution policy open a console in the project directory and run  
`powershell -ExecutionPolicy Bypass -File update.ps1`  
https://stackoverflow.com/questions/4037939/powershell-says-execution-of-scripts-is-disabled-on-this-system 

### Manually
To manually update just delete the hole project directory and repeat the [setup](#setup) above :).

## Configuration
In the `config.js` file, which is located in the same folder as the `overlay.html` file, you can make various settings for the appearance of the overlay.  
Since everything is written in simple css and html, you can change the `css/style.css` file to your liking.
>**_NOTE_** If your change something in the files you have to do [Option 3 of the troubleshooting below](#option-3).  

## Troubleshooting
Possible solutions to fix the overlay.
### Option 1:  
   Disconnect from all TeamSpeak servers and reconnect to just one
### Option 2: 
   Restart TeamSpeak5
### Option 3:
1. Open OBS Studio
2. Go open the properties of your browser source
3. On the bottom of the properties press the "Refresh cache of current page" button.
