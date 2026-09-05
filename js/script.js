/* =========================================================
   KANISHK CALLYCHURN — PORTFOLIO SCRIPT
   ========================================================= */

(function () {
    "use strict";

    /* =======================================================
       SPLASH
       Stage 1: red panel is already visible on load. Shortly
                after, the logo pops in (scale + fade), driven
                by .splash-logo.is-visible in style.css.
       Stage 2: after the logo has held for a moment, the whole
                panel slides up and off the top of the viewport
                (curtain lift), driven by .splash.is-hidden.
       ======================================================= */

    function initSplash() {

        const splash = document.getElementById("splash");

        if (!splash) {
            document.body.classList.remove("is-loading");
            return;
        }

        const logo = splash.querySelector(".splash-logo");

        /*
         * Always allow the page to recover.
         * Even if another part of the site fails, the intro
         * should never remain permanently stuck.
         */

        const hideSplash = function () {

            if (!splash || splash.classList.contains("is-hidden")) {
                return;
            }

            splash.classList.add("is-hidden");
            document.body.classList.remove("is-loading");

            /*
             * Remove the splash completely after it has
             * finished sliding up and off the top.
             */

            window.setTimeout(function () {

                if (splash && splash.parentNode) {
                    splash.parentNode.removeChild(splash);
                }

            }, 900);
        };

        /*
         * Stage 1 — pop the logo in a beat after load, so the
         * red background is seen first, then the mark appears.
         */

        const showLogo = function () {

            if (logo) {
                logo.classList.add("is-visible");
            }
        };

        window.setTimeout(showLogo, 150);

        /*
         * Stage 2 — hold on the popped-in logo, then lift the
         * curtain into Home.
         */

        window.setTimeout(hideSplash, 1900);

        /*
         * Absolute safety fallback.
         *
         * If the browser hangs or something prevents the normal
         * timer from firing, remove it anyway.
         */

        window.setTimeout(hideSplash, 3500);

        /*
         * Clicking the intro closes it immediately.
         */

        splash.addEventListener("click", hideSplash);

        /*
         * Keyboard accessibility.
         */

        document.addEventListener("keydown", function (event) {

            if (
                event.key === "Escape" ||
                event.key === "Enter" ||
                event.key === " "
            ) {
                hideSplash();
            }

        });
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
       HEADER / BACKGROUND INVERSION
       ======================================================= */

    function initHeader() {

        const header = document.querySelector(".site-header");

        if (!header) {
            return;
        }

        /*
         * CSS mix-blend-mode:difference handles the actual
         * inversion of the logo/nav against whatever section
         * is behind the fixed header.
         *
         * This observer just tags <body data-theme="..."> to
         * match the current section, in case other elements
         * (not covered by the blend trick) need to react to
         * light vs. dark sections later.
         */

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

                    document.body.setAttribute(
                        "data-theme",
                        theme || "light"
                    );

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
       ======================================================= */

    /*
     * SPLASH IS INITIALIZED FIRST.
     *
     * This is important.
     *
     * If another feature later throws an error, the splash
     * still has its own independent removal timer.
     */

    initSplash();


    /*
     * Initialize the remaining features independently.
     *
     * Each one gets its own try/catch so one broken component
     * doesn't stop the entire website.
     */

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


    /* =======================================================
       FINAL FALLBACK
       ======================================================= */

    /*
     * If somehow the splash is still present after 4 seconds,
     * force it away.
     */

    window.setTimeout(function () {

        const splash =
            document.getElementById("splash");

        if (splash) {

            splash.classList.add("is-hidden");

            document.body.classList.remove(
                "is-loading"
            );

            window.setTimeout(function () {

                if (
                    splash &&
                    splash.parentNode
                ) {
                    splash.parentNode.removeChild(
                        splash
                    );
                }

            }, 900);
        }

    }, 4000);

})();
