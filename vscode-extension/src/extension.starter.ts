import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel("$${name_pretty}");
  outputChannel.appendLine("$${name_pretty} extension activated");

  // Example command registration
  const helloCommand = vscode.commands.registerCommand(
    "$${name_kebab}.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello from $${name_pretty}!");
    }
  );

  context.subscriptions.push(outputChannel, helloCommand);
}

export function deactivate() {}
