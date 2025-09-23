function setQueryParam(key, value) {
    const url = new URL(window.location.href)
    url.searchParams.set(key, value)
    window.history.replaceState({}, '', url) // updates URL without reload
}

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
    let tab = query.get('tab') ?? 'desc'

    $('.header__nav__menu__item').on('mouseenter', function () {
        if ($(window).width() > 1140) {
            $(this).addClass('header__nav__menu__item--active')
        }
    })

    $('.header__nav__menu__item').on('mouseleave', function () {
        if ($(window).width() > 1140) {
            $(this).removeClass('header__nav__menu__item--active')
        }
    })

    $('.header__nav__back-btn').click(function () {
        const headerNav = $('.header__nav')
        let active = $('.header__nav__menu__item--active')

        if (active.length) {
            active.last().removeClass('header__nav__menu__item--active')
            active = $(
                '.header__nav__menu__item--active:has(.header__nav__submenu)',
            )
            if (active.length === 0) {
                $('.header__nav__title').text('Меню')
                $('.header__nav__back-btn__image').removeClass(
                    'header__nav__back-btn__image--active',
                )
            } else {
                $('.header__nav__title').text(
                    active.find('> .header__nav__menu__item-link').text(),
                )
            }
        }
    })

    $('.burger').click(function () {
        $(this).toggleClass('burger--active')
        if ($(this).hasClass('burger--active')) {
            $('.header__nav').addClass('header__nav--active')
        } else {
            $('.header__nav').removeClass('header__nav--active')
            $('.header__nav__menu__item--active').toggleClass(
                'header__nav__menu__item--active',
            )
            $('.header__nav__title').text('Меню')
        }
    })

    $('.header__nav__menu__item:has(.header__nav__submenu)').click(function () {
        $(this).addClass('header__nav__menu__item--active')
        const curItem = $(
            '.header__nav__menu__item--active > .header__nav__menu__item-link',
        ).last()

        $('.header__nav__title').text(curItem.text())
        $('.header__nav__back-btn__image').addClass(
            'header__nav__back-btn__image--active',
        )
    })

    $(window).on('resize', function () {
        initSlick('.advantages__list', {
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
        })
    })

    const tabs = $('.tab-group')
    // tabs.attr('active', tab)

    // Listen for tab show
    tabs.on('wa-tab-show', function (e) {
        if ($('.instruction__slider').hasClass('slick-initialized')) {
            $('.instruction__slider').slick('unslick')
        }
        if ($('.advantages__list').hasClass('slick-initialized')) {
            $('.advantages__list').slick('unslick')
        }

        // setQueryParam('tab', e.target.active)
        switch (e.target.active) {
            case 'support': {
                $('.instruction__slider').slick({
                    dots: false,
                    autoplay: true,
                    autoplaySpeed: 5000,
                })

                break
            }
            case 'desc':
            default: {
                initSlick('.advantages__list')
                break
            }
        }
    })

    const sliderTabs = $('.instruction__tab__btn')
    const cards = $('.instruction__card')

    sliderTabs.on('click', function () {
        const index = parseInt($(this).attr('data-tab-index'))
        $('.instruction__slider').slick('slickGoTo', index)

        sliderTabs.removeClass('instruction__tab__btn--active')
        $(this).addClass('instruction__tab__btn--active')
    })

    $('.instruction__slider').on('afterChange', function (_, __, slideIdx) {
        sliderTabs.removeClass('instruction__tab__btn--active')
        $(`.instruction__tab__btn[data-tab-index="${slideIdx}"]`).addClass(
            'instruction__tab__btn--active',
        )
        // do something with currentSlide index (0-based)
    })

    $('.share__discount__info .btn--blue').on('click', function () {
        $('.share-idea-modal').addClass('share-idea-modal--active')
    })

    $('.share-idea-modal__close-btn').on('click', function () {
        $('.share-idea-modal').removeClass('share-idea-modal--active')
    })
})
