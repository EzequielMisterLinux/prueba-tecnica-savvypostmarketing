import { articles, services } from './utils/data';
import '@splidejs/splide/css';
import Splide from '@splidejs/splide';
import { Modal } from 'flowbite';
import Swal from "sweetalert2"
import {renderHeroSection as renderHeroSectionElement, heroImages} from './utils/HeroSection';
import 'leaflet/dist/leaflet.css';

const HomeRender = () => {
  const homeLink = document.getElementById("inicio");
  const contentArea = document.getElementById("content");
  
  if (!homeLink || !contentArea) {
    console.error("Required elements not found");
    return;
  }


  const renderHeroSection = () => {
    let currentImageIndex = 0;
    let sliderInterval;
  
    const heroSection = document.createElement('div');
    
    heroSection.innerHTML = `${renderHeroSectionElement()}`




const changeHeroImage = () => {
  currentImageIndex = (currentImageIndex + 1) % heroImages.length;
  const heroBackground = document.getElementById('hero-background');
  
  heroBackground.classList.add('opacity-0');
  setTimeout(() => {
    heroBackground.style.backgroundImage = `url('${heroImages[currentImageIndex]}')`;
    heroBackground.classList.remove('opacity-0');
  }, 800);
};

const startSlider = () => {
  sliderInterval = setInterval(changeHeroImage, 5000);
};


const pauseSlider = () => {
  clearInterval(sliderInterval);
};


const resumeSlider = () => {
  startSlider();
};


requestAnimationFrame(() => {
  const consultationBtn = document.getElementById('consultation-btn');
  const modalCloseBtn = document.querySelector('[data-modal-hide="consultation-modal"]');
  
  startSlider();

  consultationBtn.addEventListener('click', pauseSlider);

  modalCloseBtn.addEventListener('click', resumeSlider);
});

return heroSection.innerHTML;
};

  const renderArticles = (articles) =>
    articles
      .map(
        (article) => `
          <li class="splide__slide group">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2">
              <img
                src="${article.img}"
                alt="${article.title}"
                class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div class="p-4">
                <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-teal-500">
                  ${article.title}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm">
                  ${article.description}
                </p>
              </div>
            </div>
          </li>`
      )
      .join("");

  const renderServices = (services) =>
    services
      .map(
        (service) => `
          <div class="w-full md:w-1/2 xl:w-1/3 p-4 transform transition-all duration-300 ease-in-out hover:scale-105">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-6 hover:shadow-2xl transition-shadow duration-300 group">
              <div class="mb-4 text-teal-500 group-hover:text-teal-600 transition duration-300 transform group-hover:scale-110">
                <svg class="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  ${getServiceIcon(service.title)}
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2 text-center text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-teal-500">
                ${service.title}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm text-center">
                ${service.description}
              </p>
            </div>
          </div>`
      )
      .join("");

  const getServiceIcon = (title) => {
    const icons = {
      'Instalación': '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>',
      'Reparación': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
      'Mantenimiento': '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>'
    };
    return icons[title] || icons['Mantenimiento'];
  };

  const renderGoogleMaps = () => {
    return `
      <section class="container mx-auto px-4 py-12">
        <h2 class="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Nuestra Ubicación
        </h2>
        <div class="w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
          <div id="map" class="h-[450px] z-10"></div>
          <div class="p-4 text-center">
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=13.567781099239033,-88.4819581377094" 
              target="_blank" 
              class="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              Ir a google maps
            </a>
          </div>
        </div>
      </section>
    `;
  };
  
  const initMap = () => {
    const latitude = 13.567781099239033;
    const longitude = -88.4819581377094;
  
    const map = L.map('map').setView([latitude, longitude], 15);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup('Nuestra Ubicación')
      .openPopup();
  };
  
  // Add this to your existing script after rendering content
  requestAnimationFrame(() => {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      import('leaflet').then(() => {
        initMap();
      });
    }
  });

  contentArea.innerHTML = `
    ${renderHeroSection()}
    <div class="container mx-auto px-4 py-12">
      <section class="mb-12">
        <div class="splide">
          <div class="splide__track">
            <ul class="splide__list">
              ${renderArticles(articles)}
            </ul>
          </div>
        </div>
      </section>
      
      <section>
        <h2 class="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Nuestros Servicios
        </h2>
        <div class="flex flex-wrap justify-center">
          ${renderServices(services)}
        </div>
      </section>
    </div>
    ${renderGoogleMaps()}
  `;
  const slider = new Splide('.splide', {
    perPage: 3,
    breakpoints: {
      1024: { perPage: 3 },
      768: { perPage: 2 },
      640: { perPage: 1 }
    },
    gap: '1rem',
    arrows: true,
    pagination: true,
    autoplay: true,
    interval: 3000,
    drag: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    classes: {
      arrows: 'splide__arrows',
      arrow: 'splide__arrow',
      prev: 'splide__arrow--prev',
      next: 'splide__arrow--next'
    }
  });
  slider.mount();

  const consultationModal = document.getElementById('consultation-modal');
  const consultationBtn = document.getElementById('consultation-btn');
  const modalCloseBtn = consultationModal.querySelector('[data-modal-hide="consultation-modal"]');
  const consultationForm = document.getElementById('consultation-form');

  const modal = new Modal(consultationModal);

  consultationBtn.addEventListener('click', () => modal.show());

  modalCloseBtn.addEventListener('click', () => modal.hide());

  consultationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
        if (!name) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, ingresa tu nombre',
            confirmButtonColor: '#14b8a6'
          });
          return;
        }
    
        if (!phone) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, ingresa tu número de teléfono',
            confirmButtonColor: '#14b8a6'
          });
          return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, ingresa un correo electrónico válido',
            confirmButtonColor: '#14b8a6'
          });
          return;
        }
    
        if (!service) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, selecciona un servicio',
            confirmButtonColor: '#14b8a6'
          });
          return;
        }
    
        if (!date) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, selecciona una fecha',
            confirmButtonColor: '#14b8a6'
          });
          return;
        }
    
        const formData = {
          name,
          phone,
          email,
          service,
          date
        };
    
        console.log('Consultation Request:', formData);
        
        Swal.fire({
          icon: 'success',
          title: '¡Consulta Programada!',
          text: 'Tu consulta ha sido programada exitosamente',
          confirmButtonColor: '#14b8a6'
        });

    console.log('Consultation Request:', formData);
    
    
    modal.hide();
    consultationForm.reset();
  });


  homeLink?.addEventListener("click", () => {
    HomeRender(); 
  });
};

export default HomeRender;