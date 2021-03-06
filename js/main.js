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

	selectColor: function(event){
		let color = event.target;

		if(!color.classList.contains('current-color')){
			this.pegs.forEach(color => color.classList.remove('current-color'));
			this.currentColor = color.dataset.color;
			color.classList.add('current-color');
		} else {
			this.currentColor = 'blank';
			color.classList.remove('current-color');
		}
	},

	changeHoleColor: function(event){
		let hole = event.target;

		hole.className = 'hole';
		hole.classList.add(this.currentColor);
	},

	determineClick: function(event){
		if(event.target.classList.contains('hole')){
			this.changeHoleColor(event);
		}

		if(event.target.classList.contains('color')){
			this.selectColor(event);
		}

		if(event.target == this.resetBtn){
			this.clearBoard();
		}

		if(event.target == this.saveBtn){
			this.saveBoard();
		}

		if(event.target == this.loadBtn){
			this.loadBoard();
		}

		if(event.target == this.exportBtn){
			this.exportBoardData();
		}
	},

	clearBoard: function(){
		if(confirm('Are you sure you want to clear the board?') == true){
			this.holes.forEach(hole => hole.className = 'hole');
		}
	},

	saveBoard: function(){
		this.saveArray = [];
		this.holes.forEach(hole => {
			this.saveArray.push(hole.className);
		});

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
		let saveArray = [],
			arrayHtml = '',
			messageEl = document.querySelector('.exported-code') || document.createElement('div'),
			messageHtml = '<p><strong>Copy and paste the below code, including brackets, and replace the array in the .init() function:</strong></p>';

			if(!messageEl.innerHTML != ''){
				messageEl.className = 'exported-code';
				this.mainDiv.appendChild(messageEl);
			}

		this.holes.forEach(hole => {
			saveArray.push("'" + hole.className + "'");
		});

		messageEl.innerHTML = messageHtml + '<p>[' + saveArray + ']</p>';

		//alert('Copy the below code. You can enter it as the last parameter to persist from the start.\n\n' + '[' + saveArray + ']');
	},

	clickHandler: function(){
		this.mainDiv.addEventListener('click', this.determineClick.bind(this));
		//this.mainDiv.addEventListener('click', this.changeHoleColor.bind(this));
		//this.pegs.forEach(peg => peg.addEventListener('click', this.selectColor.bind(this, peg)));
		/*this.resetBtn.addEventListener('click', this.clearBoard.bind(this));
		this.saveBtn.addEventListener('click', this.saveBoard.bind(this));
		this.loadBtn.addEventListener('click', this.loadBoard.bind(this));
		this.exportBtn.addEventListener('click', this.exportBoardData.bind(this));*/
	}
};

(function(){
	var liteBrite = Object.create(LiteBrite);
	liteBrite.init('.lite-brite',['hole','hole','hole','hole','hole','hole','hole','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole','hole','hole','hole','hole red','hole red','hole red','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole red','hole','hole','hole','hole','hole red','hole red','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole red','hole red','hole red','hole red','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole red','hole red','hole red','hole red','hole','hole','hole','hole','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole red','hole red','hole red','hole white','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole white','hole red','hole red','hole red','hole white','hole','hole','hole','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole white','hole pink','hole pink','hole pink','hole white','hole white','hole white','hole white','hole pink','hole pink','hole pink','hole pink','hole pink','hole white','hole white','hole white','hole white','hole white','hole pink','hole pink','hole white','hole white','hole white','hole white','hole','hole','hole','hole white','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole pink','hole pink','hole white','hole white','hole white','hole pink','hole pink','hole pink','hole white','hole pink','hole blue','hole pink','hole pink','hole pink','hole','hole','hole pink','hole pink','hole pink','hole blue','hole pink','hole pink','hole white','hole pink','hole pink','hole white','hole white','hole white','hole pink','hole pink','hole','hole','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole pink','hole pink','hole pink','hole white','hole white','hole white','hole pink','hole pink','hole pink','hole pink','hole blue','hole blue','hole pink','hole pink','hole','hole pink','hole','hole pink','hole pink','hole blue','hole blue','hole pink','hole pink','hole pink','hole pink','hole white','hole white','hole white','hole pink','hole pink','hole pink','hole','hole','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole pink','hole pink','hole white','hole white','hole white','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole','hole','hole pink','hole','hole','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole white','hole white','hole white','hole pink','hole pink','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole pink','hole pink','hole white','hole white','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole','hole pink','hole pink','hole pink','hole pink','hole','hole','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole white','hole white','hole pink','hole pink','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole pink','hole pink','hole pink','hole pink','hole pink','hole','hole pink','hole','hole pink','hole pink','hole pink','hole','hole pink','hole','hole pink','hole pink','hole pink','hole pink','hole pink','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole pink','hole pink','hole pink','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole pink','hole pink','hole pink','hole pink','hole pink','hole pink','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole pink','hole pink','hole pink','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole white','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole','hole']);
})();