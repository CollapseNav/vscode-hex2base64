// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.hex2base64', () => {
		let textEditor = vscode.window.activeTextEditor!;
		let sels = textEditor.selections;
		textEditor.edit(builder => {
			for (let i = 0; i < sels.length; i++) {
				let content = textEditor.document.getText(new vscode.Range(sels[i].start, sels[i].end));
				content = content.split('\n').map(item => Buffer.from(item, 'hex').toString('base64')).join('\n');
				builder.replace(sels[i], content);
			}
		});
	});

	let disposable2 = vscode.commands.registerCommand('extension.base642hex', () => {
		let textEditor = vscode.window.activeTextEditor!;
		let sels = textEditor.selections;
		textEditor.edit(builder => {
			for (let i = 0; i < sels.length; i++) {
				let content = textEditor.document.getText(new vscode.Range(sels[i].start, sels[i].end));
				content = content.split('\n').map(item => Buffer.from(item, 'base64').toString('hex').toUpperCase()).join('\n');
				builder.replace(sels[i], content);
			}
		});
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() { }
