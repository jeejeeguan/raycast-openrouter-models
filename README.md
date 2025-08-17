# OpenRouter Models Finder

A Raycast extension to search and copy AI model IDs from OpenRouter.

## Features

- 🔍 Real-time search through all OpenRouter models
- 📋 Copy model IDs to clipboard with one click
- 📊 Display context window sizes with smart unit formatting (B/M/K tokens)
- 🆕 Sort by release date - newest models first
- 🌐 Quick access to model details on OpenRouter website

## Usage

1. Search for "Find Models" in Raycast
2. Type keywords to filter models
3. Press Enter to copy the model ID to clipboard
4. Use additional actions to copy model name or view on OpenRouter

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Privacy & Security

This extension uses the [OpenRouter public API](https://openrouter.ai/api/v1/models) to fetch model information. 
- **No authentication required** - The API endpoint is publicly accessible
- **No user data collection** - This extension does not collect, store, or transmit any personal information
- **Read-only operations** - Only retrieves publicly available model metadata

## Credits

- **API**: Model data provided by [OpenRouter](https://openrouter.ai)
- **Icon**: OpenRouter logo used under fair use. All rights reserved by OpenRouter.

## Author

Created by @jeejeeguan

## License

MIT
