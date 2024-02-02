document.addEventListener('DOMContentLoaded', function() {

    let modeSwitcherId = document.getElementById('light-dark-mode');

    function enableLightMode(toggleLocalStorage) {
        if(toggleLocalStorage === true) {
            localStorage.setItem('light-theme', 'enabled');
        }
        if(document.body.classList.contains('light-theme') === false) {
            document.body.classList.add('light-theme');
            document.getElementById('light-dark-mode').innerHTML = "<img src='/images/moon.png'>";
            document.getElementById('linkedin-link').innerHTML = "<img src='/images/linkedin-light.png'>";
            document.getElementById('github-link').innerHTML = "<img src='/images/github-light.png'>";
            document.getElementById('email-link').innerHTML = "<img src='/images/email-light.png'>";
        }
    }

    function enableDarkMode(toggleLocalStorage) {
        if(toggleLocalStorage === true) {
            localStorage.setItem('light-theme', 'disabled');
        }
        if(document.body.classList.contains('light-theme') === true) {
            document.body.classList.remove('light-theme');
            document.getElementById('light-dark-mode').innerHTML = "<img src='/images/sun.png'>";
            document.getElementById('linkedin-link').innerHTML = "<img src='/images/linkedin.png'>";
            document.getElementById('github-link').innerHTML = "<img src='/images/github.png'>";
            document.getElementById('email-link').innerHTML = "<img src='/images/email.png'>";
        }
    }

    if(localStorage.getItem('light-theme') == 'enabled') {
        enableLightMode(false);
    }
    else {
        enableDarkMode(false);
    }

    modeSwitcherId.addEventListener('click', function(event) {
        event.preventDefault();
        if(localStorage.getItem('light-theme') == 'enabled') {
            enableDarkMode(true);
        }
        else {
            enableLightMode(true);
        }
    });
});