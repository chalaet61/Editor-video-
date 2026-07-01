# 🎨 Advanced Photo Editor

A modern, feature-rich web-based photo editor with professional image manipulation tools. Built with vanilla JavaScript, HTML5 Canvas, and CSS3 for maximum performance and zero dependencies.

**Live Demo:** [GitHub Pages](https://chalaet61.github.io/Editor-video-/)

---

## ✨ Features

### Image Filters
- **Brightness Control** - Adjust image brightness (0-200%)
- **Contrast Enhancement** - Fine-tune contrast levels (0-200%)
- **Saturation** - Modify color intensity (0-200%)
- **Blur Effect** - Apply blur filters (0-20px)
- **Rotation** - Rotate images 360° smoothly
- **Hue Shift** - Change color tone (0-360°)
- **Sepia Tone** - Vintage sepia effect (0-100%)
- **Grayscale** - Convert to black & white (0-100%)

### Advanced Features
- ⚡ **Real-time Preview** - See changes instantly as you adjust sliders
- 🎨 **Filter Presets** - One-click filters: Vintage, B&W, Warm, Cool
- 🔄 **Before/After Comparison** - Visual comparison of original vs edited
- ⬇️ **Download Support** - Export edited images as PNG
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎯 **Live Value Display** - See exact filter values in real-time
- ⚙️ **Reset Function** - Quickly revert to original image

---

## 🚀 Quick Start

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/chalaet61/Editor-video-.git
   cd Editor-video-
   ```

2. **Open in browser:**
   - Simply open `index.html` in your web browser
   - No build process or dependencies required!

   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # Or use a local server (recommended)
   python -m http.server 8000
   # Then visit: http://localhost:8000
   ```

---

## 🌐 Deployment

### Option 1: GitHub Pages (Recommended)

GitHub Pages hosts your site directly from your repository - completely free!

1. **Ensure your repo is public** (it already is)

2. **Enable GitHub Pages:**
   - Go to repository **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**

3. **Your site is live!**
   ```
   https://chalaet61.github.io/Editor-video-/
   ```

The site will automatically update with each push to the main branch.

### Option 2: Netlify (One-Click Deployment)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/chalaet61/Editor-video-)

1. Click the button above
2. Connect your GitHub account
3. Authorize and deploy!

### Option 3: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy"

### Option 4: Manual Hosting

Deploy to any web host (AWS S3, Firebase, etc.):

1. Upload all files to your web server
2. Ensure `index.html` is served as the root
3. No build step needed!

---

## 📂 Project Structure

```
Editor-video-/
├── index.html          # Main HTML file with UI structure & styling
├── editor.js           # JavaScript logic for image processing
├── README.md           # This file
└── .gitignore          # Git ignore file
```

### File Descriptions

**`index.html`** (9.8 KB)
- Complete UI layout with modern gradient design
- Responsive grid layout for desktop and mobile
- All CSS styling embedded for single-file deployment
- Canvas elements for image rendering

**`editor.js`** (9.4 KB)
- Modular JavaScript with clear separation of concerns
- Event listeners for user interactions
- Real-time filter preview system
- File upload validation (type & size checking)
- Performance optimizations (debouncing, efficient DOM updates)
- Comprehensive error handling

---

## 🎯 How to Use

1. **Upload Image**
   - Click "📁 Choose Image" or drag & drop
   - Supports all common formats (JPG, PNG, WebP, GIF, etc.)
   - Maximum file size: 10MB

2. **Adjust Filters**
   - Use sliders to adjust individual filters in real-time
   - Watch preview update instantly
   - Values display next to each slider

3. **Apply Preset**
   - Click preset buttons for pre-configured effects:
     - **Vintage** - Sepia + contrast boost
     - **B&W** - Black & white with high contrast
     - **Warm** - Warm tones with slight sepia
     - **Cool** - Cool hues with increased saturation

4. **View Comparison**
   - Click "✓ Apply Filters" to see before/after
   - Visual comparison of original vs edited image

5. **Download**
   - Click "⬇️ Download" to save as PNG
   - Filename includes timestamp for easy organization

6. **Reset**
   - Click "⟲ Reset" to restore defaults
   - Start fresh with your image

---

## ⚡ Performance Optimizations

### Code Structure
- **Modular JavaScript** - Functions organized by purpose
- **Event Delegation** - Efficient event listening
- **DOM Caching** - Elements stored in variables, not queried repeatedly
- **Debounced Resize Handler** - Prevents excessive redraws

### Browser APIs
- **Canvas Context Caching** - Reuses 2D context instead of recreating
- **requestAnimationFrame** - For smooth animations
- **FileReader API** - Efficient file handling

### User Experience
- **Real-time Preview** - Instant visual feedback
- **Status Messages** - Clear user feedback
- **Input Validation** - Prevents errors before they occur
- **Responsive Design** - Optimized for all screen sizes

---

## 🔧 Customization

### Add a New Filter

1. Open `index.html` and add a new control group:
```html
<div class="control-group">
  <label>✨ Your Filter</label>
  <div class="control-wrapper">
    <input type="range" id="yourFilter" min="0" max="100" value="0">
    <span class="value-display" id="yourFilterValue">0%</span>
  </div>
</div>
```

2. Add to the filters object in `editor.js`:
```javascript
const filters = {
    // ... existing filters ...
    yourFilter: { 
        input: document.getElementById('yourFilter'), 
        value: document.getElementById('yourFilterValue'), 
        unit: '%' 
    }
};
```

3. Update the `updateImagePreview()` function to include your filter in the CSS filter string.

### Change Colors

Edit the CSS variables in `index.html` `<style>` section:
```css
/* Primary gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

---

## 🌟 Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Latest |
| Firefox | ✅ Latest |
| Safari  | ✅ Latest |
| Edge    | ✅ Latest |
| IE 11   | ❌ Not supported |

---

## 📊 File Size

- **index.html**: ~9.8 KB (uncompressed)
- **editor.js**: ~9.4 KB (uncompressed)
- **Total**: ~19.2 KB (uncompressed, ~6 KB gzipped)

### Why No Dependencies?

This project uses only vanilla JavaScript and HTML5 Canvas APIs:
- ✅ No jQuery
- ✅ No frameworks
- ✅ No build tools
- ✅ No npm packages
- ✅ Zero external dependencies

This means:
- Fast loading times
- Minimal bandwidth usage
- Easy to deploy anywhere
- No security vulnerabilities from dependencies
- Simple to understand and modify

---

## 🐛 Known Limitations

1. **Large Images** - Very large images (>4000x4000px) may have performance issues
2. **Mobile Memory** - Mobile devices may struggle with very large files
3. **Rotation + Canvas** - Rotated images may show slight aliasing
4. **Browser Limits** - Canvas has size limits depending on browser (~16k pixels)

### Workarounds

- Compress large images before uploading
- Use browser DevTools to check memory usage
- Consider using image compression tools for >10MB files

---

## 📝 Roadmap

Potential future features:
- [ ] Crop tool
- [ ] Image effects (vintage film, cross-fade)
- [ ] Undo/Redo functionality
- [ ] Layer support
- [ ] Export to different formats (JPEG, WebP)
- [ ] Batch processing
- [ ] History/favorites for presets
- [ ] Dark mode toggle
- [ ] Accessibility improvements

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/chalaet61/Editor-video-/issues)
- **Discussions**: [GitHub Discussions](https://github.com/chalaet61/Editor-video-/discussions)
- **Email**: chalaet61@gmail.com

---

## 🎬 Demo Walkthrough

### Example Workflow:

1. **Upload** a vacation photo
2. **Increase brightness** by 20% (slider to 120)
3. **Boost saturation** by 30% (slider to 130)
4. **Apply warm preset** for golden hour effect
5. **Click Apply Filters** to compare before/after
6. **Download** as PNG with timestamp

Total time: < 2 minutes

---

## 🚀 Keyboard Shortcuts (Future)

Coming soon:
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Y` - Redo
- `Ctrl/Cmd + S` - Save/Download
- `Ctrl/Cmd + R` - Reset

---

## 📚 Resources

- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [CSS Filter Effects](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)

---

**Made with ❤️ by chalaet61**

⭐ If you find this useful, please consider giving it a star!
