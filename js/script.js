function main() {
  document.querySelector(".cart-btn").addEventListener("click", () => {
    document.querySelector("#main-header").classList.toggle("open-cart");
  });
  document.querySelector(".btn-close").addEventListener("click", () => {
    document.querySelector("#main-header").classList.toggle("open-cart");
  });
}
main();

// to get banners
let banners = [];
function getBannerList() {
  fetch("https://shopping-cart-barkat.netlify.app/banners")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      banners = res;
      for (let index = 0; index < banners.length; index++) {
        const slider = document.createElement("div");
        slider.className = "slider effect6";
        const slide = ` <div class="offer-image-box">
       <img src="${banners[index].bannerImageUrl}" alt="${
          banners[index].bannerImageAlt
        }" />
     </div>
     <button
       onclick="plusSlides(-1)"
       class="btn slider-btn-left"
       type="button"
     >
       PREV
     </button>
     <button
       onclick="plusSlides(1)"
       class="btn slider-btn-right"
       type="button"
     >
       NEXT
     </button>
     <div class="offer-image-dots">
       <a onclick="currentSlide(1)" class="image-dot ${
         index == 0 ? "active" : ""
       }"></a>
       <a onclick="currentSlide(2)" class="image-dot ${
         index == 1 ? "active" : ""
       }"></a>
       <a onclick="currentSlide(3)" class="image-dot ${
         index == 2 ? "active" : ""
       }"></a>
       <a onclick="currentSlide(4)" class="image-dot ${
         index == 3 ? "active" : ""
       }"></a>
       <a onclick="currentSlide(5)" class="image-dot ${
         index == 4 ? "active" : ""
       }"></a>
     </div>`;

        slider.innerHTML = slide;
        document.querySelector(".slider-container").appendChild(slider);
      }

      showSlides(slideIndex);
    })
    .catch((err) => {
      console.log(err);
    });
}

let slideIndex = 1;
if (window.location.href.includes("index")) {
  getBannerList();
}

function showSlides(n) {
  let i;
  let slides = document.querySelectorAll(".slider");
  let dots = document.querySelectorAll(".image-dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  // for (i = 0; i < dots.length; i++) {
  //   dots[i].className = dots[i].className.replace(" active", "");
  // }
  slides[slideIndex - 1].style.display = "block";
  // dots[slideIndex - 1].className += " active";
}
function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}
