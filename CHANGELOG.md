# Change Log

## 2.1.2

- Small fix in package.json for type declaration path,

## 2.1.1

- Upgraded library version,

## 2.1.0

Constructor change:
- Additional and optional parameter **wait*** has been added (*false* by default). If set to *true* player will not start automatically, but wait for *initialize()* method. 

Change in *removeEventListener* method:
- callback parameter is now optional. If not provided, all events of that kind will be removed at once. This change was introduced so events with inline functions can now be erased.

New methods were added to the player:
- initialize();
- setWidth(newValue:number):void
- setHeight(newValue:number):void
- getWidth():number
- getHeight():number

Bug fixes:
- Volume will now be saved and restored using a cookie,
- Improved FullScreen mode for mobile devices,

Other improvements:
- Touch events were added to the player (works much better on mobile/devices),
- Rewritten progress-bar seeking mechanism for mobile,
- Fullscreen mode has been greatly improved for Desktop,
- Alternative fullscreen mode for mobile (covers whole document as a fixed layer)

*Minor changes to the rollup config were also made!*


## 2.0.0

StormPlayer in this version was rebuilt from scratch for more straightforward implementation with modern websites. List of changes:
* The player now comes in **UMD**, **AMD**, **IIFE**, **ESM** and **CJS** packages,
* Source code is now properly documented in JSDoc format,
* New (alternative) embed mechanism using CustomElements,
* NPM scripts were updated,

*Please keep in mind that this player is only compatibile with StormLibrary 2.0.0 or newer.*

## 1.0.1

Updated StormLibrary in package.json file

## 1.0.0

The main release.

## 0.9.0

The first public version of the player.

