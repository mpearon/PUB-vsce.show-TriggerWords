# Purpose
This extention's purpose is to help emphasize user-specified "trigger words" in certain file types.

# Features

## Highlighting
- "Error", "Err", "Failure", "Fail", "Critical" and "Crit" are highlighted red.
- "Warning" and "Warn" are higlighted orage.
- "Information" and "Info" are highlighted blue.
- "Success", "Successful" and "Succeeded" are higlighted green.

## Parsing
Not available for initial release.

## Future Features
- Highlighting
	- [ ] User-specified words/RegEx
	- [ ] User-specified colors
	- [ ] Whole-line highlighting
		- [x] Entire line highlighted light [25a691f](https://github.com/mpearon/PUB-vsce.show-TriggerWords/commit/25a691fb9d97f55b2917196d0d742de1c41d46ef)
		- [x] Matched word highlighted dark [25a691f](https://github.com/mpearon/PUB-vsce.show-TriggerWords/commit/25a691fb9d97f55b2917196d0d742de1c41d46ef)
		- [ ] Enable user toggle
	- [ ] Optional Gutter markers
		- [ ] Color matched
- Parsing
	- [ ] Provide canned RegEx to detect date, level and message.
	- [ ] Optional user-supplied RegEx

# Extention Settings
No configurable settings at this time.

# Known Issues
To report issues, use [this link](https://github.com/mpearon/PUB-vsce.show-TriggerWords/issues).
- Comments are not ignored at this time.
- Only engages when files with '.log' extension are opened.

# Release Notes
Reference [CHANGELOG](https://github.com/mpearon/PUB-vsce.show-TriggerWords/blob/master/CHANGELOG.md) for documentation about changes made to this repository