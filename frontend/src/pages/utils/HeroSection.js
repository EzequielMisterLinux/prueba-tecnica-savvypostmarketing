export const heroImages = [
    'https://avatars.mds.yandex.net/get-altay/5583647/2a0000017df86fbade9b08b186cb3497e98a/XXL',
    'https://xn--b1agapciocctix3c0dn.xn--p1ai/up/%D0%BD1.jpg',
    'https://traststroy.ru/upload/iblock/3a4/rpd0cfvsx365c92gmid2rcys5k6wlspi.jpg'
  ];

const HeroSectionContext = `
 <div><br/></div>
      <div class="relative bg-cover bg-center h-[600px] flex items-center justify-center text-white transition-all duration-1000 ease-in-out" 
           id="hero-background" 
           style="background-image: url('${heroImages[0]}')">
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="relative z-10 text-center max-w-3xl px-4">
          <h1 class="text-5xl font-extrabold mb-4 text-white transform transition-all duration-700 ease-in-out">
            Excelencia en Techado para Hogares de Lujo
          </h1>
          <p class="text-xl mb-6 text-gray-200 transform transition-all duration-700 ease-in-out">
            Transformamos techos con innovación, calidad y precisión profesional
          </p>
          <button id="consultation-btn"  data-modal-target="default-modal" data-modal-toggle="default-modal" class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
            Agenda una Consulta
          </button>
        </div>
      </div>

      <!-- Consultation Modal -->
      <div id="consultation-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Agendar Consulta
              </h3>
              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="consultation-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <div class="p-6 space-y-6">
              <form id="consultation-form" class="grid grid-cols-2 gap-4">
                <div>
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                  <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Tu nombre" >
                </div>
                <div>
                  <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                  <input type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Tu teléfono" >
                </div>
                <div class="col-span-2">
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Tu email" >
                </div>
                <div class="col-span-2">
                  <label for="service" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Servicio de Interés</label>
                  <select id="service" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >
                    <option value="">Selecciona un servicio</option>
                    <option value="Instalación">Instalación</option>
                    <option value="Reparación">Reparación</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                  </select>
                </div>
                <div class="col-span-2">
                  <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha Preferida</label>
                  <input type="date" id="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >
                </div>
                <div class="col-span-2">
                  <button type="submit" class="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-500 dark:hover:bg-teal-600 dark:focus:ring-teal-700">
                    Programar Consulta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>    

      

`;

export const renderHeroSection = () => {
  const heroSection = document.createElement("div");
  heroSection.innerHTML = HeroSectionContext;
  return heroSection.innerHTML;
};
   