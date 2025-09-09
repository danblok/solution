function initSlick(slider, params) {
    slider = $(slider)
    if ($(window).width() <= 1140) {
        if (!slider.hasClass('slick-initialized')) {
            slider.slick(params)
        }
    } else {
        if (slider.hasClass('slick-initialized')) {
            slider.slick('unslick')
        }
    }
}

$(document).ready(function () {
    const query = new URLSearchParams(window.location.search)
    console.log('query params:', query)

    // Initializing advantages slick carousel
    $('.advantages__list').slick({
        dots: false,
        autoplay: true,
        autoplaySpeed: 5000,
    })

    initSlick('.advantages__list', {
        dots: false,
        autoplay: true,
        autoplaySpeed: 5000,
    })

    $(window).on('resize', function () {
        initSlick('.advantages__list', {
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
        })
    })
})
