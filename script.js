/* ---- Live timezone clocks ----
   Intl.DateTimeFormat with a `timeZone` reads the correct local time
   for that place regardless of where the visitor is browsing from. */
function updateClocks(){
  const now = new Date();
  const toronto = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false
  }).format(now);
  const mauritius = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Indian/Mauritius', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false
  }).format(now);
  document.getElementById('toronto-time').textContent = toronto;
  document.getElementById('mauritius-time').textContent = mauritius;
}
updateClocks();
setInterval(updateClocks, 1000);

/* ---- Works data ----
   Add a new project by adding an object here — the carousel and detail
   view are both built from this array. `gallery` is how many placeholder
   tiles to render; swap in real <img> tags once you have final renders. */
const works = [
  {
    id: 'bmw',
    title: 'BMW — Spec Ad',
    category: '3D Animation',
    description: "Designed and produced a fully 3D spec ad for BMW, highlighting the brand's essence of performance, precision, and luxury. The project combined cinematic storytelling with advanced 3D design, animation, and rendering to create a sleek, visually striking concept piece.",
    gallery: 4
  },
  {
    id: 'title-ad-1',
    title: 'Title Ad',
    category: 'Typography',
    description: 'Replace this with your typography project description.',
    gallery: 3
  },
  {
    id: 'title-ad-2',
    title: 'Title Ad',
    category: 'Typography',
    description: 'Replace this with your typography project description.',
    gallery: 3
  }
];

const carousel = document.getElementById('carousel');
works.forEach(w => {
  const card = document.createElement('button');
  card.className = 'work-card';
  card.innerHTML = `
    <div class="thumb"></div>
    <div class="info">
      <div class="cat">${w.category}</div>
      <div class="title">${w.title}</div>
    </div>`;
  card.addEventListener('click', () => openDetail(w));
  carousel.appendChild(card);
});

function scrollCarousel(direction){
  carousel.scrollBy({ left: direction * 360, behavior: 'smooth' });
}

/* ---- Detail + gallery view ----
   Clicking a card fills the hidden panel with that project's content
   and slides it up over the page, with a "back to works" control. */
function openDetail(work){
  document.getElementById('detail-title').textContent = work.title;
  document.getElementById('detail-cat').textContent = work.category;
  document.getElementById('detail-desc').textContent = work.description;
  const gallery = document.getElementById('detail-gallery');
  gallery.innerHTML = '';
  for (let i = 0; i < work.gallery; i++){
    gallery.appendChild(document.createElement('div'));
  }
  document.getElementById('detail').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeDetail(){
  document.getElementById('detail').classList.remove('is-open');
  document.body.style.overflow = '';
}
