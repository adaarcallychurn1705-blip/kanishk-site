/* =========================================================
   KANISHK CALLYCHURN — PORTFOLIO SCRIPT
   ========================================================= */

(function () {

    "use strict";


    /* =======================================================
       HEADER THEME
    ======================================================= */

    function applyHeaderTheme(theme) {

        document.body.setAttribute(
            "data-theme",
            theme
        );

    }


    /* =======================================================
       SPLASH
    ======================================================= */

    let dismissSplash = function () {};


    function initSplash() {

        const splash =
            document.getElementById("splash");

        if (!splash) {

            document.body.classList.remove(
                "is-loading"
            );

            applyHeaderTheme("light");

            return;
        }


        const logo =
            splash.querySelector(".splash-logo");


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


            splash.classList.add(
                "is-hidden"
            );


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

        };


        dismissSplash = hideSplash;


        /* Show logo */

        window.setTimeout(function () {

            if (logo) {

                logo.classList.add(
                    "is-visible"
                );

            }

        }, 150);


        /* Automatic splash dismissal */

        window.setTimeout(
            hideSplash,
            5000
        );


        /* Safety fallback */

        window.setTimeout(
            hideSplash,
            6000
        );


        /* Click */

        splash.addEventListener(
            "click",
            hideSplash
        );


        /* Mouse wheel */

        splash.addEventListener(
            "wheel",
            hideSplash,
            {
                passive: true,
                once: true
            }
        );


        /* Touch */

        splash.addEventListener(
            "touchmove",
            hideSplash,
            {
                passive: true,
                once: true
            }
        );


        /* Keyboard */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" ||
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    hideSplash();

                }

            }
        );

    }


    /* =======================================================
       NAVIGATION
    ======================================================= */

    function initNavigation() {

        const links =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        links.forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetID =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    dismissSplash();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });

    }


    /* =======================================================
       SCROLL REVEALS
    ======================================================= */

    function initReveal() {

        const elements =
            document.querySelectorAll(
                ".reveal"
            );


        if (!elements.length) {

            return;

        }


        if (
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(
                function (element) {

                    element.classList.add(
                        "is-visible"
                    );

                }
            );

            return;

        }


        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            entry.target.classList.add(
                                "is-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        elements.forEach(
            function (element) {

                observer.observe(
                    element
                );

            }
        );

    }


    /* =======================================================
       HEADER / SECTION THEME
    ======================================================= */

    function initHeader() {

        const header =
            document.querySelector(
                ".site-header"
            );


        if (!header) {

            return;

        }


        const sections =
            document.querySelectorAll(
                "section[data-theme]"
            );


        if (!sections.length) {

            return;

        }


        if (
            !("IntersectionObserver" in window)
        ) {

            return;

        }


        const observer =
            new IntersectionObserver(
                function (entries) {

                    /*
                     * Do not change theme while splash
                     * is covering the page.
                     */

                    if (
                        document.body.classList.contains(
                            "is-loading"
                        )
                    ) {

                        return;

                    }


                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            const theme =
                                entry.target.getAttribute(
                                    "data-theme"
                                );


                            applyHeaderTheme(
                                theme || "light"
                            );

                        }
                    );

                },
                {
                    threshold: 0.2
                }
            );


        sections.forEach(
            function (section) {

                observer.observe(
                    section
                );

            }
        );

    }


    /* =======================================================
       IMAGE LOADING
    ======================================================= */

    function initImages() {

        const images =
            document.querySelectorAll(
                "img"
            );


        images.forEach(
            function (image) {


                /*
                 * Check source exists.
                 */

                const source =
                    image.getAttribute(
                        "src"
                    );


                if (!source) {

                    console.error(
                        "IMAGE HAS NO SRC:",
                        image
                    );

                    return;

                }


                /*
                 * Successful load.
                 */

                image.addEventListener(
                    "load",
                    function () {

                        image.classList.remove(
                            "image-error"
                        );


                        console.log(
                            "IMAGE LOADED:",
                            image.currentSrc ||
                            image.src
                        );

                    }
                );


                /*
                 * Failed load.
                 */

                image.addEventListener(
                    "error",
                    function () {

                        console.error(
                            "IMAGE FAILED TO LOAD:",
                            image.currentSrc ||
                            image.src
                        );


                        image.classList.add(
                            "image-error"
                        );

                    }
                );


                /*
                 * Handle cached images.
                 */

                if (image.complete) {

                    if (
                        image.naturalWidth > 0
                    ) {

                        image.classList.remove(
                            "image-error"
                        );

                    } else {

                        console.error(
                            "IMAGE FAILED TO LOAD:",
                            image.src
                        );

                        image.classList.add(
                            "image-error"
                        );

                    }

                }

            }
        );

    }


    /* =======================================================
       CURRENT YEAR
    ======================================================= */

    function initYear() {

        const yearElements =
            document.querySelectorAll(
                "[data-current-year]"
            );


        if (!yearElements.length) {

            return;

        }


        const year =
            new Date().getFullYear();


        yearElements.forEach(
            function (element) {

                element.textContent =
                    year;

            }
        );

    }


    /* =======================================================
       INITIALIZATION
    ======================================================= */

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


    /* =======================================================
       FINAL FALLBACK
    ======================================================= */

    window.setTimeout(
        function () {

            const splash =
                document.getElementById(
                    "splash"
                );


            if (
                splash &&
                !splash.classList.contains(
                    "is-hidden"
                )
            ) {

                splash.classList.add(
                    "is-hidden"
                );


                document.body.classList.remove(
                    "is-loading"
                );


                applyHeaderTheme(
                    "light"
                );


                window.setTimeout(
                    function () {

                        if (
                            splash &&
                            splash.parentNode
                        ) {

                            splash.parentNode.removeChild(
                                splash
                            );

                        }

                    },
                    900
                );

            }

        },
        7000
    );


})();