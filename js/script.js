/* =========================================================
   KANISHK CALLYCHURN — PORTFOLIO SCRIPT
   ========================================================= */

(function () {
    "use strict";

    /* =======================================================
       HEADER THEME (shared by the splash and the section
       observer below)

       There are two real logo files — a white one and a black
       one — swapped directly via .src. No filters, no
       mix-blend-mode.

       theme "light" -> section behind the header is light
                         (Home/About/Works)      -> black logo,
                                                     black nav
       theme "dark"  -> section is dark (Project Detail /
                         Contact), OR the red intro is still
                         showing                  -> white logo,
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
       SPLASH
       Stage 1: red panel is already visible on load. Shortly
                after, the logo pops in (scale + fade), driven
                by .splash-logo.is-visible in style.css. The
                header (small logo + nav) sits above the splash
                the whole time and is forced to the "dark"
                (white) theme via body.is-loading in style.css.
       Stage 2: the panel is dismissed either by the visitor
                (click, key press, scroll, or swipe — the
                "scroll up" gesture) or by a timed fallback, and
                slides up and off the top of the viewport
                (curtain lift), driven by .splash.is-hidden.
       ======================================================= */

    let dismissSplash = function () {};

    function initSplash() {

        const splash = document.getElementById("splash");

        if (!splash) {
            document.body.classList.remove("is-loading");
            applyHeaderTheme("light");
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
             * Home is the section right under the intro, so
             * default the header to its theme immediately. If
             * the visitor has already scrolled further by the
             * time this fires, initHeader()'s own observer will
             * correct it on the next section boundary.
             */

            applyHeaderTheme("light");

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
         * Exposed so initNavigation() can dismiss the splash
         * immediately if the visitor clicks a nav link while
         * it's still showing.
         */

        dismissSplash = hideSplash;

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
         * curtain into Home, if the visitor hasn't already
         * dismissed it another way.
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
         * Scroll / swipe closes it too — the wireframe's
         * "scroll up" gesture. Any wheel movement or touch drag
         * while the splash is up counts; { once: true } means
         * it can only fire the one time.
         */

        splash.addEventListener("wheel", hideSplash, {
            passive: true,
            once: true
        });

        splash.addEventListener("touchmove", hideSplash, {
            passive: true,
            once: true
        });

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

                /*
                 * If the visitor clicks a header nav link while
                 * the intro is still up, dismiss it first so the
                 * scroll actually lands somewhere visible.
                 */

                dismissSplash();

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

                /*
                 * While the red intro is still up, the header is
                 * pinned to the "dark" (white) theme by
                 * body.is-loading in style.css regardless of what
                 * this observer thinks the underlying section is —
                 * so skip updating applyHeaderTheme() until the
                 * splash has been dismissed, or it would flip the
                 * header black while it's still sitting on red.
                 */

                if (document.body.classList.contains("is-loading")) {
                    return;
                }

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

            applyHeaderTheme("light");

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