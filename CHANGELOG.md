# Change Log

## 5.0.0

- Upgraded StormLibrary to 5.0.0,

## 4.3.0

- Upgraded StormLibrary to 4.3.0,

## 4.2.0

- Upgraded StormLibrary to 4.2.0,

## 4.1.3

- Fixed samples for AMD/UMD/ESM,

## 4.1.2

- Upgraded StormLibrary to 4.1.1,

## 4.1.1

- Minor bugfixes for iOS < 16,

## 4.1.0

- Upgraded StormLibrary to 4.1.0,

## 4.0.5

- Improved quality list update,
- Upgraded StormLibrary to 4.0.5,

## 4.0.5

- Improved UI scaling,
- upgraded StormLibrary to 4.0.4,

## 4.0.4

- Improved quality-list sorting,
- Bug fix for removed Poster image,

## 4.0.3

- Bug fix for waiting rings gradients,

## 4.0.2

- Bug fix for dynamic theme updates,
- Bug fix for volume bar initial position,

## 4.0.1

- Bug fix for entering/exiting FullScreen Mode,
- Bug fix for Quality switch list,

## 4.0.0

- Support for optional parameters from Gateway Request,
- Updated internal API for Storm Library v4,

## 3.0.0

- The player was upgraded to Node 20.3.1,
- Updated internal API for Storm Library v3,
- Waiting room was added,
- Styles were added,
- Translations configuration was added,

## 2.2.0

- unnecessary dependencies were removed from package.json,
- compiling for different bundles now works in parallel (it's 3x faster now),

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

