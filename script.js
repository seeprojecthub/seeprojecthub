/*
	script.js
	Handles interactivity: smooth scrolling, scroll animations, nav toggle and simple form handling.
	Beginner-friendly comments included.
*/

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

// Entry and exit animations using IntersectionObserver
// We add 'in-view' when the element enters the viewport and 'out-view' when it leaves.
// Do NOT unobserve so elements can animate again when re-entering (useful for dynamic layouts).
const observer = new IntersectionObserver((entries)=>{
	entries.forEach(entry=>{
		if(entry.isIntersecting){
			entry.target.classList.remove('out-view');
			entry.target.classList.add('in-view');
		} else {
			entry.target.classList.remove('in-view');
			entry.target.classList.add('out-view');
		}
	});
},{threshold:0.12});

document.querySelectorAll('[data-animate]').forEach(el=>observer.observe(el));

// Mobile nav toggle (simple)
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if(navToggle){
	navToggle.addEventListener('click', ()=>{
		const expanded = navToggle.classList.toggle('open');
		navLinks.style.display = expanded ? 'flex' : 'none';
	});
}

// Contact form handling - simple client-side validation and success message
const form = document.getElementById('contactForm');
if(form){
	form.addEventListener('submit', function(e){
		e.preventDefault();
		// Read values
		const name = form.name.value.trim();
		const email = form.email.value.trim();
		const project = form.project.value.trim();

		// Basic validation
		if(!name || !email || !project){
			alert('Please complete all fields before submitting.');
			return;
		}

		// Simulate sending: we'll show a friendly message
		// In real use, replace this with an API call (fetch) to your backend or email service
		form.querySelector('button[type="submit"]').disabled = true;
		form.querySelector('button[type="submit"]').textContent = 'Sending...';

		setTimeout(()=>{
			form.reset();
			form.querySelector('button[type="submit"]').disabled = false;
			form.querySelector('button[type="submit"]').textContent = 'Submit Project';
			alert('Thanks ' + (name||'there') + '! Your message has been received. I will contact you shortly.');
		}, 900);
	});
}

const teamCards = document.querySelectorAll('.team-card');

const teamObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
},{threshold:0.2});

teamCards.forEach(card=>{
    card.style.opacity = "0";
    card.style.transform = "translateY(60px)";
    card.style.transition = "all .8s ease";
    teamObserver.observe(card);
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

// Background video playback helper:
// Some mobile browsers block autoplay even when muted. We'll attempt to play the video
// and, if blocked, attach a short user-interaction listener to resume playback on first touch.
(() => {
	const bg = document.getElementById('bgVideo');
	if(!bg) return; // no video present

	// Try to play right away (most modern desktop browsers will allow this when muted)
	const tryPlay = () => {
		const p = bg.play();
		if(p !== undefined){
			p.catch(()=>{
				// Autoplay failed (likely mobile). Wait for first user interaction.
				const resume = () => { bg.play().catch(()=>{}); window.removeEventListener('touchstart', resume); window.removeEventListener('click', resume); };
				window.addEventListener('touchstart', resume, {passive:true});
				window.addEventListener('click', resume, {passive:true});
			});
		}
	};

	tryPlay();
})();

	// Loading overlay controller
	(() => {
		const overlay = document.getElementById('loaderOverlay');
		const vid = document.getElementById('loaderVideo');
		if(!overlay || !vid) return;

		// Increase playback speed slightly for a snappier feel (2x). Adjust as desired.
		try{ vid.playbackRate = 2.0 }catch(e){}

		// Attempt to play immediately
		const playAttempt = vid.play();
		if(playAttempt !== undefined){
			playAttempt.catch(()=>{}); // ignore playback errors — we'll still hide after timeout
		}

			// Hide overlay after 5 seconds to avoid blocking (or when the video ends)
			// Apply a blur exit animation class first, then remove the element after the animation.
				const hide = () => {
							// Stage 1: apply exit transform & opacity (GPU-friendly)
							overlay.classList.add('loader-exit');

							// Pause the loader video to free decoding & GPU resources during the transition
							try{ vid.pause(); }catch(e){}

							// After a short pause, progress to a lighter overlay state so the page begins to appear
							setTimeout(()=>{
								overlay.classList.add('loader-partial');

								// Finalize: fully hide and remove after the partial animation completes
								setTimeout(()=>{
									overlay.classList.add('hidden');
									// exit fullscreen if active
									if(document.fullscreenElement){ try{ document.exitFullscreen(); }catch(e){} }
									setTimeout(()=>overlay.remove(),380);
								}, 240); // wait for partial to settle
							}, 260); // initial exit duration
				};

		// If video ends earlier, hide immediately
		vid.addEventListener('ended', hide);

		// Fallback timeout of 5 seconds
		setTimeout(hide, 5000);
	})();

		// Attempt to enter fullscreen for the loader on first user gesture
		(function(){
			const overlay = document.getElementById('loaderOverlay');
			if(!overlay) return;

			const requestFS = async () => {
				try{
					// If the browser supports the Fullscreen API, request fullscreen on the overlay
					if(overlay.requestFullscreen){
						await overlay.requestFullscreen();
					} else if(overlay.webkitRequestFullscreen){
						await overlay.webkitRequestFullscreen();
					}
				}catch(e){
					// Fullscreen request may fail or be denied — ignore silently
				}
				// Remove listeners after first attempt
				window.removeEventListener('click', requestFS);
				window.removeEventListener('touchstart', requestFS);
			};

			// Listen for a user gesture and then try to enter fullscreen.
			window.addEventListener('click', requestFS, {once:true,passive:true});
			window.addEventListener('touchstart', requestFS, {once:true,passive:true});

			// When loader overlay is removed, try to exit fullscreen if active
			const observer = new MutationObserver(()=>{
				if(!document.getElementById('loaderOverlay')){
					if(document.fullscreenElement){
						try{ document.exitFullscreen(); }catch(e){}
					}
					observer.disconnect();
				}
			});
			observer.observe(document.documentElement, {childList:true,subtree:true});
		})();

/* ===========================
   google form  
=========================== */
const showGoogleFormBtn =
    document.getElementById("showGoogleForm");

const googleFormContainer =
    document.getElementById("googleFormContainer");

showGoogleFormBtn.addEventListener("click", () => {

    if (
        googleFormContainer.style.display === "block"
    ) {

        googleFormContainer.style.display = "none";

        showGoogleFormBtn.textContent =
            "Open Detailed Google Form";

    } else {

        googleFormContainer.style.display = "block";

        showGoogleFormBtn.textContent =
            "Hide Detailed Google Form";

        googleFormContainer.scrollIntoView({
            behavior: "smooth"
        });
    }
});

window.addEventListener("scroll", () => {
    const nav = document.querySelector(".nav");

    if(window.scrollY > 50){
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});