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
    venue: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlWNb-RU0KlCfccvK4pABV55IxGDTxzGWwEbhMh84DXNeNjx1VQAlGfE8CHiAeW777BVxDibhECaNhI2Hd5jabb_mOSvqqAg6z08tPvc08JwZAqgS8JmN22vRr0HNfDKf04p20=w408-h306-k-no",
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
  if (images.venue) loadVenueImage('map-preview', images.venue, wedding.venue);

  // Families
  populateFamilies();

  // Timeline events
  populateTimeline();

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
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt || 'Wedding Venue';
  img.loading = 'lazy';
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
  img.onerror = () => { };
  img.onload = () => {
    const placeholder = wrap.querySelector('.map-preview-placeholder');
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
   SCROLL-DRIVEN CINEMATIC VIDEO SCRUBBER  (performance edition)

   WHY NO LERP:
   Lerp creates a continuous rAF loop that competes with the
   browser's own scroll compositing, causing exactly the jank
   the user sees. The browser's scroll inertia already smooths
   the input — adding lerp on top doubles the work.

   WHY fastSeek():
   video.fastSeek(t) is a browser API built for scrubbing.
   It seeks to the nearest keyframe rather than an exact frame,
   making it 3-5× cheaper than currentTime= which forces full
   frame-accurate decode.

   ONE rAF PER SCROLL:
   A single requestAnimationFrame fires per scroll event —
   not a continuous animation loop. This keeps the render
   budget available for the browser's own scroll painting.
   ============================================================ */

/* ============================================================
   FRAME SEQUENCE CINEMATIC SYSTEM (Phase 2 Canvas Engine)
   ============================================================ */

class FrameSequencePlayer {
  constructor({ sectionId, canvasId, overlayId, folder, frameCount, chapters }) {
    this.section = document.getElementById(sectionId);
    this.canvas = document.getElementById(canvasId);
    this.textOverlay = document.getElementById(overlayId);
    if (!this.section || !this.canvas) return;

    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.folder = folder;
    this.frameCount = frameCount;
    this.chapters = chapters || [];

    this.images = new Map();
    this.loading = new Set();
    this.currentFrame = 1;
    this.activeChapterIdx = -1;
    this.rafId = null;
    this.inView = false;
    this.canvasWidth = 0;
    this.canvasHeight = 0;

    this._onScroll = this._onScroll.bind(this);
    this._onResize = this._onResize.bind(this);

    this._init();
  }

  _init() {
    this._onResize();
    window.addEventListener('resize', this._onResize, { passive: true });
    window.addEventListener('scroll', this._onScroll, { passive: true });
    window.addEventListener('load', this._onResize, { once: true });

    if (this.textOverlay && this.chapters.length > 0) {
      this._buildChapters();
    }

    // Immediately load frame 1 for crisp visual on arrival
    this._loadFrame(1, (img) => {
      this._drawCover(img);
    });

    if (!isReduced()) {
      // Preload first 25 frames
      for (let i = 2; i <= Math.min(25, this.frameCount); i++) {
        this._loadFrame(i);
      }

      // Approach observer: preload window when near viewport
      const obs = new IntersectionObserver((entries) => {
        this.inView = entries[0].isIntersecting;
        if (this.inView) {
          this._preloadWindow(this.currentFrame, 30);
        }
      }, { rootMargin: '120% 0px' });
      obs.observe(this.section);
    }

    this._update();
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

  _getFrameUrl(frameNum) {
    const padded = String(frameNum).padStart(4, '0');
    return `frames/${this.folder}/frame-${padded}.webp`;
  }

  _loadFrame(frameNum, cb) {
    if (frameNum < 1 || frameNum > this.frameCount) return;
    if (this.images.has(frameNum)) {
      if (cb) cb(this.images.get(frameNum));
      return;
    }
    if (this.loading.has(frameNum)) return;

    this.loading.add(frameNum);
    const img = new Image();
    img.src = this._getFrameUrl(frameNum);
    img.onload = () => {
      this.images.set(frameNum, img);
      this.loading.delete(frameNum);
      if (cb) cb(img);
      if (this.currentFrame === frameNum) {
        this._drawCover(img);
      }
    };
    img.onerror = () => {
      this.loading.delete(frameNum);
    };
  }

  _preloadWindow(centerIdx, radius = 20) {
    const min = Math.max(1, centerIdx - radius);
    const max = Math.min(this.frameCount, centerIdx + radius);
    for (let i = min; i <= max; i++) {
      this._loadFrame(i);
    }
    // Idle background load for all remaining frames
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(() => {
        for (let i = 1; i <= this.frameCount; i++) {
          if (!this.images.has(i) && !this.loading.has(i)) {
            this._loadFrame(i);
          }
        }
      }, { timeout: 2000 });
    }
  }

  _onResize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    const w = rect.width || window.innerWidth;
    const h = rect.height || window.innerHeight;

    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;

    const img = this.images.get(this.currentFrame) || this.images.get(1);
    if (img) this._drawCover(img);
  }

  _progress() {
    const rect = this.section.getBoundingClientRect();
    const scrolled = -rect.top;
    const total = Math.max(1, this.section.offsetHeight - window.innerHeight);
    return Math.max(0, Math.min(1, scrolled / total));
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

    if (targetFrame !== this.currentFrame) {
      this.currentFrame = targetFrame;
      const img = this.images.get(targetFrame);
      if (img) {
        this._drawCover(img);
      } else {
        this._loadFrame(targetFrame, (loadedImg) => {
          if (this.currentFrame === targetFrame) {
            this._drawCover(loadedImg);
          }
        });
        // Nearest frame fallback while loading to avoid any blank frame
        let closest = null;
        let minDiff = Infinity;
        for (const [fn, fImg] of this.images.entries()) {
          const diff = Math.abs(fn - targetFrame);
          if (diff < minDiff) {
            minDiff = diff;
            closest = fImg;
          }
        }
        if (closest) this._drawCover(closest);
      }
      this._preloadWindow(targetFrame, 18);
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
    if (!img || !img.naturalWidth) return;
    if (!this.canvasWidth || !this.canvasHeight) {
      this._onResize();
    }
    const ctx = this.ctx;
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
}

/* ─── Init all 5 cinematic frame-sequence players ─── */
function initCinematicSequences() {
  const { bride, groom, wedding } = weddingDetails;

  const sequenceConfigs = [
    // 01 — HERO
    {
      sectionId: 'hero',
      canvasId: 'canvas-hero',
      overlayId: 'cto-hero',
      folder: 'hero',
      frameCount: 120,
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
      sectionId: 'cinematic-two-stories',
      canvasId: 'canvas-couple',
      overlayId: 'cto-couple',
      folder: 'couple',
      frameCount: 120,
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
      sectionId: 'cinematic-celebrations',
      canvasId: 'canvas-celebrations',
      overlayId: 'cto-celebrations',
      folder: 'celebrations',
      frameCount: 120,
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
      sectionId: 'cinematic-sacred',
      canvasId: 'canvas-wedding',
      overlayId: 'cto-wedding',
      folder: 'wedding',
      frameCount: 150,
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
      sectionId: 'cinematic-final',
      canvasId: 'canvas-final',
      overlayId: 'cto-final',
      folder: 'final',
      frameCount: 150,
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

  window.cinematicPlayers = sequenceConfigs.map(cfg => new FrameSequencePlayer(cfg));
}

/* ============================================================
   SCROLL ANIMATIONS
   ============================================================ */
function initScrollAnimations() {
  if (isReduced()) {
    // Immediately reveal all elements
    $$('.scroll-reveal').forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Don't keep observing once revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  $$('.scroll-reveal').forEach(el => observer.observe(el));

  // Timeline line draw
  const timelineLine = document.getElementById('timeline-line');
  if (timelineLine) {
    const tlObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('drawn');
          tlObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    tlObserver.observe(timelineLine);
  }

  // Timeline event items
  const tlObserver2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        tlObserver2.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -20px 0px' });

  $$('.timeline-event').forEach(el => tlObserver2.observe(el));

  // Muggu path animation
  const mugguPaths = $$('.muggu-path');
  if (mugguPaths.length > 0 && !isReduced()) {
    const mugguObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          mugguPaths.forEach((path, i) => {
            setTimeout(() => {
              path.style.transition = `stroke-dashoffset ${1.2 + i * 0.4}s cubic-bezier(0.22,1,0.36,1)`;
              path.style.strokeDashoffset = '0';
            }, 300 + i * 200);
          });
          mugguObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    const mugguSvg = document.getElementById('muggu-svg');
    if (mugguSvg) mugguObserver.observe(mugguSvg);
  }
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
  'Wedding Day',
  'Sacred Beginning',
  'Join Us',
  'With Love'
];

let currentChapter = 0;

function initChapterIndicator() {
  const dotsContainer = document.getElementById('chapter-dots');
  if (!dotsContainer) return;

  // Build dots
  CHAPTERS.forEach((name, i) => {
    const dot = document.createElement('button');
    dot.className = 'chapter-dot';
    dot.setAttribute('aria-label', `Go to chapter: ${name}`);
    dot.dataset.chapter = i;
    dot.addEventListener('click', () => scrollToChapter(i));
    dotsContainer.appendChild(dot);
  });

  updateChapterDots(0);

  // Observe sections
  const sections = $$('[data-chapter]');
  const sectionChapters = new Map();

  // Map unique chapter numbers to first occurrence
  sections.forEach(sec => {
    const ch = parseInt(sec.dataset.chapter, 10) - 1;
    if (!sectionChapters.has(ch)) {
      sectionChapters.set(ch, sec);
    }
  });

  const chapterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
        const ch = parseInt(entry.target.dataset.chapter, 10) - 1;
        if (ch !== currentChapter) {
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
  // Find the first section with this chapter number
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
          // Autoplay blocked — user must interact first, which they just did
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
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  populateContent();
  initScrollAnimations();
  initChapterIndicator();
  initCinematicSequences(); // Frame-sequence canvas scrubber for all 5 sequences
  initMusic();
});
