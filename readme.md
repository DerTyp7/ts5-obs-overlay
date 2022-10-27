
# A OBS-Overlay for TeamSpeak5
- [A OBS-Overlay for TeamSpeak5](#a-obs-overlay-for-teamspeak5)
  - [Setup](#setup)
  - [Config](#config)
  - [Troubleshooting](#troubleshooting)
    - [Option 1:](#option-1)
    - [Option 2:](#option-2)
    - [Option 3:](#option-3)

>**_WARNING:_** This overlay works only if you are connected to **one** server only.  
> If you were connected to multiple servers and the overlay crashed, try disconnecting from **all** servers and reconnecting to **only one**.

## Setup
1. Download this project optionally as archive
![image](https://user-images.githubusercontent.com/76851529/197848843-4a36593c-0e14-46d4-9b6b-bd17b399a49c.png)
2. Extract the archive and move the folder to where you want it to be
3. Open your TeamSpeak5 client and go to 
`settings -> Remote Apps`
4. Enable the "Remote Apps" feature
![image](https://user-images.githubusercontent.com/76851529/197849050-d4e28b8e-c150-4462-8871-f77ec672ee49.png)

5. Open your OBS Studio
6. Add a new **browser source** to your scene
![image](https://user-images.githubusercontent.com/76851529/197849644-9396fb9c-4943-4cb2-a511-062ffcd60404.png)

7. In the properties of your new browser source, select the Local File check box
8. Click "Browse" next to the newly apperared "Local file" field
9. Now select the in step 1 downloaded `overlay.html`
10. Set the "Width" to `2000` and the "Height" to `1000` (This is just my own preference. If you have better values, use them)
![image](https://user-images.githubusercontent.com/76851529/197849886-679b200b-6d42-439e-bce6-44c6df67ffcc.png)

11. Now connect to a TeamSpeak server and check if it works. You need to **accept** the remote app in your TeamSpeak notifications
![image](https://user-images.githubusercontent.com/76851529/197850151-ad057277-fe3d-427e-b21b-1d2b4875c70b.png)

12. **optional** If you want to get rid of this manually accepting the remote app (step 11) do as follows:
    1. Open the file "overlay.html" in your browser
    2. Open the Inspector by pressing `F12` or `right-click -> inspection`
    3. Go to the console tab  
      ![image](https://user-images.githubusercontent.com/76851529/198370753-a69996d3-4bd8-4b62-b5b6-ba3ffc69b2e1.png)
    4. Copy the displayed API-Key (after you have performed all of the above steps, including accepting the remote app in your TeamSpeak client)   
      ![image](https://user-images.githubusercontent.com/76851529/198370909-4f62e4b2-f2dd-4f2c-8392-e9b2f31a8529.png)  
    5. Open the file `config.js` from the same directory as the file `overlay.html` with any editor
    6. Paste the copied key into the quotation mark of "apiKey"
    ![image](https://user-images.githubusercontent.com/76851529/198371229-a6165e8d-acac-4a9c-b4c5-341be9d00826.png)
    7. Now do [Option 3 of the troubleshooting guide]("#option-3") or maybe restart your OBS
    > **Warning** The API-Key changes from time to time. You may need to update the API-Key sometimes (delete the old API-Key & repeat step 12).   
    > If someone knows how I can prevent this, please tell me

## Config
In the `config.js` file, which is located in the same folder as the `overlay.html` file, you can make various settings for the appearance of the overlay.
>**_NOTE_** If your change something in the config file you have to do [Option 3 of the troubleshooting below](#option-3).  

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
### Option 4:
If you use an API-Key in `config.js` ([setup step 12](#setup)), try to remove the key from the file.  
If it works now, you probably need to delete the old API-Key and repeat [step 12 of the setup instructions](#setup) because the API-Key has changed.
