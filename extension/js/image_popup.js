function createWorkerImage(file){
	const textarea = document.getElementById('message-input');
	const progress = document.getElementById('myProgress');
	const progressBar = document.getElementById('progress-bar');
	progress.style.display = 'block';
	progressBar.style.display = 'block';
	textarea.innerHTML = '';
	// chuyển dịnh dạng file sang base64
	const reader = new FileReader();
	reader.onprogress = function(event) {
        if (event.lengthComputable) {
            const percentLoaded = Math.round((event.loaded / event.total) * 100); 
            progress.value = percentLoaded;
			progressBar.value = `${percentLoaded}%`;
        }
    };
	reader.readAsDataURL(file);
	reader.onload = function () {
		const base64 = reader.result.split(',')[1];
		// tạo request
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
				textarea.value = text;
				autoExpandTextarea(textarea);
			})
			.catch(error => console.error('Error:', error));
		progress.style.display = 'none';
		progressBar.style.display = 'none';
	};
}
function autoExpandTextarea(textarea) {
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

// drag and drop image
document.body.addEventListener('dragover', (e) => {
	const dropArea = document.getElementById('img-to-text-drag-and-drop-overlay');
	dropArea.style.display = 'block';
    e.preventDefault();
    e.stopPropagation();
});

document.body.addEventListener('drop', async (e) => { 
	const dropArea = document.getElementById('img-to-text-drag-and-drop-overlay');
	dropArea.style.display = 'none'; 
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const hiddenFileInput = document.getElementById('hidden-file-input');
    hiddenFileInput.files = e.dataTransfer.files;
 
    createWorkerImage(file); 
	// reset file input
	hiddenFileInput.value = '';
});

// upload image
document.addEventListener('DOMContentLoaded', () => {
	const uploadButton = document.getElementById('upload-button-image'); 
	const hiddenFileInput = document.getElementById('hidden-file-input');

	uploadButton.addEventListener('click', () => {
		hiddenFileInput.click();
	});
	hiddenFileInput.addEventListener('change', async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		createWorkerImage(file); 
		// reset file input
		e.target.value = '';

	});
});

