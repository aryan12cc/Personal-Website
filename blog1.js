document.addEventListener('DOMContentLoaded', function() {

    let modeSwitcherId = document.getElementById('light-dark-mode');
    let heartClickId = document.getElementById('heart');
    let commentSubmitButtonId = document.getElementById('comment-submit-button');
    let numClicks = 0;

    if(localStorage.getItem('num-clicks1') == null) {
        localStorage.setItem('num-clicks1', 0);
    }

    let previousNumClicks = parseInt(localStorage.getItem('num-clicks1'));
    if(localStorage.getItem('comments1') == null) {
        localStorage.setItem('comments1', []);
    }

    let currentComments = [];
    let currentCommentsJSON = localStorage.getItem('comments1');
    if(currentCommentsJSON) {
        currentComments = JSON.parse(currentCommentsJSON);
    }

    function updateComments() {
        document.getElementById('other-comments-area').innerHTML = ''; 
        currentComments.forEach(function (comment) {
            let newCommentDiv = document.createElement('div');
            newCommentDiv.textContent = comment;
            newCommentDiv.style.padding = '2%';
            newCommentDiv.style.paddingLeft = '5%';
            document.getElementById('other-comments-area').appendChild(newCommentDiv);
        });
    }

    updateComments();

    document.getElementById('like-counter-text').innerHTML = previousNumClicks;

    function enableLightMode(toggleLocalStorage) {
        if(toggleLocalStorage === true) {
            localStorage.setItem('light-theme', 'enabled');
        }
        if(document.body.classList.contains('light-theme') === false) {
            document.body.classList.add('light-theme');
        }
        document.getElementById('light-dark-mode').innerHTML = "<img src='./images/moon.png'>";
        document.getElementById('linkedin-link').innerHTML = "<img src='./images/linkedin-light.png'>";
        document.getElementById('github-link').innerHTML = "<img src='./images/github-light.png'>";
        document.getElementById('email-link').innerHTML = "<img src='./images/email-light.png'>";
        if(numClicks % 2 == 0) {
            console.log('light mode');
            heartClickId.style.borderImage = "radial-gradient(black 69%, #0000 70%) 84.5%/50%";
        }
        // document.getElementById('like-counter').innerHTML = "<img src='images/empty-heart-light.png' class='empty-light'>";
    }

    function enableDarkMode(toggleLocalStorage) {
        if(toggleLocalStorage === true) {
            localStorage.setItem('light-theme', 'disabled');
        }
        if(document.body.classList.contains('light-theme') === true) {
            document.body.classList.remove('light-theme');
        }
        document.getElementById('light-dark-mode').innerHTML = "<img src='./images/sun.png'>";
        document.getElementById('linkedin-link').innerHTML = "<img src='./images/linkedin.png'>";
        document.getElementById('github-link').innerHTML = "<img src='./images/github.png'>";
        document.getElementById('email-link').innerHTML = "<img src='./images/email.png'>";
        if(numClicks % 2 == 0) {
            console.log('dark mode');
            heartClickId.style.borderImage = "radial-gradient(white 69%, #0000 70%) 84.5%/50%";
        }
        // document.getElementById('like-counter').innerHTML = "<img src='images/empty-heart-dark.png' class='empty-dark'>";
    }

    console.log('localStorage = ', localStorage);

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

    heartClickId.addEventListener('click', function(event) {
        event.preventDefault();
        numClicks += 1;
        numClicks %= 2;

        let currentNumClicks = previousNumClicks + numClicks;
        localStorage.setItem('num-clicks1', currentNumClicks);
        document.getElementById('like-counter-text').innerHTML = currentNumClicks;
        console.log('num Clicks = ', numClicks);
        if(numClicks % 2 == 1) {
            heartClickId.style.borderImage = "radial-gradient(red 69%, #0000 70%) 84.5%/50%";
        }
        else {
            let currentMode = localStorage.getItem('light-theme');
            if (currentMode === 'enabled') {
                heartClickId.style.borderImage = "radial-gradient(black 69%, #0000 70%) 84.5%/50%";
            }
            else {
                heartClickId.style.borderImage = "radial-gradient(white 69%, #0000 70%) 84.5%/50%";
            }
        }
    });

    commentSubmitButtonId.addEventListener('click', function(event) {
        event.preventDefault();
        let inputText = document.getElementById('comment-input').value;
        if(inputText.trim() !== '') {
            console.log('i am coming here!');
            currentComments.push(inputText);
            localStorage.setItem('comments1', JSON.stringify(currentComments));
            updateComments();
            // let newCommentDiv = document.createElement('div');
            // newCommentDiv.textContent = inputText;
            // newCommentDiv.style.padding = '2%';
            // newCommentDiv.style.paddingLeft = '5%';
            // document.getElementById('other-comments-area').appendChild(newCommentDiv);
            document.getElementById('comment-input').value = '';
        }
    })
});