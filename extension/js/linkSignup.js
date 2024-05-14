document.addEventListener("DOMContentLoaded", function() {
    var linkToPage = document.querySelector('.login-button');
    linkToPage.addEventListener('click', function(){
        chrome.tabs.create({ url:"http://127.0.0.1:8000/login/"});
    })
});

