import Swal from 'sweetalert2';

const cotizationContextEvent = () => {
    const isLoggedStatus = localStorage.getItem("token");
    const cotizationEvent = document.getElementById("cotizationEvent");

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value.trim();
        const email = e.target.email.value.trim();
        const service = e.target.service.value;

        if (!name || !email || !service) {
            Swal.fire({
                icon: 'error',
                title: 'Formulario incompleto',
                text: 'Por favor, completa todos los campos antes de enviar.',
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: 'Cotización enviada',
            text: `Gracias, ${name}. Hemos recibido tu solicitud para el servicio seleccionado. Te contactaremos pronto.`,
        });
    };

    cotizationEvent.innerHTML = isLoggedStatus ? getFormTemplate() : getLoginTemplate();

    if (isLoggedStatus) {
        const userDataLogged = localStorage.getItem("user");
        const data = userDataLogged ? JSON.parse(userDataLogged) : {};

        const form = document.getElementById("cotizationForm");
        if (data.name) {
            form.name.value = data.name;
        }
        if (data.email) {
            form.email.value = data.email;
        }

        form.addEventListener("submit", handleSubmit);
    }

    return cotizationContextEvent;
};

const getFormTemplate = () => {
    return `
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                    Cotización
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="extralarge-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Cerrar modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5 space-y-4">
                <form id="cotizationForm" class="space-y-4">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                        <input type="text" id="name" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Ingresa tu nombre">
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Correo electrónico</label>
                        <input type="email" id="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Ingresa tu correo">
                    </div>
                    <div>
                        <label for="service" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Servicio</label>
                        <select id="service" name="service" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                            <option value="">Selecciona un servicio</option>
                            <option value="1">Instalación de Techos</option>
                            <option value="2">Reparación de Techos</option>
                            <option value="3">Mantenimiento Preventivo</option>
                            <option value="4">Impermeabilización</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
                </form>
            </div>
        </div>`;
};

const getLoginTemplate = () => {
    return `
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="p-4 md:p-5 space-y-4">
                <h1 class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Debes iniciar sesión para realizar una cotización.</h1>
            </div>
        </div>`;
};

export default cotizationContextEvent;
