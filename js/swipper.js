let swipperCompanies = new Swiper(".swipperCompanies", {
  slidesPerView: 1,
  effect: "fade",
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,
  spaceBetween: 10,
});

let companiesSlider = new Swiper(".companiesSlider", {
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    450: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

let swiper = new Swiper(".swipperCategory", {
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 10,
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  },
});

let swiperHidden = new Swiper(".swipperHiddenCategory", {
  slidesPerView: 1,
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // autoplay: {
  //   delay: 3500,
  //   disableOnInteraction: false,
  // },
  spaceBetween: 10,
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  },
});

let swiperDiscount = new Swiper(".swipperDiscount", {
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 10,
  breakpoints: {
    450: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    630: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
  },
});

let swipperBestSeller = new Swiper(".swipperBestSeller", {
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 10,
  breakpoints: {
    450: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    630: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
  },
});