// Wiki2Grok Popup Script

document.addEventListener('DOMContentLoaded', async () => {
    // DOM Elements
    const enableToggle = document.getElementById('enableToggle');
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    const statusDescription = document.getElementById('statusDescription');
    const redirectCount = document.getElementById('redirectCount');
    const resetBtn = document.getElementById('resetBtn');

    // Load current settings
    await loadSettings();

    // Toggle event listener
    enableToggle.addEventListener('change', async () => {
        const settings = await getSettings();
        settings.enabled = enableToggle.checked;
        await updateSettings(settings);
        updateStatusUI(settings.enabled);
    });

    // Reset button event listener
    resetBtn.addEventListener('click', async () => {
        await chrome.runtime.sendMessage({ action: 'resetCount' });
        redirectCount.textContent = '0';

        // Add visual feedback
        resetBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            resetBtn.style.transform = 'scale(1)';
        }, 150);
    });

    // Load settings from storage
    async function loadSettings() {
        const settings = await getSettings();
        enableToggle.checked = settings.enabled;
        redirectCount.textContent = formatNumber(settings.redirectCount || 0);
        updateStatusUI(settings.enabled);
    }

    // Get settings from background script
    async function getSettings() {
        return await chrome.runtime.sendMessage({ action: 'getSettings' });
    }

    // Update settings via background script
    async function updateSettings(settings) {
        await chrome.runtime.sendMessage({ action: 'updateSettings', settings });
    }

    // Update status UI based on enabled state
    function updateStatusUI(enabled) {
        if (enabled) {
            statusDot.classList.remove('inactive');
            statusText.classList.remove('inactive');
            statusText.textContent = 'Active';
            statusDescription.textContent = 'Redirecting Wikipedia links to Grokipedia';
        } else {
            statusDot.classList.add('inactive');
            statusText.classList.add('inactive');
            statusText.textContent = 'Disabled';
            statusDescription.textContent = 'Click the toggle to enable redirects';
        }
    }

    // Format number with commas
    function formatNumber(num) {
        return num.toLocaleString();
    }
});

// Listen for storage changes to update UI in real-time
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.settings) {
        const newSettings = changes.settings.newValue;
        const redirectCount = document.getElementById('redirectCount');
        if (redirectCount) {
            redirectCount.textContent = (newSettings.redirectCount || 0).toLocaleString();
        }
    }
});
