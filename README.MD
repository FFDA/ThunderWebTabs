# ThunderWebTabs
Simple extension that opens Google Keep, Google Photos and Android Messenger or any website from user input in Thunderbird's tab.
This extension works in Thunderbird 64+ only.

<p align="center"><img src="https://github.com/FFDA/ffda.github.storage/blob/main/images/ThunderWebTabs.png?raw=true"></p>

To open website using input field copy full website's URL with https and not only domain name. https://www.google.com instead of www.google.com

## Preferences
<p align="center"><img width="400" src="https://github.com/FFDA/ffda.github.storage/blob/main/images/ThunderWebTabsPreferences.png?raw=true"></p>
It's possible to add custom websites to the list in the preferences.

Name and address fields are required. If any of them left empty - website won't be saved to the list.

Icon field is optional. It can be link to favicon or Base64 encoding of the image.

To get the link to the websites' icon. Open website source and search for word favicon and copy the link.

To convert image to Base64 string simply search for it on the web. There are a few options to choose from. I recommend looking for one that allows to give an Url instead of uploading an image. After simply copy the string to the Icon field and “data:image/png;base64,” will be prefixed automatically when you save the website list.

Using Base64-encoded images for icons is preferable because it makes icons always available, and addon does not have to load them off the web every time.
 
## Install
https://addons.thunderbird.net/en-US/thunderbird/addon/thunderwebtabs/

or

Download *.xpi file and install it from menu in Thunderbird's addon page

### Manual install from git files
1. Download/clone this repository
2. Compress contents of src catalog to zip
3. Change zip extention to *.xpi
4. Install the archive