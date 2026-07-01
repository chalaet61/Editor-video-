/**
 * Advanced Photo Editor - Main JavaScript Module
 * Handles image manipulation, filtering, and file operations
 */

// ============================================
// DOM ELEMENT REFERENCES
// ============================================

const uploadInput = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

const canvasBefore = document.getElementById('canvasBefore');
const ctxBefore = canvasBefore.getContext('2d');
const canvasAfter = document.getElementById('canvasAfter');
const ctxAfter = canvasAfter.getContext('2d');
const comparisonContainer = document.getElementById('comparisonContainer');
const statusMessage = document.getElementById('statusMessage');

// ============================================
// FILTER CONFIGURATION OBJECT
// ============================================

const filters = {
    brightness: { input: document.getElementById('brightness'), value: document.getElementById('brightnessValue'), unit: '%' },
    contrast: { input: document.getElementById('contrast'), value: document.getElementById('contrastValue'), unit: '%' },
    saturation: { input: document.getElementById('saturation'), value: document.getElementById('saturationValue'), unit: '%' },
    blur: { input: document.getElementById('blur'), value: document.getElementById('blurValue'), unit: 'px' },
    rotation: { input: document.getElementById('rotation'), value: document.getElementById('rotationValue'), unit: '°' },
    hue: { input: document.getElementById('hue'), value: document.getElementById('hueValue'), unit: '°' },
    sepia: { input: document.getElementById('sepia'), value: document.getElementById('sepiaValue'), unit: '%' },
    grayscale: { input: document.getElementById('grayscale'), value: document.getElementById('grayscaleValue'), unit: '%' }
};

// ============================================
// STATE MANAGEMENT
// ============================================

let originalImage = new Image();
let isImageLoaded = false;

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Handle image file upload
 */
uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showStatus('Please select a valid image file', 'error');
        return;
    }
    
    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
        showStatus('Image size must be less than 10MB', 'error');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onerror = () => {
        showStatus('Error reading file', 'error');
    };
    
    reader.onload = (event) => {
        originalImage.src = event.target.result;
    };
    
    reader.readAsDataURL(file);
});

/**
 * Initialize canvas when image loads
 */
originalImage.onload = () => {
    // Match canvas dimensions with image
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    
    canvasBefore.width = originalImage.width;
    canvasBefore.height = originalImage.height;
    canvasAfter.width = originalImage.width;
    canvasAfter.height = originalImage.height;

    // Render original image to canvases
    ctx.drawImage(originalImage, 0, 0);
    ctxBefore.drawImage(originalImage, 0, 0);
    
    // Reset UI state
    comparisonContainer.style.display = 'none';
    isImageLoaded = true;
    resetFilters();
    showStatus('Image uploaded successfully!', 'success');
};

originalImage.onerror = () => {
    showStatus('Error loading image', 'error');
    isImageLoaded = false;
};

/**
 * Real-time slider value update and preview
 */
Object.keys(filters).forEach(filterKey => {
    filters[filterKey].input.addEventListener('input', () => {
        // Update display value
        filters[filterKey].value.textContent = filters[filterKey].input.value + filters[filterKey].unit;
        // Update preview instantly
        updateImagePreview();
    });
});

// ============================================
// CORE FUNCTIONS
// ============================================

/**
 * Update image preview with current filter values
 * Applies filters in real-time as user adjusts sliders
 */
function updateImagePreview() {
    if (!isImageLoaded) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Handle rotation
    const angle = parseInt(filters.rotation.input.value);
    if (angle !== 0) {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
    }

    // Apply all filters via CSS filter property
    ctx.filter = `
        brightness(${filters.brightness.input.value}%)
        contrast(${filters.contrast.input.value}%)
        saturate(${filters.saturation.input.value}%)
        blur(${filters.blur.input.value}px)
        hue-rotate(${filters.hue.input.value}deg)
        sepia(${filters.sepia.input.value}%)
        grayscale(${filters.grayscale.input.value}%)
    `;

    ctx.drawImage(originalImage, 0, 0);
    ctx.restore();
}

/**
 * Apply filters and display before/after comparison
 */
function applyFilters() {
    if (!isImageLoaded) {
        showStatus('Please upload an image first', 'error');
        return;
    }
    
    // Copy current filtered canvas to "after" canvas
    ctxAfter.clearRect(0, 0, canvasAfter.width, canvasAfter.height);
    ctxAfter.drawImage(canvas, 0, 0);
    
    // Show comparison view
    comparisonContainer.style.display = 'flex';
    showStatus('Filters applied successfully!', 'success');
}

/**
 * Apply preset filter combinations
 * @param {string} presetName - Preset name (vintage, bw, warm, cool)
 */
function applyPreset(presetName) {
    if (!isImageLoaded) {
        showStatus('Please upload an image first', 'error');
        return;
    }
    
    resetFilters();

    const presets = {
        vintage: {
            sepia: 70,
            contrast: 85,
            saturation: 90
        },
        bw: {
            grayscale: 100,
            contrast: 120
        },
        warm: {
            brightness: 110,
            sepia: 30,
            hue: 15
        },
        cool: {
            hue: 40,
            saturation: 110,
            brightness: 95
        }
    };

    const preset = presets[presetName];
    if (!preset) {
        showStatus('Unknown preset', 'error');
        return;
    }

    // Apply preset values
    Object.keys(preset).forEach(filterKey => {
        if (filters[filterKey]) {
            filters[filterKey].input.value = preset[filterKey];
            filters[filterKey].value.textContent = preset[filterKey] + filters[filterKey].unit;
        }
    });

    updateImagePreview();
    showStatus(`${presetName.charAt(0).toUpperCase() + presetName.slice(1)} preset applied!`, 'success');
}

/**
 * Reset all filters to default values
 */
function resetFilters() {
    const defaults = {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
        rotation: 0,
        hue: 0,
        sepia: 0,
        grayscale: 0
    };

    Object.keys(filters).forEach(filterKey => {
        filters[filterKey].input.value = defaults[filterKey];
        filters[filterKey].value.textContent = defaults[filterKey] + filters[filterKey].unit;
    });

    if (isImageLoaded) {
        updateImagePreview();
        showStatus('Filters reset to defaults', 'success');
    }
}

/**
 * Download edited image as PNG
 */
function downloadImage() {
    if (!isImageLoaded) {
        showStatus('Upload an image first', 'error');
        return;
    }
    
    try {
        const link = document.createElement('a');
        link.download = `edited-photo-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showStatus('Image downloaded successfully!', 'success');
    } catch (error) {
        showStatus('Error downloading image', 'error');
        console.error('Download error:', error);
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Display status notification message
 * @param {string} message - Message to display
 * @param {string} type - Message type (success, error)
 */
function showStatus(message, type = 'success') {
    statusMessage.textContent = message;
    statusMessage.className = `status-message show ${type}`;
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        statusMessage.classList.remove('show');
    }, 4000);
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

/**
 * Debounce function for resize events
 * Prevents excessive redraws during window resize
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Handle window resize to maintain responsiveness
 */
window.addEventListener('resize', debounce(() => {
    if (isImageLoaded) {
        updateImagePreview();
    }
}, 250));
