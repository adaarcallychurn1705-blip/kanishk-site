/* =========================================================
   KANISHK CALlychurn PORTFOLIO
   SCRIPT
========================================================= */


/* =========================================================
   SPLASH
========================================================= */

window.addEventListener("load", function () {

  const splash = document.getElementById("splash");

  if (!splash) return;

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  const delay = reduceMotion ? 300 : 1300;

  setTimeout(function () {

    splash.classList.add("is-hidden");

    setTimeout(function () {
      splash.remove();
    }, 800);

  }, delay);

});


/* =========================================================
   LIVE CLOCKS
========================================================= */

function updateClocks() {

  const now = new Date();


  const toronto = new Intl.DateTimeFormat(
    "en-CA",
    {
      timeZone: "America/Toronto",

      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",

      hour12: false
    }
  ).format(now);


  const mauritius = new Intl.DateTimeFormat(
    "en-GB",
    {
      timeZone: "Indian/Mauritius",

      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",

      hour12: false
    }
  ).format(now);


  const torontoElement =
    document.getElementById("toronto-time");

  const mauritiusElement =
    document.getElementById("mauritius-time");


  if (torontoElement) {
    torontoElement.textContent = toronto;
  }


  if (mauritiusElement) {
    mauritiusElement.textContent = mauritius;
  }

}


updateClocks();

setInterval(updateClocks, 1000);


/* =========================================================
   SIGNAL WAVEFORM
========================================================= */

function animateSignal() {

  const canvas =
    document.getElementById("signal-canvas");

  if (!canvas) return;


  const ctx = canvas.getContext("2d");

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  let time = 0;


  function draw() {

    const width = canvas.width;
    const height = canvas.height;


    ctx.clearRect(
      0,
      0,
      width,
      height
    );


    ctx.beginPath();

    ctx.strokeStyle = "#222222";
    ctx.lineWidth = 1.5;


    for (
      let x = 0;
      x <= width;
      x += 2
    ) {

      const y =
        height / 2
        +
        Math.sin(
          x * 0.065 + time
        ) * 10
        +
        Math.sin(
          x * 0.13 + time * 0.7
        ) * 4;


      if (x === 0) {

        ctx.moveTo(x, y);

      } else {

        ctx.lineTo(x, y);

      }

    }


    ctx.stroke();


    if (!reduceMotion) {

      time += 0.045;

      requestAnimationFrame(draw);

    }

  }


  draw();

}


animateSignal();


/* =========================================================
   BARCODE GENERATOR
========================================================= */

function createBarcode(svg) {

  if (!svg) return;


  svg.innerHTML = "";


  const widths = [
    2, 1, 1, 2,
    1, 3, 1, 1,
    2, 1, 1, 3,
    2, 1, 1, 2,
    1, 1, 3, 1,
    2, 1, 1, 2,
    1, 3, 1, 1,
    2, 1, 2
  ];


  let x = 0;


  widths.forEach(function (width, index) {

    if (index % 2 === 0) {

      const rect =
        document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );


      rect.setAttribute(
        "x",
        x
      );

      rect.setAttribute(
        "y",
        0
      );

      rect.setAttribute(
        "width",
        width
      );

      rect.setAttribute(
        "height",
        34
      );

      rect.setAttribute(
        "fill",
        "currentColor"
      );


      svg.appendChild(rect);

    }


    x += width;

  });


  svg.setAttribute(
    "viewBox",
    `0 0 ${x} 34`
  );

}


document
  .querySelectorAll(
    ".barcode-svg, .footer-barcode-svg"
  )
  .forEach(createBarcode);


/* =========================================================
   WORKS DATA
========================================================= */

const works = [

  {
    id: "bmw",

    title: "BMW - SPEC AD",

    category: "3D Animation",

    description:
      "Designed and produced a fully 3D spec ad for BMW, highlighting the brand’s essence of performance, precision, and luxury. The project combined cinematic storytelling with advanced 3D design, animation, and rendering to create a sleek and visually striking concept piece. This work showcases my ability to use 3D as a medium for high-end commercial storytelling.",

    hero:
      "assets/3D works/png-vphfk_wawa-min.png",

    gallery: [
      "assets/3D works/png-vphfk_wawa-min.png",
      "assets/3D works/png-bxzp2_3-min.png",
      "assets/3D works/png-ldsv1_Denoised beauty-min.png",
      "assets/3D works/png-tjlz1_Beauty2-min.png",
      "assets/3D works/png-z3bq4_7-min.png"
    ]
  },


  {
    id: "culture",

    title: "Culture",

    category: "Typography",

    description:
      "A typography-focused visual project.",

    hero: null,

    gallery: [
      null,
      null
    ]
  },


  {
    id: "nike",

    title: "Nike Air",

    category: "3D Animation",

    description:
      "A conceptual Nike Air visual project.",

    hero: null,

    gallery: [
      null,
      null
    ]
  },


  {
    id: "casela",

    title: "Casela Adventure",

    category: "Brand Style Guidelines",

    description:
      "A visual identity and brand style project developed for Casela Adventure.",

    hero: null,

    gallery: [
      null,
      null
    ]
  }

];


/* =========================================================
   BUILD WORKS
========================================================= */

const worksGrid =
  document.getElementById("works-grid");


function createWorkCard(work) {

  const button =
    document.createElement("button");


  button.type = "button";

  button.className = "work-card";


  const imageWrapper =
    document.createElement("div");

  imageWrapper.className =
    "work-image";


  if (work.hero) {

    imageWrapper.classList.add(
      "has-photo"
    );


    const image =
      document.createElement("img");


    image.src =
      encodeURI(work.hero);

    image.alt =
      work.title;


    imageWrapper.appendChild(image);

  }


  const info =
    document.createElement("div");

  info.className =
    "work-info";


  const title =
    document.createElement("div");

  title.className =
    "work-title";

  title.textContent =
    work.title;


  const category =
    document.createElement("div");

  category.className =
    "work-category";

  category.textContent =
    work.category;


  info.appendChild(title);

  info.appendChild(category);


  button.appendChild(imageWrapper);

  button.appendChild(info);


  button.addEventListener(
    "click",
    function () {

      openProject(work);

    }
  );


  return button;

}


if (worksGrid) {

  works.forEach(function (work) {

    worksGrid.appendChild(
      createWorkCard(work)
    );

  });

}


/* =========================================================
   PROJECT DETAIL ELEMENTS
========================================================= */

const projectDetail =
  document.getElementById(
    "project-detail"
  );

const detailTitle =
  document.getElementById(
    "detail-title"
  );

const detailCategory =
  document.getElementById(
    "detail-category"
  );

const detailDescription =
  document.getElementById(
    "detail-description"
  );

const detailHero =
  document.getElementById(
    "detail-hero"
  );

const detailGallery =
  document.getElementById(
    "detail-gallery"
  );

const galleryDots =
  document.getElementById(
    "gallery-dots"
  );

const backButton =
  document.getElementById(
    "back-button"
  );


/* =========================================================
   OPEN PROJECT
========================================================= */

function openProject(work) {

  if (!projectDetail) return;


  detailTitle.textContent =
    work.title;


  detailCategory.textContent =
    work.category;


  detailDescription.textContent =
    work.description;


  /* Hero */

  detailHero.innerHTML = "";

  detailHero.classList.remove(
    "has-image"
  );


  if (work.hero) {

    detailHero.classList.add(
      "has-image"
    );


    const image =
      document.createElement("img");


    image.src =
      encodeURI(work.hero);

    image.alt =
      work.title;


    detailHero.appendChild(image);

  }


  /* Gallery */

  detailGallery.innerHTML = "";


  work.gallery.forEach(
    function (file) {

      const item =
        document.createElement("div");


      item.className =
        "gallery-item";


      if (file) {

        const image =
          document.createElement("img");


        image.src =
          encodeURI(file);

        image.alt =
          work.title;


        item.appendChild(image);

      } else {

        item.classList.add(
          "gallery-placeholder"
        );

      }


      detailGallery.appendChild(item);

    }
  );


  /* Dots */

  galleryDots.innerHTML = "";


  work.gallery.forEach(
    function (_, index) {

      const dot =
        document.createElement("span");


      dot.className =
        "gallery-dot";


      if (index === 0) {

        dot.classList.add(
          "active"
        );

      }


      galleryDots.appendChild(dot);

    }
  );


  /* Show */

  projectDetail.classList.add(
    "is-open"
  );


  projectDetail.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "no-scroll"
  );


  projectDetail.scrollTop = 0;

}


/* =========================================================
   CLOSE PROJECT
========================================================= */

function closeProject() {

  if (!projectDetail) return;


  projectDetail.classList.remove(
    "is-open"
  );


  projectDetail.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "no-scroll"
  );

}


if (backButton) {

  backButton.addEventListener(
    "click",
    closeProject
  );

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      projectDetail &&
      projectDetail.classList.contains(
        "is-open"
      )
    ) {

      closeProject();

    }

  }
);


/* =========================================================
   NAVIGATION
========================================================= */

document
  .querySelectorAll(
    ".main-nav a, .brand"
  )
  .forEach(function (link) {

    link.addEventListener(
      "click",
      function () {

        if (
          projectDetail &&
          projectDetail.classList.contains(
            "is-open"
          )
        ) {

          closeProject();

        }

      }
    );

  });


/* =========================================================
   HANDLE HASH ON LOAD
========================================================= */

window.addEventListener(
  "load",
  function () {

    if (
      window.location.hash &&
      window.location.hash !== "#home"
    ) {

      setTimeout(
        function () {

          const target =
            document.querySelector(
              window.location.hash
            );


          if (target) {

            target.scrollIntoView({
              behavior: "instant"
            });

          }

        },
        100
      );

    }

  }
);
