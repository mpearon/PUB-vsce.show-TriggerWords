[![Badge for version for Visual Studio Code extension MPearon.vsce-show-triggerwords](https://vsmarketplacebadge.apphb.com/version/MPearon.vsce-show-triggerwords.svg?color=darkred&style=flat&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=MPearon.vsce-show-triggerwords&wt.mc_id=MPearon.vsce-show-triggerwords) [![Rating](https://vsmarketplacebadge.apphb.com/rating/MPearon.vsce-show-triggerwords.svg?color=darkred&style=flat)](https://marketplace.visualstudio.com/items?itemName=MPearon.vsce-show-triggerwords&wt.mc_id=MPearon.vsce-show-triggerwords) [![Installs](https://vsmarketplacebadge.apphb.com/installs-short/MPearon.vsce-show-triggerwords.svg?color=darkred&style=flat)](https://marketplace.visualstudio.com/items?itemName=MPearon.vsce-show-triggerwords&wt.mc_id=MPearon.vsce-show-triggerwords) [![Downloads](https://vsmarketplacebadge.apphb.com/downloads-short/MPearon.vsce-show-triggerwords.svg?color=darkred&style=flat)](https://marketplace.visualstudio.com/items?itemName=MPearon.vsce-show-triggerwords&wt.mc_id=MPearon.vsce-show-triggerwords) [![Live Share](https://img.shields.io/badge/Live_Share-enabled-8F80CF.svg?color=darkred&style=flat&logo=visual-studio-code)](https://visualstudio.microsoft.com/services/live-share/?wt.mc_id=MPearon.vsce-show-triggerwords) [![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?color=darkred&style=flat)](http://opensource.org/licenses/MIT)

# Purpose
This extension's purpose is to help emphasize user-specified "trigger words" in certain file types.

# Features

## Highlighting
### Whole-line Highlighting
- If a trigger word is detected, the entire line is highlighted lightly, and the matched word is emphasized heavily.
### Automatic and Manual Triggering
- Files with '.log' extension are automatically highlighted when the file is opened and "live" as the file is modified
- Other files can be manually highlighted by triggering the 'Show Trigger Words' command from the Command Pallette
### Highlighting Details
- "Error", "Err", "Failure", "Fail", "Critical" and "Crit" are highlighted red.
- "Warning" and "Warn" are highlighted yellow.
- "Information" and "Info" are highlighted blue.
- "Success", "Successful" and "Succeeded" are highlighted green.

## Parsing
Not available for initial release.

## Future Features
### Highlighting
- [x] User-specified words/RegEx
- [x] User-specified colors
- [ ] Whole-line highlighting
	- [x] Entire line highlighted light ([25a691f](https://github.com/mpearon/PUB-vsce.show-TriggerWords/commit/25a691fb9d97f55b2917196d0d742de1c41d46ef))
	- [x] Matched word highlighted dark ([25a691f](https://github.com/mpearon/PUB-vsce.show-TriggerWords/commit/25a691fb9d97f55b2917196d0d742de1c41d46ef))
	- [ ] Enable user toggle
- [ ] Optional Gutter markers
	- [ ] Color matched
### Parsing
- [ ] Provide canned RegEx to detect date, level and message.
- [ ] Optional user-supplied RegEx

# Extension Settings
No configurable settings at this time.

# Known Issues
To report issues, use [this link](https://github.com/mpearon/PUB-vsce.show-TriggerWords/issues).
- Comments are not ignored at this time.
- Switching between supported and non-supported languages can prevent highlighting updates.

# Release Notes
Reference [CHANGELOG](https://github.com/mpearon/PUB-vsce.show-TriggerWords/blob/master/CHANGELOG.md) for documentation about changes made to this repository