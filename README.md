# Teamspeak5-OBS-Overlay

This is an overlay for OBS to show the current talking clients in your Teamspeak 5 Channel.  
This App uses the new "Remote Apps" feature of Teamspeak 5.

This overlay uses the [Teamspeak 5 Remote App API](https://github.com/DerTyp7/react-ts5-remote-app-api).

![image](https://github.com/DerTyp7/ts5-obs-overlay/assets/76851529/d0ab06f2-1a36-479d-826f-bd4bd3d405b7)

- [Teamspeak5-OBS-Overlay](#teamspeak5-obs-overlay)
  - [Usage](#usage)
    - [Online (Recommended)](#online-recommended)
    - [Offline](#offline)
  - [Settings (Parameters)](#settings-parameters)
    - [You are using the **online** version?](#you-are-using-the-online-version)
    - [You are using the **offline** version?](#you-are-using-the-offline-version)
    - [Adding Parameters](#adding-parameters)
  - [Setup (Developer)](#setup-developer)
  - [Common Issues](#common-issues)
    - [The overlay is empty, but i'm connected to a Teamspeak 5 server](#the-overlay-is-empty-but-im-connected-to-a-teamspeak-5-server)

## Usage

### Online (Recommended)

1. **Open OBS** and create a new **Browser Source**
2. For the **URL** use <https://dertyp7.github.io/ts5-obs-overlay/>
3. Set the **width and height** to your desired size (e.g. 1920x1080 OR 1280x720)
4. Press **OK** and you should now get a **notification in TS5 -> Allow it**
5. **Done.** You should now see the overlay in OBS (when connected to server)

> Note: This URL will always use the **latest** version of the overlay. If you want to use a **specific version**, go to [Offline](#offline) and use the desired version.

### Offline

1. Download the `ts5-overlay-{version}.html` of the latest release from [here](https://github.com/DerTyp7/ts5-obs-overlay/releases/latest)
   ![image](https://github.com/DerTyp7/ts5-obs-overlay/assets/76851529/04dc3a66-c493-429b-b4ae-44bade473ad6)  
   1.1. (optional) You can rename the file. Just remember using the new file name in the future instead of `ts5-overlay-{version}.html`
2. Go into the Teamspeak 5 Settings and enable "Remote Apps"  
   ![image](https://github.com/DerTyp7/ts5-obs-overlay/assets/76851529/b31bc553-fde2-46ab-b07c-d3c81339cc7d)

3. Add a new Browser Source to your OBS Scene  
   ![image](https://github.com/DerTyp7/ts5-obs-overlay/assets/76851529/0198b468-bb96-4b65-bdd4-3d6bb3ef7d25)  
   ![image](https://github.com/DerTyp7/ts5-obs-overlay/assets/76851529/58ad399f-5344-456f-b243-6e267b489fd5)

4. Tick the checkbox "Local File" and select the downloaded `ts5-overlay-{version}.html`  
    4.1. Set the width and height to your desired size (e.g. 1920x1080 OR 1280x720)  
   ![image](https://github.com/DerTyp7/ts5-obs-overlay/assets/76851529/5ad8ce69-645b-45e7-acc3-ce7ba8d7f8ab)

5. You should now receive a notification in Teamspeak 5 that the app is allowed to connect to your Teamspeak 5 client. Allow it. (If you don't get a notification, restart Teamspeak 5 and OBS -> try again)  
   ![image](https://github.com/DerTyp7/ts5-obs-overlay/assets/76851529/40faa435-e128-415f-98eb-a9e8809e8f65)

## Settings (Parameters)

You can customize the overlay by adding parameters to the URL of the Browser Source.

### You are using the **online** version?

1. Open your Browser Source settings
2. Start adding parameters like discribed in [Adding Parameters](#adding-parameters)

### You are using the **offline** version?

1. Open your Browser Source settings
2. **Untick** the checkbox "Local File"
3. Add `file://` to the beginning of the URL  
   ![image](https://github.com/DerTyp7/ts5-obs-overlay/assets/76851529/87985b4c-4397-4681-9635-239d1e382c24)
4. Start adding parameters like discribed in [Adding Parameters](#adding-parameters)

### Adding Parameters

Start by adding a `?` to the end of the URL and then add the parameters.
To add multiple parameters, you have to seperate them with a `&`.

Like this:  
**Online:** _`https://dertyp7.github.io/ts5-obs-overlay/?parameter1=value1&parameter2=value2`_  
**Offline:** _`file://C:/Users/.../ts5-overlay-{version}.html?parameter1=value1&parameter2=value2`_

Real example:  
**Online:** _`https://dertyp7.github.io/ts5-obs-overlay/?remoteAppPort=5899&hideNonTalking=true&clientLimit=5&showChannelName=true`_  
**Offline:** _`file://C:/Users/.../ts5-overlay-{version}.html?remoteAppPort=5899&hideNonTalking=true&clientLimit=5&showChannelName=true`_

This is a **list** of **all available parameters** (all parameters are optional):

| Parameter         | Description                              | Type    | Default         |
| ----------------- | ---------------------------------------- | ------- | --------------- |
| `remoteAppPort`   | The port of the Teamspeak 5 remote app   | number  | `5899`          |
| `hideNonTalking`  | Hide all non-talking clients             | boolean | `false`         |
| `clientLimit`     | Count of how many client should be shown | number  | `0` (unlimited) |
| `showChannelName` | Display the channel name                 | boolean | `false`         |

## Setup (Developer)

1. Clone this repository
2. Run `npm install`
3. To start the development server run `npm run dev`

## Common Issues

### The overlay is empty, but i'm connected to a Teamspeak 5 server

Sadly TeamSpeak5 does not give us any information about the current active server tab.  
So we try currently use a workaround, where the active server tab is determined by looking on which server the your hardware input was unmuted the latest, since the non-active server tabs in TS5 usually mute the client’s microphone.

However this workaround is not 100% accurate and can fail in some cases.

Possible fixes:

- Unmute and mute yourself in the active server tab (Just a normal unmute and mute, not the hardware mute)
- Reconnect to the TS5 server while the overlay is open
