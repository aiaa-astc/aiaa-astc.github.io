// AIAA Adaptive Structures Technical Committee - Enhanced Script
// ================================================================
// 
// FONTS USED:
// - Space Grotesk (headings) - https://fonts.google.com/specimen/Space+Grotesk
// - DM Sans (body text) - https://fonts.google.com/specimen/DM+Sans
//
// COLOR SCHEME:
// - AIAA Blue: #003366 (primary)
// - AIAA Blue Light: #0059b3 (secondary)
// - Accent: #4A90D9 (lighter blue, replaces gold)
// - Dark: #001a33 (darkest)
//
// ================================================================

const AIAA_BLUE = '#003366';
const AIAA_ACCENT = '#4A90D9';  // Changed from gold to blue accent

// Events Data
const events = [
    {
        id: 1,
        title: "AIAA SciTech Forum 2026",
        type: "conference",
        date: "2026-01-13",
        endDate: "2026-01-17",
        time: "All Day",
        location: "Hilton Orlando, Orlando, FL",
        description: "AIAA's premier event for aerospace research and development.",
        link: "https://aiaa.org/scitech",
        featured: true
    },
    {
        id: 2,
        title: "Adaptive Structures TC Meeting",
        type: "meeting",
        date: "2026-01-13",
        time: "7:00 PM - 10:00 PM",
        location: "Celebration 11, Hilton Orlando",
        description: "Annual committee meeting. All members and interested participants welcome.",
        featured: true
    },
    {
        id: 3,
        title: "Adaptive Structures Lecture",
        type: "lecture",
        date: "2026-01-13",
        time: "3:30 PM - 5:00 PM",
        location: "Orlando Ballroom N",
        description: "Keynote lecture on adaptive structures technology advances.",
        featured: true
    },
    {
        id: 4,
        title: "Clean Aviation Session (AS-14)",
        type: "session",
        date: "2026-01-14",
        time: "9:30 AM - 10:45 AM",
        location: "Florida Ballroom B",
        description: "Technical session on clean aviation program achievements.",
        featured: false
    },
    {
        id: 5,
        title: "SDM Lecture",
        type: "lecture",
        date: "2026-01-15",
        time: "1:00 PM - 2:00 PM",
        location: "Orlando Ballroom N",
        description: "Structures, Dynamics, and Materials lecture presentation.",
        featured: false
    },
    {
        id: 6,
        title: "Student Paper Awards",
        type: "awards",
        date: "2026-01-16",
        time: "8:00 AM - 9:00 AM",
        location: "Windermere Ballroom",
        description: "Technical plenary and recognition of outstanding student papers.",
        featured: false
    },
    {
        id: 7,
        title: "SciTech 2027 Abstract Deadline",
        type: "deadline",
        date: "2026-06-01",
        time: "11:59 PM EST",
        location: "Online Submission",
        description: "Deadline for abstract submissions to SciTech 2027.",
        featured: false
    },
    {
        id: 8,
        title: "AIAA AVIATION Forum 2026",
        type: "conference",
        date: "2026-06-15",
        endDate: "2026-06-19",
        time: "All Day",
        location: "Las Vegas, NV",
        description: "Annual AIAA AVIATION Forum.",
        link: "https://aiaa.org/aviation",
        featured: false
    }
];

// Member data loaded from members.json
let members = [];

// Initialize the site
document.addEventListener('DOMContentLoaded', () => {
    initializeSite();
});

async function initializeSite() {
    // Try to load members from JSON file
    try {
        const response = await fetch('members.json');
        members = await response.json();
    } catch (error) {
        console.log('Loading members from embedded data');
        // Fallback to embedded Solvay Conference data
        members = getSolvayMembers();
    }
    
    renderEvents(events);
    renderMap(members);
    renderMemberCards(members);
    setupEventFilters();
    setupMobileMenu();
    setupSmoothScrolling();
}

// Fallback Solvay Conference members data
function getSolvayMembers() {
    return [
        { id: 1, name: "Auguste Piccard", role: "Member", affiliation: "Free University of Brussels", lab_name: "Physics Department", bio: "Pioneer in high-altitude balloon flights.", type: "academia", country: "Switzerland", research: ["Stratospheric Research", "Balloon Technology"], lat: 50.8136, lon: 4.3824, website: "https://en.wikipedia.org/wiki/Auguste_Piccard", image: "https://i.pravatar.cc/150?img=11" },
        { id: 24, name: "Hendrik Lorentz", role: "Chair", affiliation: "Leiden University", lab_name: "Institute of Physics", bio: "Nobel laureate who developed the Lorentz transformations.", type: "academia", country: "Netherlands", research: ["Lorentz Transformations", "Electromagnetism"], lat: 52.1576, lon: 4.4851, website: "https://en.wikipedia.org/wiki/Hendrik_Lorentz", image: "https://i.pravatar.cc/150?img=34" },
        { id: 20, name: "Niels Bohr", role: "Vice Chair", affiliation: "University of Copenhagen", lab_name: "Institute for Theoretical Physics", bio: "Nobel laureate who developed the Bohr model of the atom.", type: "academia", country: "Denmark", research: ["Atomic Model", "Copenhagen Interpretation"], lat: 55.6761, lon: 12.5683, website: "https://en.wikipedia.org/wiki/Niels_Bohr", image: "https://i.pravatar.cc/150?img=30" },
        { id: 25, name: "Albert Einstein", role: "Member", affiliation: "Kaiser Wilhelm Institute", lab_name: "Institute of Physics", bio: "Nobel laureate who developed relativity.", type: "academia", country: "Germany", research: ["Relativity", "Photoelectric Effect"], lat: 52.5200, lon: 13.4050, website: "https://en.wikipedia.org/wiki/Albert_Einstein", image: "https://i.pravatar.cc/150?img=35" },
        { id: 23, name: "Marie Curie", role: "Member", affiliation: "University of Paris", lab_name: "Radium Institute", bio: "Two-time Nobel laureate for radioactivity research.", type: "academia", country: "France", research: ["Radioactivity", "Polonium", "Radium"], lat: 48.8499, lon: 2.3427, website: "https://en.wikipedia.org/wiki/Marie_Curie", image: "https://i.pravatar.cc/150?img=33" }
    ];
}

// Render Events Calendar
function renderEvents(eventsData) {
    const container = document.getElementById('events-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const sortedEvents = [...eventsData].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    sortedEvents.forEach(event => {
        const eventDate = new Date(event.date);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const card = document.createElement('div');
        card.className = 'calendar-card event-item';
        card.setAttribute('data-type', event.type);
        
        // All blue-toned badges
        const typeColors = {
            conference: { bg: 'bg-blue-600', text: 'text-blue-600' },
            meeting: { bg: 'bg-emerald-500', text: 'text-emerald-600' },
            deadline: { bg: 'bg-red-500', text: 'text-red-600' },
            lecture: { bg: 'bg-purple-500', text: 'text-purple-600' },
            session: { bg: 'bg-sky-500', text: 'text-sky-600' },
            awards: { bg: 'bg-indigo-500', text: 'text-indigo-600' }
        };
        
        const colors = typeColors[event.type] || typeColors.conference;
        
        card.innerHTML = `
            <div class="flex">
                <div class="calendar-date flex flex-col justify-center">
                    <div class="text-3xl font-bold">${eventDate.getDate()}</div>
                    <div class="text-sm opacity-80">${monthNames[eventDate.getMonth()]}</div>
                    <div class="text-xs opacity-60">${eventDate.getFullYear()}</div>
                </div>
                <div class="flex-grow p-5">
                    <div class="flex items-start justify-between gap-2 mb-2">
                        <span class="text-xs ${colors.bg} text-white px-2 py-1 rounded-full font-bold uppercase tracking-wide">${event.type}</span>
                        ${event.featured ? '<span class="w-2 h-2 bg-sky-400 rounded-full flex-shrink-0 animate-pulse"></span>' : ''}
                    </div>
                    <h3 class="font-bold text-lg mb-2" style="color: ${AIAA_BLUE};">${event.title}</h3>
                    <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        ${event.time}
                    </div>
                    <div class="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        ${event.location}
                    </div>
                    <p class="text-gray-600 text-sm">${event.description}</p>
                    ${event.link ? `
                        <a href="${event.link}" target="_blank" class="inline-flex items-center gap-1 mt-3 text-sm font-medium ${colors.text} hover:underline">
                            Learn more →
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Setup Event Filters
function setupEventFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            const eventItems = document.querySelectorAll('.event-item');
            
            eventItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-type') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Render Interactive Leaflet Map
function renderMap(membersData) {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    // Initialize map centered on Europe (for Solvay Conference)
    const map = L.map('map', {
        center: [48, 10],
        zoom: 4,
        minZoom: 2,
        maxZoom: 18,
        scrollWheelZoom: true
    });
    
    // CartoDB Positron tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);
    
    // Add markers - all blue tones now
    membersData.forEach(member => {
        const colors = {
            academia: AIAA_BLUE,
            industry: AIAA_ACCENT,
            government: '#059669'
        };
        
        const color = colors[member.type] || AIAA_BLUE;
        
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="
                    width: 24px;
                    height: 24px;
                    background: ${color};
                    border: 3px solid white;
                    border-radius: 50%;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.25);
                    cursor: pointer;
                "></div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12]
        });
        
        const marker = L.marker([member.lat, member.lon], { icon: customIcon }).addTo(map);
        
        const popupContent = `
            <div style="min-width: 220px; font-family: 'DM Sans', sans-serif;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <img src="${member.image}" alt="${member.name}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                    <div>
                        <div style="font-weight: 600; color: ${AIAA_BLUE}; font-size: 14px;">${member.name}</div>
                        <div style="color: ${AIAA_ACCENT}; font-size: 12px; font-weight: 500;">${member.role}</div>
                    </div>
                </div>
                <div style="font-size: 13px; color: #374151; margin-bottom: 6px;">
                    <strong>${member.affiliation}</strong>
                </div>
                <div style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">
                    ${member.lab_name}
                </div>
                <div style="font-size: 12px; color: #6b7280; line-height: 1.5;">
                    ${member.bio}
                </div>
                ${member.research ? `
                <div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 4px;">
                    ${member.research.map(r => `<span style="background: #e5e7eb; padding: 2px 8px; border-radius: 12px; font-size: 10px; color: #4b5563;">${r}</span>`).join('')}
                </div>
                ` : ''}
                <a href="${member.website}" target="_blank" style="
                    display: inline-block;
                    margin-top: 12px;
                    padding: 6px 12px;
                    background: ${AIAA_BLUE};
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 500;
                ">View Profile →</a>
            </div>
        `;
        
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup'
        });
    });
    
    window.addEventListener('resize', () => {
        map.invalidateSize();
    });
}

// Render Member Cards
function renderMemberCards(membersData) {
    const grid = document.getElementById('members-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const roleOrder = ['Chair', 'Vice Chair', 'Student Liaison', 'Member'];
    const sortedMembers = [...membersData].sort((a, b) => {
        return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
    });
    
    sortedMembers.forEach(member => {
        // Blue-toned type badges
        const typeColors = {
            academia: { bg: 'bg-blue-100', text: 'text-blue-700' },
            industry: { bg: 'bg-sky-100', text: 'text-sky-700' },
            government: { bg: 'bg-emerald-100', text: 'text-emerald-700' }
        };
        
        const colors = typeColors[member.type] || typeColors.academia;
        
        const card = document.createElement('div');
        card.className = 'member-card card-hover';
        
        card.innerHTML = `
            <div class="relative overflow-hidden">
                <img src="${member.image}" alt="${member.name}" class="w-full h-52 object-cover">
                <div class="absolute top-4 right-4">
                    <span class="${colors.bg} ${colors.text} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">${member.type}</span>
                </div>
            </div>
            <div class="p-6">
                <div class="flex items-start justify-between mb-2">
                    <h3 class="text-xl font-bold" style="color: ${AIAA_BLUE};">${member.name}</h3>
                </div>
                <p class="text-sm font-semibold mb-1" style="color: ${AIAA_ACCENT};">${member.role}</p>
                <p class="text-gray-700 font-medium mb-1">${member.affiliation}</p>
                <p class="text-gray-500 text-sm mb-4">${member.lab_name}</p>
                <p class="text-gray-600 text-sm leading-relaxed mb-4">${member.bio}</p>
                ${member.research ? `
                <div class="flex flex-wrap gap-2 mb-4">
                    ${member.research.map(r => `<span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">${r}</span>`).join('')}
                </div>
                ` : ''}
                <a href="${member.website}" target="_blank" class="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                    View Profile
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                </a>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Setup Mobile Menu
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    }
    
    const mobileLinks = mobileMenu?.querySelectorAll('a');
    mobileLinks?.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// Smooth Scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/*
=====================================================
HOW TO UPDATE STATISTICS:
=====================================================
The statistics are currently hardcoded in index.html.
To make them dynamic, uncomment this function and 
call it from initializeSite():

function renderStatistics(membersData) {
    const stats = {
        totalMembers: membersData.length,
        countries: [...new Set(membersData.map(m => m.country))].length,
        academiaPercent: Math.round(membersData.filter(m => m.type === 'academia').length / membersData.length * 100),
        industryPercent: Math.round(membersData.filter(m => m.type === 'industry').length / membersData.length * 100),
        universities: [...new Set(membersData.filter(m => m.type === 'academia').map(m => m.affiliation))].length
    };
    
    // Update the stat cards in HTML
    // document.querySelector('[data-stat="members"]').textContent = stats.totalMembers;
    // etc.
}
=====================================================
*/
