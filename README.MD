#ThunderWebTabs
Simple extension that opens Google Keep, Google Photos and Android Messenger or website from user input in Thunderbird's tab.
This extension should work in Thunderbird 64+ only, because Thunderbird starts supporting essential API from this version forward.

![Screenshot showing pop up of ThunderWebTabs](https://i.imgur.com/no0hweD.png)

To open website using input field copy website's URL with https and not only domain name. https://www.google.com instead of www.google.com
 
### Install
Download *.xpi file and install it from menu in Thunderbird's addon page or try to search for it using Thuderbirds addon page  (not yet available).

#### Manual install from git files
To manually install this addon download the reposotory zip it and rename zip file to *.xpi. To do it on linux you can use following commands:
```
git clone https://github.com/FFDA/ThunderWebTabs.git 
VERSION=$(cat manifest.json | grep '\"version\": .*\",' | sed -r 's:"version"\: "::' | sed -e "s/[[:space:]]\+//g" | sed -r $"s/\",//g")
zip -r "../ThunderWebTabs-${VERSION}-tb.xpi" *
```
### RAM usage
Because this addon loads web pages in tabs it will increase RAM (and other resouces) ussage.
As a reference Thunderbird 65.0b1 (64-bit) with no email accounts and just one additional tab of GoogleKeepPlus opened using approximately 337.3 MB of RAM. While same version with 3 tabs (Keep, Messages and Photos) opened  is using approximately 434.3 MB of RAM.
