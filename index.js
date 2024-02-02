document.addEventListener('DOMContentLoaded', function() {
    const text = 'Hi, I am Aryan Maskara... < and this is my website!';
    let cnt = 0;
    let htmlContent = '';
    let i = 0;
    let clearedTypeWriter = false;
    let percent = 0;

    if(localStorage.getItem('light-theme') == 'enabled') {
        if(document.body.classList.contains('light-theme') === false) {
            document.body.classList.add('light-theme');
        }
    }
    else {
        if(document.body.classList.contains('light-theme') === true) {
            document.body.classList.remove('light-theme');
        }
    }

    function progressbar() {
        const progressBarId = document.getElementById('progress-bar');

        if(percent == 100) {
            clearInterval(progessBarIntervalId);
            window.location.href = 'home.html';
        }
        else {
            const newChange = (101.0 - percent) / 100;
            const newPercent = Math.min(100, percent + newChange);
            percent = newPercent;
            progressBarId.style.width = newPercent + '%';
        }
    }

    function typewriter() {
        cnt += 1;
        const centeredItemId = document.getElementById('centered-item');
        if(cnt % 2 == 0) {
            centeredItemId.innerHTML = htmlContent + '|';
        }
        else {
            htmlContent += text[i];
            if(text[i] == '<') {
                htmlContent += "br>"
            }
            i++;
            while(text[i] == ' ') {
                htmlContent += text[i];
                i++;
            }
            centeredItemId.innerHTML = htmlContent + ' '; // no cursor
            if(i == text.length) {
                clearedTypeWriter = true;
                clearInterval(intervalId);
                // intervalId = setInterval(progressbar, 10);
            }
        }
    }
    let intervalId = setInterval(typewriter, 50);
    let progessBarIntervalId = setInterval(progressbar, 10);
});
  