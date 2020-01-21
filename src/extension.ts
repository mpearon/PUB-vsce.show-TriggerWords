import {
	window,
	commands,
	ExtensionContext,
	Range
} from 'vscode';
export function activate(context: ExtensionContext) {
	console.log('mpearon.vsce.show-triggerwords has been initialized');
	// No editor is open, cancel load
	if (!window.activeTextEditor)
		return;

	let updateDecorations = function (useHash = false) {
		// No active edit is open
		if (!window.activeTextEditor)
			return;
		if((window.activeTextEditor.document.languageId) !== 'log'){
			return
		}
		// Display a StatusBar message
		window.setStatusBarMessage('Show Trigger Words activated');

		// Read in document text
		let editorText = window.activeTextEditor.document.getText();

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
		]

		// Loop through each decoration option
		decorationOptions.forEach(option => {
			console.log('Show-TriggerWords: Processing ' + option.name);
			let optionWordDecoration = window.createTextEditorDecorationType(option.wordDecoration);
			let optionWordRanges = [];
			let optionWord;
			let optionLineDecoration = window.createTextEditorDecorationType(option.lineDecoration);
			let optionLineRanges = [];
			let optionLine;
			let optionLineExpression = new RegExp(('.+(' + option.expression + ').+'),'gim');
			let optionWordExpression = new RegExp(option.expression,'gim');
			if (window.activeTextEditor) {
				while (optionLine = optionLineExpression.exec(editorText)) {
					// Higlight Line
					let lineStart = window.activeTextEditor.document.positionAt(optionLine.index);
					let lineStop = window.activeTextEditor.document.positionAt(optionLine.index + optionLine[0].length);
					let lineRange = (new Range(lineStart, lineStop));
					optionLineRanges.push(lineRange);
					// Highlight Word
					while (optionWord = optionWordExpression.exec(editorText)) {
						let wordStart = window.activeTextEditor.document.positionAt(optionWord.index);
						let wordStop = window.activeTextEditor.document.positionAt(optionWord.index + optionWord[0].length);
						let wordRange = (new Range(wordStart, wordStop));
						optionWordRanges.push(wordRange);
						continue;
						
					};
					continue;
				};
				// Highlight the line
				window.activeTextEditor.setDecorations(optionLineDecoration, optionLineRanges);
				// Highlight the match
				window.activeTextEditor.setDecorations(optionWordDecoration, optionWordRanges);
			};
		});
	};

	// Standard Initialization
	if (window.activeTextEditor) {
		updateDecorations();
	}

	// The open file has changed
	window.onDidChangeActiveTextEditor(editor => {
		if (editor) {
			updateDecorations();
		}
	}, null, context.subscriptions);

	// The user calls the 'Show Trigger Words' command from the command palette
	let disposable = commands.registerCommand('extension.showTriggerWords', () => {
		updateDecorations();
	});
	context.subscriptions.push(disposable);
}
export function deactivate() { }