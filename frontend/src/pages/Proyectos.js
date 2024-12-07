import Swal from "sweetalert2";
import { Modal } from "flowbite";

import { projects } from "./utils/dataProyects";

const ProyectosRender = () => {
  const servicesLink = document.getElementById("proyectos");
  const contentArea = document.getElementById("content");
  
  const modalContainer = document.getElementById("services-modal-container");

  if (!servicesLink || !contentArea || !modalContainer) {
    console.error("Required elements not found");
    return;
  }


  const createModalTemplate = (project) => `
    <div id="service-modal" tabindex="-1" class="hidden fixed inset-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-modal max-h-full">
      <div class="relative w-full max-w-4xl max-h-full">
        <div class="bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex justify-between items-center p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
              ${project.title}
            </h3>
            <button type="button" class="close-modal text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
          <div class="grid md:grid-cols-2 gap-4 p-6">
            <div>
              <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover rounded-lg mb-4">
              <div class="grid grid-cols-2 gap-2">
                <div class="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg">
                  <p class="text-sm font-medium text-gray-500 dark:text-gray-300">Ubicación</p>
                  <p class="font-semibold text-gray-800 dark:text-white">${project.location}</p>
                </div>
                <div class="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg">
                  <p class="text-sm font-medium text-gray-500 dark:text-gray-300">Año</p>
                  <p class="font-semibold text-gray-800 dark:text-white">${project.year}</p>
                </div>
                <div class="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg">
                  <p class="text-sm font-medium text-gray-500 dark:text-gray-300">Metros Cuadrados</p>
                  <p class="font-semibold text-gray-800 dark:text-white">${project.squareMeters} m²</p>
                </div>
                <div class="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg">
                  <p class="text-sm font-medium text-gray-500 dark:text-gray-300">Material</p>
                  <p class="font-semibold text-gray-800 dark:text-white">${project.materialUsed}</p>
                </div>
              </div>
            </div>
            <div>
              <h4 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Descripción Detallada</h4>
              <p class="text-gray-700 dark:text-gray-300 mb-4">${project.detailedDescription}</p>
              
              <div class="mb-4">
                <h5 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Desafíos del Proyecto</h5>
                <ul class="list-disc list-inside text-gray-700 dark:text-gray-300">
                  ${project.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                </ul>
              </div>
              
              <div>
                <h5 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Soluciones Implementadas</h5>
                <ul class="list-disc list-inside text-gray-700 dark:text-gray-300">
                  ${project.solutions.map(solution => `<li>${solution}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
          <div class="flex justify-end p-4 border-t dark:border-gray-600">
            <button type="button" class="close-modal text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
              Cerrar
            </button>
            <button id="consult-modal-btn" type="button" class="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5">
              Consultar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Consultation Modal (Unchanged from previous version) -->
    <div id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Consulta de Proyecto
            </h3>
            <button type="button" class="close-modal text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Cerrar modal</span>
            </button>
          </div>
          <form id="consultation-form-service" class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label for="service-type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Proyecto de Interés</label>
                <select id="service-type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  <option value="">Selecciona un proyecto</option>
                  ${projects.map(project => `
                    <option value="${project.id}">${project.title}</option>
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
                <label for="project-details" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Detalles de tu Consulta</label>
                <textarea id="project-details" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Describe brevemente los detalles de tu consulta"></textarea>
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
  `;

  servicesLink.addEventListener("click", () => {
   
    contentArea.innerHTML = '';


    const projectsGrid = document.createElement('div');
    projectsGrid.className = 'container mx-auto px-4 py-8';
    projectsGrid.innerHTML = `
      <h2 class="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        Nuestros Proyectos Destacados
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        ${projects.map(project => `
          <div class="project-card relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group" data-project-id="${project.id}">
            <div class="relative">
              <img
                src="${project.image}"
                alt="${project.title}"
                class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
              >
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <span class="text-white text-opacity-0 group-hover:text-opacity-100 text-xl font-semibold transition-all duration-300">
                  Ver Detalles
                </span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                ${project.title}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">
                ${project.description}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-gray-600 dark:text-gray-400">${project.location}</span>
                </div>
                <span class="text-gray-600 dark:text-gray-400">${project.year}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    contentArea.appendChild(projectsGrid);

    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        const projectId = e.currentTarget.getAttribute("data-project-id");
        const project = projects.find((p) => p.id === parseInt(projectId));
        modalContainer.innerHTML = createModalTemplate(project);

        const modal = new Modal(document.getElementById("service-modal"));
        modal.show();

        modalContainer.querySelectorAll(".close-modal").forEach((btn) => {
          btn.addEventListener("click", () => modal.hide());
        });

        document.getElementById("consult-modal-btn").addEventListener("click", () => {
          modal.hide();
          const modal2 = new Modal(document.getElementById("crud-modal"));
          modal2.show();


          const serviceTypeSelect = document.getElementById('service-type');
          serviceTypeSelect.value = projectId;

          modalContainer.querySelectorAll(".close-modal").forEach((btn) => {
            btn.addEventListener("click", () => modal2.hide());
          });

          const consultationForm = document.getElementById('consultation-form-service');
          
          consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const service = document.getElementById('service-type').value;
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const consult = document.getElementById('project-details').value.trim();


            const validations = [
              { 
                condition: !service, 
                message: 'Por favor, selecciona un proyecto' 
              },
              { 
                condition: !name, 
                message: 'Por favor, ingresa tu nombre' 
              },
              { 
                condition: !phone, 
                message: 'Por favor, ingresa tu número de teléfono' 
              },
              { 
                condition: !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 
                message: 'Por favor, ingresa un correo electrónico válido' 
              },
              { 
                condition: !consult, 
                message: 'Por favor, ingrese los detalles de su consulta' 
              }
            ];


            for (const validation of validations) {
              if (validation.condition) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: validation.message,
                  confirmButtonColor: '#14b8a6'
                });
                return;
              }
            }


            const formData = {
              service: serviceTypeSelect.options[serviceTypeSelect.selectedIndex].text,
              name,
              phone,
              email,
              consult
            };


            console.log('Consultation Request:', formData);
            

            Swal.fire({
              icon: 'success',
              title: '¡Consulta Enviada!',
              text: 'Nos pondremos en contacto contigo pronto',
              confirmButtonColor: '#14b8a6'
            });


            modal2.hide();
            consultationForm.reset();
          });
        });
      });
    });
  });
};

export default ProyectosRender;