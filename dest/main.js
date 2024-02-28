// Header bg
function headerChange() {
    const header = document.querySelector(".header")
    upDown = window.scrollY
    if (upDown > header.clientHeight) {
        header.classList.add("change")
    } else header.classList.remove("change")

}
window.addEventListener("scroll", headerChange)

// Loading
function loading() {
    let load = document.querySelector(".loading"),
        process = document.querySelector(".loading__bars div"),
        percentage = document.querySelector(".loading__percentage"),
        start = 0

    setInterval(function () {
        if (start < 100) {
            start++;
            process.style.width = `${start}%`
            percentage.textContent = `${start}%`
        } else {
            setTimeout(function () {
                load.classList.add("completed")
            })
        }
    })
}
loading()

// Back to top
function toTop() {
    const button = document.querySelector(".back-btn")
    function backDisplay() {
        upDown = window.scrollY
        if (upDown > 500) {
            button.classList.add("active")
        } else button.classList.remove("active")
    }
    window.addEventListener("scroll", backDisplay)

    function triggered() {
        button.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        })
    }
    triggered()
}
toTop()

// progress
function progress() {
    let progress = document.querySelector(".progress")
    window.addEventListener("scroll", function () {
        let yAxis = window.scrollY
        let percentage = yAxis / (document.body.offsetHeight - window.innerHeight) * 100
        progress.style.width = `${percentage}%`
    })
}
progress()

// Scoll to section
function toSC() {
    let sections = document.querySelectorAll(".section"),
        nav = document.querySelectorAll(".header .header__nav li a"),
        mNav = document.querySelectorAll(".header__nav-m li a"),
        mNavDisplay = document.querySelector(".header__nav-m"),
        btn = document.querySelector(".header__hambur")

    window.onscroll = () => {
        sections.forEach(sc => {
            let top = window.scrollY,
                offset = sc.offsetTop - 150,
                height = sc.offsetHeight,
                id = sc.getAttribute("id")

            if (top >= offset && top < offset + height) {
                nav.forEach(link => {
                    link.classList.remove("active")
                    document.querySelector(".header .header__nav li a[href*=" + id + "]").classList.add("active")
                })

                mNav.forEach(mLink => {
                    mLink.classList.remove("active")
                    mLink.addEventListener("click", function () {
                        mNavDisplay.classList.remove("active")
                        btn.classList.remove("active")
                    })
                    document.querySelector(".header__nav-m li a[href*=" + id + "]").classList.add("active")
                })
            }
        })
    }
}
toSC()

// X shape
function hamberInt() {
    const btn = document.querySelector(".header__hambur"),
        mNav = document.querySelector(".header__nav-m"),
        logo = document.querySelector(".header__logo"),
        lang = document.querySelector(".lang"),
        progress = document.querySelector(".progress"),
        backBtn = document.querySelector(".back-btn")

    btn.addEventListener("click", function () {
        this.classList.toggle("active")
        mNav.classList.toggle("active")
        logo.classList.toggle("remove")
        lang.classList.toggle("remove")
        progress.classList.toggle("remove")
        backBtn.classList.remove("active")
        if (mNav.classList.contains("active")) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "visible"

        }
    })

    function visibility() {
        btn.classList.remove("active")
        mNav.classList.remove("active")
        logo.classList.remove("remove")
        lang.classList.remove("remove")
        progress.classList.remove("remove")
    }
    window.addEventListener("resize", function () {
        if (window.innerWidth > 992) {
            visibility()
        }
    })
}
hamberInt()

function langChange() {
    const lang = document.querySelector(".lang"),
        langItems = document.querySelectorAll(".lang .lang__options .lang__options-item"),
        langCurrent = document.querySelector(".lang .lang__current span")

    lang.addEventListener("click", function (ev) {
        ev.stopPropagation()
        lang.classList.toggle("active")

        langItems.forEach(function (cValue) {
            cValue.addEventListener("click", function () {
                langSave = langCurrent.textContent
                langCurrent.innerHTML = cValue.textContent
                cValue.innerHTML = langSave
            })
        })
    })
    document.addEventListener("click", function () {
        lang.classList.remove("active")
    })
}
langChange()

// Tabs select 
function select() {
    let selected = document.querySelectorAll(".options__item"),
        list = document.querySelectorAll(".news__list")

    selected.forEach(function (tab) {
        tab.addEventListener("click", function () {

            // Remove active class from other tabs
            selected.forEach(function (tab) {
                tab.classList.remove("active")
            })

            // Add active class to selected tabs
            this.classList.add("active")

            // Hide the unselected list
            list.forEach(function (hide) {
                hide.classList.remove("active")
            })

            // Get data-tab
            let id = this.dataset.tab

            // Display the selected list
            document.querySelector(".news__list-" + id).classList.add("active")
        })
    })
}
select()

// Pop up video 
function popVideo() {
    let videos = document.querySelectorAll(".videos .videos__wrapper .videos__item div "),
        bannerVideo = document.querySelectorAll(".banner .banner__btn"),
        modalVideo = document.querySelector(".p-video"),
        iframeModal = document.querySelector(".p-video .p-video__inner .p-video__inner--iframe iframe"),
        btn = document.querySelector(".p-video .p-video__inner .p-video__inner--close")

    videos.forEach(function (video) {
        video.addEventListener("click", function () {
            // Show modal
            modalVideo.classList.add("active")

            // get video source
            let data = video.getAttribute("data-video-src")
            iframeModal.setAttribute("src", `https://www.youtube.com/embed/${data}?autoplay=1`)

            if (modalVideo.classList.contains("active")) {
                document.body.style.overflow = "hidden"
            }
        })
    })
    bannerVideo.forEach(function (bannerVideo) {
        bannerVideo.addEventListener("click", function () {
            modalVideo.classList.add("active")
            let data = bannerVideo.getAttribute("data-video-src")
            iframeModal.setAttribute("src", `https://www.youtube.com/embed/${data}?autoplay=1`)

            if (modalVideo.classList.contains("active")) {
                document.body.style.overflow = "hidden"
            }
        })
    })
    // Close video
    function closeModal() {
        modalVideo.classList.remove("active")
        document.body.style.overflow = "visible"

        // Clear the video's source => no sound
        iframeModal.setAttribute("src", "")
    }
    btn.addEventListener("click", function () {
        closeModal()
    })
    modalVideo.addEventListener("click", function () {
        closeModal()
    })

}
popVideo()

function hero() {
    // Flickity lib
    let slider = document.querySelector('.slider__wrapper');
    let libSlider = new Flickity(slider, {
        // options
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false,
        draggable: true,
        wrapAround: true,
        // autoPlay: true, // per 3s default
        // autoPlay: 2000,
        pauseAutoPlayHover: true,
        on: {
            ready: function () {
                // console.log('Flickity is ready');
                borrowDots()
            },
            change: function (index) {
                // console.log('Slide changed to' + index);
                paging(index)

            }
        }
    });
    let prevBtn = document.querySelector(".prev"),
        nextBtn = document.querySelector(".next")

    prevBtn.addEventListener("click", function () {
        libSlider.previous(true)
    })
    nextBtn.addEventListener("click", function () {
        libSlider.next(true)
    })

    function borrowDots() {
        let dot = document.querySelector(".flickity-page-dots"),
            dotBottom = document.querySelector(".slider__bottom-paging")
        // Push flickity's dots to our slider__bottom-paging using appendChild
        dotBottom.appendChild(dot)
    }

    function paging(index) {
        let pageNum = document.querySelector(".number")
        pageNum.innerHTML = (index + 1).toString().padStart(2, "0")
    }
}

function carousel() {
    let slider = document.querySelector('.carousel .container');
    let caroSlider = new Flickity(slider, {
        // options
        cellAlign: 'left',
        contain: true,
        prevNextButtons: false,
        draggable: true,
        wrapAround: true,
        // autoPlay: true // per 3s default
        // autoPlay: 2000,
        pauseAutoPlayHover: true,
        pageDots: false,
        imagesLoaded: true,
        freeScroll: true,
    });

    let progressBar = document.querySelector('.progress__bot-bars')
    caroSlider.on('scroll', function (progress) {
        progress = Math.max(0, Math.min(1, progress));
        progressBar.style.width = progress * 100 + '%';
    });
}


function gallery() {
    Fancybox.bind('[data-fancybox="images"]', {
        hideScrollbar: false,
        infinite: true,
        keyboard: {
            Escape: "close",
            Delete: "close",
            Backspace: "close",
            PageUp: "next",
            PageDown: "prev",
            ArrowUp: "prev",
            ArrowDown: "next",
            ArrowRight: "next",
            ArrowLeft: "prev",
        }
    });
}

window.addEventListener("load", function () {
    hero()
    carousel();
    gallery()
})




