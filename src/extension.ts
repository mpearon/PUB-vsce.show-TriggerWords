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
		// Display a StatusBar message
		window.setStatusBarMessage('Show Trigger Words activated');

		// Read in document text
		let editorText = window.activeTextEditor.document.getText();

		// Set Decoration Options
		var decorationOptions = [
			{
				name: 'error',
				expression: '(err(or)?|fail(ure)?|crit(ical)?)',
				decoration: {
					color: 'white',
					backgroundColor: 'red',
					fontWeight: 'bold'
				}
			},
			{
				name: 'warning',
				expression: 'warn(ing)?',
				decoration: {
					color: "black",
					backgroundColor: "orange",
					fontWeight: "bold"
				}
			},
			{
				name: 'information',
				expression: 'info(rmation)?',
				decoration: {
					color: "white",
					backgroundColor: "blue",
					fontWeight: "bold"
				}
			},
			{
				name: 'success',
				expression: 'succe(ssful|eded|ss)',
				decoration: {
					color: "white",
					backgroundColor: "green",
					fontWeight: "bold"
				}
			}
		]

		// Loop through each decoration option
		decorationOptions.forEach(option => {
			console.log('Show-TriggerWords: Processing ' + option.name);
			let optionDecoration = window.createTextEditorDecorationType(option.decoration);
			let optionRanges = [];
			let optionMatch;
			let optionExpression = new RegExp(option.expression, 'gim');
			if (window.activeTextEditor) {
				while (optionMatch = optionExpression.exec(editorText)) {
					let optionStartIndex = window.activeTextEditor.document.positionAt(optionMatch.index);
					let optionEndIndex = window.activeTextEditor.document.positionAt(optionMatch.index + optionMatch[0].length);
					let optionRange = (new Range(optionStartIndex, optionEndIndex));
					optionRanges.push(optionRange);
					continue;
				};
				window.activeTextEditor.setDecorations(optionDecoration, optionRanges);
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