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
    name: "BRIDE NAME",
    description: ""
  },

  groom: {
    name: "GROOM NAME",
    description: ""
  },

  families: {
    brideFamily: [
      // { name: "Father Name", relation: "Father of the Bride" },
      // { name: "Mother Name", relation: "Mother of the Bride" },
    ],
    groomFamily: [
      // { name: "Father Name", relation: "Father of the Groom" },
      // { name: "Mother Name", relation: "Mother of the Groom" },
    ]
  },

  wedding: {
    date:        "YYYY-MM-DD",    // ISO date: "2025-02-14"
    displayDate: "WEDDING DATE",  // e.g. "14 February 2025"
    muhurtham:   "MUHURTHAM TIME",// e.g. "7:30 AM"
    venue:       "VENUE NAME",
    address:     "FULL VENUE ADDRESS",
    city:        "",
    state:       "",
    pincode:     "",
    mapsUrl:     "",              // Google Maps URL
    bhojanalu:   "Traditional Telugu Bhojanalu will be served.",
    menu: [
      // {
      //   category: "Rice",
      //   items: ["Steamed Rice", "Pulihora", "Coconut Rice"]
      // },
      // {
      //   category: "Dal",
      //   items: ["Pappu", "Sambar"]
      // },
      // {
      //   category: "Curries",
      //   items: ["Gutti Vankaya", "Aloo Fry"]
      // },
      // {
      //   category: "Sweets",
      //   items: ["Boondi Laddu", "Payasam", "Kheer"]
      // }
    ]
  },

  events: [
    {
      id: "nischitartham",
      name: "Nischitartham",
      teluguName: "నిశ్చితార్థం",
      date: "",
      displayDate: "",
      time: "",
      venue: ""
    },
    {
      id: "pasupu",
      name: "Pasupu",
      teluguName: "పసుపు",
      date: "",
      displayDate: "",
      time: "",
      venue: ""
    },
    {
      id: "wedding",
      name: "Wedding",
      teluguName: "వివాహం",
      date: "",
      displayDate: "",
      time: "",
      venue: ""
    },
    {
      id: "reception",
      name: "Reception",
      teluguName: "రిసెప్షన్",
      date: "",
      displayDate: "",
      time: "",
      venue: ""
    }
  ],

  rsvpUrl:    "",    // External RSVP URL — leave empty to show inline form
  rsvpMailto: "",    // mailto address for RSVP form fallback e.g. "family@example.com"

  contacts: {
    phone:     "",   // e.g. "+919876543210"
    whatsapp:  ""    // e.g. "+919876543210" (without spaces/dashes)
  },

  images: {
    bride:     "",   // e.g. "images/bride.jpg"
    groom:     "",   // e.g. "images/groom.jpg"
    couple:    "",   // e.g. "images/couple.jpg"
    family:    "",
    venue:     "",
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
  setTextIfEl('hero-bride-name',  bride.name);
  setTextIfEl('hero-groom-name',  groom.name);
  setTextIfEl('bride-name',       bride.name);
  setTextIfEl('groom-name',       groom.name);
  setTextIfEl('closing-bride',    bride.name);
  setTextIfEl('closing-groom',    groom.name);

  // Descriptions
  if (bride.description) setTextIfEl('bride-desc', bride.description);
  if (groom.description) setTextIfEl('groom-desc', groom.description);

  // Wedding day info
  setTextIfEl('wd-date',       wedding.displayDate);
  setTextIfEl('wd-muhurtham',  wedding.muhurtham);
  setTextIfEl('wd-venue',      wedding.venue);
  setTextIfEl('wd-address',    wedding.address);

  // Join us
  setTextIfEl('join-date',      wedding.displayDate);
  setTextIfEl('join-muhurtham', wedding.muhurtham);
  setTextIfEl('join-venue',     wedding.venue);
  setTextIfEl('join-address',   buildAddress(wedding));

  // Location
  setTextIfEl('loc-venue',    wedding.venue);
  setTextIfEl('loc-address',  buildAddress(wedding));

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
  if (images.bride)  loadPersonImage('bride-image-wrap',  images.bride,  bride.name  + ' — Bride');
  if (images.groom)  loadPersonImage('groom-image-wrap',  images.groom,  groom.name  + ' — Groom');
  if (images.couple) loadPersonImage('couple-image-wrap', images.couple, bride.name  + ' & ' + groom.name);

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
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
  img.onerror = () => {}; // keep placeholder if image fails
  img.onload = () => {
    const placeholder = wrap.querySelector('.person-image-placeholder');
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
  const rsvpExtBtn  = document.getElementById('btn-rsvp-ext');
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

window.handleRsvpAttend = function(choice) {
  rsvpAttendance = choice;
  const yesBtn = document.getElementById('rsvp-yes');
  const noBtn  = document.getElementById('rsvp-no');
  const formFields = document.getElementById('rsvp-form');

  yesBtn && yesBtn.setAttribute('aria-pressed', choice === 'yes' ? 'true' : 'false');
  noBtn  && noBtn.setAttribute('aria-pressed', choice === 'no'  ? 'true' : 'false');

  yesBtn && yesBtn.classList.toggle('selected-yes', choice === 'yes');
  noBtn  && noBtn.classList.toggle('selected-no',  choice === 'no');

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
  const name    = document.getElementById('rsvp-name')?.value.trim();
  const guests  = document.getElementById('rsvp-guests')?.value;
  const message = document.getElementById('rsvp-message')?.value.trim();
  const mailto  = weddingDetails.rsvpMailto;

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
  const form    = document.getElementById('rsvp-form');
  const success = document.getElementById('rsvp-success');
  if (form)    form.style.display    = 'none';
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
    startMin  = m;
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
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'wedding-invitation.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ============================================================
   SCROLL-DRIVEN CINEMATIC VIDEO SCRUBBER
   — Scroll position → video.currentTime
   — IntersectionObserver is used for lazy-loading ONLY
   — video.play() is NEVER called for cinematic playback
   ============================================================ */

class ScrollVideoScrubber {
  /**
   * @param {HTMLElement} section   — the cinematic-scroll container (tall div)
   * @param {HTMLVideoElement} video — the video whose currentTime we control
   * @param {object} [opts]
   * @param {number} [opts.lerpFactor=0.12]  — smoothing (0 = no smoothing, 1 = instant)
   */
  constructor(section, video, opts = {}) {
    this.section      = section;
    this.video        = video;
    this.duration     = 0;
    this.targetTime   = 0;
    this.smoothTime   = 0;
    this.rafId        = null;
    this.isReady      = false;
    this.lerpFactor   = opts.lerpFactor ?? 0.12;
    this.lastSeeked   = -1;
    // Minimum time delta before we bother calling currentTime= (≈1 frame at 30fps)
    this.SEEK_EPSILON  = 1 / 30;

    this._scrollBound = this._onScroll.bind(this);
    this._init();
  }

  _init() {
    const { video, section } = this;

    // — Metadata: get duration so we can map progress → seconds —
    if (video.readyState >= 1) {
      this._onMetadata();
    } else {
      video.addEventListener('loadedmetadata', () => this._onMetadata(), { once: true });
    }

    // — Lazy-load: upgrade preload when section is near viewport —
    // rootMargin '150%' means start loading when section is 1.5 viewports away
    const loader = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (video.preload !== 'auto') video.preload = 'auto';
        loader.disconnect();
      }
    }, { rootMargin: '150% 0px' });
    loader.observe(section);

    // — Scroll listener —
    window.addEventListener('scroll', this._scrollBound, { passive: true });

    // Initial position (in case page loads mid-scroll)
    this._onScroll();
  }

  _onMetadata() {
    this.duration = this.video.duration;
    this.isReady  = true;
    // Immediately snap to the scroll-correct position
    const p = this._progress();
    const t = p * this.duration;
    this.smoothTime = t;
    this.targetTime = t;
    this._seekTo(t);
  }

  // Fractional scroll progress [0, 1] through this section
  _progress() {
    const rect = this.section.getBoundingClientRect();
    const sH   = this.section.offsetHeight;
    const vH   = window.innerHeight;
    // scrolled = how many px of the section have passed the top of the viewport
    const scrolled = -rect.top;
    const total    = Math.max(1, sH - vH);
    return Math.max(0, Math.min(1, scrolled / total));
  }

  _onScroll() {
    if (!this.isReady) return;
    this.targetTime = this._progress() * this.duration;
    this._scheduleRaf();
  }

  _scheduleRaf() {
    if (this.rafId !== null) return;          // already scheduled
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this._step();
    });
  }

  _step() {
    const delta = this.targetTime - this.smoothTime;

    if (Math.abs(delta) < 0.002) {
      // Converged — snap and stop rAF loop
      this.smoothTime = this.targetTime;
      this._seekTo(this.smoothTime);
      return;
    }

    // Lerp toward target
    this.smoothTime += delta * this.lerpFactor;
    this._seekTo(this.smoothTime);

    // Continue until converged
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this._step();
    });
  }

  _seekTo(t) {
    // Skip redundant seeks
    if (Math.abs(t - this.lastSeeked) < this.SEEK_EPSILON) return;
    try {
      this.video.currentTime = t;
      this.lastSeeked = t;
    } catch (_) {
      // Video not ready yet — silently ignore
    }
  }

  destroy() {
    window.removeEventListener('scroll', this._scrollBound);
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}

/* ─── Init all five scroll scrubbers ─── */
function initScrollScrubbers() {
  if (isReduced()) {
    // Reduced-motion: show frame 0 of each video, no scrubbing
    $$('.cinematic-main-video').forEach(video => {
      video.addEventListener('loadedmetadata', () => {
        try { video.currentTime = 0; } catch (_) {}
      }, { once: true });
    });
    return;
  }

  // Video ID → scroll-container ID mapping
  // Heights are tuned to each video's duration (set in HTML inline styles)
  const configs = [
    { sectionId: 'hero',                   videoId: 'video-hero'         },  // 8s  → 250vh
    { sectionId: 'cinematic-two-stories',  videoId: 'video-couple'       },  // 8s  → 220vh
    { sectionId: 'cinematic-celebrations', videoId: 'video-celebrations' },  // 8s  → 200vh
    { sectionId: 'cinematic-sacred',       videoId: 'video-wedding'      },  // 10s → 280vh (climax)
    { sectionId: 'cinematic-final',        videoId: 'video-final'        },  // 10s → 250vh
  ];

  configs.forEach(({ sectionId, videoId }) => {
    const section = document.getElementById(sectionId);
    const video   = document.getElementById(videoId);
    if (section && video) {
      new ScrollVideoScrubber(section, video);
    }
  });
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

  const control    = document.getElementById('music-control');
  const audio      = document.getElementById('bg-music');
  const iconPlay   = document.getElementById('music-icon-play');
  const iconPause  = document.getElementById('music-icon-pause');

  if (!control || !audio) return;

  audio.src = musicUrl;
  control.style.display = 'flex';

  let playing = false;

  control.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      playing = false;
      iconPlay.style.display  = 'block';
      iconPause.style.display = 'none';
      control.setAttribute('aria-label', 'Play background music');
    } else {
      audio.play()
        .then(() => {
          playing = true;
          iconPlay.style.display  = 'none';
          iconPause.style.display = 'block';
          control.setAttribute('aria-label', 'Pause background music');
        })
        .catch(() => {
          // Autoplay blocked — user must interact first, which they just did
          audio.play().then(() => {
            playing = true;
            iconPlay.style.display  = 'none';
            iconPause.style.display = 'block';
          }).catch(() => {});
        });
    }
  });
}

/* ============================================================
   HERO SCROLL REVEAL (special handling — immediate)
   ============================================================ */
function initHeroReveal() {
  // Hero content reveals immediately on load (no observer needed)
  const heroRevealEls = $$('#hero .scroll-reveal');
  if (isReduced()) {
    heroRevealEls.forEach(el => el.classList.add('revealed'));
    return;
  }
  requestAnimationFrame(() => {
    heroRevealEls.forEach(el => {
      setTimeout(() => el.classList.add('revealed'), 400);
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  populateContent();
  initHeroReveal();
  initScrollAnimations();
  initChapterIndicator();
  initScrollScrubbers(); // Scroll-driven video scrubbing for all 5 videos
});
