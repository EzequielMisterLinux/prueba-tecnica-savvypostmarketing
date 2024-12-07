import Swal from "sweetalert2";
import { services } from "./utils/dataServices";
import { Modal } from "flowbite";

const ServicesRender = () => {
  const servicesLink = document.getElementById("servicios");
  const contentArea = document.getElementById("content");
  
  const modalContainer = document.getElementById("services-modal-container");

  if (!servicesLink || !contentArea || !modalContainer) {
    console.error("Required elements not found");
    return;
  }


  const createModalTemplate = (service) => `
    <div id="service-modal" tabindex="-1" class="hidden fixed inset-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-modal max-h-full">
      <div class="relative w-full max-w-2xl max-h-full">
        <div class="bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex justify-between items-center p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              ${service.title}
            </h3>
            <button type="button" class="close-modal text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
          <div class="p-4 space-y-4">
            <img src="${service.image}" alt="${service.title}" class="w-full h-64 object-cover rounded-lg mb-4">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">${service.detailedDescription}</p>
            <p class="text-xl font-semibold text-gray-800 dark:text-white">Precio: ${service.price}</p>
          </div>
          <div class="flex justify-end p-4 border-t dark:border-gray-600">
            <button type="button" class="close-modal text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
              Cerrar
            </button>
            <button id="consult-modal-btn" type="button" class="ml-2 text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5">
              Consultar
            </button>
          </div>
        </div>
      </div>
    </div>
                <!-- Main consultation modal -->
            <div id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                      Consulta de Servicio
                    </h3>
                    <button type="button" class="close-modal text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span class="sr-only">Cerrar modal</span>
                    </button>
                  </div>
                  <form id="consultation-form-service" class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                      <div class="col-span-2">
                        <label for="service-type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Servicio de Interés</label>
                        <select id="service-type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" >
                          <option value="">Selecciona un servicio</option>
                          ${services.map(service => `
                            <option value="${service.id}">${service.title}</option>
                          `).join('')}
                        </select>
                      </div>
                      <div class="col-span-2 sm:col-span-1">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre Completo</label>
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Tu nombre" >
                      </div>
                      <div class="col-span-2 sm:col-span-1">
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>
                        <input type="tel" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ejemplo: 50377774551" >
                      </div>
                      <div class="col-span-2">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo Electrónico</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="tu.correo@ejemplo.com" >
                      </div>
                      <div class="col-span-2">
                        <label for="project-details" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Detalles del Proyecto</label>
                        <textarea id="project-details" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Describe brevemente los detalles de tu proyecto de techos"></textarea>
                      </div>
                    </div>
                    <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                      </svg>
                      Enviar Consulta
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  servicesLink.addEventListener("click", () => {
    
    contentArea.innerHTML = '';

    const servicesGrid = document.createElement('div');
    servicesGrid.className = 'container mx-auto px-4 py-8';
    servicesGrid.innerHTML = `
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Nuestros Servicios
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        ${services.map(service => `
          <div class="service-card relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer group" data-service-id="${service.id}">
            <img
              src="${service.image}"
              alt="${service.title}"
              class="w-full h-48 object-cover"
            >
            <div class="p-4">
              <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                ${service.title}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                ${service.description}
              </p>
            </div>
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
              <span class="text-white text-opacity-0 group-hover:text-opacity-100 font-semibold transition-all duration-300">
                Click para más detalles
              </span>
            </div>
          </div>
        `).join('')}
      </div>
      
    `;

    

    contentArea.appendChild(servicesGrid);

    document.querySelectorAll(".service-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        const serviceId = e.currentTarget.getAttribute("data-service-id");
        const service = services.find((s) => s.id === parseInt(serviceId));
        modalContainer.innerHTML = createModalTemplate(service);

        const modal = new Modal(document.getElementById("service-modal"));
        modal.show();

        modalContainer.querySelectorAll(".close-modal").forEach((btn) => {
          btn.addEventListener("click", () => modal.hide());
        });

        document.getElementById("consult-modal-btn").addEventListener("click", () => {
        
          modal.hide()
          const modal2 = new Modal(document.getElementById("crud-modal"));
          modal2.show()
          modalContainer.querySelectorAll(".close-modal").forEach((btn) => {
            btn.addEventListener("click", () => modal2.hide());
            
            const consultationForm = document.getElementById('consultation-form-service');
          
          
            consultationForm.addEventListener('submit', (e) => {
              e.preventDefault();
              
              const service = document.getElementById('service-type').value;
              const name = document.getElementById('name').value.trim();
              const phone = document.getElementById('phone').value.trim();
              const email = document.getElementById('email').value.trim();
              const consult = document.getElementById('project-details').value;

              if (!service) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Por favor, selecciona un servicio',
                  confirmButtonColor: '#14b8a6'
                });
                return;
              }
          
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
              

                  if (!consult) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Por favor, ingrese su consulta',
                      confirmButtonColor: '#14b8a6'
                    });
                    return;
                  }
              
                  const formData = {
                    service,
                    name,
                    phone,
                    email,
                    consult
                  };
              
                  console.log('Consultation Request:', formData);
                  
                  Swal.fire({
                    icon: 'success',
                    title: '¡Consulta Programada!',
                    text: 'Tu consulta ha sido programada exitosamente',
                    confirmButtonColor: '#14b8a6'
                  });
          
              
              
              modal2.hide();
              consultationForm.reset();
            });
          

          });
        });
      });
    });
  });
};

export default ServicesRender;
