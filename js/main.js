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

		
		this.createBoard();
		this.createColorPegs();
		this.createButtons();
		this.clickHandler();

	},

	createBoard: function(){
		var documentFragment = document.createDocumentFragment(),
			boardDiv = document.createElement('div');

		boardDiv.className = 'board';

		for(var i=0; i < this.numRows; i++){
			var rowDiv = document.createElement('div'),
				docFrag = document.createDocumentFragment();

			rowDiv.className = 'row';

			for(var j=0; j < this.numColumns; j++){
				var hole = document.createElement('div');

				hole.className = this.startingBoard ? this.startingBoard[i][j] : 'hole';
				hole.setAttribute('id', 'hole_row' + i + '_col' + j);
					
				docFrag.appendChild(hole);
			}

			rowDiv.appendChild(docFrag);
			documentFragment.appendChild(rowDiv);
		}
		boardDiv.appendChild(documentFragment);
		this.mainDiv.appendChild(boardDiv);
		this.holes = this.mainDiv.querySelectorAll('.hole');
	},

	createColorPegs: function(){
		var pegFragment = document.createDocumentFragment(),
			pegDiv = document.createElement('div'),
			colorUl = document.createElement('ul');

		pegDiv.className = 'pegs';
		colorUl.className = 'colors';

		this.colors.forEach(color => addColor(color));

		function addColor(color){
			var colorItem = document.createElement('li');

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
		var buttons = document.createElement('div'),
			resetButton = document.createElement('button');

		buttons.className = 'buttons';
		resetButton.className = 'button button--reset';
		resetButton.innerText = 'Reset Board';

		this.mainDiv.appendChild(buttons);

		this.buttonDiv = document.querySelector('.buttons');

		this.buttonDiv.appendChild(resetButton);

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

	changeHoleColor: function(hole){
		//red, blue, orange, white (clear/colorless), green, yellow, pink, violet (purple)
		if(this.currentColor){
			hole.classList.add(this.currentColor);
		} else {
			hole.className = 'hole';
		}
	},

	clearBoard: function(){
		if(confirm('Are you sure you want to clear the board?') == true){
			this.holes.forEach(hole => hole.className = 'hole');
		}
	},

	saveBoard: function(){
		for(var i=0; i < this.numRows; i++){
			for(var j=0; j < this.numColumns; j++){
				this.saveArray[i][j].push(hole.className);
			}
		}
	},

	clickHandler: function(){
		this.holes.forEach(hole => hole.addEventListener('click', this.changeHoleColor.bind(this, hole)));
		this.pegs.forEach(peg => peg.addEventListener('click', this.selectColor.bind(this, peg)));
		this.resetBtn.addEventListener('click', this.clearBoard.bind(this));
	}
};

(function(){
	var liteBrite = Object.create(LiteBrite);
	liteBrite.init('.lite-brite');
})();

