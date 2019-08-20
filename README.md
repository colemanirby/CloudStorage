# Cumulus - Local Cloud Storage
__Note: the UI portion of this app was written on a Windows machine hence angular-cli was not needed on
the raspberrypi__

## Pre-Requisites - Raspberry Pi (Only Tested on pi 4)
1. python3
2. pipenv
    ```
    pip3 install pipenv
    ```
3. ntfs-3g 
    ```
    sudo apt install ntfs-3g
    ```
4. Node.js

## Pre-Requisites - PC (Windows)
1. Refer to 1 and 2 from Raspberry Pi
2. Node.js
3. angular-cli (if adding new components)


## UI setup (PC and Raspberry Pi)
Navigate to frontend directory and run the following:
```
Run npm install
Run npm start
```


## Python Setup - Raspberry Pi

### Setting up Hard Drive
Since I began developing this app I was originally reading/writing to my project directories and not to an external hard drive.
Because of this I had to do a couple of extra steps to get my NTFS formatted external hard drive mounted with proper read/write privileges.
Steps taken:
1. install ntfs-3g
2. Find where your external hard drive was mounted (mine was under media/pi/MY_HARD_DRIVE)
    - ``` df -T ``` (gives info about where in the filesystem your hard drive is mounted as well as what it's mounted on)
    - ``` sudo fdisk -l ``` (Probably not as useful for you as df -T but it's nice to have a fallback if you want to double check)
3. unmount your hard drive
    - ``` umount MY_HARD_DRIVE ```
4. re-mount your hard drive (before re-mounting I went to /mnt and ran sudo mkdir HDD)
    - ```sudo mount /path/to/your/device /path/to/your/desired/mount/location```
    - Example: ```sudo mount /dev/sda1 /mnt/HDD```

### Running the Flask server
1. Navigate to root directory (where README.md is located)
2. Run pipenv install
3. Navigate to backend directory
4. Run bootstrap.sh
    - ```./bootstrap.sh```
    
# Current Functionality
Initially landing you are immediately greeted with a full representation of the entire drive you are viewing.
There are no additional endpoint calls as you are navigating; until the user uploads or downloads a file.

## Upload
As of right now the directories will not update after an upload is complete. You will also see that an exception is shown above
the upload bar. Ignore it for now since the repsonse sent from the flask server is not in the proper format for ui parsing.
When a file is uploaded, it will be in the directory that you are viewing.

## Download
To download a file just click a file. It will start automatically downloading. I hope you know the type of file ,you should since it says it on the screen,
because right now the downloads are persisted as a UUID i.e. 04321f21g3b-....-143a3b21ad.
You will need to rename the file from the uuid to the uuid.your extension to properly view it

### In Development (In order of precedence)
1. Larger files take forever to upload. Investigate if there is a better solution for file upload (~450 MB file took ~2min 30s)
1. When downloading a file, the filename and extension should be what's persisted, not a UUID with no extension
1. When an upload is complete, only the directory that you are in should be fetched and refreshed
1. Allow user to view all drives available to them
1. Add login functionality 
1. After user logs in, they can only view drives they have permission to view
1. When landing on the the home screen, a shallow fetch should be performed so as to not cause performance issues on initial load (maybe a setting in the ui in the future)
1. Remove the ugly Upload your File stuff from the screen and hidden away. Add a nice upload button if users prefer to browse their file system, or just have them drag a file anywhere on the screen to upload it to the current directory.
1. Give users the ability to choose which directory they would like to store their file(s)
1. Add functionality to download an entire directory
1. Add delete file functionality
1. Add create/delete directory functionality
1. Make things more secure (SSL)