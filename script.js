function centerImg(img) {

	var widthMax = window.innerWidth * 0.8;
	var heightMax = window.innerHeight * 0.8;

	// top from browser
	img.style.top = window.scrollY + (window.innerHeight * 0.1) + 'px';

	// obliczenie proporcji
	var w1 = widthMax/img.naturalWidth;
	var h1 = heightMax/img.naturalHeight;
	var min = Math.min(w1,h1);
	var widthImg = img.naturalWidth * min;
	var heightImg = img.naturalHeight * min;

	// width & height
	img.style.width  = widthImg + 'px';
	img.style.height = heightImg + 'px';
	// left
	img.style.left = ((window.innerWidth/2) - (widthImg/2)) + 'px';
}

function start() {
	var div = document.querySelector('#obraz');	
	var divImg = document.querySelector('#divImg');
   	var imgs = divImg.querySelectorAll('img');

   	for(var i=0; i<imgs.length; i++) {

   		imgs[i].addEventListener('click',function(e){
			console.log('click');
			e.stopPropagation();

			// Gdy DIV ma display=none to pokaż DIV i dodaj do niego img klikniętego
			if( getComputedStyle(div).display == 'none') {
				console.info(getComputedStyle(div).display);

				div.style.display = 'block';
				var img = new Image();

		        img.onload=function() {
		        	centerImg(this);
		        	var self = this;
		        	window.onresize = function() {
		        	centerImg(self);	
		        	}		        	
		         	};
				var src = this.src;
				img.src = src;
				div.appendChild(img);
				console.log(div.children[0]);
				window.document.onclick = function() {
					console.log('click document');
					while(div.hasChildNodes()) {
						div.removeChild(div.children[0]);
						}
					div.style.display = 'none';
					}
			} else {
				console.info(getComputedStyle(div).display);
				if(div.hasChildNodes()) {
					div.removeChild(div.children[0]);
					div.style.display = 'none';
					console.info(getComputedStyle(div).display);
				}

			};
      	}, true);
   	}
}

document.addEventListener('DOMContentLoaded', start,  false);