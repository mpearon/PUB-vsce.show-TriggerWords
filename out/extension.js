"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function getColorSettings() {
    // Define the color options - will be moved to a separate file and be accessible via contributions 
    const color1Word = { backgroundColor: vscode_1.workspace.getConfiguration('vsce-show-triggerwords').highlighting.match1.matchColor, color: 'black', fontWeight: 'bolder' };
    const color1Line = { backgroundColor: vscode_1.workspace.getConfiguration('vsce-show-triggerwords').highlighting.match1.matchColor + '30', isWholeLine: true };
    const color2Word = { backgroundColor: vscode_1.workspace.getConfiguration('vsce-show-triggerwords').highlighting.match2.matchColor, color: 'black', fontWeight: 'bolder' };
    const color2Line = { backgroundColor: vscode_1.workspace.getConfiguration('vsce-show-triggerwords').highlighting.match2.matchColor + '30', isWholeLine: true };
    const color3Word = { backgroundColor: vscode_1.workspace.getConfiguration('vsce-show-triggerwords').highlighting.match3.matchColor, color: 'black', fontWeight: 'bolder' };
    const color3Line = { backgroundColor: vscode_1.workspace.getConfiguration('vsce-show-triggerwords').highlighting.match3.matchColor + '30', isWholeLine: true };
    const color4Word = { backgroundColor: vscode_1.workspace.getConfiguration('vsce-show-triggerwords').highlighting.match4.matchColor, color: 'black', fontWeight: 'bolder' };
    const color4Line = { backgroundColor: vscode_1.workspace.getConfiguration('vsce-show-triggerwords').highlighting.match4.matchColor + '30', isWholeLine: true };
    // Build the decorationTypes
    const color1LineType = vscode_1.window.createTextEditorDecorationType(color1Line);
    const color1WordType = vscode_1.window.createTextEditorDecorationType(color1Word);
    const color2LineType = vscode_1.window.createTextEditorDecorationType(color2Line);
    const color2WordType = vscode_1.window.createTextEditorDecorationType(color2Word);
    const color3LineType = vscode_1.window.createTextEditorDecorationType(color3Line);
    const color3WordType = vscode_1.window.createTextEditorDecorationType(color3Word);
    const color4LineType = vscode_1.window.createTextEditorDecorationType(color4Line);
    const color4WordType = vscode_1.window.createTextEditorDecorationType(color4Word);
    return {
        color1LineType,
        color2LineType,
        color3LineType,
        color4LineType,
        color1WordType,
        color2WordType,
        color3WordType,
        color4WordType
    };
}
exports.getColorSettings = getColorSettings;
;
function activate(context) {
    let colors = getColorSettings();
    console.log('mpearon.vsce.show-triggerwords has been initialized');
    // No editor is open, cancel load
    if (!vscode_1.window.activeTextEditor)
        return;
    function clearDecorations() {
        colors.color1LineType.dispose();
        colors.color1WordType.dispose();
        colors.color2LineType.dispose();
        colors.color2WordType.dispose();
        colors.color3LineType.dispose();
        colors.color3WordType.dispose();
        colors.color4LineType.dispose();
        colors.color4WordType.dispose();
    }
    // Decoration update function
    let updateDecorations = function (bypassLanguageCheck = false, updateColors = false) {
        if (bypassLanguageCheck == false) {
            if ((vscode_1.window.activeTextEditor.document.languageId) !== 'log') {
                return;
            }
        }
        if (updateColors === true) {
            clearDecorations();
            colors = getColorSettings();
        }
        // Read in document text
        let editorText = vscode_1.window.activeTextEditor.document.getText();
        // Define object per expression - will be moved to a separate file and be accessible via contributions
        var decorationOptions = [
            {
                name: 'match1',
                expression: vscode_1.workspace.getConfiguration('vsce-show-triggerwords').highlighting.match1.matchExpression,
                decoration: 'color1'
            },
            {
                name: 'match2',
                expression: vscode_1.workspace.getConfiguration('vsce-show-triggerwords').highlighting.match2.matchExpression,
                decoration: 'color2'
            },
            {
                name: 'match3',
                expression: vscode_1.workspace.getConfiguration('vsce-show-triggerwords').highlighting.match3.matchExpression,
                decoration: 'color3'
            },
            {
                name: 'match4',
                expression: vscode_1.workspace.getConfiguration('vsce-show-triggerwords').highlighting.match4.matchExpression,
                decoration: 'color4'
            }
        ];
        // Loop through each decoration option
        decorationOptions.forEach(option => {
            console.debug('Show-TriggerWords: Processing ' + option.name);
            // Update Highlight Line Range
            let optionLineRanges = [];
            let optionLine;
            let optionLineExpression = new RegExp(('(.+)?(' + option.expression + ')(.+)?'), 'gim');
            while (optionLine = optionLineExpression.exec(editorText)) {
                let lineStart = vscode_1.window.activeTextEditor.document.positionAt(optionLine.index);
                let lineStop = vscode_1.window.activeTextEditor.document.positionAt(optionLine.index + optionLine[0].length);
                let lineRange = (new vscode_1.Range(lineStart, lineStop));
                optionLineRanges.push(lineRange);
                continue;
            }
            ;
            // Update Highlight Word Range
            let optionWordRanges = [];
            let optionWord;
            let optionWordExpression = new RegExp(option.expression, 'gim');
            while (optionWord = optionWordExpression.exec(editorText)) {
                let wordStart = vscode_1.window.activeTextEditor.document.positionAt(optionWord.index);
                let wordStop = vscode_1.window.activeTextEditor.document.positionAt(optionWord.index + optionWord[0].length);
                let wordRange = (new vscode_1.Range(wordStart, wordStop));
                optionWordRanges.push(wordRange);
                continue;
            }
            ;
            // Apply the correct decorations based on the option's decoration value
            switch (option.decoration) {
                case 'color1':
                    {
                        if (vscode_1.workspace.getConfiguration('vsce-show-triggerwords').highlighting.match1.enabled === true) {
                            vscode_1.window.activeTextEditor.setDecorations(colors.color1LineType, optionLineRanges);
                            vscode_1.window.activeTextEditor.setDecorations(colors.color1WordType, optionWordRanges);
                        }
                        ;
                    }
                    ;
                case 'color2':
                    {
                        if (vscode_1.workspace.getConfiguration('vsce-show-triggerwords').highlighting.match2.enabled === true) {
                            vscode_1.window.activeTextEditor.setDecorations(colors.color2LineType, optionLineRanges);
                            vscode_1.window.activeTextEditor.setDecorations(colors.color2WordType, optionWordRanges);
                        }
                        ;
                    }
                    ;
                case 'color3':
                    {
                        if (vscode_1.workspace.getConfiguration('vsce-show-triggerwords').highlighting.match3.enabled === true) {
                            vscode_1.window.activeTextEditor.setDecorations(colors.color3LineType, optionLineRanges);
                            vscode_1.window.activeTextEditor.setDecorations(colors.color3WordType, optionWordRanges);
                        }
                        ;
                    }
                    ;
                case 'color4':
                    {
                        if (vscode_1.workspace.getConfiguration('vsce-show-triggerwords').highlighting.match4.enabled === true) {
                            vscode_1.window.activeTextEditor.setDecorations(colors.color4LineType, optionLineRanges);
                            vscode_1.window.activeTextEditor.setDecorations(colors.color4WordType, optionWordRanges);
                        }
                        ;
                    }
                    ;
            }
        });
    };
    // Prevents the updateDecorations function from triggering too often
    var timeout;
    function triggerUpdateDecorations() {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            updateDecorations();
        }, 500);
    }
    if (vscode_1.window.activeTextEditor) {
        triggerUpdateDecorations();
    }
    // The user switched to another document
    vscode_1.window.onDidChangeVisibleTextEditors(function (editor) {
        triggerUpdateDecorations();
    }, null, context.subscriptions);
    // Content of document changed
    vscode_1.workspace.onDidChangeTextDocument(function (event) {
        let activeEditor = vscode_1.window.activeTextEditor;
        if (activeEditor && event.document === activeEditor.document) {
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);
    vscode_1.workspace.onDidChangeConfiguration(function () {
        console.debug('Show-TriggerWords: Configuration Update Detected');
        updateDecorations(false, true);
    });
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