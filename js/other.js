let burger = document.querySelector('.burger'),
	menu = document.querySelector('.nav-menu');
burger.addEventListener('click', function(){
	this.classList.toggle('active');
	menu.classList.toggle('active');
	document.body.classList.toggle('locked');
})