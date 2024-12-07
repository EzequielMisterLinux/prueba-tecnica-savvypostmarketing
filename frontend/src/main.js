import './style.css'
import 'flowbite';
import { initThemeToggle } from './helpers/themeToggle.js';
import ServicesRender from './pages/Servicios.js';
import RenderContextForm from './components/FormContext.js';
import ProyectosRender from './pages/Proyectos.js';
import HomeRender from './pages/Inicio.js';
import ContactRender from './pages/Contactos.js';
import { initTongleMobile } from './helpers/mobileToggle.js';
import cotizationContextEvent from './components/CotizationEvent.js';

document.addEventListener('DOMContentLoaded', () => {

  initTongleMobile()
  initThemeToggle();

  const contentArea = document.getElementById('content');
  if (contentArea) {
    
    contentArea.innerHTML = HomeRender();
  }


  HomeRender()
  ServicesRender();
  ProyectosRender()
  ContactRender()
  cotizationContextEvent()
  RenderContextForm.init();
});

let tokenLogged = localStorage.getItem("token")

if (tokenLogged) {
  let loggedEvent = document.getElementById("loginIsLogged")

  let userDataLogged = localStorage.getItem("user")

  let data = JSON.parse(userDataLogged)

  console.log(data.name);
  

  loggedEvent.innerHTML = `<button data-modal-target="default-modal1" data-modal-toggle="default-modal1" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">my Account</button>
  
  <!-- Main modal -->
<div id="default-modal1" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Informacion usuario
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal1">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">

<img class="rounded-full w-72 h-72" src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" alt="image description">

                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Usuario: ${data.name}    
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Correo electronico: ${data.email}
                </p>
            </div>
            <!-- Modal footer -->
            <div id="cerrarsesion" class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">cerrar sesion</button>
            </div>
        </div>
    </div>
</div>`
}


let cerrarsesion = document.getElementById("cerrarsesion")

cerrarsesion.addEventListener('click',()=> {
  localStorage.clear()
  window.location.reload()
})

