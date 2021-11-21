class Menu{
	constructor(burger, menu){
		this.menu = menu.closest('.menu');
		this.burger = burger;
		let nav = menu.querySelector('ul');
		this.nav = nav;
		nav.remove();
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
		let beforeNav = MakeElement('div', ['before-menu']);
		document.body.append(beforeNav);
		if (this.menu.classList.contains('active')) {beforeNav.classList.add('active')}
		setTimeout(() => {beforeNav.classList.toggle('active')})
		this.menu.classList.toggle('active');
		this.burger.classList.toggle('active');
		document.body.classList.toggle('locked')
		setTimeout(() => {beforeNav.remove()}, 600)
	}
}

function aboutScreenAnimation(){
	let targets = document.querySelectorAll('.animated');
	let observer = new IntersectionObserver((entries) => {
	console.log(entries);
    entries.forEach(entry => {
    	if (entry.isIntersecting){
    			// console.log(entry.target);
	    		entry.target.classList.add('animation');
	    		// entry.unobserved();
	    	}
	    })
	}, { threshold: 0.5 })
	targets.forEach(target => {observer.observe(target)});
}

function MakeElement(type, styles){
	let elem = document.createElement(type);
	if (styles) {elem.classList.add(...styles)}
		return elem;
}

window.onload = function(){
	new Menu(document.querySelector('.burger'), document.querySelector('.menu-nav'));
	document.querySelector('.arrow-down').onclick = function(){
		let aboutScreen = document.querySelector('.about');
		aboutScreen.scrollIntoView({block: 'start', behavior : 'smooth'});
	}
	aboutScreenAnimation();
	document.querySelector('#show-form').onclick = function(e){
		e.preventDefault();
		let formContatiner = document.querySelector('.contact-form'),
			beforeForm = document.querySelector('.before-contact-form'),
			linkText = beforeForm.classList.contains('active') ? 'Написать' : 'Отмена'
		beforeForm.classList.toggle('active');
		setTimeout(() => {formContatiner.classList.toggle('active')}, 300);
		this.innerText = linkText;
	}
}

