class Menu{
	constructor(burger, menu){
		this.menu = menu.closest('.menu');
		this.navContainer = this.menu.querySelector('.menu-nav');
		this.burger = burger;
		let nav = menu.querySelector('ul');
		this.nav = nav;
		nav.remove();
		this.createChildrenSigns();
		this.nav.querySelectorAll('li').forEach(item => {item.addEventListener('click', (e) => {this.menuClick(e)})});
		this.navContainer.append(this.nav);
		this.burger.addEventListener('click', () => this.toggleMenu());
		this.magicBg()
	}
	createChildrenSigns(){
		let childrenUl = this.nav.querySelectorAll('li>ul');
		// console.log(childrenUl);
		childrenUl.forEach(ul => (ul.closest('li').querySelector('a').insertAdjacentHTML("afterbegin", '<span><</span>')))
	}
	toggleMenu(){
		let beforeNav = MakeElement('div', ['before-menu']);
		document.body.append(beforeNav);
		if (this.menu.classList.contains('active')) {
			beforeNav.classList.add('active');
			let buttonsBack = this.navContainer.querySelectorAll('.back');
			// console.log(buttonsBack);
			buttonsBack.forEach(item => {item.remove()})
		}
		setTimeout(() => {beforeNav.classList.toggle('active')})
		this.menu.classList.toggle('active');
		this.burger.classList.toggle('active');
		document.body.classList.toggle('locked')
		setTimeout(() => {beforeNav.remove()}, 600);
		this.navContainer.querySelector('ul').replaceWith(this.nav);
	}
	menuClick(e){
		e.preventDefault();
		let target = e.target,
			nav = this.nav,
			navContainer = this.navContainer,
			sub = e.target.closest('li').querySelector('ul');
		if (sub != null){
			let subList = sub.cloneNode(true),
				parent = sub.closest('ul');
			this.navAnimation(nav, subList)
		}else{
			document.location.href = target.href;
		}
	}
	navAnimation(current, next, isBack = true){
		current.replaceWith(next);
		if (isBack == true){
			let back = MakeElement('li', ['back']);
			back.insertAdjacentHTML("afterbegin", '<a><span><</span>Назад</a>');
			back.addEventListener('click', (e) => {this.navGoBack(e)});
			next.closest('.menu-nav').insertBefore(back, next);
		}
	}
	navGoBack(e){
		let back = e.target.closest('li'),
			current = back.closest('.menu-nav').lastChild,
			parent = this.nav;
		back.remove();
		// console.log(back);
		this.navAnimation(current, parent, false);
	}
	magicBg(){
		const li = this.nav.querySelectorAll('li');
		li.forEach(item => {item.addEventListener('mouseover', (e) => {this.changeBg(e)})})

	}
	changeBg(e){
		let target = e.target.closest('li'),
			nav = Array.from(this.nav.children),
			pos = nav.indexOf(target);
		this.navContainer.closest('.menu').style.cssText = `background-image : url(img/menu-bg/${pos + 1}.jpg)`;
	}
}

function aboutScreenAnimation(){
	let targets = document.querySelectorAll('.animated');
	let observer = new IntersectionObserver((entries) => {
	// console.log(entries);
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

