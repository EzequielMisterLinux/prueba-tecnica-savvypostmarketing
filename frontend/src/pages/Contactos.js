import Swal from "sweetalert2";
import 'leaflet/dist/leaflet.css';

const ContactRender = () => {
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
              Ir a Google Maps
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
  

  const validateForm = (name, email, subject, message) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (name.trim().length < 2) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Nombre',
        text: 'Por favor, ingresa un nombre válido (mínimo 2 caracteres)',
        confirmButtonColor: '#14b8a6'
      });
      return false;
    }

    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Correo',
        text: 'Por favor, ingresa un correo electrónico válido',
        confirmButtonColor: '#14b8a6'
      });
      return false;
    }

    if (subject.trim().length < 3) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Asunto',
        text: 'Por favor, ingresa un asunto más descriptivo (mínimo 3 caracteres)',
        confirmButtonColor: '#14b8a6'
      });
      return false;
    }

    if (message.trim().length < 10) {
      Swal.fire({
        icon: 'error',
        title: 'Error de Mensaje',
        text: 'Por favor, escribe un mensaje más detallado (mínimo 10 caracteres)',
        confirmButtonColor: '#14b8a6'
      });
      return false;
    }

    return true;
  };

  const contactLink = document.getElementById("contactos");
  const contentArea = document.getElementById("content");

  contactLink.addEventListener("click", () => {
    contentArea.innerHTML = ''; 

    const contactSection = document.createElement('div');
    contactSection.className = 'container mx-auto px-4 py-8';
    contactSection.innerHTML = `
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Contáctanos
      </h2>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Contact Information Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-[1.02]">
          <h3 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Información de Contacto
          </h3>

          <div class="space-y-4">
            <!-- Phone Number -->
            <div class="flex items-center justify-between text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h3m-3-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span>+50377774551</span>
              </div>
              <button id="copy-phone" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                Copiar
              </button>
            </div>

            <!-- Email -->
            <div class="flex text-gray-800 dark:text-white items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>humbertoezequiel.z.c@gmail.com</span>
              </div>
              <button id="copy-email" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
                Copiar
              </button>
            </div>

            <!-- Social Contact Buttons -->
            <div class="flex space-x-4 mt-4">
              <a href="https://wa.me/50377774551" target="_blank" class="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.03-.967-.272-.1-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                </svg> WhatsApp
              </a>
              <a href="https://t.me/+50377774551" target="_blank" class="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
<linearGradient id="BiF7D16UlC0RZ_VqXJHnXa_oWiuH0jFiU0R_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#33bef0"></stop><stop offset="1" stop-color="#0a85d9"></stop></linearGradient><path fill="url(#BiF7D16UlC0RZ_VqXJHnXa_oWiuH0jFiU0R_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M10.119,23.466c8.155-3.695,17.733-7.704,19.208-8.284c3.252-1.279,4.67,0.028,4.448,2.113	c-0.273,2.555-1.567,9.99-2.363,15.317c-0.466,3.117-2.154,4.072-4.059,2.863c-1.445-0.917-6.413-4.17-7.72-5.282	c-0.891-0.758-1.512-1.608-0.88-2.474c0.185-0.253,0.658-0.763,0.921-1.017c1.319-1.278,1.141-1.553-0.454-0.412	c-0.19,0.136-1.292,0.935-1.745,1.237c-1.11,0.74-2.131,0.78-3.862,0.192c-1.416-0.481-2.776-0.852-3.634-1.223	C8.794,25.983,8.34,24.272,10.119,23.466z" opacity=".05"></path><path d="M10.836,23.591c7.572-3.385,16.884-7.264,18.246-7.813c3.264-1.318,4.465-0.536,4.114,2.011	c-0.326,2.358-1.483,9.654-2.294,14.545c-0.478,2.879-1.874,3.513-3.692,2.337c-1.139-0.734-5.723-3.754-6.835-4.633	c-0.86-0.679-1.751-1.463-0.71-2.598c0.348-0.379,2.27-2.234,3.707-3.614c0.833-0.801,0.536-1.196-0.469-0.508	c-1.843,1.263-4.858,3.262-5.396,3.625c-1.025,0.69-1.988,0.856-3.664,0.329c-1.321-0.416-2.597-0.819-3.262-1.078	C9.095,25.618,9.075,24.378,10.836,23.591z" opacity=".07"></path><path fill="#fff" d="M11.553,23.717c6.99-3.075,16.035-6.824,17.284-7.343c3.275-1.358,4.28-1.098,3.779,1.91	c-0.36,2.162-1.398,9.319-2.226,13.774c-0.491,2.642-1.593,2.955-3.325,1.812c-0.833-0.55-5.038-3.331-5.951-3.984	c-0.833-0.595-1.982-1.311-0.541-2.721c0.513-0.502,3.874-3.712,6.493-6.21c0.343-0.328-0.088-0.867-0.484-0.604	c-3.53,2.341-8.424,5.59-9.047,6.013c-0.941,0.639-1.845,0.932-3.467,0.466c-1.226-0.352-2.423-0.772-2.889-0.932	C9.384,25.282,9.81,24.484,11.553,23.717z"></path>
</svg> Telegram
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-[1.02]">
          <h3 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Envíanos un Mensaje
          </h3>
          <form id="contact-form" class="space-y-4">
            <div>
              <label for="name" class="block mb-2 text-gray-700 dark:text-white">Nombre</label>
              <input 
                type="text" 
                id="name"
                name="name"
                 
                placeholder="Tu nombre completo"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 transition"
              >
            </div>
            <div>
              <label for="email" class="block mb-2 text-gray-700 dark:text-white">Correo Electrónico</label>
              <input 
                type="email" 
                id="email"
                name="email"
                 
                placeholder="ejemplo@correo.com"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 transition"
              >
            </div>
            <div>
              <label for="subject" class="block mb-2 text-gray-700 dark:text-white">Asunto</label>
              <input 
                type="text" 
                id="subject"
                name="subject"
                 
                placeholder="Motivo de tu contacto"
                class="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 transition"
              >
            </div>
            <div>
              <label for="message" class="block mb-2 text-gray-700 dark:text-white">Mensaje</label>
              <textarea 
                id="message"
                name="message"
                 
                rows="4"
                placeholder="Escribe tu mensaje aquí..."
                class="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 transition"
              ></textarea>
            </div>
            <button 
              type="submit" 
              class="w-full flex items-center justify-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg> Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
      ${renderGoogleMaps()}
    `;

    contentArea.appendChild(contactSection);


    requestAnimationFrame(() => {
      const mapElement = document.getElementById('map');
      if (mapElement) {
        import('leaflet').then(() => {
          initMap();
        });
      }
    });

    const copyPhoneBtn = document.getElementById('copy-phone');
    const copyEmailBtn = document.getElementById('copy-email');
    const contactForm = document.getElementById('contact-form');

    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+50377774551').then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Número Copiado',
          text: 'El número fue copiado a tu portapapeles exitosamente',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
      }).catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al Copiar',
          text: 'No se pudo copiar el número. Inténtalo de nuevo.',
          confirmButtonColor: '#14b8a6'
        });
      });
    });

    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('humbertoezequiel.z.c@gmail.com').then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Correo Copiado',
          text: 'El correo fue copiado a tu portapapeles exitosamente',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
      }).catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al Copiar',
          text: 'No se pudo copiar el correo. Inténtalo de nuevo.',
          confirmButtonColor: '#14b8a6'
        });
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = formData.get('name').trim();
      const email = formData.get('email').trim();
      const subject = formData.get('subject').trim();
      const message = formData.get('message').trim();

      if (validateForm(name, email, subject, message)) {
        const emailBody = `
Nombre: ${name}
Correo: ${email}

${message}`;

        const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=humbertoezequiel.z.c@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
        
        Swal.fire({
          icon: 'question',
          title: '¿Estás listo para enviar?',
          text: 'Se abrirá una ventana de Gmail para completar tu mensaje.',
          showCancelButton: true,
          confirmButtonColor: '#14b8a6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, abrir Gmail',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            window.open(gmailComposeUrl, '_blank');
            
            Swal.fire({
              icon: 'success',
              title: 'Mensaje Preparado',
              text: 'Por favor, completa y envía tu mensaje en Gmail.',
              confirmButtonColor: '#14b8a6'
            });

            contactForm.reset();
          }
        });
      }
    });
  });
};

export default ContactRender;