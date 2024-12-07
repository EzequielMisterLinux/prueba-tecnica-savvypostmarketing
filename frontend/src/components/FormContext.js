import { Modal } from 'flowbite';
import renderRegister from './elementsLogin/renderRegister';
import renderPasswordRecovery from './elementsLogin/renderPasswordRecovery';
import renderLogin from './elementsLogin/renderLogin';
import Swal from 'sweetalert2';
import {LoginUserAccess, registerUserApi} from '../api/loginAndRegister';

const RenderContextForm = () => {
    let currentState = 'login';
    let modal = null;


    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Error de Email',
                text: 'Por favor, ingresa tu correo electrónico',
                confirmButtonColor: '#14b8a6'
            });
            return false;
        }
        
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Email Inválido',
                text: 'Por favor, ingresa un correo electrónico válido',
                confirmButtonColor: '#14b8a6'
            });
            return false;
        }
        
        return true;
    };

    const validatePassword = (password, requireComplex = false) => {
        if (!password) {
            Swal.fire({
                icon: 'error',
                title: 'Error de Contraseña',
                text: 'Por favor, ingresa una contraseña',
                confirmButtonColor: '#14b8a6'
            });
            return false;
        }
        
        if (password.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Contraseña Corta',
                text: 'La contraseña debe tener al menos 8 caracteres',
                confirmButtonColor: '#14b8a6'
            });
            return false;
        }
        
        if (requireComplex) {

            const hasLowercase = /[a-z]/.test(password);
            const hasUppercase = /[A-Z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasSpecialChar = /[@$!%*?&]/.test(password);
            const isLongEnough = password.length >= 8;
        
            const missingRequirements = [];
        
            if (!hasLowercase) missingRequirements.push('Al menos una letra minúscula');
            if (!hasUppercase) missingRequirements.push('Al menos una letra mayúscula');
            if (!hasNumber) missingRequirements.push('Al menos un número');
            if (!hasSpecialChar) missingRequirements.push('Al menos un carácter especial (@$!%*?&)');
            if (!isLongEnough) missingRequirements.push('Al menos 8 caracteres');
        
            if (missingRequirements.length > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Contraseña Débil',
                    html: `La contraseña debe contener:<br>` + 
                          missingRequirements.map(req => `• ${req}`).join('<br>'),
                    confirmButtonColor: '#14b8a6'
                });
                return false;
            }
        }
        
        return true;
    };

    const validateName = (name) => {
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        
        if (!name) {
            Swal.fire({
                icon: 'error',
                title: 'Error de Nombre',
                text: 'Por favor, ingresa tu nombre',
                confirmButtonColor: '#14b8a6'
            });
            return false;
        }
        
        if (name.length < 2) {
            Swal.fire({
                icon: 'error',
                title: 'Nombre Inválido',
                text: 'El nombre debe tener al menos 2 caracteres',
                confirmButtonColor: '#14b8a6'
            });
            return false;
        }
        
        if (!nameRegex.test(name)) {
            Swal.fire({
                icon: 'error',
                title: 'Nombre Inválido',
                text: 'El nombre solo puede contener letras y espacios',
                confirmButtonColor: '#14b8a6'
            });
            return false;
        }
        
        return true;
    };

    const renderForm = () => {
        const formContext = document.getElementById("formContext");
        
        switch(currentState) {
            case 'login':
                formContext.innerHTML = renderLogin();
                break;
            case 'register':
                formContext.innerHTML = renderRegister();
                break;
            case 'passwordRecovery':
                formContext.innerHTML = renderPasswordRecovery();
                break;
        }

        setupEventListeners();
    };

    const setupModal = () => {
        const $targetEl = document.getElementById('authentication-modal');

        const options = {
            placement: 'center',
            backdrop: 'dynamic',
            backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
            closable: true,
            onHide: () => console.log('modal is hidden'),
            onShow: () => console.log('modal is shown'),
            onToggle: () => console.log('modal has been toggled')
        };

        modal = new Modal($targetEl, options);
    };

    const setupEventListeners = () => {

        const closeModalBtns = document.querySelectorAll('#closeModal');
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (modal) {
                    modal.hide();
                }
            });
        });


        const switchToRegisterBtn = document.getElementById('switchToRegister');
        if (switchToRegisterBtn) {
            switchToRegisterBtn.addEventListener('click', () => {
                currentState = 'register';
                renderForm();
            });
        }


        const switchToLoginBtns = document.querySelectorAll('#switchToLogin');
        switchToLoginBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentState = 'login';
                renderForm();
            });
        });


        const forgotPasswordBtn = document.getElementById('forgotPassword');
        if (forgotPasswordBtn) {
            forgotPasswordBtn.addEventListener('click', () => {
                currentState = 'passwordRecovery';
                renderForm();
            });
        }


        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', async(e) => {
                e.preventDefault();
                const email = document.getElementById('emailLogin').value.trim();
                const password = document.getElementById('passwordLogin').value;


                if (!validateEmail(email)) return;

                if (!validatePassword(password)) return;

                console.log('Login submitted', { email, password });

                const data = {
                    email: email,
                    password: password
                  }
                
                await LoginUserAccess(data)



                Swal.fire({
                    icon: 'success',
                    title: '¡Inicio de Sesión!',
                    text: 'Inicio de sesión exitoso',
                    confirmButtonColor: '#14b8a6'
                });
            });
        }

        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', async(e) => {
                e.preventDefault();
                
                const name = document.getElementById('nameRegister').value.trim();
                const email = document.getElementById('registerEmail').value.trim();
                const passwordRegister = document.getElementById('registerPasswordEvento').value;
                const confirmPassword = document.getElementById('confirmPassword').value;

                if (!validateName(name)) return;

                if (!validateEmail(email)) return;

                if (!validatePassword(passwordRegister, true)) return;

                if (!confirmPassword) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Confirmar Contraseña',
                        text: 'Por favor, confirma tu contraseña',
                        confirmButtonColor: '#14b8a6'
                    });
                    return;
                }

                if (passwordRegister !== confirmPassword) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Contraseñas No Coinciden',
                        text: 'Las contraseñas ingresadas no son iguales',
                        confirmButtonColor: '#14b8a6'
                    });
                    return;
                }

                const userData = {
                    name:name,
                    email:email,
                    password:passwordRegister
                };
                
                const userDataLogged = {
                    email:email,
                    password:passwordRegister
                }

                await registerUserApi(userData)

                console.log('Datos de Registro:', userData);
                
                Swal.fire({
                    icon: 'success',
                    title: '¡Cuenta Creada!',
                    text: 'Tu cuenta ha sido creada exitosamente',
                    confirmButtonColor: '#14b8a6'
                });

                await LoginUserAccess(userDataLogged)
                
                e.target.reset();
            });
        }

        const passwordRecoveryForm = document.getElementById('passwordRecoveryForm');
        if (passwordRecoveryForm) {
            passwordRecoveryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('recoveryEmail').value.trim();

                if (!validateEmail(email)) return;

                console.log('Password recovery submitted', { email });
                Swal.fire({
                    icon: 'success',
                    title: 'Recuperación de Contraseña',
                    text: 'Instrucciones de recuperación enviadas a tu correo electrónico',
                    confirmButtonColor: '#14b8a6'
                });
            });
        }
    };

    const init = () => {
        const loggedEvent = document.getElementById("loggedEvent");

        setupModal();

        loggedEvent.addEventListener('click', () => {
            currentState = 'login';
            renderForm();
            
            if (modal) {
                modal.show();
            }
        });
    };

    return {
        init
    };
};

export default RenderContextForm();