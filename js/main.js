var LiteBrite = {
	init: function(el, startingArray) {
		this.theBoard = [];
		this.startingBoard = startingArray || false;
		this.numColumns = 44;
		this.numRows = 24;
		this.mainDiv = document.querySelector(el),
		this.colors = ['red', 'blue', 'orange', 'white', 'green', 'yellow', 'pink', 'purple'];
		this.holes;
		this.pegs;
		this.saveArray = [];

		this.createBoard();
		this.createColorPegs();
		this.createButtons();
		this.clickHandler();
	},

	createBoard: function(){
		let documentFragment = document.createDocumentFragment(),
			boardDiv = document.createElement('div'),
			index = 0;

		boardDiv.className = 'board';

		for(var i=0; i < this.numRows; i++){
			const rowDiv = document.createElement('div'),
				  docFrag = document.createDocumentFragment();

			rowDiv.className = 'row';

			for(var j=0; j < this.numColumns; j++){
				const hole = document.createElement('div');

				hole.className = this.startingBoard ? this.startingBoard[index] : 'hole';
				hole.setAttribute('id', 'hole_row' + i + '_col' + j);
				
				docFrag.appendChild(hole);

				index++;
			}

			rowDiv.appendChild(docFrag);
			documentFragment.appendChild(rowDiv);
		}
		boardDiv.appendChild(documentFragment);
		this.mainDiv.appendChild(boardDiv);
		this.holes = this.mainDiv.querySelectorAll('.hole');
	},

	createColorPegs: function(){
		const pegFragment = document.createDocumentFragment(),
			  pegDiv = document.createElement('div'),
			  colorUl = document.createElement('ul');

		pegDiv.className = 'pegs';
		colorUl.className = 'colors';

		this.colors.forEach(color => addColor(color));

		function addColor(color){
			const colorItem = document.createElement('li');

			colorItem.setAttribute('data-color', color);
			colorItem.classList.add('color');
			colorItem.classList.add(color);

			pegFragment.appendChild(colorItem);
		}

		colorUl.appendChild(pegFragment);
		pegDiv.appendChild(colorUl);

		this.mainDiv.appendChild(pegDiv);

		this.pegs = this.mainDiv.querySelectorAll('.color');
	},

	createButtons: function(){
		const buttons = document.createElement('div'),
			  saveButton = document.createElement('button'),
			  loadButton = document.createElement('button'),
			  exportButton = document.createElement('button'),
			  resetButton = document.createElement('button');

		buttons.className = 'buttons';
		saveButton.className = 'button button--save';
		saveButton.innerText = 'Save Board';
		loadButton.className = 'button button--load';
		loadButton.innerText = 'Load Board';
		exportButton.className = 'button button--export';
		exportButton.innerText = 'Export Board Data';
		resetButton.className = 'button button--reset';
		resetButton.innerText = 'Reset Board';

		this.mainDiv.appendChild(buttons);
		this.buttonDiv = document.querySelector('.buttons');
		this.buttonDiv.appendChild(saveButton);
		this.buttonDiv.appendChild(loadButton);
		this.buttonDiv.appendChild(exportButton);
		this.buttonDiv.appendChild(resetButton);

		this.saveBtn = this.buttonDiv.querySelector('.button--save');
		this.loadBtn = this.buttonDiv.querySelector('.button--load');
		this.exportBtn = this.buttonDiv.querySelector('.button--export');
		this.resetBtn = this.buttonDiv.querySelector('.button--reset');
	},

	selectColor: function(color){
		if(!color.classList.contains('current-color')){
			this.pegs.forEach(color => color.classList.remove('current-color'));
			this.currentColor = color.dataset.color;
			color.classList.add('current-color');
		} else {
			this.currentColor = '';
			color.classList.remove('current-color');
		}
	},

	changeHoleColor: function(event){
		if(this.currentColor && event.target.classList.contains('hole')){
			event.target.className = 'hole';
			event.target.classList.add(this.currentColor);
		} 
	},

	clearBoard: function(){
		if(confirm('Are you sure you want to clear the board?') == true){
			this.holes.forEach(hole => hole.className = 'hole');
		}
	},

	saveBoard: function(){
		this.saveArray = [];
		console.log('saved');
		this.holes.forEach(hole => {
			this.saveArray.push(hole.className);
		});

		console.log(this.saveArray);

		localStorage.setItem('LiteBrite', JSON.stringify(this.saveArray));
	},

	loadBoard: function(){
		let savedBoard = JSON.parse(localStorage.getItem('LiteBrite'));
		let index = 0;

		this.holes.forEach(hole => {
			hole.className = savedBoard[index];
			index++;
		});
	},

	exportBoardData(){
		let saveArray = [];

		this.holes.forEach(hole => {
			saveArray.push("'" + hole.className + "'");
		});

		alert('Copy the below code. You can enter it as the last parameter to persist from the start.\n\n' + '[' + saveArray + ']');
	},

	clickHandler: function(){
		this.mainDiv.addEventListener('click', this.changeHoleColor.bind(this));
		this.pegs.forEach(peg => peg.addEventListener('click', this.selectColor.bind(this, peg)));
		this.resetBtn.addEventListener('click', this.clearBoard.bind(this));
		this.saveBtn.addEventListener('click', this.saveBoard.bind(this));
		this.loadBtn.addEventListener('click', this.loadBoard.bind(this));
		this.exportBtn.addEventListener('click', this.exportBoardData.bind(this));
	}
};

(function(){
	var liteBrite = Object.create(LiteBrite);
	liteBrite.init('.lite-brite', ['hole red','hole red','hole red','hole red','hole red','hole','hole','hole orange','hole orange','hole orange','hole orange','hole','hole','hole yellow','hole','hole','hole','hole yellow','hole','hole green','hole green','hole green','hole green','hole green','hole','hole blue','hole blue','hole blue','hole blue','hole blue','hole pink','hole pink','hole pink','hole pink','hole pink','hole purple','hole purple','hole purple','hole purple','hole white','hole white','hole white','hole white','hole','hole red','hole','hole','hole','hole','hole','hole','hole orange','hole','hole','hole','hole orange','hole','hole yellow','hole yellow','hole','hole','hole yellow','hole','hole green','hole','hole','hole','hole','hole','hole','hole blue','hole','hole','hole','hole blue','hole pink','hole','hole','hole','hole pink','hole','hole purple','hole','hole white','hole','hole','hole','hole','hole red','hole','hole','hole','hole','hole','hole orange','hole','hole','hole','hole','hole orange','hole','hole yellow','hole yellow','hole','hole','hole yellow','hole','hole green','hole','hole','hole','hole','hole','hole blue','hole','hole','hole','hole blue','hole pink','hole','hole','hole','hole pink','hole','hole','hole purple','hole white','hole','hole','hole','hole','hole','hole red','hole','hole','hole','hole','hole','hole','hole orange','hole','hole','hole','hole orange','hole','hole yellow','hole','hole yellow','hole','hole yellow','hole','hole green','hole','hole','hole','hole','hole','hole','hole blue','hole blue','hole blue','hole blue','hole','hole pink','hole','hole','hole','hole pink','hole','hole purple','hole','hole white','hole white','hole white','hole white','hole','hole red','hole','hole','hole','hole','hole','hole orange','hole','hole','hole','hole','hole orange','hole','hole yellow','hole','hole yellow','hole','hole yellow','hole','hole green','hole','hole green','hole green','hole green','hole','hole blue','hole blue','hole blue','hole','hole','hole pink','hole pink','hole pink','hole pink','hole pink','hole','hole','hole purple','hole','hole','hole','hole','hole white','hole','hole red','hole','hole','hole','hole','hole','hole','hole orange','hole','hole','hole','hole orange','hole','hole yellow','hole','hole','hole yellow','hole yellow','hole','hole green','hole','hole','hole','hole','hole green','hole','hole blue','hole','hole blue','hole','hole','hole pink','hole','hole','hole','hole pink','hole','hole purple','hole','hole','hole','hole','hole','hole white','hole red','hole','hole','hole','hole','hole','hole orange','hole','hole','hole','hole','hole orange','hole','hole yellow','hole','hole','hole yellow','hole yellow','hole','hole green','hole','hole','hole','hole green','hole','hole blue','hole','hole','hole blue','hole','hole pink','hole','hole','hole','hole pink','hole','hole','hole purple','hole','hole','hole','hole','hole white','hole','hole red','hole red','hole red','hole red','hole red','hole red','hole','hole orange','hole orange','hole orange','hole orange','hole orange','hole','hole yellow','hole','hole','hole','hole yellow','hole','hole green','hole green','hole green','hole green','hole green','hole green','hole','hole blue','hole','hole','hole','hole blue','hole pink','hole','hole','hole','hole pink','hole','hole purple','hole','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole white','hole white','hole','hole purple','hole','hole','hole','hole','hole purple','hole','hole','hole pink','hole pink','hole pink','hole pink','hole','hole blue','hole blue','hole blue','hole blue','hole','hole green','hole green','hole green','hole green','hole green','hole green','hole','hole yellow','hole yellow','hole yellow','hole yellow','hole yellow','hole yellow','hole','hole red','hole red','hole red','hole red','hole','hole pink','hole white','hole','hole','hole','hole','hole white','hole','hole purple','hole','hole','hole','hole purple','hole','hole','hole pink','hole','hole','hole','hole','hole blue','hole','hole','hole','hole','hole','hole','hole','hole green','hole','hole','hole','hole','hole yellow','hole','hole','hole','hole','hole','hole red','hole','hole','hole','hole','hole pink','hole white','hole','hole','hole','hole white','hole','hole purple','hole','hole','hole','hole','hole purple','hole','hole pink','hole','hole','hole','hole','hole blue','hole','hole','hole','hole','hole','hole','hole','hole green','hole','hole','hole','hole','hole yellow','hole','hole','hole','hole','hole','hole red','hole','hole','hole','hole','hole','hole pink','hole white','hole','hole','hole','hole','hole white','hole','hole purple','hole','hole','hole','hole purple','hole','hole','hole pink','hole pink','hole pink','hole pink','hole','hole blue','hole blue','hole blue','hole blue','hole','hole','hole','hole','hole green','hole','hole','hole','hole','hole yellow','hole','hole','hole','hole','hole','hole red','hole red','hole red','hole red','hole','hole pink','hole white','hole white','hole white','hole white','hole white','hole','hole purple','hole','hole','hole','hole','hole purple','hole','hole','hole','hole','hole','hole pink','hole','hole','hole','hole','hole blue','hole','hole','hole','hole green','hole','hole','hole','hole','hole','hole yellow','hole yellow','hole yellow','hole','hole','hole','hole','hole','hole','hole red','hole','hole pink','hole white','hole','hole','hole','hole','hole white','hole','hole purple','hole','hole','hole','hole purple','hole','hole','hole','hole','hole','hole','hole pink','hole','hole','hole','hole','hole blue','hole','hole','hole','hole green','hole','hole','hole','hole','hole yellow','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole red','hole pink','hole white','hole','hole','hole','hole white','hole','hole purple','hole','hole','hole','hole','hole purple','hole','hole','hole','hole','hole','hole pink','hole','hole','hole','hole','hole blue','hole','hole','hole','hole green','hole','hole','hole','hole','hole yellow','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole red','hole','hole','hole white','hole','hole','hole','hole','hole white','hole','hole purple','hole purple','hole purple','hole purple','hole purple','hole','hole','hole pink','hole pink','hole pink','hole pink','hole','hole blue','hole blue','hole blue','hole blue','hole','hole green','hole green','hole green','hole green','hole green','hole green','hole','hole','hole yellow','hole yellow','hole yellow','hole yellow','hole yellow','hole yellow','hole red','hole red','hole red','hole red','hole','hole pink']);
})();

