# Navigation Documentation

## Navbar Structure

### Main Navigation Items:

1. **Home** (`/`)

   - Mengarah ke halaman utama
   - Berisi: Hero, About, Achievement, Other, Course, Book, Content sections

2. **Kelas** (`/class`)

   - Halaman dedicated untuk course listing
   - Fitur: Kategori filter, Course cards, Media social content
   - Data: Terintegrasi dengan Google Sheets CSV

3. **Profile** (`/about`)

   - Halaman profil lengkap Muhammad Husnul
   - Berisi: Achievements, Skills, Philosophy, Contact CTA

4. **Contact** (`/#footer`)
   - Mengarah ke section footer di halaman Home
   - Berisi informasi kontak lengkap

### Technical Implementation:

#### GooeyNav Component

- Supports both internal hash navigation (#section) and external page navigation
- Visual effects with particles and smooth transitions
- Active state detection based on current URL path

#### Navigation Logic:

```javascript
// External navigation (different pages)
if (item.isExternal) {
  if (item.href.startsWith("/#")) {
    window.location.href = item.href; // Home + hash
  } else {
    window.location.pathname = item.href; // Different page
  }
}
```

#### Mobile Navigation:

- Full-screen overlay menu for mobile devices
- Same GooeyNav component with adjusted settings
- Close button with proper accessibility

### Active State:

- Current page detection via `window.location.pathname`
- Visual feedback for active navigation item
- Consistent across desktop and mobile

### Logo:

- Clickable logo returns to home page
- Hover effect with red color transition
- Consistent branding

## Pages Overview:

| Page  | Route    | Content           | Features                 |
| ----- | -------- | ----------------- | ------------------------ |
| Home  | `/`      | Complete homepage | All sections, scrollable |
| Class | `/class` | Course catalog    | Filters, CSV data, Media |
| About | `/about` | Profile page      | Achievements, Skills     |

## Future Improvements:

- [ ] Breadcrumb navigation
- [ ] Search functionality
- [ ] User dashboard
- [ ] Mobile-first navigation patterns
