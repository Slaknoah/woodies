import Swiper from 'swiper';

const mySwiper = new Swiper ('.js-test-swiper', {
    spaceBetween: 500,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })