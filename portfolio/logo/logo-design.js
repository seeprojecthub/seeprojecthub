// Smooth scroll for anchor links
document.addEventListener('click', function(e){
	const link = e.target.closest('a');
	if(!link) return;
	const href = link.getAttribute('href');
	if(href && href.startsWith('#')){
		const el = document.querySelector(href);
		if(el){
			e.preventDefault();
			el.scrollIntoView({behavior:'smooth',block:'start'});
			// update location hash without jumping
			history.replaceState(null,'',href);
		}
	}
});
const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transition = "0.4s";

    });

});

document.querySelectorAll('.logo-slider').forEach(sliderContainer => {

    const slider = sliderContainer.querySelector('.slides');
    const images = sliderContainer.querySelectorAll('.slides img');
    const nextBtn = sliderContainer.querySelector('.next');
    const prevBtn = sliderContainer.querySelector('.prev');

    let index = 0;

    function showSlide() {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % images.length;
        showSlide();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + images.length) % images.length;
        showSlide();
    });

    setInterval(() => {
        index = (index + 1) % images.length;
        showSlide();
    }, 3000);

});

<!-- FOOTER -->
// Set current year in footer safely
const yearEl = document.getElementById('year');

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Small UX: reveal nav links when resizing from mobile to desktop
window.addEventListener('resize', ()=>{
	if(window.innerWidth > 720){
		document.querySelector('.nav-links').style.display = 'flex';
	} else {
		document.querySelector('.nav-links').style.display = 'none';
		document.querySelector('.nav-toggle').classList.remove('open');
	}
});
