document.addEventListener('DOMContentLoaded', () => {
    const eletricistaSwiper = new Swiper('.eletricista-swiper', {
      loop: true,
      slidesPerView: 1,
      pagination: {
        el: '.eletricista-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.eletricista-swiper .swiper-button-next',
        prevEl: '.eletricista-swiper .swiper-button-prev',
      },
      on: {
        init: function () {
          this.slides[this.activeIndex].style.display = 'block';
        },
        slideChange: function () {
          this.slides.forEach(slide => {
            slide.style.display = 'none';
          });
          this.slides[this.activeIndex].style.display = 'block';
        },
      },
    });

    const encanadorSwiper = new Swiper('.encanador-swiper', {
      loop: true,
      slidesPerView: 1,
      pagination: {
        el: '.encanador-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.encanador-swiper .swiper-button-next',
        prevEl: '.encanador-swiper .swiper-button-prev',
      },
      on: {
        init: function () {
          this.slides[this.activeIndex].style.display = 'block';
        },
        slideChange: function () {
          this.slides.forEach(slide => {
            slide.style.display = 'none';
          });
          this.slides[this.activeIndex].style.display = 'block';
        },
      },
    });

    const montagemSwiper = new Swiper('.montagem-swiper', {
      loop: true,
      slidesPerView: 1,
      pagination: {
        el: '.montagem-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.montagem-swiper .swiper-button-next',
        prevEl: '.montagem-swiper .swiper-button-prev',
      },
      on: {
        init: function () {
          this.slides[this.activeIndex].style.display = 'block';
        },
        slideChange: function () {
          this.slides.forEach(slide => {
            slide.style.display = 'none';
          });
          this.slides[this.activeIndex].style.display = 'block';
        },
      },
    });

    // Modal functionality
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    var closeBtn = document.getElementsByClassName("close")[0];

    document.querySelectorAll('.swiper-slide').forEach(slide => {
      slide.addEventListener('click', function () {
        modal.style.display = "block";
        modalImg.src = this.getAttribute('data-image');
      });
    });

    closeBtn.onclick = function () {
      modal.style.display = "none";
    }

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  });



