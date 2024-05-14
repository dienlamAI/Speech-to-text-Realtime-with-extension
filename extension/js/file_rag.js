document.addEventListener('DOMContentLoaded', function() {
    // Rag
    const fileRag = document.querySelector('#file-rag');
    const hiddenFileRag = document.querySelector('#hidden-file-rag');

    fileRag.addEventListener('click', function() {
        hiddenFileRag.click();
    });
 
    hiddenFileRag.addEventListener('change', function() {
        const file = hiddenFileRag.files[0];
        document.getElementById('file-name').innerText = "Tên tệp: " + file.name;
        const formData = new FormData();
        formData.append('file', file);
        chrome.storage.local.get(['token'], function(result) {
            console.log(result.token);
            fetch('http://127.0.0.1:8000/api/upload/', {
                method: 'POST',
                headers: {
                    Authorization: 'Token ' + result.token
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
        });
   });

    
});
