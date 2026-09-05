/* =========================================================
   KANISHK CALLYCHURN — PORTFOLIO SCRIPT
   ========================================================= */

(function () {
    "use strict";

    /* =======================================================
       HEADER THEME

       There are two real logo files — a white one and a black
       one — swapped directly via .src. No filters, no
       mix-blend-mode.

       theme "light" -> section behind the header is light
                         (Home/About/Works)      -> black logo,
                                                     black nav
       theme "dark"  -> section is dark (Intro / Project Detail
                         / Contact)               -> white logo,
                                                     white nav
       ======================================================= */

    const brandLogo = document.querySelector(".brand-logo");

    function applyHeaderTheme(theme) {

        document.body.setAttribute("data-theme", theme);

        if (!brandLogo) {
            return;
        }

        const nextSrc =
            theme === "dark"
                ? brandLogo.getAttribute("data-logo-dark")
                : brandLogo.getAttribute("data-logo-light");

        if (nextSrc && brandLogo.getAttribute("src") !== nextSrc) {
            brandLogo.setAttribute("src", nextSrc);
        }
    }


    /* =======================================================
       NAVIGATION
       ======================================================= */

    function initNavigation() {

        const links = document.querySelectorAll(
            'a[href^="#"]'
        );

        links.forEach(function (link) {

            link.addEventListener("click", function (event) {

                const targetID = link.getAttribute("href");

                if (!targetID || targetID === "#") {
                    return;
                }

                const target = document.querySelector(targetID);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });
    }


    /* =======================================================
       SCROLL REVEALS
       ======================================================= */

    function initReveal() {

        const elements = document.querySelectorAll(".reveal");

        if (!elements.length) {
            return;
        }

        /*
         * If IntersectionObserver is unavailable,
         * simply show everything.
         */

        if (!("IntersectionObserver" in window)) {

            elements.forEach(function (element) {
                element.classList.add("is-visible");
            });

            return;
        }

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        elements.forEach(function (element) {
            observer.observe(element);
        });
    }


    /* =======================================================
       HEADER / SECTION THEME
       ======================================================= */

    function initHeader() {

        const header = document.querySelector(".site-header");

        if (!header) {
            return;
        }

        const sections = document.querySelectorAll(
            "section[data-theme]"
        );

        if (!sections.length) {
            return;
        }

        if (!("IntersectionObserver" in window)) {
            return;
        }

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const theme =
                        entry.target.getAttribute("data-theme");

                    applyHeaderTheme(theme || "light");

                });

            },
            {
                threshold: 0.2
            }
        );

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }


    /* =======================================================
       IMAGE LOADING
       ======================================================= */

    function initImages() {

        const images = document.querySelectorAll("img");

        images.forEach(function (image) {

            image.addEventListener(
                "error",
                function () {

                    console.warn(
                        "Image failed to load:",
                        image.src
                    );

                    /*
                     * Don't let a missing image break the
                     * remainder of the website.
                     */

                    image.classList.add("image-error");

                }
            );

        });
    }


    /* =======================================================
       CURRENT YEAR
       ======================================================= */

    function initYear() {

        const yearElements =
            document.querySelectorAll("[data-current-year]");

        if (!yearElements.length) {
            return;
        }

        const year = new Date().getFullYear();

        yearElements.forEach(function (element) {
            element.textContent = year;
        });
    }


    /* =======================================================
       INITIALIZATION

       Intro is just the first <section> in the page now, so
       there's no separate splash bootstrap to run before
       everything else — every feature below can initialize
       independently, each with its own try/catch so one
       broken component doesn't stop the rest of the site.
       ======================================================= */

    try {
        initNavigation();
    } catch (error) {
        console.error(
            "Navigation initialization failed:",
            error
        );
    }

    try {
        initReveal();
    } catch (error) {
        console.error(
            "Reveal animation initialization failed:",
            error
        );
    }

    try {
        initHeader();
    } catch (error) {
        console.error(
            "Header initialization failed:",
            error
        );
    }

    try {
        initImages();
    } catch (error) {
        console.error(
            "Image initialization failed:",
            error
        );
    }

    try {
        initYear();
    } catch (error) {
        console.error(
            "Year initialization failed:",
            error
        );
    }

})();