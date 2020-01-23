import {
	window,
	commands,
	ExtensionContext,
	Range,
	workspace
} from 'vscode';

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
const color1WordType = window.createTextEditorDecorationType(color1Word);
const color1LineType = window.createTextEditorDecorationType(color1Line);
const color2WordType = window.createTextEditorDecorationType(color2Word);
const color2LineType = window.createTextEditorDecorationType(color2Line);
const color3WordType = window.createTextEditorDecorationType(color3Word);
const color3LineType = window.createTextEditorDecorationType(color3Line);
const color4WordType = window.createTextEditorDecorationType(color4Word);
const color4LineType = window.createTextEditorDecorationType(color4Line);

export function activate(context: ExtensionContext) {
	console.log('mpearon.vsce.show-triggerwords has been initialized');
	// No editor is open, cancel load
	if (!window.activeTextEditor)
		return;
	// Decoration update function
	let updateDecorations = function (bypassLanguageCheck = false) {
		if( bypassLanguageCheck == false ){
			if((window.activeTextEditor!.document.languageId) !== 'log'){
				return
			}
		}		
		// Read in document text
		let editorText = window.activeTextEditor!.document.getText();

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
		]

		// Loop through each decoration option
		decorationOptions.forEach(option => {
			console.debug('Show-TriggerWords: Processing ' + option.name);

			// Update Highlight Line Range
			let optionLineRanges = [];
			let optionLine;
			let optionLineExpression = new RegExp(('(.+)?(' + option.expression + ')(.+)?'),'gim');
			while (optionLine = optionLineExpression.exec(editorText)) {
				let lineStart = window.activeTextEditor!.document.positionAt(optionLine.index);
				let lineStop = window.activeTextEditor!.document.positionAt(optionLine.index + optionLine[0].length);
				let lineRange = (new Range(lineStart, lineStop));
				optionLineRanges.push(lineRange);
				continue;
			};

			// Update Highlight Word Range
			let optionWordRanges = [];
			let optionWord;
			let optionWordExpression = new RegExp(option.expression,'gim');
			while (optionWord = optionWordExpression.exec(editorText)) {
				let wordStart = window.activeTextEditor!.document.positionAt(optionWord.index);
				let wordStop = window.activeTextEditor!.document.positionAt(optionWord.index + optionWord[0].length);
				let wordRange = (new Range(wordStart, wordStop));
				optionWordRanges.push(wordRange);
				continue;
			};

			// Apply the correct decorations based on the option's decoration value
			switch(option.decoration){
				case 'color1'	:	{
					window.activeTextEditor!.setDecorations(color1LineType, optionLineRanges);
					window.activeTextEditor!.setDecorations(color1WordType, optionWordRanges);
				};
				case 'color2'	:	{
					window.activeTextEditor!.setDecorations(color2LineType, optionLineRanges);
					window.activeTextEditor!.setDecorations(color2WordType, optionWordRanges);
				};
				case 'color3'	:	{
					window.activeTextEditor!.setDecorations(color3LineType, optionLineRanges);
					window.activeTextEditor!.setDecorations(color3WordType, optionWordRanges);
				};
				case 'color4'	:	{
					window.activeTextEditor!.setDecorations(color4LineType, optionLineRanges);
					window.activeTextEditor!.setDecorations(color4WordType, optionWordRanges);
				};
			}
		});
	};
	// Prevents the updateDecorations function from triggering too often
	var timeout: NodeJS.Timeout;
    function triggerUpdateDecorations() {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            updateDecorations();
        }, 500);
	}
    if (window.activeTextEditor) {
        triggerUpdateDecorations();
    }
	// The user switched to another document
    window.onDidChangeVisibleTextEditors(function (editor) {
        updateDecorations();
    }, null, context.subscriptions);
	// Content of document changed
    workspace.onDidChangeTextDocument(function (event) {
        let activeEditor = window.activeTextEditor;
        if (activeEditor && event.document === activeEditor.document) {
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);
  	// The user calls the 'Show Trigger Words' command from the command palette
	let disposable = commands.registerCommand('extension.showTriggerWords', () => {
		updateDecorations(true);
	});
	context.subscriptions.push(disposable);
}
export function deactivate() { }