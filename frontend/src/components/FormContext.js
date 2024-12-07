import { Modal } from 'flowbite';
import renderRegister from './elementsLogin/renderRegister';
import renderPasswordRecovery from './elementsLogin/renderPasswordRecovery';
import renderLogin from './elementsLogin/renderLogin';
import Swal from 'sweetalert2';

const RenderContextForm = () => {
    let currentState = 'login';
    let modal = null;

    // Validation Utility Functions
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
            const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordComplexityRegex.test(password)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Contraseña Débil',
                    html: `
                        La contraseña debe contener:
                        <ul style="text-align: left; padding-left: 20px;">
                            <li>Al menos una letra mayúscula</li>
                            <li>Al menos una letra minúscula</li>
                            <li>Al menos un número</li>
                            <li>Al menos un carácter especial (@$!%*?&)</li>
                        </ul>
                    `,
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
        // Close Modal Buttons
        const closeModalBtns = document.querySelectorAll('#closeModal');
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (modal) {
                    modal.hide();
                }
            });
        });

        // Switch to Register
        const switchToRegisterBtn = document.getElementById('switchToRegister');
        if (switchToRegisterBtn) {
            switchToRegisterBtn.addEventListener('click', () => {
                currentState = 'register';
                renderForm();
            });
        }

        // Switch to Login
        const switchToLoginBtns = document.querySelectorAll('#switchToLogin');
        switchToLoginBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currentState = 'login';
                renderForm();
            });
        });

        // Forgot Password
        const forgotPasswordBtn = document.getElementById('forgotPassword');
        if (forgotPasswordBtn) {
            forgotPasswordBtn.addEventListener('click', () => {
                currentState = 'passwordRecovery';
                renderForm();
            });
        }

        // Login Form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('emailLogin').value.trim();
                const password = document.getElementById('passwordLogin').value;

                // Validate Email
                if (!validateEmail(email)) return;

                // Validate Password (basic validation)
                if (!validatePassword(password)) return;

                // Simulate login (replace with actual authentication logic)
                console.log('Login submitted', { email, password });
                Swal.fire({
                    icon: 'success',
                    title: '¡Inicio de Sesión!',
                    text: 'Inicio de sesión exitoso',
                    confirmButtonColor: '#14b8a6'
                });
            });
        }

        // Register Form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', async(e) => {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('nameRegister').value.trim();
                const email = document.getElementById('registerEmail').value.trim();
                const password = document.getElementById('registerPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;

                // Validate Name
                if (!validateName(name)) return;

                // Validate Email
                if (!validateEmail(email)) return;

                // Validate Password with complexity
                if (!validatePassword(password, true)) return;

                // Validate Password Confirmation
                if (!confirmPassword) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Confirmar Contraseña',
                        text: 'Por favor, confirma tu contraseña',
                        confirmButtonColor: '#14b8a6'
                    });
                    return;
                }

                if (password !== confirmPassword) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Contraseñas No Coinciden',
                        text: 'Las contraseñas ingresadas no son iguales',
                        confirmButtonColor: '#14b8a6'
                    });
                    return;
                }

                // If all validations pass
                const userData = {
                    name,
                    email,
                    password
                };
                
                const userDataLogged = {
                    email,
                    password
                }

                console.log('Datos de Registro:', userData);
                
                // Simulate registration (replace with actual registration logic)
                Swal.fire({
                    icon: 'success',
                    title: '¡Cuenta Creada!',
                    text: 'Tu cuenta ha sido creada exitosamente',
                    confirmButtonColor: '#14b8a6'
                });
                
                // Reset form
                e.target.reset();
            });
        }

        // Password Recovery Form
        const passwordRecoveryForm = document.getElementById('passwordRecoveryForm');
        if (passwordRecoveryForm) {
            passwordRecoveryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('recoveryEmail').value.trim();

                // Validate Email
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