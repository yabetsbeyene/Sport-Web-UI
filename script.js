
 
    /* ── Navbar scroll effect ───────────────────────────────────── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
      document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 400);
    });

    /* ── Mobile menu ────────────────────────────────────────────── */
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileClose.addEventListener('click', closeMobileMenu);

    function closeMobileMenu() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }

    /* ── Back to top ────────────────────────────────────────────── */
    document.getElementById('back-to-top').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ── Intersection Observer: fade-up animations ──────────────── */
    const fadeEls = document.querySelectorAll('.fade-up');
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => fadeObserver.observe(el));

    /* ── Schedule data & rendering ──────────────────────────────── */
    const scheduleData = [
      { time: '06:30', name: 'Morning Strength',   day: 'mon', type: 'strength', coach: 'Marcus W.', duration: '60 min', spots: 'open',    spotsText: '8 spots left'  },
      { time: '07:00', name: 'Swim Technique',     day: 'mon', type: 'swim',     coach: 'Lena B.',   duration: '60 min', spots: 'filling', spotsText: '3 spots left'  },
      { time: '09:00', name: 'HIIT Blast',         day: 'tue', type: 'hiit',     coach: 'Elena K.',  duration: '45 min', spots: 'full',    spotsText: 'Full'          },
      { time: '10:30', name: 'Yoga Flow',          day: 'tue', type: 'yoga',     coach: 'Lena B.',   duration: '60 min', spots: 'open',    spotsText: '12 spots left' },
      { time: '12:00', name: 'Olympic Lifting',    day: 'wed', type: 'strength', coach: 'Marcus W.', duration: '90 min', spots: 'open',    spotsText: '5 spots left'  },
      { time: '18:00', name: 'Boxing Fundamentals',day: 'wed', type: 'boxing',   coach: 'Tariq H.',  duration: '75 min', spots: 'filling', spotsText: '2 spots left'  },
      { time: '07:00', name: 'HIIT & Core',        day: 'thu', type: 'hiit',     coach: 'Elena K.',  duration: '45 min', spots: 'open',    spotsText: '9 spots left'  },
      { time: '19:00', name: 'Strength Circuit',   day: 'thu', type: 'strength', coach: 'Marcus W.', duration: '60 min', spots: 'full',    spotsText: 'Full'          },
      { time: '06:30', name: 'Friday Conditioning',day: 'fri', type: 'cardio',   coach: 'Elena K.',  duration: '45 min', spots: 'open',    spotsText: '7 spots left'  },
      { time: '11:00', name: 'Mobility & Stretch', day: 'fri', type: 'yoga',     coach: 'Lena B.',   duration: '60 min', spots: 'open',    spotsText: '15 spots left' },
      { time: '08:00', name: 'Community WOD',      day: 'sat', type: 'hiit',     coach: 'Elena K.',  duration: '60 min', spots: 'filling', spotsText: '4 spots left'  },
      { time: '10:00', name: 'Boxing Sparring',    day: 'sat', type: 'boxing',   coach: 'Tariq H.',  duration: '75 min', spots: 'open',    spotsText: '6 spots left'  },
    ];

    const typeLabels = {
      strength: '<span class="class-tag tag-strength">Strength</span>',
      hiit:     '<span class="class-tag tag-hiit">HIIT</span>',
      yoga:     '<span class="class-tag tag-yoga">Yoga</span>',
      cardio:   '<span class="class-tag tag-cardio">Cardio</span>',
      boxing:   '<span class="class-tag tag-boxing">Boxing</span>',
      swim:     '<span class="class-tag tag-swim">Swim</span>',
    };

    const dayNames = { mon:'Monday', tue:'Tuesday', wed:'Wednesday', thu:'Thursday', fri:'Friday', sat:'Saturday' };

    function renderSchedule(filter) {
      const tbody = document.getElementById('scheduleBody');
      const rows = filter === 'all' ? scheduleData : scheduleData.filter(r => r.day === filter);
      tbody.innerHTML = rows.map(r => `
        <tr>
          <td class="time-col">${r.time}</td>
          <td>${typeLabels[r.type] || ''} ${r.name}</td>
          <td style="color:var(--gray-mid); font-size:.82rem;">${dayNames[r.day]}</td>
          <td>
            <div class="instructor-chip">
              <span style="font-size:.875rem;">${r.coach}</span>
            </div>
          </td>
          <td style="color:var(--gray-mid); font-size:.85rem;">${r.duration}</td>
          <td>
            <span class="spots-indicator spots-${r.spots}">
              <span class="dot"></span>
              ${r.spotsText}
            </span>
          </td>
          <td>
            <button class="btn btn-dark" style="padding:.4rem .9rem; font-size:.72rem;" onclick="bookClass(this, '${r.name}')">Book</button>
          </td>
        </tr>
      `).join('');
    }

    renderSchedule('all');

    // Tab switching
    document.getElementById('scheduleTabs').addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSchedule(btn.dataset.day);
    });

    function bookClass(btn, name) {
      btn.textContent = '✓ Booked';
      btn.style.background = '#276749';
      btn.disabled = true;
    }

    /* ── Gallery lightbox ───────────────────────────────────────── */
    const lightbox     = document.getElementById('lightbox');
    const lightboxImg  = document.getElementById('lightboxImg');
    const lightboxClose= document.getElementById('lightboxClose');

    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        lightboxImg.src = item.dataset.src;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    /* Keyboard support */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
        closeMobileMenu();
      }
    });

    /* ── Testimonials carousel ──────────────────────────────────── */
    const track    = document.getElementById('testimonialsTrack');
    const cards    = track.querySelectorAll('.testimonial-card');
    const ctrls    = document.getElementById('testimonialsControls');
    let currentSlide = 0;

    // Build dots
    const totalSlides = Math.ceil(cards.length / 3);
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      ctrls.appendChild(dot);
    }

    function goToSlide(index) {
      currentSlide = index;
      const cardWidth = track.querySelector('.testimonial-card').offsetWidth + 24; // gap
      track.style.transform = `translateX(-${currentSlide * cardWidth * 3}px)`;
      ctrls.querySelectorAll('button').forEach((d, i) => d.classList.toggle('active', i === index));
    }

    document.getElementById('testimonialPrev').addEventListener('click', () => {
      goToSlide(currentSlide > 0 ? currentSlide - 1 : totalSlides - 1);
    });
    document.getElementById('testimonialNext').addEventListener('click', () => {
      goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
    });

    // Auto advance
    setInterval(() => {
      goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
    }, 6000);

    /* ── Contact form ───────────────────────────────────────────── */
    function handleFormSubmit(e) {
      e.preventDefault();
      const success = document.getElementById('formSuccess');
      success.style.display = 'block';
      // Reset inputs after short delay
      setTimeout(() => {
        ['firstName','lastName','email','interest','message'].forEach(id => {
          document.getElementById(id).value = '';
        });
      }, 500);
    }

    /* ── Animated hero stats counter ───────────────────────────── */
    function animateCounter(el, target) {
      let current = 0;
      const increment = Math.ceil(target / 50);
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 30);
    }

    // Trigger on hero visible (starts immediately as it's above fold)
    const statNums = document.querySelectorAll('.hero-stat-num');
    const targets  = [850, 12, 18, 8];
    statNums.forEach((el, i) => {
      const span = el.querySelector('span');
      const suffix = span ? span.outerHTML : '';
      animateCounter({ textContent: el.childNodes[0]?.nodeValue || '', set: (v) => {
        el.childNodes[0].nodeValue = v;
      }}, targets[i]);
    });
 