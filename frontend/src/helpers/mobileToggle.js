export const initTongleMobile = () => {
       
 const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
 const mobileMenu = document.getElementById('mobile-menu');

 mobileMenuToggle.addEventListener('click', () => {
     mobileMenu.classList.toggle('hidden');
 });

 const contactLink = document.getElementById("contactos");
 const homeLink = document.getElementById("inicio");
 const proyectosLink = document.getElementById("proyectos");
 const servicesLink = document.getElementById("servicios");

 contactLink.addEventListener("click",()=> {
   mobileMenu.classList.toggle('hidden');
 })

 homeLink.addEventListener("click",()=> {
   mobileMenu.classList.toggle('hidden');
 })

 proyectosLink.addEventListener("click",()=> {
   mobileMenu.classList.toggle('hidden');
 })

 servicesLink.addEventListener("click",()=> {
   mobileMenu.classList.toggle('hidden');
 })
}