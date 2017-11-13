var LiteBrite = {
	init: function(el) {
		this.theBoard = [];
		this.numColumns = 44;
		this.numRows = 24;
		this.mainDiv = document.querySelector(el),
		this.holes;
		this.colors = ['red', 'blue', 'orange', 'white', 'green', 'yellow', 'pink', 'purple'];
		this.pegs;

		this.createBoard();
		this.createColorPegs();
		this.clickHandler();
	},

	createBoard: function(){
		var documentFragment = document.createDocumentFragment(),
			boardDiv = document.createElement('div');

		boardDiv.setAttribute('class', 'board');

		for(var i=0; i < this.numRows; i++){
			var rowDiv = document.createElement('div'),
				docFrag = document.createDocumentFragment();

			rowDiv.setAttribute('class', 'row');

			for(var j=0; j < this.numColumns; j++){
				var hole = document.createElement('div');

				hole.setAttribute('class', 'hole');
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

		pegDiv.setAttribute('class', 'pegs');
		colorUl.setAttribute('class', 'colors');

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
			hole.setAttribute('class', 'hole');
		}
	},

	clickHandler: function(){
		this.holes.forEach(hole => hole.addEventListener('click', this.changeHoleColor.bind(this, hole)));

		this.pegs.forEach(peg => peg.addEventListener('click', this.selectColor.bind(this, peg)));
	}
};

(function(){
	var liteBrite = Object.create(LiteBrite);
	liteBrite.init('.lite-brite');
})();

