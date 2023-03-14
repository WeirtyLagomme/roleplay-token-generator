# Roleplay Token Generator

A chrome extension to create roleplay tokens directly from images found on the web.

![](https://i.imgur.com/648zNgO.png)

## How to install

1. Clone this repository
2. Open chrome and go to `chrome://extensions/`
3. Toggle the `Developer mode` button at the top right of the page
4. Click on the `Load unpacked` button
5. Select the `roleplay-token-generator` directory

## How to update

1. In the `roleplay-token-generator` directory run `git pull`
2. Open chrome and go to `chrome://extensions/`
3. Delete the *Roleplay Token Generator* extension
4. Click on the `Load unpacked` button
5. Select the `roleplay-token-generator` directory

## Basic usage

1. Right click on an image anywhere on the web
2. Select the `Generate token from image` option
3. You can now move, resize, flip and rotate the image
4. Press `CTRL+S` to save the token
5. Name the file and press `Enter` to download the token

## Changelog

### Version 1.0

* Basic usage implementation : move, resize, flip and rotate the image. Save file with `CTRL+S`

### Version 2.0

* Press `CTRL+H` to access the full history of previously generated tokens. Click on a token from the list to download it again. This feature **does not** includes tokens generated before the 2.0 version update
* Select a different border style from the left side menu