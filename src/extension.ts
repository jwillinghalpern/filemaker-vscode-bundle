import * as vscode from 'vscode';
import { jsonToJsonSetElement as jsonToFm } from 'fm-json-to-jsonsetelement';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The first parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'functions.jsonToJsonSetElement',
    () => {
      // get selected text
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage('No editor is active');
        return;
      }
      const text = editor.document.getText(editor.selection);
      if (!text) {
        vscode.window.showInformationMessage('No text selected');
        return;
      }
      try {
        // overwrite selected text with jsonSetElement
        const jsonSetElement = jsonToFm(text);
        editor.edit((editBuilder) => {
          editBuilder.replace(editor.selection, jsonSetElement);
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          vscode.window.showErrorMessage(error.message);
        } else {
          vscode.window.showErrorMessage(
            `Error occurred: ${String(error)}`,
            String(error)
          );
        }
      }
    }
  );
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
