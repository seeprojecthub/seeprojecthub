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

//Video
const videos = document.querySelectorAll("video");
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        const video = entry.target;

        if(entry.isIntersecting){

            video.play();

        }else{

            video.pause();

            video.muted = true;

            const muteBtn =
            video.parentElement.querySelector(".mute-btn");

            muteBtn.textContent = "🔇 Unmute";
        }

    });

},{
    threshold:1
});


videos.forEach(video=>{

    observer.observe(video);

    // fullscreen when video clicked
    video.addEventListener("click",()=>{

        if(video.requestFullscreen){
            video.requestFullscreen();
        }

        video.play();
    });

});


document.querySelectorAll("[class$='card']")
.forEach(card=>{

    const video = card.querySelector("video");

    const playBtn =
    card.querySelector(".play-btn");

    const muteBtn =
    card.querySelector(".mute-btn");

    const fullscreenBtn =
    card.querySelector(".fullscreen-btn");


    // Play Pause

    playBtn.addEventListener("click",()=>{

        if(video.paused){

            video.play();

            playBtn.textContent =
            "⏸ Pause";

        }else{

            video.pause();

            playBtn.textContent =
            "▶ Play";
        }

    });


    // Mute Unmute

    muteBtn.addEventListener("click",()=>{

        // mute all videos first

        videos.forEach(v=>{

            if(v !== video){

                v.muted = true;

                v.parentElement
                .querySelector(".mute-btn")
                .textContent =
                "🔇 Unmute";
            }

        });

        video.muted = !video.muted;

        muteBtn.textContent =
        video.muted
        ? "🔇 Unmute"
        : "🔊 Mute";

    });


    // Fullscreen

    if(fullscreenBtn){
        fullscreenBtn.addEventListener("click",()=>{

            if(video.requestFullscreen){
                video.requestFullscreen();
            }

            video.play();

        });
}

});
// reel price 

//faqs
document.addEventListener("DOMContentLoaded", () => {

    const faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach(button => {

        button.addEventListener("click", () => {

            const answer = button.nextElementSibling;
            const icon = button.querySelector("span");

            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                icon.textContent = "+";
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.textContent = "−";
            }

        });

    });

});

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
