"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function activate(context) {
    console.log('mpearon.vsce.show-triggerwords has been initialized');
    // No editor is open, cancel load
    if (!vscode_1.window.activeTextEditor)
        return;
    let updateDecorations = function (useHash = false) {
        // No active edit is open
        if (!vscode_1.window.activeTextEditor)
            return;
        // Display a StatusBar message
        vscode_1.window.setStatusBarMessage('Show Trigger Words activated');
        // Read in document text
        let editorText = vscode_1.window.activeTextEditor.document.getText();
        // Set Decoration Options
        var decorationOptions = [
            {
                name: 'error',
                expression: '^(err(or)?|fail(ure)?|crit(ical)?)',
                decoration: {
                    color: 'white',
                    backgroundColor: 'red',
                    fontWeight: 'bold'
                }
            },
            {
                name: 'warning',
                expression: '^warn(ing)?',
                decoration: {
                    color: "black",
                    backgroundColor: "orange",
                    fontWeight: "bold"
                }
            },
            {
                name: 'information',
                expression: '^info(rmation)?',
                decoration: {
                    color: "white",
                    backgroundColor: "blue",
                    fontWeight: "bold"
                }
            },
            {
                name: 'success',
                expression: '^succe(ssful|eded|ss)',
                decoration: {
                    color: "white",
                    backgroundColor: "green",
                    fontWeight: "bold"
                }
            }
        ];
        // Loop through each decoration option
        decorationOptions.forEach(option => {
            console.log('Show-TriggerWords: Processing ' + option.name);
            let optionDecoration = vscode_1.window.createTextEditorDecorationType(option.decoration);
            let optionRanges = [];
            let optionMatch;
            let optionExpression = new RegExp(option.expression, 'gim');
            if (vscode_1.window.activeTextEditor) {
                while (optionMatch = optionExpression.exec(editorText)) {
                    let optionStartIndex = vscode_1.window.activeTextEditor.document.positionAt(optionMatch.index);
                    let optionEndIndex = vscode_1.window.activeTextEditor.document.positionAt(optionMatch.index + optionMatch[0].length);
                    let optionRange = (new vscode_1.Range(optionStartIndex, optionEndIndex));
                    optionRanges.push(optionRange);
                    continue;
                }
                ;
                vscode_1.window.activeTextEditor.setDecorations(optionDecoration, optionRanges);
            }
            ;
        });
    };
    // Standard Initialization
    if (vscode_1.window.activeTextEditor) {
        updateDecorations();
    }
    // The open file has changed
    vscode_1.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            updateDecorations();
        }
    }, null, context.subscriptions);
    // The user calls the 'Show Trigger Words' command from the command palette
    let disposable = vscode_1.commands.registerCommand('extension.showTriggerWords', () => {
        updateDecorations();
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map