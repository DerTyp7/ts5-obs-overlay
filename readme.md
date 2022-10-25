# A OBS-Overlay for TeamSpeak5

>**_WARNING:_** This overlay works only if you are connected to **one** server only.  
> If you were connected to multiple servers and the overlay crashed, try disconnecting from **all** servers and reconnecting to **only one**.

## Setup
1. Download this project
2. Open your TeamSpeak5 client and go to 
`settings -> Remote Apps`
3. Enable the "Remote Apps" feature
4. Open your OBS Studio
5. Add a new **browser source** to your scene
6. When your in the properties of your new browser source, enable the checkbox "Local file"
7. Click "Browse" next to the newly apperared "Local file" field
8. Now select the in step 1 downloaded `overlay.html`
9. Set the "Width" to `2000` and the "Height" to `1000` (This is just my own preference. If you have better values use them)
10. Now connect to a TeamSpeak server and see if it works. You may have to accept the remote app in your TeamSpeak notifications.

## Troubleshooting