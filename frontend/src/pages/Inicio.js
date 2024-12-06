import {articles, services  } from './utils/data';
import '@splidejs/splide/css';
import Splide from '@splidejs/splide';
  
  const HomeRender = () => {
    const homeLink = document.getElementById("inicio");
    const contentArea = document.getElementById("content");
  
    if (!homeLink || !contentArea) {
      console.error("Required elements not found");
      return;
    }
  

  
    const renderArticles = (articles) =>
      articles
        .map(
          (article) => `
          <li class="splide__slide">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img
                src="${article.img}"
                alt="${article.title}"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
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
          <div class="w-full md:w-1/2 xl:w-1/3 p-4">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-4">
              <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                ${service.title}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                ${service.description}
              </p>
            </div>
          </div>`
        )
        .join("");
  
    contentArea.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <header class="text-center mb-12">
          <h1 class="text-4xl font-extrabold text-gray-800 dark:text-white">
            Bienvenidos a <span class="text-teal-500">FerreTechados</span>
          </h1>
          <p class="text-gray-600 dark:text-gray-300 mt-4">
            Todo lo que necesitas para construir, reparar y mantener tus techos.
          </p>
        </header>
        
        <div class="splide">
          <div class="splide__track">
            <ul class="splide__list">
              ${renderArticles(articles)}
            </ul>
          </div>
        </div>
        
        <section class="mt-12">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Nuestros servicios
          </h2>
          <div class="flex flex-wrap justify-center">
            ${renderServices(services)}
          </div>
        </section>
      </div>
    `;
  
    homeLink.addEventListener("click", () => {
      HomeRender(); // Reinicia el renderizado
    });
  
    // Inicializar Splide
    new Splide('.splide', {
      perPage: 4,
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
      drag: true
    }).mount();
  };
  
  export default HomeRender;
  