document.addEventListener('DOMContentLoaded', function() {
    const themeSelect = document.getElementById('themeSelect');
    const toggleBtn = document.getElementById('toggleBtn');
    const body = document.body;

    chrome.storage.sync.get(['theme', 'enabled'], function(result) {
        if (result.theme) {
            themeSelect.value = result.theme;
            applyTheme(result.theme);
        }
        if (result.enabled !== undefined) {
            toggleBtn.checked = result.enabled;
        }
    });

    themeSelect.addEventListener('change', function() {
        const selectedTheme = themeSelect.value;
        applyTheme(selectedTheme);
        chrome.storage.sync.set({ theme: selectedTheme });
    });

    toggleBtn.addEventListener('change', function() {
        const isEnabled = toggleBtn.checked;
        chrome.storage.sync.set({ enabled: isEnabled });
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'toggleTheme',
                enabled: isEnabled,
                theme: themeSelect.value
            });
        });
    });

    function applyTheme(theme) {
        body.classList.remove('theme-black', 'theme-anime', 'theme-cosmic');
        body.classList.add(`theme-${theme}`);
    }
});
