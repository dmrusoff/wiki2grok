# Wiki2Grok

**Experience Grokipedia effortlessly.** Wiki2Grok is a browser extension that automatically redirects Wikipedia links to Grokipedia—giving you instant access to unbiased, AI-powered articles with real-time knowledge and balanced perspectives.

🌐 **[Visit the Landing Page](https://wiki2grok.vercel.app)**

## Why Grokipedia?

- ⚖️ **Unbiased Perspectives**: Grokipedia presents multiple viewpoints on controversial topics, giving you balanced, well-rounded information free from editorial slant.
- 🧠 **AI-Powered Insights**: Powered by Grok, articles are intelligently synthesized and clearly written—making complex topics easy to understand.
- 🔄 **Real-Time Knowledge**: Unlike static encyclopedias, Grokipedia stays current with the latest information and breaking developments.

## Features

- 🔄 **Automatic Redirection**: Seamlessly redirects Wikipedia article pages to Grokipedia
- ⚡ **Instant Toggle**: Enable/disable redirects with one click
- 📊 **Redirect Counter**: Tracks how many times you've been redirected
- 🎨 **Modern UI**: Beautiful dark theme popup with smooth animations
- 🛡️ **Smart Filtering**: Only redirects actual article pages, not special Wikipedia pages

## Installation

### Chrome / Edge / Brave

1. Download the extension ZIP from the [landing page](https://wiki2grok.vercel.app)
2. Extract the ZIP file
3. Open your browser and navigate to `chrome://extensions/`
4. Enable **Developer mode** (toggle in the top right corner)
5. Click **Load unpacked**
6. Select the extracted folder
7. The extension is now installed!

### Firefox (Coming Soon)

Firefox support is currently in development.

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
- Works with all Wikipedia language editions (en, de, fr, etc.)

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
├── landing/            # Landing page (deployed to Vercel)
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## Development

### Building from Source

No build step required! The extension is written in vanilla JavaScript and can be loaded directly.

### Testing

1. Load the extension in developer mode
2. Navigate to any Wikipedia article
3. Verify you're redirected to Grokipedia
4. Check the popup to see the redirect count increment

## Support

If you find Wiki2Grok useful, consider [leaving a tip](https://tiptopjar.com/wiki2grok) to support development!

## License

MIT License - Feel free to use, modify, and distribute.
