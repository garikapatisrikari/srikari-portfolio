// ===== Opening name reveal =====
const openingIntro = document.getElementById('openingIntro');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.add('opening-active');
window.setTimeout(() => openingIntro.classList.add('is-exiting'), reducedMotion ? 700 : 3000);
window.setTimeout(() => {
  openingIntro.remove();
  document.body.classList.remove('opening-active');
}, reducedMotion ? 1000 : 3700);

// ===== Scroll progress =====
const progress = document.getElementById('scrollProgress');
function updateProgress(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = scrolled + '%';
}
document.addEventListener('scroll', updateProgress, { passive:true });
updateProgress();

// ===== Mobile menu =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ===== Reveal on scroll =====
const motionGroups = [
  '.tech-pills .pill',
  '.skills-grid .skill-card',
  '.timeline-item',
  '.edu-card',
  '.credentials-grid > *',
  '.contact-list .contact-row',
  '.contact-form-wrap .form-field'
];
motionGroups.forEach((selector) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.classList.add('motion-item');
    element.style.setProperty('--stagger', `${Math.min(index * 90, 450)}ms`);
  });
});
document.querySelectorAll('.orbit-card').forEach((element, index) => {
  element.classList.add('project-reveal', `project-reveal-${index + 1}`);
});
const revealEls = document.querySelectorAll('.reveal, .motion-item, .project-reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

const hero = document.querySelector('.hero');
const parallaxReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let parallaxFrame = null;
function updateHeroDepth(){
  if (parallaxReducedMotion || !hero) return;
  if (parallaxFrame) cancelAnimationFrame(parallaxFrame);
  parallaxFrame = requestAnimationFrame(() => {
    const progress = Math.max(-1, Math.min(1, window.scrollY / Math.max(hero.offsetHeight, 1)));
    hero.style.setProperty('--hero-parallax', `${progress * 28}px`);
  });
}
document.addEventListener('scroll', updateHeroDepth, { passive:true });
updateHeroDepth();

// ===== Scroll cue click =====
document.getElementById('scrollCue').addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// ===== Hero video play/pause =====
const playBtn = document.getElementById('playBtn');
const heroWrap = document.getElementById('heroPhotoWrap');
const heroVideo = document.getElementById('heroVideo');

function setVideoState(isVisible, isPlaying){
  heroWrap.classList.toggle('playing', isVisible);
  heroWrap.classList.toggle('is-playing', isPlaying);
  playBtn.setAttribute('aria-label', isPlaying ? 'Pause introduction' : 'Play introduction');
  playBtn.setAttribute('title', isPlaying ? 'Pause introduction' : 'Play introduction');
  playBtn.setAttribute('aria-pressed', String(isPlaying));
}

function resetVideo(){
  heroVideo.pause();
  heroVideo.currentTime = 0;
  setVideoState(false, false);
}

playBtn.addEventListener('click', () => {
  if (heroVideo.paused){
    heroVideo.currentTime = 0;
    setVideoState(true, true);
    heroVideo.play().catch(() => resetVideo());
  } else {
    heroVideo.pause();
    setVideoState(true, false);
  }
});

heroVideo.addEventListener('ended', resetVideo);

// ===== Technology pill cycling highlight =====
const pills = document.querySelectorAll('#techPills .pill');
let pillIndex = 0;
const activeCount = 3;
function cyclePills(){
  pills.forEach(p => p.classList.remove('highlight'));
  for(let i=0;i<activeCount;i++){
    const idx = (pillIndex + i) % pills.length;
    pills[idx].classList.add('highlight');
  }
  pillIndex = (pillIndex + 1) % pills.length;
}
cyclePills();
setInterval(cyclePills, 1100);

// ===== Project data & modal =====
const projectData = [
  {
    num: '01', cat: 'SIH · Intelligent Scheduling', title: 'AI-Generated Classroom Timetable | SIH',
    desc: 'Built an AI-powered timetable generator for Smart India Hackathon that automatically produces conflict-free classroom schedules based on faculty availability, room capacity, and subject load.',
    func: 'Generates optimized, clash-free timetables in seconds and adapts instantly when constraints change.',
    tags: ['Python', 'Machine Learning', 'FastAPI']
  },
  {
    num: '02', cat: 'AI · Personalization', title: 'Personalized Networking Assistant',
    desc: 'Built an AI-powered networking assistant using FastAPI and Streamlit with personalized conversation generation and user profile management.',
    func: 'Creates personalized conversations while managing user profiles through a focused, friendly interface.',
    tags: ['FastAPI', 'Streamlit', 'Python']
  },
  {
    num: '03', cat: 'Full Stack · Resolve', title: 'Resolve-Now',
    desc: 'A full-stack complaint management platform that lets users raise, track, and resolve issues with real-time status updates and secure authentication.',
    func: 'Streamlines the complaint lifecycle from submission to resolution with role-based access.',
    tags: ['React.js', 'Node.js', 'MongoDB']
  },
  {
    num: '04', cat: 'Music · Machine Learning', title: 'AI-Powered Music Recognition App',
    desc: 'An application that identifies songs and analyzes audio features using machine learning models trained on audio fingerprints.',
    func: 'Recognizes tracks from short audio clips and surfaces matching metadata in real time.',
    tags: ['Python', 'Machine Learning', 'Pandas']
  },
  {
    num: '05', cat: 'Data · Classification', title: 'Iris Flower Classification',
    desc: 'Performed data analysis and visualization on the classic Iris dataset, then built and compared classification models.',
    func: 'Built Logistic Regression, KNN, and Decision Tree models to classify Iris species with high accuracy.',
    tags: ['Python', 'Pandas', 'NumPy']
  }
];

const modalOverlay = document.getElementById('modalOverlay');
const modalNum = document.getElementById('modalNum');
const modalCat = document.getElementById('modalCat');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalFunc = document.getElementById('modalFunc');
const modalTags = document.getElementById('modalTags');
let lastFocusedProject = null;

function openModal(i){
  const p = projectData[i];
  modalNum.textContent = p.num;
  modalCat.textContent = p.cat;
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalFunc.textContent = p.func;
  modalTags.innerHTML = p.tags.map(t => `<span>${t}</span>`).join('');
  modalOverlay.classList.add('open');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('modalClose').focus();
}
function closeModal(){
  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lastFocusedProject?.focus();
}
document.querySelectorAll('.orbit-card').forEach(card => {
  const projectIndex = parseInt(card.dataset.project, 10);
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `View details for ${projectData[projectIndex].title}`);
  let touchOpened = false;
  const showProject = () => {
    lastFocusedProject = card;
    openModal(projectIndex);
  };
  card.addEventListener('click', () => {
    if (touchOpened) {
      touchOpened = false;
      return;
    }
    showProject();
  });
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      showProject();
    }
  });
  card.addEventListener('pointerdown', (event) => {
    card.classList.add('is-touched');
    window.setTimeout(() => {
      card.classList.remove('is-touched');
    }, 450);
    if (event.pointerType === 'touch') {
      touchOpened = true;
      showProject();
    }
  });
  card.addEventListener('touchstart', () => {
    if (touchOpened) return;
    touchOpened = true;
    card.classList.add('is-touched');
    showProject();
  }, { passive: true });
});
document.querySelectorAll('.view-details').forEach(button => {
  button.addEventListener('click', (event) => event.stopPropagation());
});
document.querySelectorAll('.pill, .skill-card, .timeline-card, .edu-card, .cert-card, .achieve-card, .contact-row').forEach((element) => {
  element.addEventListener('pointerdown', () => {
    element.classList.add('is-touched');
    window.setTimeout(() => element.classList.remove('is-touched'), 450);
  });
});
document.getElementById('modalClose').addEventListener('click', closeModal);
document.querySelector('.modal-close-btn').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
});

// ===== Contact form =====
import emailjs from '@emailjs/browser';

const contactForm = document.getElementById('contactForm');
const contactSubmit = document.getElementById('contactSubmit');
const submitLabel = contactSubmit.querySelector('.submit-label');
const formSuccess = document.getElementById('formSuccess');
const emailConfig = {
  serviceId: import.meta.env.VITE_EMAIL_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAIL_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAIL_PUBLIC_KEY
};
let lastSubmitAt = 0;

function setFormStatus(message, isError = false){
  formSuccess.textContent = message;
  formSuccess.classList.toggle('show', Boolean(message));
  formSuccess.classList.toggle('error', isError);
}

function validateContactForm(){
  const fields = [...contactForm.querySelectorAll('input[required], textarea[required]')];
  const invalid = fields.find((field) => !field.value.trim() || (field.type === 'email' && !field.validity.valid));
  fields.forEach((field) => field.setAttribute('aria-invalid', String(field === invalid)));
  if (invalid){
    invalid.focus();
    invalid.reportValidity();
    return false;
  }
  return true;
}

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  setFormStatus('');
  if (!validateContactForm()) return;
  if (contactForm.website.value.trim()) return;
  if (Date.now() - lastSubmitAt < 15000){
    setFormStatus('Please wait a moment before sending another message.', true);
    return;
  }
  if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey){
    setFormStatus('Something went wrong. Please try again or email me directly.', true);
    console.error('Email service is not configured. Add VITE_EMAIL_SERVICE_ID, VITE_EMAIL_TEMPLATE_ID, and VITE_EMAIL_PUBLIC_KEY to .env.');
    return;
  }

  contactSubmit.disabled = true;
  submitLabel.textContent = 'Sending...';
  try {
    const formData = new FormData(contactForm);
    const firstName = formData.get('first_name').toString().trim();
    const lastName = formData.get('last_name').toString().trim();
    const email = formData.get('email').toString().trim();
    const message = formData.get('message').toString().trim();
    await emailjs.send(emailConfig.serviceId, emailConfig.templateId, {
      subject: 'New Portfolio Contact Message',
      name: `${firstName} ${lastName}`,
      email,
      reply_to: email,
      to_email: 'garikapatisrikari@gmail.com',
      message
    }, { publicKey: emailConfig.publicKey });
    lastSubmitAt = Date.now();
    contactForm.reset();
    fieldsResetAria(contactForm);
    setFormStatus('Message sent successfully!');
  } catch (error){
    console.error('Contact form submission failed:', error);
    setFormStatus('Something went wrong. Please try again or email me directly.', true);
  } finally {
    contactSubmit.disabled = false;
    submitLabel.textContent = 'Send message';
  }
});

function fieldsResetAria(form){
  form.querySelectorAll('input, textarea').forEach((field) => field.removeAttribute('aria-invalid'));
}

