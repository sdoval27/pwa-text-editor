const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// DONE: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    //stores triggered events
    window.deferredPrompt = event;
    //removes the hidden class from the button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent){
        return;
    }

    //show prompt
    promptEvent.prompt();

    window.deferredPrompt = null;
    //resets prompt variable, hides element
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
