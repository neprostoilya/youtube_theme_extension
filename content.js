chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'toggleTheme') {
        if (request.enabled) {
            switch(request.theme) {
                case 'black':
                    applyBlackTheme();
                    break;
                case 'anime':
                    applyAnimeTheme();
                    break;
                case 'cosmic':
                    applyCosmicTheme();
                    break;
            }
        } else {
            removeTheme();
        }
    }
});

function removeCinematics() {
    const cinematics = document.querySelector('#cinematics');
    if (cinematics) {
        cinematics.remove();
    }
}

let lastUrl = location.href;
new MutationObserver(() => {
    if (location.href !== lastUrl) {
        lastUrl = location.href;
        if (location.href.includes('watch')) {
            removeCinematics();
        }
    }
}).observe(document, { subtree: true, childList: true });

function applyBlackTheme() {
    const elements = [
        'ytd-masthead',
        'ytd-app',
        'ytd-watch-metadata',
        '#guide-content',
        '#chips-content',
        '#header',
        '#below'
    ];

    elements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.background = 'black';
        }
    });

    removeCinematics();
}

function applyAnimeTheme() {
    const elements = [
        'ytd-masthead',
        'ytd-app',
        'ytd-watch-metadata',
        '#guide-content',
        '#chips-content',
        '#header',
        '#below'
    ];

    elements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.background = '#2b2d42';
            element.style.color = '#ffd6e0';
        }
    });

    const masthead = document.querySelector('ytd-masthead');
    if (masthead) {
        masthead.style.background = 'linear-gradient(135deg, #2b2d42 0%, #3d2b42 100%)';
    }

    const buttons = document.querySelectorAll('ytd-button-renderer:not(.yt-spec-button-shape-next):not(#reply-button-end), ytd-toggle-button-renderer:not(.yt-spec-button-shape-next):not(#like-button):not(#dislike-button)');
    buttons.forEach(button => {
        if (!button.closest('.yt-spec-button-shape-next') && !button.closest('#action-buttons')) {
            button.style.backgroundColor = '#ff85a2';
            button.style.color = '#ffffff';
            button.style.borderRadius = '15px';
        }
    });
}

function applyCosmicTheme() {
    const elements = [
        'ytd-masthead',
        'ytd-app',
        'ytd-watch-metadata',
        '#guide-content',
        '#chips-content',
        '#header',
        '#below'
    ];

    elements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.background = '#1a1b26';
            element.style.color = '#7aa2f7';
        }
    });

    const masthead = document.querySelector('ytd-masthead');
    if (masthead) {
        masthead.style.background = 'linear-gradient(135deg, #1a1b26 0%, #24283b 100%)';
        masthead.style.boxShadow = '0 0 20px rgba(122, 162, 247, 0.2)';
    }

    const buttons = document.querySelectorAll('ytd-button-renderer:not(.yt-spec-button-shape-next):not(#reply-button-end), ytd-toggle-button-renderer:not(.yt-spec-button-shape-next):not(#like-button):not(#dislike-button)');
    buttons.forEach(button => {
        if (!button.closest('.yt-spec-button-shape-next') && !button.closest('#action-buttons')) {
            button.style.backgroundColor = '#7aa2f7';
            button.style.color = '#1a1b26';
            button.style.borderRadius = '15px';
        }
    });
}

function removeTheme() {
    const elements = [
        'ytd-masthead',
        'ytd-app',
        'ytd-watch-metadata',
        '#guide-content',
        '#chips-content',
        '#header',
        '#below'
    ];

    elements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.background = '';
            element.style.color = '';
            element.style.boxShadow = '';
        }
    });

    const buttons = document.querySelectorAll('ytd-button-renderer:not(#reply-button-end), ytd-toggle-button-renderer:not(#like-button):not(#dislike-button)');
    buttons.forEach(button => {
        if (!button.closest('#action-buttons')) {
            button.style.backgroundColor = '';
            button.style.color = '';
            button.style.border = '';
            button.style.borderRadius = '';
        }
    });
}

chrome.storage.sync.get(['theme', 'enabled'], function(result) {
    if (result.enabled) {
        switch(result.theme) {
            case 'black':
                applyBlackTheme();
                break;
            case 'anime':
                applyAnimeTheme();
                break;
            case 'cosmic':
                applyCosmicTheme();
                break;
        }
    }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace === 'sync' && changes.theme) {
        chrome.storage.sync.get(['enabled'], function(result) {
            if (result.enabled) {
                switch(changes.theme.newValue) {
                    case 'black':
                        applyBlackTheme();
                        break;
                    case 'anime':
                        applyAnimeTheme();
                        break;
                    case 'cosmic':
                        applyCosmicTheme();
                        break;
                }
            }
        });
    }
}); 