import {
	window,
	commands,
	ExtensionContext,
	Range,
	workspace
} from 'vscode';

export function getColorSettings(){
	// Define the color options - will be moved to a separate file and be accessible via contributions 
	const color1Word = { backgroundColor: workspace.getConfiguration('vsce-show-triggerwords').highlighting.match1.matchColor, color: 'black', fontWeight: 'bolder' };
	const color1Line = { backgroundColor: workspace.getConfiguration('vsce-show-triggerwords').highlighting.match1.matchColor+'30', isWholeLine: true };
	const color2Word = { backgroundColor: workspace.getConfiguration('vsce-show-triggerwords').highlighting.match2.matchColor, color: 'black', fontWeight: 'bolder' };
	const color2Line = { backgroundColor: workspace.getConfiguration('vsce-show-triggerwords').highlighting.match2.matchColor+'30', isWholeLine: true };
	const color3Word = { backgroundColor: workspace.getConfiguration('vsce-show-triggerwords').highlighting.match3.matchColor, color: 'black', fontWeight: 'bolder' };
	const color3Line = { backgroundColor: workspace.getConfiguration('vsce-show-triggerwords').highlighting.match3.matchColor+'30', isWholeLine: true };
	const color4Word = { backgroundColor: workspace.getConfiguration('vsce-show-triggerwords').highlighting.match4.matchColor, color: 'black', fontWeight: 'bolder' };
	const color4Line = { backgroundColor: workspace.getConfiguration('vsce-show-triggerwords').highlighting.match4.matchColor+'30', isWholeLine: true };

	// Build the decorationTypes
	const color1LineType = window.createTextEditorDecorationType(color1Line);
	const color1WordType = window.createTextEditorDecorationType(color1Word);
	
	const color2LineType = window.createTextEditorDecorationType(color2Line);
	const color2WordType = window.createTextEditorDecorationType(color2Word);

	const color3LineType = window.createTextEditorDecorationType(color3Line);
	const color3WordType = window.createTextEditorDecorationType(color3Word);
	
	const color4LineType = window.createTextEditorDecorationType(color4Line);
	const color4WordType = window.createTextEditorDecorationType(color4Word);

	return {
		color1LineType,
		color2LineType,
		color3LineType,
		color4LineType,
		color1WordType,
		color2WordType,
		color3WordType,
		color4WordType
	}
};

export function activate(context: ExtensionContext) {
	let colors = getColorSettings()
	console.log('mpearon.vsce.show-triggerwords has been initialized');
	// No editor is open, cancel load
	if (!window.activeTextEditor)
		return;

	function clearDecorations(){
		colors.color1LineType.dispose()
		colors.color1WordType.dispose()
		colors.color2LineType.dispose()
		colors.color2WordType.dispose()
		colors.color3LineType.dispose()
		colors.color3WordType.dispose()
		colors.color4LineType.dispose()
		colors.color4WordType.dispose()
	}
	// Decoration update function
	let updateDecorations = function (bypassLanguageCheck = false, updateColors = false) {
		if( bypassLanguageCheck == false ){
			if((window.activeTextEditor!.document.languageId) !== 'log'){
				return
			}
		}

		if(updateColors === true){
			clearDecorations();
			colors = getColorSettings();
		}

		// Read in document text
		let editorText = window.activeTextEditor!.document.getText();

		// Define object per expression - will be moved to a separate file and be accessible via contributions
		var decorationOptions = [
			{
				name: 'match1',
				expression: workspace.getConfiguration('vsce-show-triggerwords').highlighting.match1.matchExpression,
				decoration: 'color1'
			},
			{
				name: 'match2',
				expression: workspace.getConfiguration('vsce-show-triggerwords').highlighting.match2.matchExpression,
				decoration: 'color2'
			},
			{
				name: 'match3',
				expression: workspace.getConfiguration('vsce-show-triggerwords').highlighting.match3.matchExpression,
				decoration: 'color3'
			},
			{
				name: 'match4',
				expression: workspace.getConfiguration('vsce-show-triggerwords').highlighting.match4.matchExpression,
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
					if(workspace.getConfiguration('vsce-show-triggerwords').highlighting.match1.enabled === true){
						window.activeTextEditor!.setDecorations(colors.color1LineType, optionLineRanges);
						window.activeTextEditor!.setDecorations(colors.color1WordType, optionWordRanges);
					};
				};
				case 'color2'	:	{
					if(workspace.getConfiguration('vsce-show-triggerwords').highlighting.match2.enabled === true){
						window.activeTextEditor!.setDecorations(colors.color2LineType, optionLineRanges);
						window.activeTextEditor!.setDecorations(colors.color2WordType, optionWordRanges);
					};
				};
				case 'color3'	:	{
					if(workspace.getConfiguration('vsce-show-triggerwords').highlighting.match3.enabled === true){
						window.activeTextEditor!.setDecorations(colors.color3LineType, optionLineRanges);
						window.activeTextEditor!.setDecorations(colors.color3WordType, optionWordRanges);
					};
				};
				case 'color4'	:	{
					if(workspace.getConfiguration('vsce-show-triggerwords').highlighting.match4.enabled === true){
						window.activeTextEditor!.setDecorations(colors.color4LineType, optionLineRanges);
						window.activeTextEditor!.setDecorations(colors.color4WordType, optionWordRanges);
					};
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
        triggerUpdateDecorations();
    }, null, context.subscriptions);
	// Content of document changed
    workspace.onDidChangeTextDocument(function (event) {
        let activeEditor = window.activeTextEditor;
        if (activeEditor && event.document === activeEditor.document) {
            triggerUpdateDecorations();
        }
	}, null, context.subscriptions);
	workspace.onDidChangeConfiguration(function(){
		console.debug('Show-TriggerWords: Configuration Update Detected')
		updateDecorations(false,true)
	});
  	// The user calls the 'Show Trigger Words' command from the command palette
	let disposable = commands.registerCommand('extension.showTriggerWords', () => {
		updateDecorations(true);
	});
	context.subscriptions.push(disposable);
}
export function deactivate() { }