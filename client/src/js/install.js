const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
	// store triggered event data
	window.deferredPrompt = event;
// show hidden button
	butInstall.classList.toggle('hidden', false);

});

butInstall.addEventListener('click', async () => {
	// click listener for the 'butInstall' element
	const promptEvent = window.deferredPrompt
	if (!promptEvent){
		return;
	}
	// show prompt
	promptEvent.prompt();
// reset prompt
	window.deferredPrompt = null;
		// hide button
		butinstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
// clear the deferredPrompt
	window=deferredPrompt = null;}

	);
