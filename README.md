# Burn Multiple Calculator

A simple, self-contained, embeddable widget for calculating your company's **Burn Multiple** - a critical SaaS metric that measures capital efficiency.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)

---

## 📊 What is Burn Multiple?

**Burn Multiple** is a key SaaS financial metric that measures how much capital you're burning to generate each dollar of new Annual Recurring Revenue (ARR).

### Formula

```
Burn Multiple = Net Burn ÷ Net New ARR
```

**Where:**
- **Net Burn**: Total cash consumed in a given period (e.g., monthly, quarterly)
- **Net New ARR**: New Annual Recurring Revenue added in the same period

### Interpretation

| Burn Multiple | Rating | Meaning |
|---------------|--------|---------|
| **< 1.0** | 🟢 Excellent | Highly capital efficient - spending less than $1 to generate $1 of ARR |
| **1.0 - 1.5** | 🟢 Good | Healthy growth - within good industry standards |
| **1.5 - 2.0** | 🟡 Acceptable | Monitor closely - burning moderate capital per ARR dollar |
| **> 2.0** | 🔴 Concerning | High burn rate - significantly above industry benchmarks |

**Lower is better** - it indicates you're growing efficiently without burning excessive capital.

---

## ✨ Features

### Core Functionality
- ✅ **Real-time calculation** as users type
- ✅ **Multi-currency support** - 11 currencies with proper symbols
- ✅ **Comprehensive input validation** with helpful error messages
- ✅ **Color-coded results** for quick interpretation (green/orange/red)
- ✅ **Intelligent evaluation** based on industry benchmarks

### Technology
- ✅ **Zero dependencies** - Pure vanilla HTML, CSS, and JavaScript
- ✅ **Lightweight** - Under 20KB total size
- ✅ **Self-contained** - WordPress version is a single file
- ✅ **Responsive design** - Works on mobile, tablet, and desktop
- ✅ **Touch-friendly** - Optimized for mobile interactions

### Design
- ✅ **Light minimalistic theme** with clean white cards
- ✅ **Scoped CSS** - Won't conflict with existing styles
- ✅ **System fonts** - No external font dependencies
- ✅ **Smooth transitions** - Polished user experience
- ✅ **Professional appearance** - Production-ready design

### Accessibility
- ✅ **WCAG 2.1 AA compliant** - Meets accessibility standards
- ✅ **Semantic HTML5** - Proper heading hierarchy
- ✅ **ARIA labels** - Screen reader friendly
- ✅ **Keyboard navigation** - Full keyboard support
- ✅ **High contrast mode** - Supports user preferences
- ✅ **Reduced motion** - Respects prefers-reduced-motion

---

## 🌍 Supported Currencies

The calculator supports 11 major world currencies:

| Currency | Code | Symbol |
|----------|------|--------|
| Euro | EUR | € |
| US Dollar | USD | $ |
| British Pound | GBP | £ |
| Japanese Yen | JPY | ¥ |
| Chinese Yuan | CNY | ¥ |
| Indian Rupee | INR | ₹ |
| Australian Dollar | AUD | A$ |
| Canadian Dollar | CAD | C$ |
| Swiss Franc | CHF | Fr |
| Swedish Krona | SEK | kr |
| Norwegian Krone | NOK | kr |

**Default:** EUR (€)

---

## 🚀 Quick Start

### Option 1: Standalone HTML Page

1. Download all files:
   - `index.html`
   - `styles.css`
   - `script.js`

2. Open `index.html` in any modern web browser

3. No server or build process required!

### Option 2: WordPress Embed

**For WordPress sites** - Use the single-file version:

#### Installation Steps

1. **Copy the embed file**
   - Open `wordpress-embed.html`
   - Select all content (Ctrl+A / Cmd+A)
   - Copy to clipboard (Ctrl+C / Cmd+C)

2. **Add to WordPress**
   - Go to your WordPress page/post editor
   - Click the **"+"** button to add a new block
   - Search for **"Custom HTML"** block
   - Paste the copied code
   - Click **"Preview"** to see the calculator
   - **Publish** or **Update** the page

3. **Done!** The calculator is now live on your page

#### WordPress Notes
- ✅ Works with any WordPress theme
- ✅ No plugins required
- ✅ Fully self-contained - no external dependencies
- ✅ Won't conflict with existing styles (all CSS is scoped)
- ✅ Mobile responsive out of the box

---

## 💻 Local Testing

### Method 1: Direct File Open
```bash
# Navigate to the project directory
cd burn-multiple

# Open index.html in your default browser
# On macOS:
open index.html

# On Linux:
xdg-open index.html

# On Windows:
start index.html
```

### Method 2: Local Server (Recommended)
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (npx)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

---

## 🎨 Customization Guide

### Changing Colors

The calculator uses CSS variables defined in `:root`. To customize colors, edit `styles.css` (or the `<style>` section in `wordpress-embed.html`):

```css
:root {
    /* Background Colors */
    --bg-white: #ffffff;              /* Card background */
    --bg-light: #f8f9fa;              /* Input backgrounds */
    --border-light: #e9ecef;          /* Borders */

    /* Accent Colors */
    --accent-blue: #4a90e2;           /* Primary buttons, focus states */

    /* Text Colors */
    --text-dark: #1a1a1a;             /* Main text */
    --text-gray: #6c757d;             /* Labels, secondary text */
    --text-light: #adb5bd;            /* Placeholders */

    /* Status Colors */
    --error-red: #dc3545;             /* Errors, concerning results */
    --success-green: #28a745;         /* Excellent/good results */
    --warning-orange: #fd7e14;        /* Acceptable results, warnings */
}
```

### Changing Default Currency

In `script.js` (or inline `<script>` in WordPress embed):

```javascript
// Find this line (around line 24):
let currentCurrency = 'EUR';

// Change to your preferred default:
let currentCurrency = 'USD';  // For US Dollar
```

Also update the HTML:

```html
<!-- Change the selected option in the <select> dropdown -->
<option value="USD" selected>USD ($) - US Dollar</option>
```

### Adjusting Card Width

In `styles.css`:

```css
.bmc-container {
    max-width: 700px;  /* Change this value */
}
```

For WordPress embed, modify:

```css
#burn-multiple-calc-wp .bmc-container {
    max-width: 700px;  /* Change this value */
}
```

### Modifying Result Thresholds

In `script.js`:

```javascript
const RESULT_THRESHOLDS = {
    excellent: 1.0,     // Below this = Excellent
    good: 1.5,          // Below this = Good
    acceptable: 2.0     // Below this = Acceptable, above = Concerning
};
```

---

## 📋 Example Calculations

### Example 1: Excellent Efficiency
**Inputs:**
- Net Burn: €500,000
- Net New ARR: €750,000

**Result:** 0.67 (Excellent)

**Interpretation:** You're spending €0.67 to generate €1 of new ARR. Highly capital efficient!

---

### Example 2: Good Growth
**Inputs:**
- Net Burn: $1,000,000
- Net New ARR: $800,000

**Result:** 1.25 (Good)

**Interpretation:** Spending $1.25 per dollar of ARR. Healthy growth within industry standards.

---

### Example 3: Acceptable Range
**Inputs:**
- Net Burn: £800,000
- Net New ARR: £500,000

**Result:** 1.60 (Acceptable)

**Interpretation:** Burning £1.60 per ARR dollar. Monitor closely and consider optimization.

---

### Example 4: Concerning
**Inputs:**
- Net Burn: ¥10,000,000
- Net New ARR: ¥4,000,000

**Result:** 2.50 (Concerning)

**Interpretation:** High burn rate. Review spending and growth strategies.

---

### Example 5: Negative ARR Growth (Warning)
**Inputs:**
- Net Burn: €500,000
- Net New ARR: -€100,000 (churn exceeding new ARR)

**Result:** -5.00 (Warning)

**Interpretation:** Negative ARR growth while burning cash. Critical attention needed!

---

## 🔒 Input Validation

The calculator includes comprehensive validation:

### Net Burn
- ✅ Must be a number
- ✅ Must be greater than zero
- ✅ Cannot exceed 1 trillion
- ✅ Allows decimals (e.g., 123.45)

### Net New ARR
- ✅ Must be a number
- ✅ Cannot be zero (prevents division by zero)
- ✅ Can be negative (indicates net churn)
- ✅ Cannot exceed ±1 trillion
- ✅ Allows decimals

### Error Handling
- Clear, user-friendly error messages
- Real-time validation as you type
- Field-specific error indicators
- Prevents invalid calculations

---

## 🌐 Browser Support

Tested and working on:

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Opera | 76+ |
| Mobile Safari | iOS 14+ |
| Chrome Mobile | Android 90+ |

**Note:** Modern browsers with ES6 support required.

---

## ♿ Accessibility Features

### Screen Readers
- Semantic HTML5 elements (`<main>`, `<header>`, `<footer>`)
- Proper ARIA labels on all inputs
- `aria-live` regions for dynamic content
- `aria-invalid` for validation errors
- Descriptive button labels

### Keyboard Navigation
- Full tab navigation support
- Visible focus indicators (3px blue outline)
- Enter key submits form
- Escape key clears focus

### Visual Accessibility
- High contrast mode support
- Color-blind friendly (uses icons + text labels)
- Minimum 48px touch targets (mobile)
- 16px minimum font size (prevents iOS zoom)
- Clear visual hierarchy

### Motion Preferences
- Respects `prefers-reduced-motion`
- Graceful degradation without animations

---

## 📁 File Structure

```
burn-multiple-calculator/
│
├── index.html                 # Standalone demo page
│   └── Links to styles.css and script.js
│
├── styles.css                 # Light minimalistic theme
│   ├── CSS variables (colors, spacing, typography)
│   ├── Scoped classes (bmc- prefix)
│   ├── Responsive breakpoints (mobile/tablet/desktop)
│   └── Accessibility features
│
├── script.js                  # Calculation logic & validation
│   ├── IIFE wrapped (no global pollution)
│   ├── Currency management (11 currencies)
│   ├── Validation engine
│   ├── Calculation engine
│   └── Event handlers
│
├── wordpress-embed.html       # WordPress single-file version
│   ├── Complete HTML structure
│   ├── Inline <style> (all CSS)
│   ├── Inline <script> (all JavaScript)
│   └── Scoped with #burn-multiple-calc-wp
│
└── README.md                  # This file
    └── Complete documentation
```

---

## 🛠️ Technical Details

### Architecture
- **Pattern:** IIFE (Immediately Invoked Function Expression)
- **Scope:** All JavaScript wrapped to prevent global pollution
- **DOM Caching:** Elements cached on initialization for performance
- **Event Delegation:** Minimal event listeners for efficiency

### Performance
- **Total Size:** ~18KB (uncompressed)
- **Load Time:** < 50ms on modern browsers
- **No External Requests:** Fully self-contained
- **Optimized:** Minimal DOM manipulation

### Security
- **XSS Protection:** No `innerHTML` for user input
- **Input Sanitization:** All inputs validated before calculation
- **No Eval:** No dynamic code execution
- **CSP Compatible:** Works with strict Content Security Policies

---

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Single column layout
- Full-width inputs
- Touch-friendly 48px minimum heights
- Stacked form fields
- Auto-scroll to results

### Tablet (768px - 1023px)
- Card max-width: 600px
- Increased padding: 32px
- 52px input heights
- Centered layout

### Desktop (1024px+)
- Card max-width: 700px
- Generous padding: 40px
- 56px input heights
- Hover states enabled
- Optimal reading width

---

## 🐛 Troubleshooting

### Calculator not appearing in WordPress
- **Check block type:** Ensure you're using "Custom HTML" block (not "HTML" or "Code")
- **Check paste:** Make sure you copied the entire file including opening/closing tags
- **Check theme:** Some themes have strict CSP - try in a default theme

### Styles look broken
- **CSS conflicts:** WordPress embed uses scoped ID `#burn-multiple-calc-wp` with high specificity
- **Theme override:** Your theme's `!important` rules may override - increase specificity
- **Cache:** Clear browser and WordPress cache

### Calculation not working
- **JavaScript errors:** Open browser console (F12) to check for errors
- **Ad blockers:** Some aggressive ad blockers may block inline scripts
- **Browser support:** Ensure browser supports ES6 (Chrome 90+, Firefox 88+, Safari 14+)

### Mobile display issues
- **Viewport:** Ensure page has `<meta name="viewport">` tag
- **Theme CSS:** Theme may have conflicting responsive styles
- **Test isolation:** Try in a clean page without other elements

---

## 🤝 Contributing

This is a standalone widget designed for easy embedding. To contribute:

1. Fork the repository
2. Make your changes
3. Test in multiple browsers
4. Test WordPress embed version
5. Update README if needed
6. Submit pull request

### Testing Checklist
- [ ] All 11 currencies work correctly
- [ ] Validation catches all edge cases
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Accessibility features intact (keyboard nav, screen readers)
- [ ] WordPress embed version works independently
- [ ] No console errors
- [ ] Calculation accuracy verified

---

## 📄 License

MIT License - Free to use, modify, and distribute.

---

## 📞 Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review example calculations for expected behavior

---

## 🎯 Use Cases

This calculator is perfect for:

### SaaS Companies
- Investors pitching burn efficiency
- Board presentations
- Internal financial tracking
- Growth strategy discussions

### Venture Capital Firms
- Portfolio company analysis
- Investment due diligence
- Benchmark comparisons

### Business Blogs & Publications
- Educational content on SaaS metrics
- Embedded tools in articles
- Interactive financial guides

### Educational Platforms
- Startup finance courses
- SaaS metrics training
- Business school curriculum

---

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- 11 currency support
- Full responsive design
- WordPress embed version
- Comprehensive validation
- Accessibility compliant
- Zero dependencies

---

## 🙏 Acknowledgments

Built with modern web standards and best practices:
- Semantic HTML5
- CSS Grid & Flexbox
- ES6 JavaScript
- WCAG 2.1 AA Guidelines
- Mobile-first responsive design

---

**Made with precision for SaaS founders, investors, and financial analysts.**

Calculate smarter. Grow efficiently. 🚀
