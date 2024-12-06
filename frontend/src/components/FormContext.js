import { Modal } from 'flowbite';
import renderRegister from './elements/renderRegister';
import renderPasswordRecovery from './elements/renderPasswordRecovery';
import renderLogin from './elements/renderLogin';

const RenderContextForm = () => {
    let currentState = 'login';
    let modal = null;


    renderLogin()
    

    renderRegister()

    renderPasswordRecovery()


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
            onHide: () => {
                console.log('modal is hidden');
            },
            onShow: () => {
                console.log('modal is shown');
            },
            onToggle: () => {
                console.log('modal has been toggled');
            }
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
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                console.log('Login submitted', { email, password });
            });
        }

        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('name').value;
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;

                if (password !== confirmPassword) {
                    alert('Passwords do not match');
                    return;
                }

                console.log('Registration submitted', { name, email, password });
            });
        }

        const passwordRecoveryForm = document.getElementById('passwordRecoveryForm');
        if (passwordRecoveryForm) {
            passwordRecoveryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('recoveryEmail').value;
                console.log('Password recovery submitted', { email });
            });
        }
    };

    const init = () => {
        const loggedEvent = document.getElementById("loggedEvent");
        const authModal = document.getElementById('authentication-modal');

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