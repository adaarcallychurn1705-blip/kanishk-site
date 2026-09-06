(function () {
    "use strict";

    function applyHeaderTheme(theme) {
        document.body.setAttribute("data-theme", theme);
    }

    let dismissSplash = function () {};

    /* =========================================================
       SPLASH
    ========================================================= */

    function initSplash() {
        const splash = document.getElementById("splash");

        if (!splash) {
            document.body.classList.remove("is-loading");
            applyHeaderTheme("light");
            return;
        }

        const logo = splash.querySelector(".splash-logo");
        let splashDismissed = false;

        const hideSplash = function () {
            if (
                splashDismissed ||
                !splash ||
                splash.classList.contains("is-hidden")
            ) {
                return;
            }

            splashDismissed = true;

            splash.classList.add("is-hidden");
            document.body.classList.remove("is-loading");

            window.setTimeout(function () {
                if (splash && splash.parentNode) {
                    splash.parentNode.removeChild(splash);
                }
            }, 900);
        };

        dismissSplash = hideSplash;

        window.setTimeout(function () {
            if (logo) {
                logo.classList.add("is-visible");
            }
        }, 150);

        window.setTimeout(hideSplash, 5000);
        window.setTimeout(hideSplash, 6000);

        splash.addEventListener("click", hideSplash);

        splash.addEventListener(
            "wheel",
            hideSplash,
            { passive: true, once: true }
        );

        splash.addEventListener(
            "touchmove",
            hideSplash,
            { passive: true, once: true }
        );

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


    /* =========================================================
       NAVIGATION
    ========================================================= */

    function initNavigation() {
        const links = document.querySelectorAll('a[href^="#"]');

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

                dismissSplash();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });
    }


    /* =========================================================
       REVEAL
    ========================================================= */

    function initReveal() {
        const elements = document.querySelectorAll(".reveal");

        if (!elements.length) {
            return;
        }

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


    /* =========================================================
       AUTOMATIC HEADER LIGHT / DARK
    ========================================================= */

    function initHeader() {
        const header = document.querySelector(".site-header");

        if (!header) {
            return;
        }

        const brandLogo = header.querySelector(".brand-logo");
        const navLinks = header.querySelectorAll(".main-nav a");

        function updateHeader() {
            const sections = document.querySelectorAll(
                "main > section[data-theme]"
            );

            const headerPoint = 40;

            let currentTheme = "light";

            sections.forEach(function (section) {
                const rect = section.getBoundingClientRect();

                if (
                    rect.top <= headerPoint &&
                    rect.bottom > headerPoint
                ) {
                    currentTheme =
                        section.getAttribute("data-theme") || "light";
                }
            });

            if (currentTheme === "dark") {

                /* BLACK SECTION → WHITE HEADER */

                if (brandLogo) {
                    brandLogo.style.filter = "invert(1)";
                }

                navLinks.forEach(function (link) {
                    link.style.color = "#fff";
                });

            } else {

                /* WHITE SECTION → BLACK HEADER */

                if (brandLogo) {
                    brandLogo.style.filter = "invert(0)";
                }

                navLinks.forEach(function (link) {
                    link.style.color = "#000";
                });
            }

            applyHeaderTheme(currentTheme);
        }

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateHeader
        );

        updateHeader();
    }


    /* =========================================================
       IMAGES
    ========================================================= */

    function initImages() {
        const images = document.querySelectorAll("img");

        images.forEach(function (image) {
            const source = image.getAttribute("src");

            if (!source) {
                console.error("IMAGE HAS NO SRC:", image);
                return;
            }

            image.addEventListener("load", function () {
                image.classList.remove("image-error");

                console.log(
                    "IMAGE LOADED:",
                    image.currentSrc || image.src
                );
            });

            image.addEventListener("error", function () {
                console.error(
                    "IMAGE FAILED TO LOAD:",
                    image.currentSrc || image.src
                );

                image.classList.add("image-error");
            });

            if (image.complete) {
                if (image.naturalWidth > 0) {
                    image.classList.remove("image-error");
                } else {
                    console.error(
                        "IMAGE FAILED TO LOAD:",
                        image.src
                    );

                    image.classList.add("image-error");
                }
            }
        });
    }


    /* =========================================================
       CURRENT YEAR
    ========================================================= */

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


    /* =========================================================
       INITIALIZE
    ========================================================= */

    initSplash();

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
            "Reveal initialization failed:",
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


    /* =========================================================
       FINAL SPLASH FALLBACK
    ========================================================= */

    window.setTimeout(function () {
        const splash = document.getElementById("splash");

        if (
            splash &&
            !splash.classList.contains("is-hidden")
        ) {
            splash.classList.add("is-hidden");

            document.body.classList.remove("is-loading");

            window.setTimeout(function () {
                if (splash && splash.parentNode) {
                    splash.parentNode.removeChild(splash);
                }
            }, 900);
        }
    }, 7000);

})();