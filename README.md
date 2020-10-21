# FileMaker VSCode

Filemaker syntax and snippets for Visual Studio Code.
<https://github.com/jwillinghalpern/filemaker-vscode-bundle>

## Features

Snippets, autocompletion, and syntax highlighting for FileMaker calculations.

## Installation

The best way to install is via the VSCode extension marketplace. Search `Filemaker VSCode` in the extensions tab within VSCode and click "install".

But if you want to install manually from this repo, see [Alternative Installation](#alternative-installation).

## Attribution

Original syntax and snippets were ported from [Donovan Chandler's textmate bundle](https://github.com/DonovanChan/Filemaker.tmbundle), which was itself forked from [Matt Petrowsky's repo](https://github.com/petrowsky/filemaker.tmbundle).

[Carson Lind](https://eagleoptimizations.com/) created the icon artwork.

## Contributing

### Prerequisites

1. Make sure you have NodeJS and npm installed: <https://nodejs.org/en/>
2. Install vsce globally: `npm install -g vsce`
3. Make sure git is installed: <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>
   1. MacOS hint: just run this in terminal and you'll be prompted to install: `git --version`

### Dev/Test

1. Fork the GitHub repo.
2. Clone your fork to your local machine:
   1. In terminal, `cd` to the preferred directory.
   2. Clone: `git clone <the URL from the "Code" button on github>`
3. Open the project folder in VSCode to edit.
4. When ready to test:
   1. Open the integrated terminal in VSCode and run `vsce package` to create a package with a name like "filemaker-vscode-x.x.x.vsix"
   2. Install your test package like `code --install-extension filemaker-vscode-x.x.x.vsix`
   3. shift-command-p to open the command pallete and search for/run "Developer: Reload Window(s)"
   4. Now test your extension in VSCode. Rinse, repeat until it works how you want.

### Submit changes

1. When ready, commit your changes and push them to your own fork on github.
    1. `git add .`
    2. `git commit -m "message describing your change"`
    3. `git push`
2. Submit a pull request to my repo so I can try them out and pull them in!

## Misc

### Notes

- This extension does _not_ validate FileMaker calculations. I've learned recently that FileMaker has the most insane parsing rules ever.
- Some Windows users have reported having to reboot their computer before the extension works, but only do this if needed.

### Alternative Installation

(not recommended)

1. Copy this whole unzipped folder (filemaker-vscode-bundle-master) into the `<user home folder>/.vscode/extensions` folder.
    1. An easy way to find this extensions folder is by opening the  Command Palette (⇧⌘P) in VSCode, and searching for "Extensions: Open Extensions Folder".
    2. If on Mac and you cannot see the `.vscode` folder in Finder, press `Command + Shift + Period` to show hidden folders. You can press this again to hide.
2. Restart VSCode or run `Developer: Reload Window` from the Command Palette.
3. Create a new document in VSCode and select `FileMaker` from the language selector at the bottom right.
    1. Saving your file with a `.fmfn`, or `.calc` extension will automatically change the language to FileMaker.

For more info, read vsc-extension-quickstart.md