/* ============================================================
   TELUGU WEDDING INVITATION — script.js
   Configuration · Video System · Scroll Animations ·
   Chapter Indicator · ICS Generator · RSVP · Music
   ============================================================ */

'use strict';

/* ============================================================
   CONFIGURATION — Edit everything here
   ============================================================ */
const weddingDetails = {

  bride: {
    name: "Ananya Reddy",
    teluguName: "అనన్య రెడ్డి",
    description: "Beloved daughter of Sri Ramesh Reddy & Smt. Lakshmi Devi"
  },

  groom: {
    name: "Aditya Varma",
    teluguName: "ఆదిత్య వర్మ",
    description: "Beloved son of Sri Srinivas Varma & Smt. Padma Varma"
  },

  families: {
    brideFamily: [
      { name: "Sri Ramesh Reddy", relation: "Father of the Bride" },
      { name: "Smt. Lakshmi Devi", relation: "Mother of the Bride" },
      { name: "Sri Narasimha Reddy", relation: "Grandfather" },
      { name: "Smt. Savitri Devi", relation: "Grandmother" }
    ],
    groomFamily: [
      { name: "Sri Srinivas Varma", relation: "Father of the Groom" },
      { name: "Smt. Padma Varma", relation: "Mother of the Groom" },
      { name: "Sri Venkatesh Varma", relation: "Grandfather" },
      { name: "Smt. Saroja Devi", relation: "Grandmother" }
    ]
  },

  wedding: {
    date: "2027-01-18",    // ISO date: "2027-01-18"
    displayDate: "18th January 2027",  // e.g. "18th January 2027"
    day: "Monday",
    muhurtham: "07:42 AM (ధనుర్ లగ్న సుముహూర్తమున)",
    venue: "Sri Lakshmi Convention Hall",
    address: "Madhapur, Hyderabad, Telangana",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    mapsUrl: "https://maps.app.goo.gl/T2X7Q9pLp3ZNCtbP7",              // Google Maps URL
    bhojanalu: "Traditional Telugu Bhojanalu will be served.",
    menu: [
      {
        category: "Sweets & Desserts",
        items: ["Bobbatlu", "Boondi Laddu", "Kobbari Payasam", "Double Ka Meetha", "Ice Cream"]
      },
      {
        category: "Rice Items",
        items: ["Pulihora", "Ghee Rice", "Steamed Rice"]
      },
      {
        category: "Curries & Fries",
        items: ["Gutti Vankaya", "Bendakaya Fry", "Paneer Curry"]
      },
      {
        category: "Dal & Sambar",
        items: ["Tomato Pappu", "Mudda Pappu", "Sambar", "Rasam"]
      },
      {
        category: "Sides & Chutneys",
        items: ["Allam Pachadi", "Gongura Pachadi", "Appadalu", "Fresh Curd"]
      }
    ]
  },

  events: [
    {
      id: "nischitartham",
      name: "Engagement",
      teluguName: "నిశ్చితార్థం",
      date: "2027-01-10",
      displayDate: "10th January 2027",
      time: "6:30 PM",
      venue: "Sri Lakshmi Convention Hall"
    },
    {
      id: "pasupu",
      name: "Pasupu Veduka",
      teluguName: "పసుపు వేడుక",
      date: "2027-01-16",
      displayDate: "16th January 2027",
      time: "10:00 AM",
      venue: "Sri Lakshmi Convention Hall"
    },
    {
      id: "sangeet",
      name: "Sangeet Night",
      teluguName: "సంగీత్",
      date: "2027-01-16",
      displayDate: "16th January 2027",
      time: "7:00 PM",
      venue: "Sri Lakshmi Convention Hall"
    },
    {
      id: "wedding",
      name: "Wedding Ceremony",
      teluguName: "వివాహం",
      date: "2027-01-18",
      displayDate: "18th January 2027 (Monday)",
      time: "7:42 AM (ధనుర్ లగ్నం)",
      venue: "Sri Lakshmi Convention Hall"
    },
    {
      id: "reception",
      name: "Reception & Dinner",
      teluguName: "విందు / రిసెప్షన్",
      date: "2027-01-18",
      displayDate: "18th January 2027",
      time: "7:00 PM",
      venue: "Sri Lakshmi Convention Hall"
    }
  ],

  rsvpUrl: "",    // External RSVP URL — leave empty to show inline form
  rsvpMailto: "kagithalokesh8@example.com",    // mailto address for RSVP form fallback

  contacts: {
    phone: "+917032817065",   // Phone contact
    whatsapp: "+917032817065" // WhatsApp contact
  },

  images: {
    bride: "images/brideImage.jpeg",
    groom: "images/groomImage.jpeg",
    couple: "images/couple.jpeg",   // e.g. "images/couple.jpg"
    family: "",
    venue: "images/venue.jpeg",
    bhojanalu: ""
  },

  musicUrl: ""       // e.g. "music/wedding-song.mp3"
};

/* ============================================================
   HELPERS
   ============================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const isReduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setTextIfEl(id, text) {
  const el = document.getElementById(id);
  if (el && text) el.textContent = text;
}

function showEl(el) { el && el.classList.remove('hidden'); }
function hideEl(el) { el && el.classList.add('hidden'); }

/* ============================================================
   POPULATE CONTENT FROM CONFIG
   ============================================================ */
function populateContent() {
  const { bride, groom, wedding, events, contacts, images } = weddingDetails;

  // Names
  setTextIfEl('hero-bride-name', bride.name);
  setTextIfEl('hero-groom-name', groom.name);
  setTextIfEl('bride-name', bride.name);
  setTextIfEl('groom-name', groom.name);
  setTextIfEl('closing-bride', bride.name);
  setTextIfEl('closing-groom', groom.name);

  // Descriptions
  if (bride.description) setTextIfEl('bride-desc', bride.description);
  if (groom.description) setTextIfEl('groom-desc', groom.description);

  // Wedding day info
  setTextIfEl('wd-date', wedding.displayDate);
  setTextIfEl('wd-muhurtham', wedding.muhurtham);
  setTextIfEl('wd-venue', wedding.venue);
  setTextIfEl('wd-address', wedding.address);

  // Join us
  setTextIfEl('join-date', wedding.displayDate);
  setTextIfEl('join-muhurtham', wedding.muhurtham);
  setTextIfEl('join-venue', wedding.venue);
  setTextIfEl('join-address', buildAddress(wedding));

  // Location
  setTextIfEl('loc-venue', wedding.venue);
  setTextIfEl('loc-address', buildAddress(wedding));

  // Maps URLs
  const mapsUrl = wedding.mapsUrl || '#';
  $$('#btn-directions-wedding, #btn-directions-join, #btn-directions-loc, #btn-open-maps')
    .forEach(el => {
      if (el) el.href = wedding.mapsUrl || '#';
    });
  if (!wedding.mapsUrl) {
    $$('#btn-open-maps, #btn-directions-loc, #btn-directions-wedding, #btn-directions-join')
      .forEach(el => el && (el.style.opacity = '0.45', el.style.pointerEvents = 'none'));
  }

  // Document title
  if (bride.name !== 'BRIDE NAME' || groom.name !== 'GROOM NAME') {
    document.title = `Wedding Invitation — ${bride.name} & ${groom.name}`;
    $$('[property="og:title"]').forEach(m =>
      m.setAttribute('content', `Wedding Invitation — ${bride.name} & ${groom.name}`)
    );
  }

  // Images
  if (images.bride) loadPersonImage('bride-image-wrap', images.bride, bride.name + ' — Bride');
  if (images.groom) loadPersonImage('groom-image-wrap', images.groom, groom.name + ' — Groom');
  if (images.couple) loadPersonImage('couple-image-wrap', images.couple, bride.name + ' & ' + groom.name);
  if (images.venue) {
    loadVenueImage('venue-image-wrap', images.venue, wedding.venue);
    loadVenueImage('map-preview', images.venue, wedding.venue);
  }

  // Families
  populateFamilies();

  // Timeline events
  populateTimeline();

  // Venue & Timings Highlight Section
  populateVenueTimingsSection();

  // Bhojanalu
  populateBhojanalu();

  // Families footer
  populateFamiliesFooter();

  // RSVP / Contact / Calendar buttons
  wireButtons();

  // Music
  initMusic();

  // Meta OG date
  if (wedding.displayDate !== 'WEDDING DATE') {
    $$('[property="og:description"]').forEach(m =>
      m.setAttribute('content',
        `Join us to celebrate our wedding. ${wedding.displayDate} · ${wedding.venue}`)
    );
  }
}

function buildAddress(w) {
  return [w.address, w.city, w.state, w.pincode].filter(Boolean).join(', ');
}

function loadPersonImage(wrapperId, src, alt) {
  const wrap = document.getElementById(wrapperId);
  if (!wrap) return;
  const existingImg = wrap.querySelector('img');
  if (existingImg) {
    existingImg.src = src;
    existingImg.alt = alt;
    return;
  }
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
  img.onerror = () => { }; // keep placeholder if image fails
  img.onload = () => {
    const placeholder = wrap.querySelector('.person-image-placeholder');
    if (placeholder) placeholder.remove();
    wrap.appendChild(img);
  };
}

function loadVenueImage(wrapperId, src, alt) {
  const wrap = document.getElementById(wrapperId);
  if (!wrap) return;
  const existingImg = wrap.querySelector('img');
  if (existingImg) {
    existingImg.src = src;
    existingImg.alt = alt || 'Wedding Venue';
    return;
  }
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt || 'Wedding Venue';
  img.loading = 'lazy';
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
  img.onerror = () => { };
  img.onload = () => {
    const placeholder = wrap.querySelector('.map-preview-placeholder, .person-image-placeholder');
    if (placeholder) placeholder.remove();
    wrap.appendChild(img);
  };
}

/* ─── Family grid ─── */
function populateFamilies() {
  const grid = document.getElementById('family-grid');
  if (!grid) return;

  const { brideFamily, groomFamily } = weddingDetails.families;
  const { bride, groom } = weddingDetails;

  const hasB = brideFamily && brideFamily.length > 0;
  const hasG = groomFamily && groomFamily.length > 0;

  if (!hasB && !hasG) {
    // Just show placeholder family blocks
    grid.innerHTML = buildFamilyCard(bride.name + "'s Family", brideFamily) +
      buildFamilyCard(groom.name + "'s Family", groomFamily);
    return;
  }

  grid.innerHTML =
    buildFamilyCard(bride.name + "'s Family", brideFamily) +
    buildFamilyCard(groom.name + "'s Family", groomFamily);
}

function buildFamilyCard(title, members) {
  const memberHTML = (members && members.length > 0)
    ? `<ul class="family-members">${members.map(m =>
      `<li>${m.name}${m.relation ? ` <em style="opacity:0.6">— ${m.relation}</em>` : ''}</li>`
    ).join('')}</ul>`
    : '';

  return `
    <div class="family-card scroll-reveal">
      <span class="family-side-label">With Blessings From</span>
      <span class="family-name-script">${title}</span>
      ${memberHTML}
    </div>
  `;
}

/* ─── Timeline ─── */
function populateTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  const activeEvents = weddingDetails.events.filter(ev =>
    ev.displayDate || ev.date || ev.time || ev.venue
  );

  // If no events have data, show placeholder for the wedding event
  const eventsToShow = activeEvents.length > 0 ? activeEvents : [];

  // Rebuild (timeline-line already exists)
  const lineEl = container.querySelector('.timeline-line');
  container.innerHTML = '';
  if (lineEl) container.appendChild(lineEl);

  eventsToShow.forEach((ev, i) => {
    const eventEl = document.createElement('div');
    eventEl.className = 'timeline-event';
    eventEl.style.transitionDelay = `${i * 0.15}s`;
    eventEl.innerHTML = `
      <div class="timeline-marker" aria-hidden="true">
        <div class="timeline-dot"></div>
      </div>
      <div class="event-eyebrow">Event ${String(i + 1).padStart(2, '0')}</div>
      <div class="event-name-en">${ev.name}</div>
      <span class="event-name-tel t-telugu">${ev.teluguName}</span>
      <div class="event-meta">
        ${ev.displayDate ? `
          <div class="event-meta-item">
            <span class="event-meta-label">Date</span>
            <span>${ev.displayDate}</span>
          </div>` : ''}
        ${ev.time ? `
          <div class="event-meta-item">
            <span class="event-meta-label">Time</span>
            <span>${ev.time}</span>
          </div>` : ''}
        ${ev.venue ? `
          <div class="event-meta-item">
            <span class="event-meta-label">Venue</span>
            <span>${ev.venue}</span>
          </div>` : ''}
      </div>
    `;
    container.appendChild(eventEl);
  });

  // If no event data available, show placeholder
  if (eventsToShow.length === 0) {
    const placeholder = document.createElement('p');
    placeholder.style.cssText = 'font-family:var(--font-body); font-style:italic; color:var(--warm-brass); font-size:1rem; line-height:1.7; margin-top:var(--sp-xl); opacity:0.7;';
    placeholder.textContent = 'Event details will be announced shortly. Please check back.';
    container.appendChild(placeholder);
  }
}

/* ─── Venue & Timings Highlight Section ─── */
function populateVenueTimingsSection() {
  const { wedding, events } = weddingDetails;

  setTextIfEl('vt-venue-name', wedding.venue);
  setTextIfEl('vt-venue-address', wedding.address);
  setTextIfEl('vt-date', wedding.displayDate);
  setTextIfEl('vt-time', wedding.muhurtham ? wedding.muhurtham.split('(')[0].trim() : '07:42 AM');

  const btn = document.getElementById('btn-vt-directions');
  if (btn && wedding.mapsUrl) {
    btn.href = wedding.mapsUrl;
  }

  const listEl = document.getElementById('vt-events-list');
  if (listEl && events && events.length > 0) {
    const activeEvents = events.filter(ev => ev.displayDate || ev.time || ev.name);
    if (activeEvents.length > 0) {
      listEl.innerHTML = activeEvents.map(ev => `
        <div class="vt-event-row ${ev.id === 'wedding' ? 'vt-event-highlight' : ''}">
          <div class="vt-ev-left">
            <span class="vt-ev-name">${ev.name} ${ev.teluguName ? `<em class="t-telugu">${ev.teluguName}</em>` : ''}</span>
          </div>
          <div class="vt-ev-right">
            <span class="vt-ev-date">${ev.displayDate || ''}</span>
            <span class="vt-ev-time">${ev.time || ''}</span>
          </div>
        </div>
      `).join('');
    }
  }
}

/* ─── Bhojanalu ─── */
function populateBhojanalu() {
  const content = document.getElementById('bhojanalu-content');
  if (!content) return;

  const { menu, bhojanalu } = weddingDetails.wedding;

  if (menu && menu.length > 0) {
    content.innerHTML = `
      <div class="menu-grid">
        ${menu.map(cat => `
          <div class="menu-category">
            <div class="menu-cat-label">${cat.category}</div>
            <ul class="menu-items">
              ${cat.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    content.innerHTML = `
      <p class="bhojanalu-message">${bhojanalu || 'Traditional Telugu Bhojanalu will be served.'}</p>
    `;
  }
}

/* ─── Families footer ─── */
function populateFamiliesFooter() {
  const footer = document.getElementById('families-footer');
  if (!footer) return;

  const { bride, groom, families } = weddingDetails;

  let html = '';
  const bf = families.brideFamily;
  const gf = families.groomFamily;

  if (bf && bf.length > 0) {
    html += `<div><em>${bride.name}'s Family</em><br>`;
    html += bf.map(m => m.name).join(' · ');
    html += '</div>';
  }
  if (gf && gf.length > 0) {
    if (html) html += '<br>';
    html += `<div><em>${groom.name}'s Family</em><br>`;
    html += gf.map(m => m.name).join(' · ');
    html += '</div>';
  }

  if (html) footer.innerHTML = html;
}

/* ─── Buttons ─── */
function wireButtons() {
  const { rsvpUrl, rsvpMailto, contacts, wedding } = weddingDetails;

  // RSVP
  const rsvpSection = document.getElementById('rsvp-section');
  const rsvpExtBtn = document.getElementById('btn-rsvp-ext');
  if (rsvpUrl) {
    if (rsvpExtBtn) {
      rsvpExtBtn.href = rsvpUrl;
      showEl(rsvpExtBtn);
    }
    if (rsvpSection) hideEl(rsvpSection);
  }

  // WhatsApp
  const waBtn = document.getElementById('btn-whatsapp');
  if (contacts.whatsapp && waBtn) {
    const num = contacts.whatsapp.replace(/\D/g, '');
    const msg = encodeURIComponent(
      `Hello! I received the wedding invitation of ${weddingDetails.bride.name} & ${weddingDetails.groom.name} on ${wedding.displayDate}. `
    );
    waBtn.href = `https://wa.me/${num}?text=${msg}`;
    showEl(waBtn);
  }

  // Phone
  const phoneBtn = document.getElementById('btn-phone');
  if (contacts.phone && phoneBtn) {
    phoneBtn.href = `tel:${contacts.phone}`;
    showEl(phoneBtn);
  }

  // Calendar button
  const calBtn = document.getElementById('btn-calendar');
  if (calBtn) {
    calBtn.addEventListener('click', generateICSDownload);
  }

  // RSVP form submission
  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', handleRsvpSubmit);
  }
}

/* ─── RSVP Attendance choice ─── */
let rsvpAttendance = null;

window.handleRsvpAttend = function (choice) {
  rsvpAttendance = choice;
  const yesBtn = document.getElementById('rsvp-yes');
  const noBtn = document.getElementById('rsvp-no');
  const formFields = document.getElementById('rsvp-form');

  yesBtn && yesBtn.setAttribute('aria-pressed', choice === 'yes' ? 'true' : 'false');
  noBtn && noBtn.setAttribute('aria-pressed', choice === 'no' ? 'true' : 'false');

  yesBtn && yesBtn.classList.toggle('selected-yes', choice === 'yes');
  noBtn && noBtn.classList.toggle('selected-no', choice === 'no');

  if (formFields) {
    formFields.classList.toggle('visible', choice === 'yes');
  }

  // If declining, submit immediately
  if (choice === 'no') {
    showRsvpSuccess("Thank you for letting us know. We'll miss you!");
  }
};

function handleRsvpSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('rsvp-name')?.value.trim();
  const guests = document.getElementById('rsvp-guests')?.value;
  const message = document.getElementById('rsvp-message')?.value.trim();
  const mailto = weddingDetails.rsvpMailto;

  if (!name) {
    document.getElementById('rsvp-name')?.focus();
    return;
  }

  if (mailto) {
    const { bride, groom, wedding } = weddingDetails;
    const subject = encodeURIComponent(
      `RSVP: ${name} — Wedding of ${bride.name} & ${groom.name}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Number of Guests: ${guests}\n` +
      `Attending: ${rsvpAttendance === 'yes' ? 'Yes' : 'No'}\n` +
      `Message: ${message || '—'}\n\n` +
      `Wedding: ${wedding.displayDate} at ${wedding.venue}`
    );
    window.location.href = `mailto:${mailto}?subject=${subject}&body=${body}`;
  }

  showRsvpSuccess('With love & gratitude ✦');
}

function showRsvpSuccess(msg) {
  const form = document.getElementById('rsvp-form');
  const success = document.getElementById('rsvp-success');
  if (form) form.style.display = 'none';
  if (success) {
    success.classList.add('visible');
    const p = success.querySelector('p');
    if (p && msg) p.textContent = msg;
  }
}

/* ============================================================
   ICS CALENDAR GENERATOR
   ============================================================ */
function generateICSDownload() {
  const { bride, groom, wedding } = weddingDetails;

  // Parse date
  const rawDate = wedding.date;
  if (!rawDate || rawDate === 'YYYY-MM-DD') {
    alert('Wedding date has not been configured yet.');
    return;
  }

  // Build DTSTART from date + muhurtham time
  const [year, month, day] = rawDate.split('-').map(Number);
  let startHour = 7, startMin = 30; // Default muhurtham morning

  const muhurtham = wedding.muhurtham || '';
  const timeMatch = muhurtham.match(/(\d{1,2})[:\.](\d{2})\s*(AM|PM)?/i);
  if (timeMatch) {
    let h = parseInt(timeMatch[1], 10);
    const m = parseInt(timeMatch[2], 10);
    const ampm = (timeMatch[3] || '').toUpperCase();
    if (ampm === 'PM' && h !== 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    startHour = h;
    startMin = m;
  }

  const pad = n => String(n).padStart(2, '0');
  const dtStart = `${year}${pad(month)}${pad(day)}T${pad(startHour)}${pad(startMin)}00`;
  // End 4 hours after start
  let endHour = startHour + 4;
  const dtEnd = `${year}${pad(month)}${pad(day)}T${pad(endHour)}${pad(startMin)}00`;

  const summary = `Wedding of ${bride.name} & ${groom.name}`;
  const location = [wedding.venue, wedding.address, wedding.city, wedding.state].filter(Boolean).join(', ');
  const description = [
    `You are cordially invited to the wedding of ${bride.name} & ${groom.name}.`,
    `Muhurtham: ${wedding.muhurtham}`,
    `Venue: ${wedding.venue}`,
    `Address: ${location}`,
    wedding.mapsUrl ? `Directions: ${wedding.mapsUrl}` : ''
  ].filter(Boolean).join('\\n');

  const uid = `${rawDate}-wedding-${Date.now()}@teluguwedding`;
  const now = new Date();
  const dtstamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z/, 'Z');

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Telugu Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wedding-invitation.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ============================================================
   FRAME SEQUENCE CONFIGURATION (Dual Variant: Mobile & Desktop)
   ============================================================ */
const sequences = {
  hero: {
    mobile: { path: "frames/mobile/hero/frame-{index}.webp", frameCount: 107 },
    desktop: { path: "frames/desktop/hero/frame-{index}.webp", frameCount: 192 }
  },

  couple: {
    mobile: { path: "frames/mobile/couple/frame-{index}.webp", frameCount: 120 },
    desktop: { path: "frames/desktop/couple/frame-{index}.webp", frameCount: 192 }
  },

  celebrations: {
    mobile: { path: "frames/mobile/celebrations/frame-{index}.webp", frameCount: 109 },
    desktop: { path: "frames/desktop/celebrations/frame-{index}.webp", frameCount: 192 }
  },

  wedding: {
    mobile: { path: "frames/mobile/wedding/frame-{index}.webp", frameCount: 150 },
    desktop: { path: "frames/desktop/wedding/frame-{index}.webp", frameCount: 240 }
  },

  final: {
    mobile: { path: "frames/mobile/final/frame-{index}.webp", frameCount: 150 },
    desktop: { path: "frames/desktop/final/frame-{index}.webp", frameCount: 240 }
  }
};

/* ============================================================
   FRAME-SEQUENCE CANVAS ENGINE (Phase 3 Architecture)
   ============================================================ */
class FrameSequencePlayer {
  constructor(section, canvas, textOverlay, sequenceConfig = {}) {
    // Support either direct elements or ID strings
    this.section = typeof section === 'string' ? document.getElementById(section) : section;
    this.canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
    this.textOverlay = typeof textOverlay === 'string' ? document.getElementById(textOverlay) : textOverlay;

    if (!this.section || !this.canvas) return;

    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.config = sequenceConfig;
    this.chapters = sequenceConfig.chapters || [];

    this.currentVariant = this._getDeviceVariant();
    const activeCfg = this._getActiveConfig();
    this.pathPattern = activeCfg.path;
    this.frameCount = activeCfg.frameCount;

    this.images = new Map();
    this.loading = new Set();
    this.currentFrame = 1;
    this.renderedFrame = 0;
    this.lastValidImg = null;
    this.activeChapterIdx = -1;
    this.rafId = null;
    this.isPrimed = false;
    this.canvasWidth = 0;
    this.canvasHeight = 0;

    this._onScroll = this._onScroll.bind(this);
    this._onResize = this._onResize.bind(this);

    this._init();
  }

  _getDeviceVariant() {
    return window.innerWidth >= 768 ? 'desktop' : 'mobile';
  }

  _getActiveConfig() {
    if (this.config.mobile && this.config.desktop) {
      return this.config[this.currentVariant] || this.config.mobile;
    }
    return {
      path: this.config.path || "frames/mobile/hero/frame-{index}.webp",
      frameCount: this.config.frameCount || 107
    };
  }

  _init() {
    this._onResize();
    window.addEventListener('resize', this._onResize, { passive: true });
    window.addEventListener('scroll', this._onScroll, { passive: true });
    window.addEventListener('load', this._onResize, { passive: true });

    if (this.textOverlay && this.chapters.length > 0) {
      this._buildChapters();
    }

    // Immediately load & paint Frame 1 so canvas is NEVER blank or black
    this._loadFrame(1, (img) => {
      this.lastValidImg = img;
      this._drawCover(img);
      this.renderedFrame = 1;
    });

    // IntersectionObserver for asset priming
    if (!isReduced()) {
      // Preload initial 20 frames immediately
      for (let i = 1; i <= Math.min(20, this.frameCount); i++) {
        this._loadFrame(i);
      }

      const primeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.isPrimed) {
            this.isPrimed = true;
            this._preloadWindow(this.currentFrame, 25);
            primeObserver.disconnect();
          }
        });
      }, { rootMargin: '100% 0px' });
      primeObserver.observe(this.section);
    }

    this._update();
  }

  _formatFrameUrl(index) {
    const padded = String(index).padStart(4, '0');
    return this.pathPattern.replace('{index}', padded);
  }

  _buildChapters() {
    this.textOverlay.innerHTML = this.chapters.map((ch, idx) => `
      <div class="cto-chapter" id="${this.section.id}-ch-${idx}" data-idx="${idx}">
        ${ch.html}
      </div>
    `).join('');
    this.chapterEls = Array.from(this.textOverlay.querySelectorAll('.cto-chapter'));
    this.activeChapterIdx = -1;
    this._updateChapter(this._progress());
  }

  _loadFrame(frameNum, cb) {
    if (frameNum < 1 || frameNum > this.frameCount) return;
    if (this.images.has(frameNum)) {
      const cached = this.images.get(frameNum);
      if (cached && cached.naturalWidth > 0) {
        if (cb) cb(cached);
        return;
      }
    }
    if (this.loading.has(frameNum)) return;

    this.loading.add(frameNum);
    const img = new Image();

    const handleSuccess = () => {
      this.loading.delete(frameNum);
      if (img.naturalWidth > 0) {
        this.images.set(frameNum, img);
        if (cb) cb(img);
        if (this.currentFrame === frameNum) {
          this.lastValidImg = img;
          this._drawCover(img);
          this.renderedFrame = frameNum;
        }
      }
    };

    img.onload = () => {
      if (typeof img.decode === 'function') {
        img.decode().then(handleSuccess).catch(handleSuccess);
      } else {
        handleSuccess();
      }
    };

    img.onerror = () => {
      this.loading.delete(frameNum);
    };

    img.src = this._formatFrameUrl(frameNum);
  }

  _preloadWindow(centerIdx, radius = 20) {
    const min = Math.max(1, centerIdx - radius);
    const max = Math.min(this.frameCount, centerIdx + radius);
    for (let i = min; i <= max; i++) {
      this._loadFrame(i);
    }
    // Background idle queue for remaining frames
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(() => {
        for (let i = 1; i <= this.frameCount; i++) {
          if (!this.images.has(i) && !this.loading.has(i)) {
            this._loadFrame(i);
          }
        }
      }, { timeout: 2500 });
    }
  }

  _onResize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    const w = rect.width || window.innerWidth || 412;
    const h = rect.height || window.innerHeight || 915;

    const newW = Math.round(w * dpr);
    const newH = Math.round(h * dpr);

    if (this.canvas.width !== newW || this.canvas.height !== newH) {
      this.canvas.width = newW;
      this.canvas.height = newH;
    }
    this.canvasWidth = newW;
    this.canvasHeight = newH;

    // Responsive Device Variant Switching (Mobile <-> Desktop)
    const newVariant = this._getDeviceVariant();
    if (newVariant !== this.currentVariant) {
      this.currentVariant = newVariant;
      const activeCfg = this._getActiveConfig();
      this.pathPattern = activeCfg.path;
      this.frameCount = activeCfg.frameCount;
      this.images.clear();
      this.loading.clear();
      this.renderedFrame = 0;
      this.isPrimed = false;
      this._preloadWindow(this.currentFrame, 15);
    }

    const imgToDraw = this.images.get(this.currentFrame) || this.lastValidImg || this.images.get(1);
    if (imgToDraw && imgToDraw.naturalWidth > 0) {
      this._drawCover(imgToDraw);
    }
  }

  _progress() {
    const rect = this.section.getBoundingClientRect();
    const scrollDistance = this.section.offsetHeight - window.innerHeight;
    if (scrollDistance <= 0) return 0;
    return Math.min(Math.max(-rect.top / scrollDistance, 0), 1);
  }

  _onScroll() {
    if (isReduced()) return;
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(() => {
        this.rafId = null;
        this._update();
      });
    }
  }

  _update() {
    const progress = this._progress();
    const targetFrame = Math.min(
      this.frameCount,
      Math.max(1, Math.round(progress * (this.frameCount - 1)) + 1)
    );

    this.currentFrame = targetFrame;

    if (targetFrame !== this.renderedFrame) {
      const img = this.images.get(targetFrame);
      if (img && img.naturalWidth > 0) {
        this._drawCover(img);
        this.lastValidImg = img;
        this.renderedFrame = targetFrame;
      } else {
        // Keep rendering the previous valid frame during loading
        if (this.lastValidImg && this.lastValidImg.naturalWidth > 0) {
          this._drawCover(this.lastValidImg);
        }
        this._loadFrame(targetFrame, (loadedImg) => {
          if (this.currentFrame === targetFrame && loadedImg && loadedImg.naturalWidth > 0) {
            this._drawCover(loadedImg);
            this.lastValidImg = loadedImg;
            this.renderedFrame = targetFrame;
          }
        });
      }
      this._preloadWindow(targetFrame, 15);
    }

    this._updateChapter(progress);
  }

  _updateChapter(progress) {
    if (!this.chapterEls || this.chapterEls.length === 0) return;
    let activeIdx = -1;
    for (let i = 0; i < this.chapters.length; i++) {
      const ch = this.chapters[i];
      if (progress >= ch.from && progress <= ch.to) {
        activeIdx = i;
        break;
      }
    }

    if (activeIdx !== this.activeChapterIdx) {
      this.activeChapterIdx = activeIdx;
      this.chapterEls.forEach((el, idx) => {
        if (idx === activeIdx) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    }
  }

  _drawCover(img) {
    if (!img || !img.naturalWidth || !img.naturalHeight) return;
    if (!this.canvasWidth || !this.canvasHeight) {
      this._onResize();
    }
    const ctx = this.ctx;
    if (!ctx) return;
    const cw = this.canvasWidth;
    const ch = this.canvasHeight;
    if (!cw || !ch) return;

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const imgRatio = iw / ih;
    const canvasRatio = cw / ch;

    let rw, rh, ox, oy;
    if (canvasRatio > imgRatio) {
      rw = cw;
      rh = cw / imgRatio;
      ox = 0;
      oy = (ch - rh) / 2;
    } else {
      rh = ch;
      rw = ch * imgRatio;
      ox = (cw - rw) / 2;
      oy = 0;
    }

    ctx.drawImage(img, ox, oy, rw, rh);
  }

  destroy() {
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('scroll', this._onScroll);
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}

/* ============================================================
   SCROLL ANIMATION CONTROLLER (Phase 3 Unified Architecture)
   ============================================================ */
class ScrollAnimationController {
  constructor() {
    this.scrollY = window.scrollY;
    this.lastScrollY = window.scrollY;
    this.lastTimestamp = performance.now();
    this.velocity = 0;
    this.direction = 'stopped';
    this.globalProgress = 0;
    this.rafId = null;

    this._onScroll = this._onScroll.bind(this);
    this._init();
  }

  _init() {
    window.addEventListener('scroll', this._onScroll, { passive: true });
    this._initRevealObserver();
  }

  _onScroll() {
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(() => {
        this.rafId = null;
        this._tick();
      });
    }
  }

  _tick() {
    const now = performance.now();
    const dt = Math.max(1, now - this.lastTimestamp);
    this.scrollY = window.scrollY;

    const dy = this.scrollY - this.lastScrollY;
    this.velocity = Math.abs(dy) / dt;
    this.direction = dy > 0 ? 'down' : (dy < 0 ? 'up' : 'stopped');

    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    this.globalProgress = Math.min(Math.max(this.scrollY / maxScroll, 0), 1);

    this.lastScrollY = this.scrollY;
    this.lastTimestamp = now;

    // Fast scroll adaptation: prioritize canvas frames when velocity > 2.5
    if (this.velocity < 3.0 && !isReduced()) {
      this._updateScrollDrivenDrawings();
    }
  }

  _updateScrollDrivenDrawings() {
    // 1. Muggu Progressive Drawing linked to Section 02 scroll progress
    const familySection = document.getElementById('family-blessings');
    if (familySection) {
      const rect = familySection.getBoundingClientRect();
      const visibleHeight = window.innerHeight;
      const progress = Math.min(Math.max((visibleHeight - rect.top) / (rect.height + visibleHeight * 0.4), 0), 1);
      const mugguPaths = $$('.muggu-path');
      mugguPaths.forEach((path, i) => {
        const offset = Math.max(0, 500 * (1 - progress * 1.3));
        path.style.strokeDashoffset = String(offset);
      });
    }

    // 2. Timeline spine progress drawing linked to Section 05
    const celebrationsSection = document.getElementById('celebrations');
    const timelineLine = document.getElementById('timeline-line');
    if (celebrationsSection && timelineLine) {
      const rect = celebrationsSection.getBoundingClientRect();
      const progress = Math.min(Math.max((window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.2), 0), 1);
      timelineLine.style.transform = `scaleY(${Math.min(1, progress * 1.25)})`;
    }
  }

  _initRevealObserver() {
    if (isReduced()) {
      $$('.scroll-reveal').forEach(el => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    $$('.scroll-reveal').forEach(el => observer.observe(el));
    $$('.timeline-event').forEach(el => observer.observe(el));
  }
}

/* ─── Initialize All 5 Cinematic Frame-Sequence Players ─── */
function initCinematicSequences() {
  const { bride, groom, wedding } = weddingDetails;

  const playerConfigs = [
    // 01 — HERO
    {
      section: 'hero',
      canvas: 'canvas-hero',
      textOverlay: 'cto-hero',
      mobile: sequences.hero.mobile,
      desktop: sequences.hero.desktop,
      chapters: [
        {
          from: 0.00, to: 0.20,
          html: `<span class="cto-eyebrow">WITH THE BLESSINGS OF OUR FAMILIES</span>`
        },
        {
          from: 0.20, to: 0.45,
          html: `
            <span class="cto-eyebrow">TOGETHER WITH THEIR FAMILIES</span>
            <div class="cto-script-names">${bride.name} &amp; ${groom.name}</div>
          `
        },
        {
          from: 0.45, to: 0.70,
          html: `
            <p class="cto-subtitle">invite you to celebrate the joyous union of their wedding</p>
          `
        },
        {
          from: 0.70, to: 1.00,
          html: `
            <span class="cto-eyebrow" style="color:var(--gold-light); letter-spacing:0.35em;">${wedding.displayDate || 'THE WEDDING DAY'}</span>
            <div class="hero-scroll" aria-hidden="true" style="margin-top:16px;">
              <span class="hero-scroll-text" style="color:var(--ivory-soft); font-size:10px; letter-spacing:0.25em;">SCROLL TO DISCOVER</span>
            </div>
          `
        }
      ]
    },

    // 02 — COUPLE / TWO STORIES
    {
      section: 'cinematic-two-stories',
      canvas: 'canvas-couple',
      textOverlay: 'cto-couple',
      mobile: sequences.couple.mobile,
      desktop: sequences.couple.desktop,
      chapters: [
        {
          from: 0.00, to: 0.25,
          html: `
            <span class="cto-eyebrow">OUR STORY</span>
            <h2 class="cto-title">Two Stories</h2>
          `
        },
        {
          from: 0.25, to: 0.50,
          html: `
            <h2 class="cto-title">Two Journeys</h2>
          `
        },
        {
          from: 0.50, to: 0.75,
          html: `
            <h2 class="cto-title">One Destination</h2>
          `
        },
        {
          from: 0.75, to: 1.00,
          html: `
            <h2 class="cto-title">A Life Together</h2>
            <p class="cto-subtitle">Bound together by love, tradition &amp; blessings</p>
          `
        }
      ]
    },

    // 03 — CELEBRATIONS
    {
      section: 'cinematic-celebrations',
      canvas: 'canvas-celebrations',
      textOverlay: 'cto-celebrations',
      mobile: sequences.celebrations.mobile,
      desktop: sequences.celebrations.desktop,
      chapters: [
        {
          from: 0.00, to: 0.25,
          html: `
            <span class="cto-eyebrow">A WEEK OF LOVE</span>
            <h2 class="cto-title">The Celebrations</h2>
            <span class="cto-telugu">ఆనందాలు</span>
          `
        },
        {
          from: 0.25, to: 0.50,
          html: `
            <span class="cto-eyebrow">THE ENGAGEMENT</span>
            <h2 class="cto-title">Nischitartham</h2>
            <span class="cto-telugu">నిశ్చితార్థం</span>
          `
        },
        {
          from: 0.50, to: 0.75,
          html: `
            <span class="cto-eyebrow">HALDI &amp; MANGALASNANAM</span>
            <h2 class="cto-title">Pasupu</h2>
            <span class="cto-telugu">పసుపు</span>
          `
        },
        {
          from: 0.75, to: 1.00,
          html: `
            <span class="cto-eyebrow">THE WEDDING CEREMONY</span>
            <h2 class="cto-title">The Wedding</h2>
            <span class="cto-telugu">వివాహం</span>
          `
        }
      ]
    },

    // 04 — WEDDING / SACRED BEGINNING (Climax)
    {
      section: 'cinematic-sacred',
      canvas: 'canvas-wedding',
      textOverlay: 'cto-wedding',
      mobile: sequences.wedding.mobile,
      desktop: sequences.wedding.desktop,
      chapters: [
        {
          from: 0.00, to: 0.20,
          html: `
            <span class="cto-eyebrow">THE SACRED UNION</span>
            <h2 class="cto-title">A Sacred Promise</h2>
          `
        },
        {
          from: 0.20, to: 0.40,
          html: `
            <h2 class="cto-title">Two Families · Two Hearts</h2>
          `
        },
        {
          from: 0.40, to: 0.65,
          html: `
            <h2 class="cto-title">One Sacred Beginning</h2>
          `
        },
        {
          from: 0.65, to: 0.85,
          html: `
            <span class="cto-telugu" style="font-size:clamp(1.8rem, 6.5vw, 3.2rem);">మంగళకరమైన ఆరంభం</span>
          `
        },
        {
          from: 0.85, to: 1.00,
          html: `
            <h2 class="cto-title">Forever Begins Here</h2>
          `
        }
      ]
    },

    // 05 — FINAL / WITH LOVE
    {
      section: 'cinematic-final',
      canvas: 'canvas-final',
      textOverlay: 'cto-final',
      mobile: sequences.final.mobile,
      desktop: sequences.final.desktop,
      chapters: [
        {
          from: 0.00, to: 0.35,
          html: `
            <span class="cto-eyebrow">WITH LOVE</span>
            <div class="cto-script-names">${bride.name} &amp; ${groom.name}</div>
          `
        },
        {
          from: 0.35, to: 0.65,
          html: `
            <p class="cto-subtitle" style="font-size:clamp(1.15rem, 3.8vw, 1.6rem);">Thank you for being part of our beginning</p>
          `
        },
        {
          from: 0.65, to: 0.85,
          html: `
            <span class="cto-telugu" style="font-size:clamp(2.2rem, 7.5vw, 3.8rem); color:var(--gold-light);">శుభమస్తు</span>
          `
        },
        {
          from: 0.85, to: 1.00,
          html: `
            <span class="cto-eyebrow" style="letter-spacing:0.35em;">MAY IT BE AUSPICIOUS</span>
          `
        }
      ]
    }
  ];

  window.cinematicPlayers = playerConfigs.map(cfg =>
    new FrameSequencePlayer(cfg.section, cfg.canvas, cfg.textOverlay, cfg)
  );
}

/* ============================================================
   CHAPTER INDICATOR
   ============================================================ */
const CHAPTERS = [
  'Invitation',
  'Families',
  'The Couple',
  'Their Journey',
  'Celebrations',
  'A Day to Remember',
  'Venue & Timings',
  'Sacred Beginning',
  'Join Us',
  'With Love'
];

let currentChapter = 0;

function initChapterIndicator() {
  const dotsContainer = document.getElementById('chapter-dots');
  if (!dotsContainer) return;

  dotsContainer.innerHTML = '';
  CHAPTERS.forEach((name, i) => {
    const dot = document.createElement('button');
    dot.className = 'chapter-dot';
    dot.setAttribute('aria-label', `Go to chapter: ${name}`);
    dot.dataset.chapter = i;
    dot.addEventListener('click', () => scrollToChapter(i));
    dotsContainer.appendChild(dot);
  });

  updateChapterDots(0);

  const sections = $$('[data-chapter]');
  const chapterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
        const ch = parseInt(entry.target.dataset.chapter, 10) - 1;
        if (ch !== currentChapter && ch >= 0 && ch < CHAPTERS.length) {
          currentChapter = ch;
          updateChapterDots(ch);
        }
      }
    });
  }, { threshold: [0.3, 0.6] });

  sections.forEach(sec => chapterObserver.observe(sec));
}

function updateChapterDots(activeIdx) {
  $$('.chapter-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === activeIdx);
  });
}

function scrollToChapter(idx) {
  const sections = $$('[data-chapter]');
  const target = sections.find(s => parseInt(s.dataset.chapter, 10) - 1 === idx);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ============================================================
   MUSIC CONTROL
   ============================================================ */
function initMusic() {
  const { musicUrl } = weddingDetails;
  if (!musicUrl) return;

  const control = document.getElementById('music-control');
  const audio = document.getElementById('bg-music');
  const iconPlay = document.getElementById('music-icon-play');
  const iconPause = document.getElementById('music-icon-pause');

  if (!control || !audio) return;

  audio.src = musicUrl;
  control.style.display = 'flex';

  let playing = false;

  control.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      playing = false;
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
      control.setAttribute('aria-label', 'Play background music');
    } else {
      audio.play()
        .then(() => {
          playing = true;
          iconPlay.style.display = 'none';
          iconPause.style.display = 'block';
          control.setAttribute('aria-label', 'Pause background music');
        })
        .catch(() => {
          audio.play().then(() => {
            playing = true;
            iconPlay.style.display = 'none';
            iconPause.style.display = 'block';
          }).catch(() => { });
        });
    }
  });
}

/* ============================================================
   CINEMATIC MOOD-ADAPTIVE PARTICLE & PETAL ENGINE
   ============================================================ */
const SECTION_PARTICLE_THEMES = {
  // 01 — HERO: Royal Celestial Gold & Stardust
  'hero': {
    themeName: 'royal-celestial',
    sparkles: {
      count: 45,
      colors: ['#FFE082', '#FFD700', '#FFF8E1', '#E6CA65', '#FFFDE7'],
      vy: [-0.6, -0.25],
      size: [1.0, 3.0],
      glow: 10,
      shape: 'star'
    },
    petals: {
      count: 10,
      colors: ['#FFD54F', '#FFE082', '#FFF9C4'],
      shape: 'gold-leaf',
      vy: [0.35, 0.7],
      w: [5, 9],
      h: [8, 14]
    }
  },

  // 04 — COUPLE / TWO STORIES: Romantic Rose & Blush Petals
  'cinematic-two-stories': {
    themeName: 'romantic-rose',
    sparkles: {
      count: 30,
      colors: ['#FFD1DC', '#FFE4E1', '#FFB6C1', '#FFD700', '#FFF0F5'],
      vy: [-0.4, -0.15],
      size: [0.8, 2.4],
      glow: 7,
      shape: 'glow-dot'
    },
    petals: {
      count: 24,
      colors: ['#C2185B', '#E91E63', '#FF4081', '#FF6B8B', '#F48FB1', '#FF8A80'],
      shape: 'rose-petal',
      vy: [0.45, 0.95],
      w: [8, 14],
      h: [10, 18]
    }
  },

  // 06 — CELEBRATIONS: Festive Pasupu (Turmeric) & Vibrant Marigolds
  'cinematic-celebrations': {
    themeName: 'festive-haldi',
    sparkles: {
      count: 45,
      colors: ['#FFEB3B', '#FFC107', '#FF9800', '#FFF59D', '#FFE082'],
      vy: [-0.7, -0.3],
      size: [1.2, 3.2],
      glow: 8,
      shape: 'festive-spark'
    },
    petals: {
      count: 28,
      colors: ['#FF9800', '#FFB300', '#FFC107', '#E65100', '#F57C00', '#FFD54F'],
      shape: 'marigold-petal',
      vy: [0.65, 1.25],
      w: [6, 11],
      h: [12, 20]
    }
  },

  // 08 — SACRED BEGINNING: Sacred Akshintalu & Holy Agni Embers
  'cinematic-sacred': {
    themeName: 'sacred-akshintalu',
    sparkles: {
      count: 48,
      colors: ['#FF3D00', '#FF6E40', '#FFA000', '#FFD54F', '#FF7043'],
      vy: [-0.85, -0.35],
      size: [1.0, 3.2],
      glow: 12,
      shape: 'agni-ember'
    },
    petals: {
      count: 32,
      colors: ['#FFF59D', '#FFD54F', '#FFCA28', '#FFE082', '#D32F2F'],
      shape: 'akshintalu-grain',
      vy: [0.55, 1.1],
      w: [4, 7],
      h: [8, 14]
    }
  },

  // 10 — FINAL / WITH LOVE: Grand Pushpa Vrushti & Golden Subhamasthu Shower
  'cinematic-final': {
    themeName: 'pushpa-vrushti',
    sparkles: {
      count: 55,
      colors: ['#FFD700', '#FFF8E1', '#FFE082', '#FF80AB', '#FFFFFF'],
      vy: [-0.65, -0.25],
      size: [1.2, 3.5],
      glow: 10,
      shape: 'star'
    },
    petals: {
      count: 36,
      colors: ['#D50000', '#FF1744', '#FFB300', '#FFFFFF', '#FF4081', '#FF9800'],
      shape: 'mixed-pushpa',
      vy: [0.7, 1.35],
      w: [7, 13],
      h: [9, 17]
    }
  }
};

class CinematicParticleEngine {
  constructor(effectsEl) {
    this.container = effectsEl;
    if (!this.container) return;

    const sectionEl = this.container.closest('section');
    const sectionId = sectionEl ? sectionEl.id : 'hero';
    this.theme = SECTION_PARTICLE_THEMES[sectionId] || SECTION_PARTICLE_THEMES['hero'];

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'particle-canvas';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.particles = [];
    this.isRunning = false;
    this.rafId = null;
    this.width = 0;
    this.height = 0;

    this._onResize = this._onResize.bind(this);
    this._render = this._render.bind(this);

    this._init();
  }

  _init() {
    this._onResize();
    window.addEventListener('resize', this._onResize, { passive: true });

    this._spawnParticles();

    // IntersectionObserver to pause loop when offscreen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!this.isRunning) {
            this.isRunning = true;
            this._render();
          }
        } else {
          this.isRunning = false;
          if (this.rafId) cancelAnimationFrame(this.rafId);
        }
      });
    }, { rootMargin: '50px 0px' });

    observer.observe(this.container.parentElement || this.container);
  }

  _onResize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.container.getBoundingClientRect();
    const w = rect.width || window.innerWidth || 412;
    const h = rect.height || window.innerHeight || 915;

    this.width = w;
    this.height = h;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  _spawnParticles() {
    const isMobile = window.innerWidth < 768;
    const spCfg = this.theme.sparkles;
    const ptCfg = this.theme.petals;

    const sparkleCount = isMobile ? Math.round(spCfg.count * 0.65) : spCfg.count;
    const petalCount = isMobile ? Math.round(ptCfg.count * 0.65) : ptCfg.count;

    this.particles = [];

    // 1. Spawning Mood Sparkles / Embers
    for (let i = 0; i < sparkleCount; i++) {
      const minVy = spCfg.vy[0];
      const maxVy = spCfg.vy[1];
      const minSz = spCfg.size[0];
      const maxSz = spCfg.size[1];
      const color = spCfg.colors[Math.floor(Math.random() * spCfg.colors.length)];

      this.particles.push({
        type: 'sparkle',
        subType: spCfg.shape,
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * (maxSz - minSz) + minSz,
        baseAlpha: Math.random() * 0.45 + 0.35,
        twinkleSpeed: Math.random() * 0.04 + 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * Math.abs(maxVy - minVy) + Math.abs(minVy)),
        color: color,
        glow: spCfg.glow || 8
      });
    }

    // 2. Spawning Mood Petals / Akshintalu
    for (let i = 0; i < petalCount; i++) {
      const minVy = ptCfg.vy[0];
      const maxVy = ptCfg.vy[1];
      const minW = ptCfg.w[0];
      const maxW = ptCfg.w[1];
      const minH = ptCfg.h[0];
      const maxH = ptCfg.h[1];
      const color = ptCfg.colors[Math.floor(Math.random() * ptCfg.colors.length)];

      this.particles.push({
        type: 'petal',
        subType: ptCfg.shape,
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        w: Math.random() * (maxW - minW) + minW,
        h: Math.random() * (maxH - minH) + minH,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.035,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.045 + 0.02,
        vx: (Math.random() - 0.5) * 0.6,
        vy: Math.random() * (maxVy - minVy) + minVy,
        color: color,
        alpha: Math.random() * 0.35 + 0.55
      });
    }
  }

  _render() {
    if (!this.isRunning) return;

    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    const time = performance.now() * 0.001;
    const scrollVelocity = (window.scrollAnimationController?.velocity || 0) * 1.5;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      if (p.type === 'sparkle') {
        p.twinklePhase += p.twinkleSpeed;
        const alpha = Math.max(0.05, Math.min(1, p.baseAlpha + Math.sin(p.twinklePhase) * 0.35));

        p.x += p.vx + Math.sin(time + i) * 0.3;
        p.y += p.vy - scrollVelocity * 0.4;

        if (p.y < -15) p.y = h + 15;
        if (p.y > h + 15) p.y = -15;
        if (p.x < -15) p.x = w + 15;
        if (p.x > w + 15) p.x = -15;

        ctx.save();
        ctx.globalAlpha = alpha;

        if (p.subType === 'star') {
          this._drawStar(ctx, p.x, p.y, p.radius * 1.8, p.color, p.glow);
        } else if (p.subType === 'agni-ember') {
          this._drawAgniEmber(ctx, p.x, p.y, p.radius, p.color, p.glow);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.glow;
          ctx.fill();
        }
        ctx.restore();

      } else if (p.type === 'petal') {
        p.rot += p.rotSpeed;
        p.flip += p.flipSpeed;

        p.x += p.vx + Math.sin(time * 1.2 + i) * 0.7;
        p.y += p.vy + scrollVelocity * 0.55;

        if (p.y > h + 25) p.y = -25;
        if (p.y < -25) p.y = h + 25;
        if (p.x < -25) p.x = w + 25;
        if (p.x > w + 25) p.x = -25;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(Math.sin(p.flip), 1);
        ctx.globalAlpha = p.alpha;

        if (p.subType === 'rose-petal') {
          this._drawRosePetal(ctx, p.w, p.h, p.color);
        } else if (p.subType === 'marigold-petal') {
          this._drawMarigoldPetal(ctx, p.w, p.h, p.color);
        } else if (p.subType === 'akshintalu-grain') {
          this._drawAkshintaluGrain(ctx, p.w, p.h, p.color);
        } else {
          this._drawMixedPetal(ctx, p.w, p.h, p.color);
        }

        ctx.restore();
      }
    }

    ctx.globalAlpha = 1.0;
    this.rafId = requestAnimationFrame(this._render);
  }

  /* ─── Specialized Drawing Shapes ─── */
  _drawStar(ctx, x, y, r, color, glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = glow;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.quadraticCurveTo(x, y, x, y + r);
    ctx.quadraticCurveTo(x, y, x - r, y);
    ctx.quadraticCurveTo(x, y, x, y - r);
    ctx.fill();
    // Center bright core
    ctx.beginPath();
    ctx.arc(x, y, r * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
  }

  _drawAgniEmber(ctx, x, y, r, color, glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = glow;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    // Inner hot nucleus
    ctx.beginPath();
    ctx.arc(x, y, r * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = '#FFEE58';
    ctx.fill();
  }

  _drawRosePetal(ctx, w, h, color) {
    ctx.beginPath();
    ctx.moveTo(0, -h / 2);
    ctx.bezierCurveTo(w / 1.5, -h / 2.5, w / 1.5, h / 3, 0, h / 2);
    ctx.bezierCurveTo(-w / 1.5, h / 3, -w / 1.5, -h / 2.5, 0, -h / 2);
    ctx.fillStyle = color;
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 4;
    ctx.fill();
  }

  _drawMarigoldPetal(ctx, w, h, color) {
    ctx.beginPath();
    ctx.moveTo(0, -h / 2);
    ctx.quadraticCurveTo(w / 2, -h / 4, w / 2, h / 4);
    ctx.quadraticCurveTo(w / 3, h / 2, 0, h / 2);
    ctx.quadraticCurveTo(-w / 3, h / 2, -w / 2, h / 4);
    ctx.quadraticCurveTo(-w / 2, -h / 4, 0, -h / 2);
    ctx.fillStyle = color;
    ctx.shadowColor = 'rgba(230,81,0,0.4)';
    ctx.shadowBlur = 4;
    ctx.fill();
  }

  _drawAkshintaluGrain(ctx, w, h, color) {
    // Sacred rice grain shape
    ctx.beginPath();
    ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowColor = 'rgba(255,215,0,0.5)';
    ctx.shadowBlur = 3;
    ctx.fill();
    // Sacred Kumkuma tip
    ctx.beginPath();
    ctx.arc(0, -h / 2.5, w / 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#D32F2F';
    ctx.fill();
  }

  _drawMixedPetal(ctx, w, h, color) {
    ctx.beginPath();
    ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 3;
    ctx.fill();
  }
}

function initCinematicEffects() {
  const effectContainers = $$('.cinematic-effects');
  window.particleEngines = effectContainers.map(container => new CinematicParticleEngine(container));
}

/* ============================================================
   INITIALIZATION
   ============================================================ */
function initApp() {
  populateContent();
  window.scrollAnimationController = new ScrollAnimationController();
  initChapterIndicator();
  initCinematicSequences();
  initCinematicEffects();
  initMusic();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}


