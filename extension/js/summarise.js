let htmlSummarise = ` 
<style>
    .summarise-for-youtube { 
        border: 1px solid #cecece;  
        border-radius: 12px; 
        padding: 10px;
        margin: 12px 0;
    }
    .navbar {
        display: flex;   
        align-items: center; 
        justify-content: space-between;
    }
    .summarise-btn { 
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 12px;
        border: 0;
        border-radius: 44px;
        cursor: pointer;
        color: #fff;
        font-weight: 700;
        background-image: linear-gradient(10deg,#8a57ea 50%,#32c5ff); 
        user-select: none;
    }
    .logo{
        margin-left: 4px;
        user-select: none;
    }
    .summarise-text {
        display: none;
        margin: 10px 0 0 0;
        transition: display 3s ease;  
        padding: 20px;
        border-top: 1px solid #cecece; 
        font-size: 14px;
    } 
    .icon-down-up {
        display: flex;
        justify-content: center;
        align-items: center; 
        margin: 10px 0 0 0;
        border-top: 1px solid #cecece; 
        cursor: pointer;
        padding-top: 10px;
        user-select: none;
    }
</style>
<div class="summarise-for-youtube">
    <div class="navbar">
        <div class="logo">
            <img id="logo_image" width="70px" height="18px"  src="/static/logo.png">
        </div>
        <button class="summarise-btn">Summarise</button>
    </div>
    <div class="summarise-text">
        

    </div>
    <div class="icon-down-up">
        <div id="icon">
            <svg style="display:block" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
            </svg>
            <svg style="display:none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
            </svg>
        </div>
    </div>
</div>

`;  
var textSummarise;

function getSubs(langCode = 'en') {
    return fetch(window.location.href)
        .then(response => response.text())
        .then(data => {
            if (data){
                const ct = JSON.parse(data.split('ytInitialPlayerResponse = ')[1].split(';var')[0]).captions.playerCaptionsTracklistRenderer.captionTracks;
                const findCaptionUrl = x => ct.find(y => y.vssId.indexOf(x) === 0)?.baseUrl;
                const firstChoice = findCaptionUrl("." + langCode);
                const url = firstChoice ? firstChoice + "&fmt=json3" : (findCaptionUrl(".") || findCaptionUrl("a." + langCode) || ct[0].baseUrl) + "&fmt=json3&tlang=" + langCode;
                return fetch(url);
            } else {
                return Promise.reject("No data found");
            }

        })
        .then(response => response.json())
        .then(data => {
            const events = data.events;
            return events.map(x => ({
                ...x,
                text: x.segs?.map(x => x.utf8)?.join(" ")?.replace(/\n/g,' ')?.replace(/♪|'|"|\.{2,}|\<[\s\S]*?\>|\{[\s\S]*?\}|\[[\s\S]*?\]/g,'')?.trim() || ''
            }));
        });
}

function logSubs(langCode) {
    return getSubs(langCode)
        .then(subs => {
            const text = subs.map(x => x.text).join('\n'); 
            return text;
        });
}

function downloadSubs(langCode, fileName) {
    logSubs(langCode)
        .then(text => {
            const blob = new Blob([text], {type: 'text/plain'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(url);
        });
}

// Gọi hàm logSubs() khi tab được tải ban đầu
textSummarise = logSubs("vi");

window.addEventListener('hashchange', function() {
    // Gọi hàm logSubs() khi URL thay đổi
    textSummarise = logSubs("vi"); 
});


function waitForSummarise() {
    if (window.location.hostname === "www.youtube.com" || window.location.hostname === "youtube.com") {
        const wrapper = document.querySelector("#chat-container");

        if (wrapper) {
            const shadowWrapper = document.createElement('paso-summarise');
            shadowWrapper.className = 'summarise';
            const shadowRoot = shadowWrapper.attachShadow({mode: 'open'});
            
            shadowRoot.innerHTML = htmlSummarise; 

            const logoImage = shadowRoot.querySelector('#logo_image');
            logoImage.src = chrome.runtime.getURL("./static/logo.png");  

            const icon = shadowRoot.querySelector('.icon-down-up > #icon'); 
            const chevronDown = shadowRoot.querySelector('#icon > .bi.bi-chevron-down');
            const chevronUp = shadowRoot.querySelector('#icon > .bi.bi-chevron-up'); 

            const summariseText = shadowRoot.querySelector('.summarise-text');
            const summariseBtn = shadowRoot.querySelector('.summarise-btn');

            //   subtitle from youtube 
            summariseBtn.addEventListener("click", function() {
                textSummarise
                    .then((text) => {
                        chrome.storage.local.get(['token'], function(result) { 
                            console.log('authToken :', result.token);
                            fetch(`http://127.0.0.1:8000/api/summarizerYoutube/`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: 'Token ' + result.token
                                },
                                body: JSON.stringify({ text: text }),
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            })
                            .then(data => {
                                console.log('textSummarise:', text);
                                console.log('Success:', data);
                                summariseText.innerHTML = data.text;
                            })
                            .catch(error => {
                                console.error('Error:', error); 
                            }); 
                        }); 
                    })
                    .catch(error => {
                        summariseText.innerHTML = "Video not found or no subtitles available";
                    });

            });
            
               

            icon.addEventListener("click", function() {
                if (summariseText.style.display === "none" || summariseText.style.display === "") {
                    summariseText.style.display = "block";
                    chevronUp.style.display = "block";
                    chevronDown.style.display = "none";
                } else {
                    summariseText.style.display = "none"; 
                    chevronUp.style.display = "none";
                    chevronDown.style.display = "block";
                }
            });

            const firstChild = wrapper.firstChild; 
            wrapper.insertBefore(shadowWrapper, firstChild); 

        } else { 
            setTimeout(waitForSummarise, 2000);
        }
    }
}

waitForSummarise();