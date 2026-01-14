# Wiki2Grok Browser Extension

A Chrome browser extension that automatically redirects Wikipedia links to their corresponding Grokipedia articles.

## Features

- 🔄 **Automatic Redirection**: Seamlessly redirects Wikipedia article pages to Grokipedia
- ⚡ **Instant Toggle**: Enable/disable redirects with one click
- 📊 **Redirect Counter**: Tracks how many times you've been redirected
- 🎨 **Modern UI**: Beautiful dark theme popup with smooth animations
- 🛡️ **Smart Filtering**: Only redirects actual article pages, not special Wikipedia pages (Talk:, Category:, etc.)

## Installation

### Chrome/Edge/Brave (Manual Installation)

1. Open your browser and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top right corner)
3. Click **Load unpacked**
4. Select the `Wiki2Grok` folder
5. The extension is now installed!

### Firefox (Manual Installation)

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select the `manifest.json` file from the `Wiki2Grok` folder

## Usage

1. **Enable/Disable**: Click the extension icon in your toolbar to open the popup, then toggle redirects on/off
2. **Visit Wikipedia**: Navigate to any Wikipedia article (e.g., `https://en.wikipedia.org/wiki/Albert_Einstein`)
3. **Automatic Redirect**: You'll be automatically redirected to the corresponding Grokipedia page

## How It Works

The extension intercepts navigation to Wikipedia article URLs and transforms them:

```
Wikipedia:  https://en.wikipedia.org/wiki/Article_Name
     ↓
Grokipedia: https://grokipedia.com/page/Article_Name
```

### URL Transformation

- Wikipedia's `/wiki/` path is replaced with Grokipedia's `/page/`
- Article names and URL encoding are preserved exactly
- Works with all Wikipedia language subdomains (en, de, fr, etc.)

### Filtered Pages

The extension only redirects actual article pages. The following Wikipedia namespaces are excluded:

- Special pages (Special:)
- Talk pages (Talk:, User_talk:)
- Meta pages (Wikipedia:, Help:, Category:)
- File and media pages (File:, Template:, Module:)

## Project Structure

```
Wiki2Grok/
├── manifest.json       # Extension configuration
├── background.js       # Service worker handling redirects
├── popup/
│   ├── popup.html      # Popup UI structure
│   ├── popup.css       # Popup styling
│   └── popup.js        # Popup logic
├── icons/
│   ├── icon16.png      # Toolbar icon (16x16)
│   ├── icon48.png      # Extension icon (48x48)
│   └── icon128.png     # Store icon (128x128)
└── README.md           # This file
```

## Development

### Building from Source

No build step required! The extension is written in vanilla JavaScript and can be loaded directly.

### Testing

1. Load the extension in developer mode
2. Navigate to any Wikipedia article
3. Verify you're redirected to Grokipedia
4. Check the popup to see the redirect count increment

## License

MIT License - Feel free to use, modify, and distribute.

## Support

For issues or feature requests, please open an issue on GitHub.
