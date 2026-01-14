# AIAA Adaptive Structures Technical Committee Website

A professional static website for the AIAA Adaptive Structures Technical Committee (ASTC).

---

## 📁 Folder Structure

```
astc-website/
├── index.html              # Main website file
├── script.js               # JavaScript functionality
├── members.json            # Member data (edit to update members)
├── events.json             # Events data (edit to update calendar)
├── data_converter.py       # CSV ↔ JSON converter script
├── README.md               # This file
└── assets/
    └── docs/
        ├── bylaws.pdf      # Committee Bylaws (replace placeholder)
        ├── minutes.pdf     # Meeting Minutes (replace placeholder)
        └── awards.pdf      # Award Criteria (replace placeholder)
```

---

## 🖼️ Member Profile Images

### Current Placeholder Images
The site currently uses **pravatar.cc** placeholder avatars. Replace these with real images.

### Options for Profile Images:

| Option | Best For | URL |
|--------|----------|-----|
| **Wikipedia/Wikimedia** | Historical figures (public domain) | commons.wikimedia.org |
| **DiceBear Avatars** | Cartoon-style consistent avatars | dicebear.com |
| **UI Avatars** | Simple initials-based avatars | ui-avatars.com/api/?name=John+Doe |
| **Boring Avatars** | Abstract geometric patterns | boringavatars.com |
| **Professional Headshots** | Real committee members | Upload to hosting service |

### Using Wikipedia Images (Legal Notes):
- Images of scientists from 1927 are **public domain** (70+ years old)
- Check each image's license on Wikimedia Commons
- Provide attribution if required (CC BY-SA licenses)
- Direct link example: `https://upload.wikimedia.org/wikipedia/commons/...`

### Using DiceBear (Consistent Cartoon Avatars):
```
https://api.dicebear.com/7.x/avataaars/svg?seed=AlbertEinstein
https://api.dicebear.com/7.x/lorelei/svg?seed=MarieCurie
https://api.dicebear.com/7.x/bottts/svg?seed=NielsBohr
```

---

## 🔄 CSV ↔ JSON Data Converter

A Python script is included to easily convert between CSV spreadsheets and JSON data files.

### Requirements
- Python 3.6 or higher (no additional packages needed)

### Usage

```bash
# Create a CSV template for members
python data_converter.py template --type members

# Create a CSV template for events  
python data_converter.py template --type events

# Convert CSV to JSON
python data_converter.py csv2json members.csv members.json --type members

# Convert JSON back to CSV
python data_converter.py json2csv members.json members_export.csv

# Validate a members JSON file
python data_converter.py validate members.json
```

### Workflow for Non-Technical Users

1. **Create template**: `python data_converter.py template --type members`
2. **Fill in the CSV** using Excel or Google Sheets
3. **Convert to JSON**: `python data_converter.py csv2json members.csv members.json`
4. **Replace** the `members.json` file in your website folder
5. **Push to GitHub** to update the live site

### CSV Column Reference (Members)

| Column | Required | Description | Example |
|--------|----------|-------------|---------|
| id | Yes | Unique number | 1 |
| name | Yes | Full name with title | Dr. Jane Smith |
| role | Yes | Committee role | Chair, Vice Chair, Member |
| affiliation | Yes | Institution | MIT |
| lab_name | No | Lab or department | Aerospace Structures Lab |
| bio | No | Short biography | Expert in morphing wings... |
| type | Yes | Member category | academia, industry, government |
| country | No | Country code | USA, Germany, Japan |
| research | No | Research topics (comma-separated) | Morphing Wings, Smart Materials |
| lat | Yes | Latitude | 42.3601 |
| lon | Yes | Longitude | -71.0942 |
| website | No | Profile URL | https://example.edu/jsmith |
| image | No | Photo URL | https://example.com/photo.jpg |

---

## 🎨 Fonts Used

The website uses two Google Fonts:

1. **Space Grotesk** - Used for all headings (h1, h2, h3)
   - Weights: 400, 500, 600, 700
   - URL: https://fonts.google.com/specimen/Space+Grotesk

2. **DM Sans** - Used for body text
   - Weights: 400, 500, 600
   - URL: https://fonts.google.com/specimen/DM+Sans

### To Change Fonts:

1. Go to https://fonts.google.com
2. Select your new fonts
3. Copy the `<link>` tag
4. Replace the Google Fonts link in `index.html` (around line 20)
5. Update the CSS font-family declarations in the `<style>` section

---

## 🎨 Color Scheme

The website uses AIAA-inspired blue tones:

| Color | Hex Code | Usage |
|-------|----------|-------|
| AIAA Blue | `#003366` | Primary brand color |
| AIAA Blue Light | `#0059b3` | Secondary accent |
| Accent Blue | `#4A90D9` | Highlights, badges |
| Dark Blue | `#001a33` | Footer, dark sections |

### To Change Colors:

1. Open `index.html`
2. Find the CSS `:root` section (around line 45)
3. Update the CSS variables:

```css
:root {
    --aiaa-blue: #003366;
    --aiaa-blue-light: #0059b3;
    --aiaa-accent: #4A90D9;
    --aiaa-dark: #001a33;
}
```

---

## 📊 How to Update Statistics

The statistics section displays 4 metrics on the homepage. To update:

1. Open `index.html`
2. Find the `<!-- Statistics Section -->` (around line 230)
3. Edit the numbers in the `stat-number` spans:

```html
<div class="stat-number text-4xl md:text-5xl font-bold mb-2">45</div>
<div class="text-gray-600 font-medium">Active Members</div>
<div class="text-sm text-gray-400 mt-1">From 12 Countries</div>
```

### For Dynamic Statistics:

Uncomment the `renderStatistics()` function in `script.js` to calculate statistics automatically from `members.json`.

---

## 👥 How to Update Members

### Method 1: Edit members.json Directly

1. Open `members.json`
2. Add, edit, or remove member objects
3. Each member follows this structure:

```json
{
  "id": 1,
  "name": "Dr. Jane Smith",
  "role": "Chair",                    // Chair, Vice Chair, Member, Student Liaison
  "affiliation": "MIT",
  "lab_name": "Aerospace Lab",
  "bio": "Expert in morphing structures...",
  "type": "academia",                 // academia, industry, or government
  "country": "USA",
  "research": ["Topic 1", "Topic 2"],
  "lat": 42.3601,                     // Latitude for map
  "lon": -71.0942,                    // Longitude for map
  "website": "https://example.edu/jsmith",
  "image": "https://example.com/photo.jpg"
}
```

### Method 2: Use Excel/Google Sheets

1. Create a spreadsheet with columns matching the JSON structure
2. Export as CSV
3. Convert to JSON using: https://www.convertcsv.com/csv-to-json.htm
4. Replace the content of `members.json`

### Finding Coordinates (lat/lon):

1. Go to https://www.latlong.net/
2. Search for the institution
3. Copy the latitude and longitude

---

## 📅 How to Update Events/Calendar

### Edit events.json:

1. Open `events.json`
2. Add, edit, or remove event objects:

```json
{
  "id": 1,
  "title": "AIAA SciTech Forum 2026",
  "type": "conference",               // conference, meeting, deadline, lecture, session, awards
  "date": "2026-01-13",               // YYYY-MM-DD format
  "endDate": "2026-01-17",            // Optional: for multi-day events
  "time": "All Day",
  "location": "Orlando, FL",
  "room": "Celebration 11",           // Optional
  "description": "Event description...",
  "link": "https://aiaa.org/scitech", // Optional
  "featured": true                    // Shows highlight dot
}
```

### Event Types:
- `conference` - Blue badge
- `meeting` - Green badge
- `deadline` - Red badge
- `lecture` - Purple badge
- `session` - Sky blue badge
- `awards` - Indigo badge

---

## 📄 How to Update Resources/Documents

### Replace Placeholder Files:

1. Create your PDF documents:
   - `bylaws.pdf` - Committee Bylaws
   - `minutes.pdf` - Latest Meeting Minutes
   - `awards.pdf` - Award Criteria

2. Place them in: `assets/docs/`

3. Delete the `.txt` placeholder files

### To Add New Documents:

1. Add the PDF to `assets/docs/`
2. Add a new link in `index.html` (find the `#resources` section, around line 580)
3. Copy an existing document row and update:

```html
<a href="assets/docs/your-new-doc.pdf" class="flex items-center justify-between p-6 hover:bg-blue-50 transition group">
    <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <!-- Icon SVG here -->
        </div>
        <div>
            <h3 class="font-semibold text-lg" style="color: var(--aiaa-blue);">Document Title</h3>
            <p class="text-gray-500 text-sm">Document description</p>
        </div>
    </div>
    <!-- Download icon -->
</a>
```

---

## 🚀 Deployment to GitHub Pages

1. Create a new GitHub repository
2. Push all files to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Click "Pages" in the sidebar
   - Source: "Deploy from a branch"
   - Branch: "main", folder: "/ (root)"
   - Click Save

4. Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO/`

---

## 🔧 Maintenance Checklist

### Before Each Conference:
- [ ] Update SciTech/AVIATION session details
- [ ] Verify TC meeting room and time
- [ ] Add new events to calendar

### Monthly:
- [ ] Check for broken links
- [ ] Update member roster if needed
- [ ] Add new events

### After Each TC Meeting:
- [ ] Upload new meeting minutes PDF
- [ ] Update member changes
- [ ] Add action items to calendar

---

## 📞 Support

- **GitHub Pages Docs**: https://pages.github.com
- **AIAA TC Information**: https://aiaa.org/get-involved/committees-groups/technical-committees/
- **AIAA Engage**: https://engage.aiaa.org/

---

## 📝 Notes

- The website is fully static (no server required)
- All data is stored in JSON files
- Free hosting via GitHub Pages
- Mobile-responsive design
- Works offline once loaded

---

**Current Version:** 2.0 (January 2026)  
**Demo Data:** 1927 Solvay Conference Scientists
