document.addEventListener("DOMContentLoaded", function () {
    // Thêm sự kiện scroll cho việc hiển thị đường viền dưới của avatar khi cuộn
    const avatarContainer = document.querySelector(".chat-header-child");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 0) {
            avatarContainer.style.borderBottom = "1px solid #ccc";
        } else {
            avatarContainer.style.borderBottom = "none";
        }
    });

    // Sự kiện toggleDropdown cho biểu tượng danh sách
    function toggleDropdownList() {
        const dropdownContent = document.querySelector(".dropdown-content");
        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    }
    document.querySelector(".list-icon").addEventListener("click", toggleDropdownList);

    // Sự kiện click bên ngoài dropdown để đóng dropdown
    document.addEventListener("click", function (event) {
        const targetElement = event.target;
        if (!targetElement.closest(".list-icon")) {
            const dropdownContent = document.querySelector(".dropdown-content");
            dropdownContent.style.display = "none";
        }
    });

    // Liên quan đến việc mở rộng và hiệu ứng textarea khi nhập nội dung
    const textarea = document.querySelector('#message-input');
    const chatInput = document.querySelector('.input-container');

    textarea.addEventListener('focus', function () {
        chatInput.style.backgroundColor = '#fff';
        textarea.style.backgroundColor = '#fff';
        textarea.style.borderColor = '#fff';
    });

    textarea.addEventListener('blur', function () {
        chatInput.style.backgroundColor = 'rgb(247 247 247)';
        textarea.style.backgroundColor = 'rgb(247 247 247)';
        textarea.style.borderColor = 'rgb(247 247 247)';
    });

    textarea.addEventListener("input", function () {
        autoExpandTextarea();
    });
    
    function autoExpandTextarea() {
        textarea.style.height = "inherit";
        const computedStyle = window.getComputedStyle(textarea);
        let height = parseInt(computedStyle.getPropertyValue("border-top-width"), 10)
            + parseInt(computedStyle.getPropertyValue("padding-top"), 10)
            + textarea.scrollHeight
            + parseInt(computedStyle.getPropertyValue("padding-bottom"), 10)
            + parseInt(computedStyle.getPropertyValue("border-bottom-width"), 10);

        height = Math.min(10 * 16, height);

        textarea.style.height = height + "px";
    }


    function toggleDropdown() {
        const dropdownContent = document.querySelector(".dropdown-content-bot-menu");
        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    }
    document.querySelector(".bot-chill").addEventListener("click", toggleDropdown);

    document.addEventListener("click", function (event) {
        const targetElement = event.target;
        if (!targetElement.closest(".bot-chill")) {
            const dropdownContent = document.querySelector(".dropdown-content-bot-menu");
            dropdownContent.style.display = "none";
        }
    });



    // Sự kiện click vào nút gửi tin nhắn
    const sendMessageButton = document.querySelector('.send-button');
    const sendMessageButtonIcon = document.querySelector('.send-button > svg');
    const chatMessagesContainer = document.querySelector('.chat-messages-child');
    const introduceContainer = document.querySelector('.introduce-container');

    let isSendingMessage = false;
    textarea.addEventListener('keydown', function(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); 
            sendMessage(textarea.value.trim());
            window.scrollTo(0, document.body.scrollHeight);
        }
    });
    sendMessageButton.addEventListener('click', () => {
        sendMessage(textarea.value.trim());
        window.scrollTo(0, document.body.scrollHeight);
    });
    // send message function
    function sendMessage(messageText) {
        if (isSendingMessage) {
            return; 
        } 

        if (messageText === '') {
            alert('Vui lòng nhập nội dung tin nhắn!');
            return;
        }
        isSendingMessage = true;
        introduceContainer.style.display = "none";
        sendMessageButtonIcon.style.color = "#ccc";
        let messageYou = `
            <div class="w-full text-token-text-primary" data-testid="conversation-turn-2" style="--avatar-color: #19c37d;">
                <div class="px-4 py-2 justify-center text-base md:gap-6 m-auto">
                <div class="flex flex-1 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] group">
                    <div class="flex-shrink-0 flex flex-col relative items-end">
                        <div>
                            <div class="pt-0.5">
                            <div class="gizmo-shadow-stroke flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                                <div class="relative flex" style="user-select: none;"><img alt="User" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" class="rounded-sm" src="https://lh3.googleusercontent.com/a/ACg8ocLb30V1enXmdwvAlU6R_j7UsxGtjAYOP89r3pel-9A9=s96-c" style="color: transparent;"></div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="relative flex w-full flex-col">
                        <div class="font-semibold select-none">You</div>
                        <div class="flex-col gap-1 md:gap-3">
                            <div class="flex flex-grow flex-col max-w-full">
                            <div data-message-author-role="user" data-message-id="aaa24eb6-0e08-4aeb-8385-bc54dc537c6f" class="min-h-[20px] text-message flex flex-col items-start gap-3 whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 overflow-x-auto">
                                <div class="">${messageText}</div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        `;
        chatMessagesContainer.insertAdjacentHTML('beforeend', messageYou);
        window.scrollTo(0, document.body.scrollHeight);

        let messageBot = `
            <div class="w-full text-token-text-primary" data-testid="conversation-turn-3" style="--avatar-color: #19c37d;">
                <div class="px-4 py-2 justify-center text-base md:gap-6 m-auto">
                    <div class="flex flex-1 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] group final-completion">
                        <div class="flex-shrink-0 flex flex-col relative items-end">
                            <div>
                                <div class="pt-0.5">
                                <div class="gizmo-shadow-stroke flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                                    <div class="relative p-1 rounded-sm h-9 w-9 text-white flex items-center justify-center" style="background-color: rgb(25, 195, 125); width: 24px; height: 24px;color:#fff;">
                                        <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm" role="img">
                                            <path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z" fill="currentColor"></path>
                                        </svg>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative flex w-full flex-col agent-turn">
                            <div class="font-semibold select-none">ChatGPT</div>
                            <div class="content-bot flex-col gap-1 md:gap-3">
                                <div class="flex flex-grow flex-col max-w-full">
                                    <div data-message-author-role="assistant" data-message-id="992a7965-9b73-465c-bebb-d7504c7ac2c4" class="min-h-[20px] text-message flex flex-col items-start gap-3 whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 overflow-x-auto">
                                        <div class="markdown prose w-full break-words dark:prose-invert light">
                                            <p class="text-bot"></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="icon-function display-none mt-1 flex justify-start gap-3 empty:hidden">
                                    <div class="text-gray-400 flex self-end lg:self-center items-center justify-center lg:justify-start mt-0 -ml-1 h-7 gap-[2px] visible">
                                        <span class="make-sound" data-state="closed" title="Read Aload">
                                            <button class="flex items-center gap-1.5 rounded-md p-1 text-xs text-token-text-tertiary hover:text-token-text-primary md:invisible md:group-hover:visible md:group-[.final-completion]:visible border-none">
                                                <svg style="display:block;" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="make-sound1 icon-md">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.9099C11 4.47485 10.4828 4.24734 10.1621 4.54132L6.67572 7.7372C6.49129 7.90626 6.25019 8.00005 6 8.00005H4C3.44772 8.00005 3 8.44776 3 9.00005V15C3 15.5523 3.44772 16 4 16H6C6.25019 16 6.49129 16.0938 6.67572 16.2629L10.1621 19.4588C10.4828 19.7527 11 19.5252 11 19.0902V4.9099ZM8.81069 3.06701C10.4142 1.59714 13 2.73463 13 4.9099V19.0902C13 21.2655 10.4142 22.403 8.81069 20.9331L5.61102 18H4C2.34315 18 1 16.6569 1 15V9.00005C1 7.34319 2.34315 6.00005 4 6.00005H5.61102L8.81069 3.06701ZM20.3166 6.35665C20.8019 6.09313 21.409 6.27296 21.6725 6.75833C22.5191 8.3176 22.9996 10.1042 22.9996 12.0001C22.9996 13.8507 22.5418 15.5974 21.7323 17.1302C21.4744 17.6185 20.8695 17.8054 20.3811 17.5475C19.8927 17.2896 19.7059 16.6846 19.9638 16.1962C20.6249 14.9444 20.9996 13.5175 20.9996 12.0001C20.9996 10.4458 20.6064 8.98627 19.9149 7.71262C19.6514 7.22726 19.8312 6.62017 20.3166 6.35665ZM15.7994 7.90049C16.241 7.5688 16.8679 7.65789 17.1995 8.09947C18.0156 9.18593 18.4996 10.5379 18.4996 12.0001C18.4996 13.3127 18.1094 14.5372 17.4385 15.5604C17.1357 16.0222 16.5158 16.1511 16.0539 15.8483C15.5921 15.5455 15.4632 14.9255 15.766 14.4637C16.2298 13.7564 16.4996 12.9113 16.4996 12.0001C16.4996 10.9859 16.1653 10.0526 15.6004 9.30063C15.2687 8.85905 15.3578 8.23218 15.7994 7.90049Z" fill="currentColor"></path>
                                                </svg>
                                                <svg style="display:none;" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="make-sound2 icon-md">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9.5 8.5C8.94772 8.5 8.5 8.94772 8.5 9.5V14.5C8.5 15.0523 8.94772 15.5 9.5 15.5H14.5C15.0523 15.5 15.5 15.0523 15.5 14.5V9.5C15.5 8.94772 15.0523 8.5 14.5 8.5H9.5Z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                        </span>
                                        <span class="copy-chat" data-state="closed" title="Copy">
                                            <button class="flex items-center gap-1.5 rounded-md p-1 text-xs text-token-text-tertiary hover:text-token-text-primary md:invisible md:group-hover:visible md:group-[.final-completion]:visible border-none">
                                                <svg style="display:block;" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="copy icon-md">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C10.8954 3.5 10 4.39543 10 5.5H14C14 4.39543 13.1046 3.5 12 3.5ZM8.53513 3.5C9.22675 2.3044 10.5194 1.5 12 1.5C13.4806 1.5 14.7733 2.3044 15.4649 3.5H17.25C18.9069 3.5 20.25 4.84315 20.25 6.5V18.5C20.25 20.1569 19.1569 21.5 17.25 21.5H6.75C5.09315 21.5 3.75 20.1569 3.75 18.5V6.5C3.75 4.84315 5.09315 3.5 6.75 3.5H8.53513ZM8 5.5H6.75C6.19772 5.5 5.75 5.94772 5.75 6.5V18.5C5.75 19.0523 6.19772 19.5 6.75 19.5H17.25C18.0523 19.5 18.25 19.0523 18.25 18.5V6.5C18.25 5.94772 17.8023 5.5 17.25 5.5H16C16 6.60457 15.1046 7.5 14 7.5H10C8.89543 7.5 8 6.60457 8 5.5Z" fill="currentColor"></path>
                                                </svg>
                                                <svg style="display:none;" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="tick icon-md">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0633 5.67375C18.5196 5.98487 18.6374 6.607 18.3262 7.06331L10.8262 18.0633C10.6585 18.3093 10.3898 18.4678 10.0934 18.4956C9.79688 18.5234 9.50345 18.4176 9.29289 18.2071L4.79289 13.7071C4.40237 13.3166 4.40237 12.6834 4.79289 12.2929C5.18342 11.9023 5.81658 11.9023 6.20711 12.2929L9.85368 15.9394L16.6738 5.93664C16.9849 5.48033 17.607 5.36263 18.0633 5.67375Z" fill="currentColor">
                                                </svg>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div class="pr-2 lg:pr-0"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        chatMessagesContainer.insertAdjacentHTML('beforeend', messageBot);
        const textElements = chatMessagesContainer.querySelectorAll('.text-bot');
        const textElement = textElements[textElements.length - 1];
        const iconFunctions = chatMessagesContainer.querySelectorAll('.icon-function');
        const iconFunction = iconFunctions[iconFunctions.length - 1];
        textarea.value = '';
        textarea.focus();
        
        const checkbox = document.querySelector('.checkbox-rag');
        console.log(checkbox);
        checkbox.addEventListener('click', function() {
            // Kiểm tra xem checkbox có được chọn không
            if (checkbox.checked) {
                console.log("Checkbox is checked!");
            } else {
                console.log("Checkbox is not checked.");
            }
        });
        var link_chat = '';
        if (checkbox.checked) {
            link_chat = 'chat';
        } else {
            link_chat = 'rag-chat';
        }
        chrome.storage.local.get(['token'], function(result) { 
            console.log('authToken :', result.token);
            fetch(`http://127.0.0.1:8000/api/${link_chat}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + result.token
                },
                body: JSON.stringify({ message: messageText }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                isSendingMessage = false;
                sendMessageButtonIcon.style.color = "#4d4d4d";
                const messageTextBot = data.message;
                const formattedMessage = formatMessageText(messageTextBot);
                textElement.innerHTML = formattedMessage;
                textarea.style.height = "40px";
                iconFunction.style.display = "inline-block";
                window.scrollTo(0, document.body.scrollHeight);
                copyToClipboard();
                readAload();
            })
            .catch(error => {
                console.error('Error:', error);
                isSendingMessage = false;
                sendMessageButtonIcon.style.color = "#4d4d4d";
                const messageTextBot = "Xin lỗi, có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.";
                const formattedMessage = formatMessageText(messageTextBot);
                textElement.innerHTML = formattedMessage;
                textElement.style.color = "red"; 
                textarea.style.height = "40px";
                iconFunction.style.display = "inline-block";
                window.scrollTo(0, document.body.scrollHeight);
                copyToClipboard();
                readAload();
            }); 
        }); 
    };
    function sendSummarise(messageText) {
        if (isSendingMessage) {
            return; 
        } 

        if (messageText === '') {
            alert('Vui lòng nhập nội dung tin nhắn!');
            return;
        }
        isSendingMessage = true;
        introduceContainer.style.display = "none";
        sendMessageButtonIcon.style.color = "#ccc";
        let messageYou = `
        <div class="w-full text-token-text-primary" data-testid="conversation-turn-2" style="--avatar-color: #19c37d;">
            <div class="px-4 py-2 justify-center text-base md:gap-6 m-auto">
            <div class="flex flex-1 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] group">
                <div class="flex-shrink-0 flex flex-col relative items-end">
                    <div>
                        <div class="pt-0.5">
                        <div class="gizmo-shadow-stroke flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                            <div class="relative flex" style="user-select: none;"><img alt="User" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" class="rounded-sm" src="https://lh3.googleusercontent.com/a/ACg8ocLb30V1enXmdwvAlU6R_j7UsxGtjAYOP89r3pel-9A9=s96-c" style="color: transparent;"></div>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="relative flex w-full flex-col">
                    <div class="font-semibold select-none">You</div>
                        <div class="flex-col gap-1 md:gap-3">
                            <div class="flex flex-grow flex-col max-w-full">
                                <div data-message-author-role="user" data-message-id="aaa24eb6-0e08-4aeb-8385-bc54dc537c6f" class="min-h-[20px] text-message flex flex-col items-start gap-3 whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 overflow-x-auto">
                                    <div class="summarise-text-container">
                                        <div class="summarise-text-child">
                                            ${messageText}
                                        </div>
                                    </div>
                                    <div class="info-summarise-container">
                                        <div class="info-summarise-child">
                                            Summarise for streaming caption
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        chatMessagesContainer.insertAdjacentHTML('beforeend', messageYou);
        window.scrollTo(0, document.body.scrollHeight);
        let messageBot = `
            <div class="w-full text-token-text-primary" data-testid="conversation-turn-3" style="--avatar-color: #19c37d;">
                <div class="px-4 py-2 justify-center text-base md:gap-6 m-auto">
                    <div class="flex flex-1 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] group final-completion">
                        <div class="flex-shrink-0 flex flex-col relative items-end">
                            <div>
                                <div class="pt-0.5">
                                <div class="gizmo-shadow-stroke flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                                    <div class="relative p-1 rounded-sm h-9 w-9 text-white flex items-center justify-center" style="background-color: rgb(25, 195, 125); width: 24px; height: 24px;color:#fff;">
                                        <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm" role="img">
                                            <path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z" fill="currentColor"></path>
                                        </svg>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative flex w-full flex-col agent-turn">
                            <div class="font-semibold select-none">ChatGPT</div>
                            <div class="content-bot flex-col gap-1 md:gap-3">
                                <div class="flex flex-grow flex-col max-w-full">
                                    <div data-message-author-role="assistant" data-message-id="992a7965-9b73-465c-bebb-d7504c7ac2c4" class="min-h-[20px] text-message flex flex-col items-start gap-3 whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 overflow-x-auto">
                                        <div class="markdown prose w-full break-words dark:prose-invert light">
                                            <p class="text-bot"></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="icon-function display-none mt-1 flex justify-start gap-3 empty:hidden">
                                    <div class="text-gray-400 flex self-end lg:self-center items-center justify-center lg:justify-start mt-0 -ml-1 h-7 gap-[2px] visible">
                                        <span class="make-sound" data-state="closed" title="Read Aload">
                                            <button class="flex items-center gap-1.5 rounded-md p-1 text-xs text-token-text-tertiary hover:text-token-text-primary md:invisible md:group-hover:visible md:group-[.final-completion]:visible border-none">
                                                <svg style="display:block;" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="make-sound1 icon-md">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11 4.9099C11 4.47485 10.4828 4.24734 10.1621 4.54132L6.67572 7.7372C6.49129 7.90626 6.25019 8.00005 6 8.00005H4C3.44772 8.00005 3 8.44776 3 9.00005V15C3 15.5523 3.44772 16 4 16H6C6.25019 16 6.49129 16.0938 6.67572 16.2629L10.1621 19.4588C10.4828 19.7527 11 19.5252 11 19.0902V4.9099ZM8.81069 3.06701C10.4142 1.59714 13 2.73463 13 4.9099V19.0902C13 21.2655 10.4142 22.403 8.81069 20.9331L5.61102 18H4C2.34315 18 1 16.6569 1 15V9.00005C1 7.34319 2.34315 6.00005 4 6.00005H5.61102L8.81069 3.06701ZM20.3166 6.35665C20.8019 6.09313 21.409 6.27296 21.6725 6.75833C22.5191 8.3176 22.9996 10.1042 22.9996 12.0001C22.9996 13.8507 22.5418 15.5974 21.7323 17.1302C21.4744 17.6185 20.8695 17.8054 20.3811 17.5475C19.8927 17.2896 19.7059 16.6846 19.9638 16.1962C20.6249 14.9444 20.9996 13.5175 20.9996 12.0001C20.9996 10.4458 20.6064 8.98627 19.9149 7.71262C19.6514 7.22726 19.8312 6.62017 20.3166 6.35665ZM15.7994 7.90049C16.241 7.5688 16.8679 7.65789 17.1995 8.09947C18.0156 9.18593 18.4996 10.5379 18.4996 12.0001C18.4996 13.3127 18.1094 14.5372 17.4385 15.5604C17.1357 16.0222 16.5158 16.1511 16.0539 15.8483C15.5921 15.5455 15.4632 14.9255 15.766 14.4637C16.2298 13.7564 16.4996 12.9113 16.4996 12.0001C16.4996 10.9859 16.1653 10.0526 15.6004 9.30063C15.2687 8.85905 15.3578 8.23218 15.7994 7.90049Z" fill="currentColor"></path>
                                                </svg>
                                                <svg style="display:none;" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="make-sound2 icon-md">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9.5 8.5C8.94772 8.5 8.5 8.94772 8.5 9.5V14.5C8.5 15.0523 8.94772 15.5 9.5 15.5H14.5C15.0523 15.5 15.5 15.0523 15.5 14.5V9.5C15.5 8.94772 15.0523 8.5 14.5 8.5H9.5Z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                        </span>
                                        <span class="copy-chat" data-state="closed" title="Copy">
                                            <button class="flex items-center gap-1.5 rounded-md p-1 text-xs text-token-text-tertiary hover:text-token-text-primary md:invisible md:group-hover:visible md:group-[.final-completion]:visible border-none">
                                                <svg style="display:block;" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="copy icon-md">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C10.8954 3.5 10 4.39543 10 5.5H14C14 4.39543 13.1046 3.5 12 3.5ZM8.53513 3.5C9.22675 2.3044 10.5194 1.5 12 1.5C13.4806 1.5 14.7733 2.3044 15.4649 3.5H17.25C18.9069 3.5 20.25 4.84315 20.25 6.5V18.5C20.25 20.1569 19.1569 21.5 17.25 21.5H6.75C5.09315 21.5 3.75 20.1569 3.75 18.5V6.5C3.75 4.84315 5.09315 3.5 6.75 3.5H8.53513ZM8 5.5H6.75C6.19772 5.5 5.75 5.94772 5.75 6.5V18.5C5.75 19.0523 6.19772 19.5 6.75 19.5H17.25C18.0523 19.5 18.25 19.0523 18.25 18.5V6.5C18.25 5.94772 17.8023 5.5 17.25 5.5H16C16 6.60457 15.1046 7.5 14 7.5H10C8.89543 7.5 8 6.60457 8 5.5Z" fill="currentColor"></path>
                                                </svg>
                                                <svg style="display:none;" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="tick icon-md">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0633 5.67375C18.5196 5.98487 18.6374 6.607 18.3262 7.06331L10.8262 18.0633C10.6585 18.3093 10.3898 18.4678 10.0934 18.4956C9.79688 18.5234 9.50345 18.4176 9.29289 18.2071L4.79289 13.7071C4.40237 13.3166 4.40237 12.6834 4.79289 12.2929C5.18342 11.9023 5.81658 11.9023 6.20711 12.2929L9.85368 15.9394L16.6738 5.93664C16.9849 5.48033 17.607 5.36263 18.0633 5.67375Z" fill="currentColor">
                                                </svg>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div class="pr-2 lg:pr-0"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        chatMessagesContainer.insertAdjacentHTML('beforeend', messageBot);
        const textElements = chatMessagesContainer.querySelectorAll('.text-bot');
        const textElement = textElements[textElements.length - 1];
        const iconFunctions = chatMessagesContainer.querySelectorAll('.icon-function');
        const iconFunction = iconFunctions[iconFunctions.length - 1];
        textarea.value = '';
        textarea.focus();
        chrome.storage.local.get(['token'], function(result) { 
            console.log('authToken :', result.token);
            fetch(`http://127.0.0.1:8000/api/summarizer/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + result.token
                },
                body: JSON.stringify({ text: messageText }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                isSendingMessage = false;
                sendMessageButtonIcon.style.color = "#4d4d4d";
                const messageTextBot = data.text;
                const formattedMessage = formatMessageText(messageTextBot);
                textElement.innerHTML = formattedMessage;
                textarea.style.height = "40px";
                iconFunction.style.display = "inline-block";
                window.scrollTo(0, document.body.scrollHeight);
                copyToClipboard();
                readAload();
            })
            .catch(error => {
                console.error('Error:', error);
                isSendingMessage = false;
                sendMessageButtonIcon.style.color = "#4d4d4d";
                const messageTextBot = "Xin lỗi, có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.";
                const formattedMessage = formatMessageText(messageTextBot);
                textElement.innerHTML = formattedMessage;
                textElement.style.color = "red"; 
                textarea.style.height = "40px";
                iconFunction.style.display = "inline-block";
                window.scrollTo(0, document.body.scrollHeight);
                copyToClipboard();
                readAload();
            }); 
        }); 

    }
    // Summarise chat Click event in popup
    const summariseChat = document.querySelector('.btn-neutral'); 
    const summariseChild = document.querySelector('.summarise-child');  

    if (summariseChat) {  
        summariseChat.addEventListener("click", function() {
            chrome.storage.local.set({isSummarise: true});
            window.location.reload();
        });
    }
    if (summariseChild) {  
        summariseChild.addEventListener("click", function() {
            chrome.storage.local.set({isSummarise: true});
            window.location.reload();
        });
    }

    // Copy bot chat
    function copyToClipboard() {
        const copyChats = chatMessagesContainer.querySelectorAll('.copy-chat');
        
        copyChats.forEach(function(copyChat) {
            copyChat.addEventListener("click", function() {
                const contentBot = copyChat.closest('.content-bot')
                const text = contentBot.querySelector('.text-bot').innerText;
                navigator.clipboard.writeText(text);

                const checkIcon = copyChat.querySelector('.tick');
                const svgIcon = copyChat.querySelector('.copy');
                checkIcon.style.display = "block";
                svgIcon.style.display = "none";
                setTimeout(function() {
                    checkIcon.style.display = "none";
                    svgIcon.style.display = "block";
                }, 2000);
            });
        }); 
    }
    // Read Aload bot chat
    function readAload() {
        const makeSounds = chatMessagesContainer.querySelectorAll('.make-sound');
        makeSounds.forEach(function(makeSound) {
            makeSound.addEventListener("click", function() {
                const iconSound = makeSound.querySelector('.make-sound1');
                const svgIcon = makeSound.querySelector('.make-sound2');
                if (speechSynthesis.speaking) {
                    speechSynthesis.cancel(); 
                    
                    iconSound.style.display = "block";
                    svgIcon.style.display = "none";
                } else {
                    const contentBot = makeSound.closest('.content-bot');
                    const text = contentBot.querySelector('.text-bot').innerText;

                    
                    const lang = 'vi-VN';
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.lang = lang;
                    utterance.onstart = function(event) { 
                        iconSound.style.display = "none";
                        svgIcon.style.display = "block";
                    };
                    utterance.onend = function(event) { 
                        iconSound.style.display = "block";
                        svgIcon.style.display = "none";
                    };
                    speechSynthesis.speak(utterance); 
                }
            });
        });
    }

    // Chat với summarise
    chrome.storage.local.get(['summariseChat','isSummarise'], function(result) {
        if (result.isSummarise) {
            let textChat = "";
            if (result.summariseChat) {
                textChat = result.summariseChat;
            } 
            console.log(textChat);
            sendSummarise(textChat);
            chrome.storage.local.set({isSummarise: false});
        }
    });

    
});

function formatMessageText(messageText) {
    const sentences = messageText.split(/(###\s*\d*\.\s*|###\s*|\.\s)/);
    let formattedText = '';

    sentences.forEach(sentence => {
        sentence = sentence.trim();
        if (sentence === '###' || sentence === '') {
            return; 
        }
        
        sentence = sentence.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        if (sentence.endsWith('.') || sentence.endsWith(',')) {
            formattedText += sentence + ' ';
        } else {
            formattedText += sentence + '<br>'; 
        }
    });

    return formattedText;
}