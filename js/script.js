class Menu{
	constructor(burger, menu){
		this.menu = menu.closest('.menu');
		this.burger = burger;
		let nav = menu.querySelector('ul');
		this.nav = nav;
		nav.remove();
		// console.log(this);
		this.createChildrenSigns();
		menu.append(this.nav);
		this.burger.addEventListener('click', () => this.toggleMenu());
	}
	createChildrenSigns(){
		let childrenUl = this.nav.querySelectorAll('li>ul');
		console.log(childrenUl);
		childrenUl.forEach(ul => (ul.closest('li').querySelector('a').insertAdjacentHTML("afterbegin", '<span><</span>')))
	}
	toggleMenu(){
		this.menu.classList.toggle('active');
		this.burger.classList.toggle('active');
		document.body.classList.toggle('locked')
	}
}


window.onload = function(){
	new Menu(document.querySelector('.burger'), document.querySelector('.menu-nav'));
}
