"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
// Define the color options - will be moved to a separate file and be accessible via contributions 
const color1Word = { /* red */ backgroundColor: '#ff0000', color: 'black', fontWeight: 'bolder' };
const color1Line = { /* red */ backgroundColor: '#ff000030', isWholeLine: true };
const color2Word = { /* blue */ backgroundColor: '#007fff', color: 'black', fontWeight: 'bolder' };
const color2Line = { /* blue */ backgroundColor: '#007fff30', isWholeLine: true };
const color3Word = { /* yellow */ backgroundColor: '#ffff00', color: 'black', fontWeight: 'bolder' };
const color3Line = { /* yellow */ backgroundColor: '#ffff0030', isWholeLine: true };
const color4Word = { /* green */ backgroundColor: '#00ff00', color: 'black', fontWeight: 'bolder' };
const color4Line = { /* green */ backgroundColor: '#00ff0030', isWholeLine: true };
// Build the decorationTypes
const color1WordType = vscode_1.window.createTextEditorDecorationType(color1Word);
const color1LineType = vscode_1.window.createTextEditorDecorationType(color1Line);
const color2WordType = vscode_1.window.createTextEditorDecorationType(color2Word);
const color2LineType = vscode_1.window.createTextEditorDecorationType(color2Line);
const color3WordType = vscode_1.window.createTextEditorDecorationType(color3Word);
const color3LineType = vscode_1.window.createTextEditorDecorationType(color3Line);
const color4WordType = vscode_1.window.createTextEditorDecorationType(color4Word);
const color4LineType = vscode_1.window.createTextEditorDecorationType(color4Line);
function activate(context) {
    console.log('mpearon.vsce.show-triggerwords has been initialized');
    // No editor is open, cancel load
    if (!vscode_1.window.activeTextEditor)
        return;
    // Decoration update function
    let updateDecorations = function (bypassLanguageCheck = false) {
        if (bypassLanguageCheck == false) {
            if ((vscode_1.window.activeTextEditor.document.languageId) !== 'log') {
                return;
            }
        }
        // Read in document text
        let editorText = vscode_1.window.activeTextEditor.document.getText();
        // Define object per expression - will be moved to a separate file and be accessible via contributions
        var decorationOptions = [
            {
                name: 'error',
                expression: 'err(or)?|fail(ure)?|crit(ical)?',
                decoration: 'color1'
            },
            {
                name: 'information',
                expression: 'info(rmation)?',
                decoration: 'color2'
            },
            {
                name: 'warning',
                expression: 'warn(ing)?',
                decoration: 'color3'
            },
            {
                name: 'success',
                expression: 'succe(ssful|eded|ss)',
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
                        vscode_1.window.activeTextEditor.setDecorations(color1LineType, optionLineRanges);
                        vscode_1.window.activeTextEditor.setDecorations(color1WordType, optionWordRanges);
                    }
                    ;
                case 'color2':
                    {
                        vscode_1.window.activeTextEditor.setDecorations(color2LineType, optionLineRanges);
                        vscode_1.window.activeTextEditor.setDecorations(color2WordType, optionWordRanges);
                    }
                    ;
                case 'color3':
                    {
                        vscode_1.window.activeTextEditor.setDecorations(color3LineType, optionLineRanges);
                        vscode_1.window.activeTextEditor.setDecorations(color3WordType, optionWordRanges);
                    }
                    ;
                case 'color4':
                    {
                        vscode_1.window.activeTextEditor.setDecorations(color4LineType, optionLineRanges);
                        vscode_1.window.activeTextEditor.setDecorations(color4WordType, optionWordRanges);
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
        updateDecorations();
    }, null, context.subscriptions);
    // Content of document changed
    vscode_1.workspace.onDidChangeTextDocument(function (event) {
        let activeEditor = vscode_1.window.activeTextEditor;
        if (activeEditor && event.document === activeEditor.document) {
            triggerUpdateDecorations();
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