# **PreyToLive-CustomTraderAvatars v1.0.0**

Developed by: [NEWBR33D](https://github.com/NEWBR33D) (aka [PreyToLive](https://hub.sp-tarkov.com/user/24548-preytolive/))

[CustomTraderAvatars](https://hub.sp-tarkov.com/files/file/1002-betterspawnsplus/) is a mod that allows customization of the default traders profile pictures as well as custom traders from other mods for SPTarkov.

#### ***If you would like to support me and my work you can donate to me [here](https://ko-fi.com/preytolive). Thank you!***

## **Installation Instructions:**
1. Begin by downloading the "PreyToLive-CustomTraderAvatars-v1.0.0.zip" file from the provided link or the Github repository.
2. Extract the contents of the downloaded archive. You should now have a folder named "zPreyToLive-CustomTraderAvatars" containing the mod files.
3. Navigate to the location of your SPTarkov folder on your computer.
4. Inside the SPTarkov folder, find the "user/mods/" directory.
5. Place the extracted folder containing the mod files into the 'mods' folder within your SPTarkov folder.

## **Setup Guide:**
1. Start by opening the config file and the 'res/traders' directory in the mod.
2. Inside the 'traders' folder you will find existing folders (e.g. custom1, custom2, default) that contain trader avatar images. Please note that these folders and their respective trader avatar file names match the contents within the config file.
3. Within the config file is an option called "traderFolderToUse". Here you will type the name of the folder that contains the trader avatars you want the mod to use.
4. If you prefer to use custom trader avatars from other mods or sources, create a new folder within the 'traders' folder. Copy the trader avatar files into this new folder. The default trader avatars image size is 128x128 pixels, but you can increase the size of your own for better quality, though it's recommended not to exceed 1000x1000 pixels to avoid longer loading times in-game.
5. Add the folder name and trader names to the config file as shown below. Ensure that the keys (trader names on the left) remain the same for default traders, but you can customize them for custom traders. However, the values (trader avatar file names on the right) must match the actual file names in the folder, without including file extensions like .jpg or .png.
```
    "modEnabled": true,
    "consoleLogs": false,
    "traderFolderToUse": "type-your-custom-folder-name-here",

    "traderFolders": {
        "type-your-custom-folder-name-here": {
            "btr": "type-the-file-name-here",
            "fence": "type-the-file-name-here",
            "jaeger": "type-the-file-name-here",
            "lightkeeper": "type-the-file-name-here",
            "mechanic": "type-the-file-name-here",
            "peacekeeper": "type-the-file-name-here",
            "prapor": "type-the-file-name-here",
            "ragman": "type-the-file-name-here",
            "skier": "type-the-file-name-here",
            "therapist": "type-the-file-name-here",
    key --> "customTrader1": "type-the-file-name-here", <-- value
            "customTrader2": ""type-the-file-name-here",
            "customTrader3": ""type-the-file-name-here",
            "customTrader4": ""type-the-file-name-here",
        }
    }
```
#### ***IMPORTANT:***
Remember to clean temporary files to ensure custom trader profile pictures appear correctly in-game. You can do this through the launcher settings.

## **Disclaimer:**
I do not claim ownership of any rights to the images or artwork utilized within this mod.