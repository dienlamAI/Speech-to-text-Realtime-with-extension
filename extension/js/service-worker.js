chrome.runtime.onMessage.addListener((message, sender) => {
  (async () => {
    if (message.type === 'sets_side_panel') { 
      const { path } = message;
      await chrome.sidePanel.setOptions({
        path: path,
        enabled: true
      });
    } else if (message.type === 'open_side_panel') { 
      await chrome.sidePanel.open({tabId: sender.tab.id});
    } else if (message.type === 'close_side_panel') { 
      await chrome.sidePanel.setOptions({
        enabled: false
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      await chrome.sidePanel.setOptions({
        enabled: true
      });
    }
  })();
});

// Lắng nghe message từ content script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "captureScreen") {
      // Chụp màn hình của tab hiện tại
      chrome.tabs.captureVisibleTab(null, {format: 'png'}, function(dataUrl) {
          // Gửi dữ liệu hình ảnh về cho content script
          sendResponse({ imageDataUrl: dataUrl });
          console.log('Capture screen 3');
      });
      // Bắt buộc phải trả về true để duy trì sendResponse khi chức năng callback không kết thúc ngay lập tức
      return true;
  }
});
