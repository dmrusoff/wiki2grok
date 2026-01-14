// Wiki2Grok Background Service Worker
// Handles redirection from Wikipedia to Grokipedia

// Default settings
const DEFAULT_SETTINGS = {
  enabled: true,
  redirectCount: 0
};

// Initialize extension settings
chrome.runtime.onInstalled.addListener(async () => {
  const result = await chrome.storage.local.get(['settings']);
  if (!result.settings) {
    await chrome.storage.local.set({ settings: DEFAULT_SETTINGS });
  }
  console.log('Wiki2Grok extension installed');
});

// Listen for navigation events to Wikipedia
chrome.webNavigation.onBeforeNavigate.addListener(
  async (details) => {
    // Only handle main frame navigations
    if (details.frameId !== 0) return;

    const settings = await getSettings();
    if (!settings.enabled) return;

    const url = new URL(details.url);
    
    // Check if it's a Wikipedia article page
    if (isWikipediaArticle(url)) {
      const grokipediaUrl = convertToGrokipedia(url);
      
      if (grokipediaUrl) {
        // Update redirect count
        settings.redirectCount++;
        await chrome.storage.local.set({ settings });
        
        // Redirect to Grokipedia
        chrome.tabs.update(details.tabId, { url: grokipediaUrl });
      }
    }
  },
  { url: [{ hostSuffix: 'wikipedia.org' }] }
);

// Get current settings
async function getSettings() {
  const result = await chrome.storage.local.get(['settings']);
  return result.settings || DEFAULT_SETTINGS;
}

// Check if URL is a Wikipedia article page
function isWikipediaArticle(url) {
  // Match patterns like:
  // - https://en.wikipedia.org/wiki/Article_Name
  // - https://de.wikipedia.org/wiki/Artikel_Name
  // Exclude special pages like Special:, Wikipedia:, Talk:, etc.
  
  const pathname = url.pathname;
  
  if (!pathname.startsWith('/wiki/')) {
    return false;
  }
  
  const articlePath = pathname.substring(6); // Remove '/wiki/'
  
  // Exclude Wikipedia special namespaces
  const excludedNamespaces = [
    'Special:',
    'Wikipedia:',
    'Talk:',
    'User:',
    'User_talk:',
    'File:',
    'File_talk:',
    'MediaWiki:',
    'MediaWiki_talk:',
    'Template:',
    'Template_talk:',
    'Help:',
    'Help_talk:',
    'Category:',
    'Category_talk:',
    'Portal:',
    'Portal_talk:',
    'Draft:',
    'Draft_talk:',
    'TimedText:',
    'TimedText_talk:',
    'Module:',
    'Module_talk:'
  ];
  
  for (const namespace of excludedNamespaces) {
    if (articlePath.startsWith(namespace)) {
      return false;
    }
  }
  
  return articlePath.length > 0;
}

// Convert Wikipedia URL to Grokipedia URL
function convertToGrokipedia(url) {
  const pathname = url.pathname;
  
  if (!pathname.startsWith('/wiki/')) {
    return null;
  }
  
  // Extract article name (preserve the exact casing)
  const articleName = pathname.substring(6); // Remove '/wiki/'
  
  // Build Grokipedia URL
  // Grokipedia uses /page/ instead of /wiki/
  const grokipediaUrl = `https://grokipedia.com/page/${articleName}`;
  
  return grokipediaUrl;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSettings') {
    getSettings().then(settings => sendResponse(settings));
    return true; // Required for async sendResponse
  }
  
  if (request.action === 'updateSettings') {
    chrome.storage.local.set({ settings: request.settings }).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'resetCount') {
    getSettings().then(settings => {
      settings.redirectCount = 0;
      chrome.storage.local.set({ settings }).then(() => {
        sendResponse({ success: true });
      });
    });
    return true;
  }
});
