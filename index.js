const sliderWrapper = document.querySelector('.slider-wrapper');
const testimonials = document.querySelectorAll('.testimonial');
const dotsContainer = document.getElementById('dots');
const prevBtn = document.querySelector('.nav-prev');
const nextBtn = document.querySelector('.nav-next');

let currentIndex = 0;
let autoplayInterval;
const totalSlides = testimonials.length;


testimonials.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

function updateSlider() {
  sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll('#dots span');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  updateSlider();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 4000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

startAutoplay();
updateSlider();

nextBtn.addEventListener('click', () => {
  nextSlide();
  stopAutoplay(); 
});
prevBtn.addEventListener('click', () => {
  prevSlide();
  stopAutoplay();
});


let startX = 0;

sliderWrapper.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
}, false);

sliderWrapper.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;
  if (diff > 50) {
    nextSlide();
  } else if (diff < -50) {
    prevSlide();
  }
}, false);

window.toggleShowMore = function (el) {
  const fullText = el.previousElementSibling;
  const shortText = fullText.previousElementSibling;

  fullText.classList.toggle('hidden');
  shortText.classList.toggle('hidden');

  el.textContent = fullText.classList.contains('hidden') ? 'Show More' : 'Show Less';
};
