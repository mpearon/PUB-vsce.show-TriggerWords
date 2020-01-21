"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function activate(context) {
    console.log('mpearon.vsce.show-triggerwords has been initialized');
    // No editor is open, cancel load
    if (!vscode_1.window.activeTextEditor)
        return;
    let updateDecorations = function (bypassLanguageCheck = false) {
        // No active edit is open
        if (!vscode_1.window.activeTextEditor)
            return;
        if (bypassLanguageCheck == false) {
            if ((vscode_1.window.activeTextEditor.document.languageId) !== 'log') {
                return;
            }
        }
        // Read in document text
        let editorText = vscode_1.window.activeTextEditor.document.getText();
        // Set Decoration Options
        var decorationOptions = [
            {
                name: 'error',
                expression: 'err(or)?|fail(ure)?|crit(ical)?',
                lineDecoration: {
                    backgroundColor: '#FF000030'
                },
                wordDecoration: {
                    color: 'black',
                    fontWeight: 'bolder',
                    backgroundColor: '#FF0000'
                }
            },
            {
                name: 'warning',
                expression: 'warn(ing)?',
                lineDecoration: {
                    backgroundColor: '#FFFF0030'
                },
                wordDecoration: {
                    color: 'black',
                    fontWeight: 'bolder',
                    backgroundColor: '#FFFF00'
                }
            },
            {
                name: 'information',
                expression: 'info(rmation)?',
                lineDecoration: {
                    backgroundColor: '#007FFF30'
                },
                wordDecoration: {
                    color: 'black',
                    fontWeight: 'bolder',
                    backgroundColor: '#007FFF'
                }
            },
            {
                name: 'success',
                expression: 'succe(ssful|eded|ss)',
                lineDecoration: {
                    backgroundColor: '#00ff0030'
                },
                wordDecoration: {
                    color: 'black',
                    fontWeight: "bolder",
                    backgroundColor: '#00ff00'
                }
            }
        ];
        // Loop through each decoration option
        decorationOptions.forEach(option => {
            console.log('Show-TriggerWords: Processing ' + option.name);
            let optionWordDecoration = vscode_1.window.createTextEditorDecorationType(option.wordDecoration);
            let optionWordRanges = [];
            let optionWord;
            let optionLineDecoration = vscode_1.window.createTextEditorDecorationType(option.lineDecoration);
            let optionLineRanges = [];
            let optionLine;
            let optionLineExpression = new RegExp(('.+(' + option.expression + ').+'), 'gim');
            let optionWordExpression = new RegExp(option.expression, 'gim');
            if (vscode_1.window.activeTextEditor) {
                while (optionLine = optionLineExpression.exec(editorText)) {
                    // Higlight Line
                    let lineStart = vscode_1.window.activeTextEditor.document.positionAt(optionLine.index);
                    let lineStop = vscode_1.window.activeTextEditor.document.positionAt(optionLine.index + optionLine[0].length);
                    let lineRange = (new vscode_1.Range(lineStart, lineStop));
                    optionLineRanges.push(lineRange);
                    // Highlight Word
                    while (optionWord = optionWordExpression.exec(editorText)) {
                        let wordStart = vscode_1.window.activeTextEditor.document.positionAt(optionWord.index);
                        let wordStop = vscode_1.window.activeTextEditor.document.positionAt(optionWord.index + optionWord[0].length);
                        let wordRange = (new vscode_1.Range(wordStart, wordStop));
                        optionWordRanges.push(wordRange);
                        continue;
                    }
                    ;
                    continue;
                }
                ;
                // Highlight the line
                vscode_1.window.activeTextEditor.setDecorations(optionLineDecoration, optionLineRanges);
                // Highlight the match
                vscode_1.window.activeTextEditor.setDecorations(optionWordDecoration, optionWordRanges);
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
        updateDecorations(true);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map