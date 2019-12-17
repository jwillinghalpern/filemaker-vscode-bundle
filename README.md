# filemaker-vscode-bundle README

Filemaker syntax and snippets for Visual Studio Code

## Features

Autocomplete with tabstops + syntax highlighting and auto-creation of brackets/parentheses etc...

## Installation

1. Copy this whole unzipped folder (filemaker-vscode-bundle-master) into the `<user home folder>/.vscode/extensions` folder.
    1. An easy way to find the extensions folder is by opening the  Command Palette (⇧⌘P) in VSCode and searching for "Extensions: Open Extensions Folder".
    2. If on Mac and you cannot see the .vscode folder in your Finder, press `Command + Shift + Period` to show hidden folders. You can press this again to hide them.
2. Restart VSCode.
    1. (Some Windows users have reported needing to reboot their computer before the extension works.)
3. Create a new document in VSCode and select `FileMaker` from the language selector at the bottom right. You can also access the language selector by pressing ⌘K then M in short succession.
    1. Another way to enable the extensions is to save your file with a `.fmfn`, or `.calc` file extension.

You should now be good to go!

For more info, read vsc-extension-quickstart.md

## Requirements

none

## Attribution

Ported from Donovan Chandler's textmate bundle, which was itself forked from Matt Petrowsky's repo. This bundle contains modifications to stay current with FileMaker's newest releases.

- DC: <https://github.com/DonovanChan/Filemaker.tmbundle>
- MP: <https://github.com/petrowsky/filemaker.tmbundle>