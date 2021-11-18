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

function aboutScreenAnimation(){
	let aboutImg = document.querySelector('.about-img'),
		sectionHeading = document.querySelector('.about .section-heading'),
		aboutText = document.querySelector('.about-text>.text'),
		aboutPhoto = document.querySelector('.about-text>.photo'),
		target = document.querySelector('.about');
	// console.log(target);
	aboutPhoto.style.width = '0%';
	aboutText.style.height = '0%';
	sectionHeading.style.height = '0%';
	aboutImg.style.width = '0%';
	let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    	if (entry.isIntersecting){
	    		anime({
				  targets: aboutImg,
				  width: '50%',
				  duration: 300,
				  easing: 'easeInOutExpo'
				});
				anime({
				  targets: sectionHeading,
				  height: '100px',
				  duration: 300,
				  delay: 600,
				  easing: 'easeInOutExpo'
				});
				// anime({
				//   targets: aboutText,
				//   height: 'auto',
				//   duration: 300,
				//   delay: 1200,
				//   easing: 'easeInOutExpo'
				// });
				anime({
				  targets: aboutPhoto,
				  width: '50%',
				  duration: 300,
				  delay: 600,
				  easing: 'easeInOutExpo'
				});
	    	}
	    })
	}, { threshold: 0.5 })
	observer.observe(target)
}


window.onload = function(){
	new Menu(document.querySelector('.burger'), document.querySelector('.menu-nav'));
	aboutScreenAnimation();
}

