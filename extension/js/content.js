let htmlSubtitlesText = `
<style>
        .streaming-caption {
            position: absolute;
            top: 23px;
            left: 0;
            font-weight: 500; 
            user-select: none;
        }
        .copy-view{
            display: flex;
            position: absolute;
            top: 16px;
            left: 120px;
            cursor: pointer;  
            font-weight: 700;
            border-radius: 50%;
            padding: 5px;
            align-items: center;
            justify-content: center;
        }
        .copy-view:hover{
            background-color: #5c5a5a;
        }
        .summarise-with-chat {
            position: absolute;
            top: 17px;
            left: 155px;
            cursor: pointer;  
            font-weight: 700;
            border-radius: 50%;
            padding: 1px 3px 0 3px;
            align-items: center;
            justify-content: center;
        }
        .summarise-with-chat:hover{
          background-color: #5c5a5a;
        } 
        .default-item{
            position: absolute;
            display: flex;
            top: 0;
            right: 27px;
            width: 25px;
            height: 25px;
            cursor: pointer;
            justify-content: center;
            align-items: center;
        }
        .x-icon {
            position: absolute;
            display: flex;
            top: 0;
            right: 0;
            width: 25px;
            height: 25px;
            cursor: pointer;
            justify-content: center;
            align-items: center;
        }
        .default-item:hover,
        .chevron-up-wrapper img:hover,
        .x-icon:hover{
            border-radius: 25px;
            background-color: #5c5a5a;
        }
        .subtitle-text {
            position: relative;
            align-self: stretch;
            height: 38px;
            margin-bottom: 5px; 
        }
        .sub-text {
            position: relative;
            font-weight: 300;
            font-size:16px;
            overflow-y: auto;
            max-height: 9em;
            line-height: 1.2em;
            text-align: left;
            scroll-behavior: smooth;  
            min-height: 58px;
        }
        .up-down {
            display: flex;
            justify-content: center;
            padding: 3px;
            cursor: pointer;  
        }
        .up-down:hover{ 
            border-radius: 25px;
            background-color: #5c5a5a;
        }
        .subtitles-text-view,
        .main-frame1 {
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
        .subtitles-text-view {
            flex-direction: row;
            padding: 0 5px;
        }
        .main-frame1 {
            align-self: stretch;
            flex-direction: column;
            gap: 8px 0;
        } 
        .subtitles-streaming-view {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start; 
        }
        .subtitles-streaming-view {
            width: 500px; 
            position: fixed;
            border-radius: 5px;
            border: 1px solid #fff;
            background-color: rgba(52, 53, 57, 0.9);
            overflow: hidden;
            flex-direction: column; 
            padding: 5px 9px 9px 19px;
            box-sizing: border-box;
            gap: 151px 0;
            color: #fff;  
            top: 50%;
            left: 30%;
            font-size:14px;
            height: auto;
            display:none;
            z-index:10000000000000000000000; 
            min-width: 400px;
            min-height: 130px;
        } 
        .sub-text::-webkit-scrollbar {
            width: 8px;
        }
    
        /* màu nền của track */
        .sub-text::-webkit-scrollbar-track {
            background: #888; 
            border-radius: 15px;
        }
    
        /* màu của thanh cuộn */
        .sub-text::-webkit-scrollbar-thumb {
            background: #f1f1f1;  
            border-radius: 15px;
        }
    
        /* Kéo thả */
        .resize-handle {
            position: absolute;
        }
        .bottom {
            content: '';
            top: 0;
            right: 0; 
            height: calc(100% - 10px);
            width: 10px;
            cursor: ew-resize; 
        }
    
        .right {
            content: '';
            left: 0;
            bottom: 0;  
            width: calc(100% - 10px);
            height: 10px;
            cursor: ns-resize; 
        }
    
        .bottom-right {
            content: '';
            bottom: 0;
            right: 0;
            width: 10px;
            height: 10px;
            cursor: nwse-resize;   
        }
    
        </style>
        <div class="subtitles-streaming-view">
          <div class="main-frame1">
            <div class="subtitle-text">
              <div class="streaming-caption">Streaming Caption</div>
              <div class="copy-view" title="Copy text">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                </svg> 
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16" style="display:none;">
                  <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
                </svg>
              </div>
              <div class="summarise-with-chat" title="Summarise with Chat">
                <div class="summarise-child">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-filter-left" viewBox="0 0 16 16">
                    <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                  </svg>
                </div>
              </div> 
              <div class="default-item" title="Default size">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-box-arrow-in-up-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M9.636 13.5a.5.5 0 0 1-.5.5H2.5A1.5 1.5 0 0 1 1 12.5v-10A1.5 1.5 0 0 1 2.5 1h10A1.5 1.5 0 0 1 14 2.5v6.636a.5.5 0 0 1-1 0V2.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h6.636a.5.5 0 0 1 .5.5"/>
                  <path fill-rule="evenodd" d="M5 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H6.707l8.147 8.146a.5.5 0 0 1-.708.708L6 6.707V10.5a.5.5 0 0 1-1 0z"/>
                </svg>
              </div>
              <div class="x-icon" title="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
              </div>
            </div>
            <div class="subtitles-text-view">
              <div class="sub-text"></div>
            </div>
          </div>
          <div class="resize-handle right"></div>
          <div class="resize-handle bottom"></div>
          <div class="resize-handle bottom-right"></div> 
        </div>
`;


let htmlSubtitlesBtnRight = `
<style>
.container {
  position: fixed;
  top: 60%;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;  
  gap: 6px;  
  z-index:10000000000000000000000;

}
.container-content {
  display: flex;
  flex-direction: column;  
  align-items: flex-end;
  gap: 6px;
  background: #ffffff;
  margin-right: 3px;
  border-radius: 32px;
  transition: opacity 0.3s ease;
  opacity:0.3;
  box-shadow: 0 0 8px 4px #00000014;
}
.btn-record,
.btn-subtitles { 
  background: #ffffff;
  border-radius: 32px;
  color: #000000;
  padding: 8px 12px;
  border: none;
  cursor: pointer; 
  transition: all 0.3s ease;
  justify-content: center;
  align-items: center; 
} 

.btn-record{
  display: none;
}  
.container-content button:hover{
  background: #e7e7e7; 
  color: #5700fa;

}

.right-btn {
  background-image: linear-gradient(10deg, #8a57ea 50%, #32c5ff);
  color: #fff;
  padding: 10px 14px;
  border: none;
  border-radius: 23px 0 0 23px;
  cursor: pointer;
  box-shadow: 0 0 8px 4px #00000014;
  transition: padding 0.3s ease;
  border-width: 1px 0 1px 1px;
  border-style: solid;
  justify-content: center;
  align-items: center;
}
.right-btn:hover{
  padding: 10px 18px;
}

</style>
<div class="container">
  <button class="right-btn" title="Ctrl+M to chat">
      Nút
  </button>
  <div class="container-content">
    <button class="btn-subtitles" title="Subtitles Streaming">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-card-heading" viewBox="0 0 16 16">
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
            <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z"/>
        </svg>
    </button>
    <button class="btn-record" title="Click to paste image">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-record-btn" viewBox="0 0 16 16">
        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
      </svg>
    </button>
  </div>
</div>
`

var isShowSidepanel = true;

var close_record = 0
var isRecording = false;
var recorder;
var isSummarise = false;
var token; 

if (window.location.hostname == "127.0.0.1") { 
  token = localStorage.getItem('token');
  console.log('Token:', token);
  chrome.storage.local.set({token: token}, function() {
    console.log('Token đã được lưu');
  });
} else {
  console.log('Không có token trong local storage.');
}



function defaultSize(element,eleSize,subText){
  element.addEventListener('click', function() {
    eleSize.style.width = '500px';
    eleSize.style.height = '210px';
    subText.style.maxHeight = '140px';
    scrollToBottom(subText);
  })
}
function copyText(eleClick,eletext,eleCheck,eleCopy) { 
  eleClick.addEventListener('click', function() {
    navigator.clipboard.writeText(eletext.innerText);
    if (eleCheck.style.display === "none") {
      eleCheck.style.display = "block";
      eleCopy.style.display = "none";
      setTimeout(function() {
          eleCheck.style.display = "none";
          eleCopy.style.display = "block";
      }, 2000);
    } 
  });
}
function scrollToBottom(element) { 
  element.scrollTop = element.scrollHeight;
}

function dragInit(elemToDrag,elemHeight,elemClick) {
  let pos3 = 0, pos4 = 0;
  let isResizing = false;
  let resizeDirection = ''; 

  elemToDrag.onmousedown = function(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;

    offsetX = pos3 - elemToDrag.offsetLeft;
    offsetY = pos4 - elemToDrag.offsetTop;

    var target = e.target || e.srcElement;
    let rect = elemToDrag.getBoundingClientRect();
    let right = rect.right;
    let bottom = rect.bottom;

    if (e.clientX >= right - 10 && e.clientX <= right && e.clientY >= bottom - 10 && e.clientY <= bottom) {
      // Bắt đầu thay đổi kích thước
      isResizing = true;
      resizeDirection = 'both';
      elemToDrag.style.cursor = 'nwse-resize';
    } else if (e.clientX >= right - 10 && e.clientX <= right) {
      // Bắt đầu thay đổi kích thước theo chiều ngang
      isResizing = true;
      resizeDirection = 'horizontal';
      elemToDrag.style.cursor = 'ew-resize';
    } else if (e.clientY >= bottom - 10 && e.clientY <= bottom) {
      // Bắt đầu thay đổi kích thước theo chiều dọc
      isResizing = true;
      resizeDirection = 'vertical';
      elemToDrag.style.cursor = 'ns-resize';
    } else {
      // Bắt đầu di chuyển
      isResizing = false;
      resizeDirection = '';
      elemClick.style.cursor = 'grabbing'; 
    }

    document.onmousemove = function(e) {
        e = (e || window.event);
        e.preventDefault();
        if (isResizing) {
            // Logic thay đổi kích thước
            if (resizeDirection === 'both' || resizeDirection === 'horizontal') {
                let width = e.clientX - rect.left;
                elemToDrag.style.width = width + 'px';
                scrollToBottom(elemHeight);
            }
            if (resizeDirection === 'both' || resizeDirection === 'vertical') {
                let height = e.clientY - rect.top;
                elemToDrag.style.height = height + 'px'; 
                elemHeight.style.maxHeight = (height - elemHeight.offsetTop - 10) + 'px'; 
                scrollToBottom(elemHeight);
                if(elemToDrag.clientHeight < 140) {
                elemHeight.style.overflow = "hidden";
                } else {
                elemHeight.style.overflow = "auto";
                }
            }
        } else {
            // Logic di chuyển
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            if (target === elemClick) {
              elemToDrag.style.top = (elemToDrag.offsetTop - pos2) + "px";
              elemToDrag.style.left = (elemToDrag.offsetLeft - pos1) + "px";
            } 
        }
    }; 

    document.onmouseup = function() {
      document.onmouseup = null;
      document.onmousemove = null;
      elemToDrag.style.cursor = '';
    };
  };
}

function dragRight(element,elementChild) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  element.onpointerdown = function(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onpointerup = closeDragElement;
    document.onpointermove = elementDrag;
  }

  function elementDrag(e) {
    //  Khi kéo
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
    element.style.right = "auto";
    elementChild.style.borderRadius = "25px";
  }

  function closeDragElement() {
    // Khi thả chuột  
    element.style.right = "0px";  
    element.style.left = "auto";  
    elementChild.style.borderRadius = "15px 0 0 15px";
    document.onpointerup = null;
    document.onpointermove = null;
  }
}

const now = new Date();
const time_str = now.toString();

function startRecord(subText) {
  navigator.mediaDevices.getDisplayMedia({ video: true, audio: true,preferCurrentTab:true }).then(stream => {

    const options = {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
      mimeType: 'video/webm;codecs=vp9,opus',
    };
    recorder = new MediaRecorder(stream, options);

    let isRecording = false; // Thêm biến này để theo dõi trạng thái ghi âm
    let recordTimeout; // Biến để theo dõi hẹn giờ

    recorder.addEventListener('dataavailable', async evt => {
      if (recorder.state === "inactive") {
        console.log('Turn Off Record !!!');
        isRecording = false;
        return;
      }

      if (evt.data.size > 0 && recorder.state === "recording" && isRecording === true) {
        const blob = new Blob([evt.data], { type: 'video/webm' }); 
        const formData = new FormData();
        formData.append("video", new File([blob], `record_${time_str}.webm`));
        console.log(formData);

        // Lời gọi fetch phải nằm trong hàm async
        async function makepredict() {
          const token = await new Promise((resolve, reject) => {
            chrome.storage.local.get(['token'], function(result) { 
              resolve(result.token);
            });
          });
          
          const response = await fetch(`http://127.0.0.1:8000/api/audio/${time_str}/vi/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              Authorization: 'Token ' + token
            },
            body: formData,
          });
          
          return await response.json();
        };

        makepredict().then(function (result) {
          if (result['translate'] !== "oke") {
            subText.textContent += " " +  result['translate'];
            
            scrollToBottom(subText);
            chrome.storage.local.set({summariseChat: subText.innerText,isSummarise:isSummarise}, function() {
              console.log('summariseChat đã được lưu');
            });
          } else {
            console.log("Không có dữ liệu trả về từ server.");
          }
        });
      }
    });

    const recordDuration = 1000; // Thời gian ghi âm trong mỗi lần
    const restartRecording = () => {
      recorder.stop();
      clearInterval(recordTimeout);
      recorder.start();
      isRecording = true;
      recordTimeout = setTimeout(restartRecording, recordDuration);
    };

    recorder.start();
    isRecording = true;
    recordTimeout = setTimeout(restartRecording, recordDuration);
  });
}

 
  
let list_text = [];
// function startRecord(subText) {
//   const ws = new WebSocket('ws://127.0.0.1:8000/ws/audio/');
//   ws.onopen = function(e) {
//     console.log('WebSocket is open now !!!');
//   };


//   navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(stream => {

//     const options = {
//       audioBitsPerSecond: 128000,
//       videoBitsPerSecond: 2500000,
//       mimeType: 'video/webm;codecs=vp9,opus',
//     };
//     recorder = new MediaRecorder(stream, options);

//     let isRecording = false; // Thêm biến này để theo dõi trạng thái ghi âm
//     let recordTimeout; // Biến để theo dõi hẹn giờ

//     recorder.addEventListener('dataavailable', async evt => {
//       if (recorder.state === "inactive") {
//         console.log('Turn Off Record !!!');
//         isRecording = false;
//         return;
//       }

//       if (evt.data.size > 0 && recorder.state === "recording" && isRecording === true) { 
//         const blob = new Blob([evt.data], { type: 'video/webm' }); 
//         const reader = new FileReader();
//         reader.onload = function() {
//             const bytes = new Uint8Array(reader.result);  
//             ws.send(bytes);
//         }
//         reader.readAsArrayBuffer(blob);

//         // lấy dữ liệu từ websocket
//         ws.onmessage = function(event) {
//           const message = JSON.parse(event.data);
//           console.log(message.text);
//           // if (list_text.length === 0) {
//           //   list_text.push(message.text);
//           //   subText.textContent += "\u200B" + list_text[list_text.length - 1]; 
//           // } else if (list_text.length > 3) {
//           //   list_text = [];
//           //   list_text.push(message.text);
//           //   subText.textContent += "\u200B" + list_text[list_text.length - 1];
//           // } else {
//           //   list_text.push(message.text);
//           //   let subTextContentArray = subText.textContent.split("\u200B");
//           //   let remove = subTextContentArray.pop();
//           //   subText.textContent -= remove;
//           //   subText.textContent += "\u200B" + list_text[list_text.length - 1];
//           // }
//           subText.textContent += "\u200B" + message.text;
//           scrollToBottom(subText);
//           chrome.storage.local.set({summariseChat: subText.innerText,isSummarise:isSummarise}, function() {
//             console.log('summariseChat đã được lưu');
//           });
//         };
        
//       }
//     });

//     const recordDuration = 1000; // Thời gian ghi âm trong mỗi lần
//     const restartRecording = () => {
//       recorder.stop();
//       clearInterval(recordTimeout);
//       recorder.start();
//       isRecording = true;
//       recordTimeout = setTimeout(restartRecording, recordDuration);
//     };

//     recorder.start();
//     isRecording = true;
//     recordTimeout = setTimeout(restartRecording, recordDuration);
//   });
// }


function createWorkerImage(base64){   
  const request = {
      requests: {
          image: {
              content: base64
          },
          features: [{
              type: "DOCUMENT_TEXT_DETECTION",
              maxResults: 50
          }]
      }
  }; 
  // tạo header
  const header = {
      method: "POST",
      headers: {
          "Content-Type": "application/json; charset=utf-8 "
      },
      body: JSON.stringify(request)
  };
  // gửi request
  fetch("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyC-9Kp13Vb6yWzzP5MlNdABT-YvNwn7TOo", header)
      .then(response => response.json())
      .then(data => {
          const text = data.responses[0].fullTextAnnotation.text;
          console.log(text);
      })
      .catch(error => console.error('Error:', error));  
}
function waitForSubtitles() {
    const wrapper = document.querySelector("html");
    
    if (wrapper) {
        const shadowWrapper1 = document.createElement('paso-subtitles');
        shadowWrapper1.className = 'subtitles';
        const streamingCaptionRoot = shadowWrapper1.attachShadow({mode: 'open'});
        streamingCaptionRoot.innerHTML = htmlSubtitlesText;

        const xIcon = streamingCaptionRoot.querySelector('.x-icon');
        xIcon.src = chrome.runtime.getURL("./static/x.svg"); 
 
        const subtitlesStreamingView = streamingCaptionRoot.querySelector(".subtitles-streaming-view")
        const copy = streamingCaptionRoot.querySelector('.copy-view')
        const defaultItem = streamingCaptionRoot.querySelector('.default-item')
        const subText = streamingCaptionRoot.querySelector('.sub-text')
        const biCopy = streamingCaptionRoot.querySelector('.bi-copy');
        const biCheckAll = streamingCaptionRoot.querySelector('.bi-check-all');
        const summariseWithChat = streamingCaptionRoot.querySelector('.summarise-with-chat'); 
        const subtitlesText = streamingCaptionRoot.querySelector('.subtitle-text');
        xIcon.addEventListener("click", function() {
            subtitlesStreamingView.style.display = 'none';
            isRecording = false;
        });

        // Summarise with chat streaming
        summariseWithChat.addEventListener("click", function() {
          if(isShowSidepanel){
            chrome.runtime.sendMessage({ type: 'open_side_panel' });
            isShowSidepanel = false;
            chrome.storage.local.get(['token'], function(result) {
              if(result.token != 'None' && result.token != null && result.token != ''){
                chrome.storage.local.set({isSummarise: true});
              }
            }); 
          }else{
            chrome.storage.local.get(['token'], function(result) {
              if(result.token != 'None' && result.token != null && result.token != ''){
                chrome.storage.local.set({isSummarise: true});
              }
            }); 
          }
        });
        chrome.storage.local.set({summariseChat: subText.innerText,isSummarise:isSummarise}, function() {
          console.log('summariseChat đã được lưu');
        });
        window.onload = function() { 
          scrollToBottom(subText);
          copyText(copy,subText,biCheckAll,biCopy);
          dragInit(subtitlesStreamingView,subText,subtitlesText);
          defaultSize(defaultItem,subtitlesStreamingView,subText);
        };
        chrome.storage.local.get(['token'], function(result) {
          if(result.token != 'None' && result.token != null && result.token != ''){
            chrome.runtime.sendMessage({ type: 'sets_side_panel', path: 'popup.html' });
            console.log('Token lưu trữ là: ', result.token);
          }else{
            chrome.runtime.sendMessage({ type: 'sets_side_panel', path: 'linkSignup.html' });
          }
        });
        
 
        // Button right
        const shadowWrapperBtnRight = document.createElement('paso-subtitles-right');
        shadowWrapperBtnRight.className = 'subtitles-btn-right';
        const shadowRootBtnRight = shadowWrapperBtnRight.attachShadow({mode: 'open'});
        shadowRootBtnRight.innerHTML = htmlSubtitlesBtnRight;
 
        const container = shadowRootBtnRight.querySelector(".container");
        const subBtnRight = shadowRootBtnRight.querySelector(".btn-subtitles");
        const btnRight = shadowRootBtnRight.querySelector(".right-btn");
        const btnPasteImg = shadowRootBtnRight.querySelector(".btn-record");
        subBtnRight.addEventListener("click", function() { 
          if (!isRecording){  
            console.log("111");
            subtitlesStreamingView.style.display = 'block';
            startRecord(subText); 
            isRecording = true; 
          }else{
            console.log("222")
            isRecording = false;
            subtitlesStreamingView.style.display = 'none';  
          }
        });
        
        //  Button side panel
        btnRight.addEventListener("click", () => { 
          if (isShowSidepanel) {
            chrome.runtime.sendMessage({ type: 'open_side_panel'});
            isShowSidepanel = false;
          } else {
            chrome.runtime.sendMessage({ type: 'close_side_panel'});
            isShowSidepanel = true;
          }
        });

        // Key event side panel
        document.addEventListener('keydown', function(event) {
          if (event.ctrlKey && event.code === 'KeyM') {
            if (isShowSidepanel) {
              chrome.runtime.sendMessage({ type: 'open_side_panel'});
              isShowSidepanel = false;
            } else {
              chrome.runtime.sendMessage({ type: 'close_side_panel'});
              isShowSidepanel = true;
            }
          }
        });
        
        dragRight(container,btnRight); 
        
        // cap màn hình 
        btnPasteImg.addEventListener('click', function(event) {
          navigator.clipboard.read().then((clipboardItems) => {
            for (const clipboardItem of clipboardItems) {
                clipboardItem.getType().then((types) => {
                    if (types.includes('image/png') || types.includes('image/jpeg')) {
                        clipboardItem.getType(types[0]).then((blob) => {
                            console.log('Đã đọc thành công một hình ảnh từ clipboard');
                            // Ở đây bạn có thể thực hiện các xử lý với hình ảnh đã đọc được
                        }).catch((error) => {
                            console.error('Đã xảy ra lỗi khi đọc hình ảnh từ clipboard:', error);
                        });
                    }
                }).catch((error) => {
                    console.error('Đã xảy ra lỗi khi đọc kiểu dữ liệu từ clipboard:', error);
                });
            }
        }).catch((error) => {
            console.error('Đã xảy ra lỗi khi đọc dữ liệu từ clipboard:', error);
        });
        
        });
        // xử lý file load ảnh


        // ---------------------------------------------------
        shadowRootBtnRight.querySelector('.container-content').addEventListener('mouseover', function() {
          shadowRootBtnRight.querySelector('.btn-record').style.display = 'block';
          shadowRootBtnRight.querySelector('.container-content').style.opacity = '1'; 
        });
    
        shadowRootBtnRight.querySelector('.container-content').addEventListener('mouseout', function() {
          shadowRootBtnRight.querySelector('.btn-record').style.display = 'none';
          shadowRootBtnRight.querySelector('.container-content').style.opacity = '0.3';
        });

        const body = document.querySelector("body"); 
        wrapper.insertBefore(shadowWrapper1, body.nextSibling);
        wrapper.insertBefore(shadowWrapperBtnRight, shadowWrapper1.nextSibling);
    } 
    else {
      console.log('waiting')
      setTimeout(waitForSubtitles, 2000);
    }
}

waitForSubtitles();
