const ContactRender = () => {
    const contactLink = document.getElementById("contactos");
    const contentArea = document.getElementById("content");

    

  
    contactLink.addEventListener("click", () => {
      contentArea.innerHTML = '';
  

      const servicesGrid = document.createElement('div');
      servicesGrid.className = 'container mx-auto px-4 py-8';
      servicesGrid.innerHTML = `
        <h2 class="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Our Contact
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img 
                src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-${i % 11}.jpg" 
                alt="Service ${i}" 
                class="w-full h-48 object-cover"
              >
              <div class="p-4">
                <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Service ${i}
                </h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm">
                  A brief description of our amazing service ${i}.
                </p>
              </div>
            </div>
          `).join('')}
        </div>
      `;
  
      contentArea.appendChild(servicesGrid);
    });
  };
  
  export default ContactRender;