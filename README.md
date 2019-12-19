# FileMaker VSCode

Filemaker syntax and snippets for Visual Studio Code.
<https://github.com/jwillinghalpern/filemaker-vscode-bundle>

## Features

Snippets, autocompletion, syntax highlighting, and automatic creation of brackets/parentheses for FileMaker calculations.

## Installation

The best way to install is via the VSCode extension marketplace. Search `Filemaker VSCode` in the extensions tab of vscode and press "install".

But if you want to install manually from this repo, do the following:

1. Copy this whole unzipped folder (filemaker-vscode-bundle-master) into the `<user home folder>/.vscode/extensions` folder.
    1. An easy way to find this extensions folder is by opening the  Command Palette (⇧⌘P) in VSCode, and searching for "Extensions: Open Extensions Folder".
    2. If on Mac and you cannot see the `.vscode` folder in Finder, press `Command + Shift + Period` to show hidden folders. You can press this again to hide.
2. Restart VSCode or run `Developer: Reload Window` from the Command Palette.
3. Create a new document in VSCode and select `FileMaker` from the language selector at the bottom right.
    1. Saving your file with a `.fmfn`, or `.calc` extension will automatically change the language to FileMaker.

For more info, read vsc-extension-quickstart.md

## Attribution

The syntax and original snippets were ported from Donovan Chandler's textmate bundle, which was itself forked from Matt Petrowsky's repo. This bundle contains modifications to stay current with FileMaker's newest releases.

- DC: <https://github.com/DonovanChan/Filemaker.tmbundle>
- MP: <https://github.com/petrowsky/filemaker.tmbundle>
- Awesome icon by Carson Lind <http://eagleoptimizations.com/>

## Notes

- This extension does _not_ validate FileMaker calculations. I've learned recently that FileMaker has the most insane parsing rules ever.
- Some Windows users have reported having to reboot their computer before the extension works, but only do this if needed.
