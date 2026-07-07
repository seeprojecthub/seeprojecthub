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

//header
const navToggle = document.querySelector(".nav-toggle");
const mobileDropdown = document.querySelector(".mobile-dropdown");

navToggle.addEventListener("click", () => {
    mobileDropdown.classList.toggle("active");
});

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transition = "0.4s";

    });

});
// Services Section
const cards = document.querySelectorAll(".service-card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

cards.forEach(card => observer.observe(card));

<script>
const cards = document.querySelectorAll(".service-card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

cards.forEach(card => observer.observe(card));
</script>
//Trusted by Businesses
const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){

            const counter = entry.target;
            const target = +counter.dataset.target;
            let count = 0;

            const update = () => {
                const increment = Math.ceil(target / 80);

                if(count < target){
                    count += increment;

                    if(count > target){
                        count = target;
                    }

                    counter.innerText = count;
                    requestAnimationFrame(update);
                }
            };

            update();
            observer.unobserve(counter);
        }
    });
},{
    threshold:.5
});

counters.forEach(counter=>observer.observe(counter));


//FOOTER
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
