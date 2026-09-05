/* =========================
   LIVE CLOCKS
========================= */

function updateClocks() {

  const now = new Date();


  const toronto = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(now);


  const mauritius = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Indian/Mauritius",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(now);


  const torontoClock =
    document.getElementById("toronto-time");

  const mauritiusClock =
    document.getElementById("mauritius-time");


  if (torontoClock) {
    torontoClock.textContent = toronto;
  }


  if (mauritiusClock) {
    mauritiusClock.textContent = mauritius;
  }

}


updateClocks();

setInterval(updateClocks, 1000);


/* =========================
   WORKS
========================= */

const works = [

  {
    id: "bmw",

    title: "BMW — Spec Ad",

    category: "3D Animation",

    description:
      "Designed and produced a fully 3D spec ad for BMW, highlighting the brand's essence of performance, precision, and luxury. The project combined cinematic storytelling with advanced 3D design, animation, and rendering to create a sleek, visually striking concept piece.",

    gallery: 4
  },


  {
    id: "title-ad-1",

    title: "Title Ad",

    category: "Typography",

    description:
      "Replace this description with your typography project description.",

    gallery: 3
  },


  {
    id: "title-ad-2",

    title: "Title Ad",

    category: "Typography",

    description:
      "Replace this description with your typography project description.",

    gallery: 3
  }

];


/* =========================
   BUILD WORK CARDS
========================= */

const carousel =
  document.getElementById("carousel");


if (carousel) {

  works.forEach(function (work) {

    const card =
      document.createElement("button");


    card.type = "button";

    card.className = "work-card";


    card.setAttribute(
      "aria-label",
      `View ${work.title}`
    );


    card.innerHTML = `
      <div class="thumb"></div>

      <div class="info">

        <div class="cat">
          ${work.category}
        </div>

        <div class="title">
          ${work.title}
        </div>

      </div>
    `;


    card.addEventListener(
      "click",
      function () {
        openDetail(work);
      }
    );


    carousel.appendChild(card);

  });

}


/* =========================
   CAROUSEL
========================= */

function scrollCarousel(direction) {

  if (!carousel) {
    return;
  }


  carousel.scrollBy({
    left: direction * 360,
    behavior: "smooth"
  });

}


/* =========================
   OPEN PROJECT
========================= */

function openDetail(work) {

  const detail =
    document.getElementById("detail");

  const title =
    document.getElementById("detail-title");

  const category =
    document.getElementById("detail-cat");

  const description =
    document.getElementById("detail-desc");

  const gallery =
    document.getElementById("detail-gallery");


  if (
    !detail ||
    !title ||
    !category ||
    !description ||
    !gallery
  ) {
    return;
  }


  title.textContent = work.title;

  category.textContent = work.category;

  description.textContent =
    work.description;


  gallery.innerHTML = "";


  for (
    let i = 0;
    i < work.gallery;
    i++
  ) {

    const item =
      document.createElement("div");


    item.setAttribute(
      "aria-hidden",
      "true"
    );


    gallery.appendChild(item);

  }


  detail.classList.add("is-open");

  detail.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow = "hidden";

}


/* =========================
   CLOSE PROJECT
========================= */

function closeDetail() {

  const detail =
    document.getElementById("detail");


  if (!detail) {
    return;
  }


  detail.classList.remove("is-open");

  detail.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow = "";

}


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Escape") {
      closeDetail();
    }

  }
);
