	// Loading overlay controller
	(() => {
		const overlay = document.getElementById('loaderOverlay');
		const vid = document.getElementById('loaderVideo');
		if(!overlay || !vid) return;

		// Increase playback speed slightly for a snappier feel (2x). Adjust as desired.
		try{ vid.playbackRate = 3.0 }catch(e){}

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

const cards = document.querySelectorAll(".policy-card");

const observer = new IntersectionObserver(
(entries)=>{
    entries.forEach(entry=>{

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });
},
{
    threshold:0.15
}
);

cards.forEach(card=>{
    observer.observe(card);
});

<!-- FOOTER -->
// Set current year in footer safely
const yearEl = document.getElementById('year');

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}