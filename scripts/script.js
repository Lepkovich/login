
window.onload = function () { // сначала дождемся когда все элементы страницы будут загружены

    let button = document.getElementById('button');
    let haveAccount = document.getElementById('have-account');
    let clients = [];

    button.addEventListener('click', SingUp);
    haveAccount.addEventListener("click", signIn); // по клику на 'Already have an account?' запускаем функцию SignIn


    function SingUp(e) {
        e.preventDefault();

        let isValid = true;
        let inputs = document.querySelectorAll('input');

        for (let i = 0; i < inputs.length - 2; i++) {
            inputs[i].style.borderColor = ''; // сбрасываем цвет input на стандартный
            inputs[i].nextElementSibling.style.display = 'none' // скрываем сообщение об ошибке
            if (inputs[i].value === '') {
                inputs[i].style.borderColor = 'red';
                inputs[i].nextElementSibling.style.display = 'flex'
                isValid = false;
            }
        }
        let fullName = document.getElementById('full-name');
        let validFullName = fullName.value.match(/^[а-яёА-ЯЁa-zA-Z\s]+$/); // Full Name может содержать только буквы и пробел
        if (!validFullName && fullName.value !== '') {
            fullName.style.borderColor = 'red';
            fullName.nextElementSibling.innerText = 'Full name may contain of letters and space only';
            fullName.nextElementSibling.style.display = 'flex';
            isValid = false;
        } else {
            fullName.nextElementSibling.innerText = 'Please enter your full name';
            fullName.style.borderColor = '';

        }

        let userName = document.getElementById('user-name');
        let validUserName = userName.value.match(/^[-_а-яёА-ЯЁa-zA-Z0-9\s]+$/); //может содержать только буквы, цифры, символ подчеркивания и тире
        if (!validUserName && userName.value !== '') {
            userName.style.borderColor = 'red';
            userName.nextElementSibling.innerText = 'User name may contain of digits, letters, spaces, - and _ symbols only';
            userName.nextElementSibling.style.display = 'flex';
            isValid = false;
        } else {
            userName.nextElementSibling.innerText = 'Please enter your User name';
            userName.style.borderColor = '';
        }


        let email = document.getElementById('email');
        let validEmail = email.value.match(/^\S+@\S+\.\S+$/); // корректный емейл ---@---.---
        if (!validEmail && email.value !== '') {
            email.style.borderColor = 'red';
            email.nextElementSibling.innerText = 'Please inter a valid e-mail with @ and domain';
            email.nextElementSibling.style.display = 'flex';
            isValid = false;
        } else {
            email.nextElementSibling.innerText = 'Please enter e-mail';
            email.style.borderColor = '';
        }


        let password = document.getElementById('password');
        // 5. Поле пароля должно содержать минимум 8 символов, среди которых есть:
        // - хотя бы одна буква в верхнем регистре
        // - хотя бы одна цифра
        // - хотя бы один спецсимвол
        let validPassword = password.value.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Zа-яА-Я0-9!@#$%^&*()_+]{8,}$/);
        if (!validPassword && password.value !== '') {
            password.style.borderColor = 'red';
            password.nextElementSibling.innerText = 'Password should contain at least one uppercase letter, one digit and special character. Not less than 8 symbols long';
            password.nextElementSibling.style.display = 'flex';
            isValid = false;
        } else {
            password.nextElementSibling.innerText = 'Please enter your password';
            password.style.borderColor = '';
        }


        let repeatPassword = document.getElementById('repeat-password');

        if (repeatPassword.value !== '' && repeatPassword.value !== password.value) {
            repeatPassword.nextElementSibling.innerText = 'Passwords does not match';
            repeatPassword.nextElementSibling.style.display = 'flex'
            repeatPassword.value = '';
            isValid = false;
        } else {
            repeatPassword.nextElementSibling.innerText = 'Please repeat your password';
            repeatPassword.style.borderColor = '';
        }
        let checkBox = document.getElementById('agreement');
        let errorCheckBox = document.getElementById('error-checkbox');

        if (!checkBox.checked && isValid) {
            errorCheckBox.style.display = 'flex'
            isValid = false;
        } else {
            errorCheckBox.style.display = 'none'
        }


        if (isValid) {
            let name = fullName.value;
            let username = userName.value;
            let mail = email.value;
            let psw = password.value;

            // записываем введенные корректные данные клиента в client
            let client = {
                name,
                username,
                mail,
                psw
            }
            clients.push(client); // добавляем текущего клиента в массив clients
            console.log('переменная client: ');
            console.log(client);
            console.log('массив clients: ');
            console.log(clients);
            console.log('текущий localStorage: ');
            console.log(localStorage);


            // получаем существующих клиентов из localStorage
            let existingClients = JSON.parse(localStorage.getItem('clients')) || [];

            console.log('переменная existingClients: ');
            console.log(existingClients);

            // Добавляем нового клиента в массив существующих клиентов
            existingClients.push(client);

            console.log('existingClients + client: ');
            console.log(existingClients);


            // Сохраняем обновленный массив клиентов в localStorage
            localStorage.setItem('clients', JSON.stringify(existingClients));

            console.log('localStorage: ');
            console.log(localStorage);

// • Если код прошёл все проверки успешно - должен появиться попап с текстом «На вашу почту выслана ссылка, перейдите по ней,
// чтобы завершить регистрацию» и кнопкой «ОК».
// При нажатии на кнопку «ОК» окно закрывается, форма очищается и пользователя перебрасывает на страницу логина (см. п.6).

            let popup = document.getElementById('popup'),
                closePopup = document.getElementById('close-popup');
            popup.style.display = 'flex';
            closePopup.addEventListener("click", signIn); // по клику на ОК с ID 'close-popup' запустим SignIn
            closePopup.onclick = function () { // и спрячем popup
                popup.style.display = 'none';
            }
        }
    }


// 6. При нажатии на ссылку «Already have an account?», а также на кнопку «ОК» в попапе реализовать имитацию перехода на страницу логина.
// Для этого с исходной страницей с помощью JS нужно произвести следующие действия:
// • Текст "Get your free account" заменить на "Log in to the system".
// • Блоки с полями "Full Name", "E-mail", "Repeat Password" удалить.
// • Блок с чекбоксом также удалить.
// • Текст в кнопке заменить на «Sign In».
// • Ссылку "Already have an account?" удалить.
// • Заменить слушатель события для кнопки «Sign In»: нужно проверить только то, что оба поля (Username и Password) заполнены.
// Если какое-то из полей не заполнено - вывести ошибку.
// Если оба заполнены - вывести через alert сообщение "Добро пожаловать, username!", где username - значение из соответствующего поля.


    function signIn(e) {
        e.preventDefault();
        document.getElementById('title').innerText = 'Log in to the system'; // меняем заголовок
        let labels = document.querySelectorAll('label');
        labels.forEach((item) => {
            if (item.className === 'form-label sign-up') {
                return;
            }
            item.remove(); // удаляем все label, кроме тех, у кого в class есть sign-up
        })

        let inputs = document.querySelectorAll('input');

        inputs.forEach((item, index) => {
            if (item.id === 'button') {
                return;
            } else if (inputs[index] && inputs[index].nextElementSibling) { // скрываем сообщения об ошибках, если есть
                inputs[index].nextElementSibling.style.display = 'none';
            }
            if (item.id === 'user-name' || item.id === 'password') {
                item.value = '';
                return;
            }
            item.remove(); // удаляем ненужные нам input
        })

        button.removeEventListener("click", SingUp);
        button.value = 'Sign In';
        button.addEventListener('click', logIn);
        haveAccount.removeEventListener('click', signIn)
        haveAccount.innerText = 'Registration'; // Заменили текст у ссылки 'Already have an account?'
        haveAccount.addEventListener('click', function () {
            window.location.reload();
        });
    }

    function logIn(e) {
        e.preventDefault();
        let isValid = true;
        let userAccount = false
        let userName = document.getElementById('user-name');
        let password = document.getElementById('password');
        userName.style.borderColor = ''; // сбрасываем цвет input на стандартный
        userName.nextElementSibling.style.display = 'none' // скрываем сообщение об ошибке
        password.style.borderColor = ''; // сбрасываем цвет input на стандартный
        password.nextElementSibling.style.display = 'none' // скрываем сообщение об ошибке

        if (userName.value === '') {
            userName.nextElementSibling.style.display = 'flex';
            userName.style.borderColor = 'red';
            isValid = false;
        }

        if (password.value === '') {
            password.nextElementSibling.style.display = 'flex';
            password.style.borderColor = 'red';
            isValid = false;
        }

        if (isValid) {
            let username = userName.value;
            let psw = password.value;
            let loginClient = {
                username,
                psw
            }
            let storedClients = localStorage.getItem('clients');
            if (storedClients) {
                clients = JSON.parse(storedClients);
            }
            let isClientExist = clients.some(client => {
                return client.username === loginClient.username;
            });
            if (!isClientExist) {
                userName.nextElementSibling.style.display = 'flex';
                userName.nextElementSibling.innerText = 'Such user does not exist!';
                userName.style.borderColor = 'red';
                userAccount = false;
            } else {
                userName.nextElementSibling.innerText = 'Please enter User name';
                userName.style.borderColor = '';
                userAccount = true;
            }
            let isPasswordMatch = clients.some(client => {
                return client.username === loginClient.username && client.psw === loginClient.psw;
            });
            if (!isPasswordMatch) {
                password.nextElementSibling.style.display = 'flex';
                password.nextElementSibling.innerText = 'Password does not match';
                password.style.borderColor = 'red';
                userAccount = false;
            } else {
                userName.nextElementSibling.innerText = 'Please enter your password';
                userName.style.borderColor = '';
                userAccount = true;
            }
// 3 страница: Личный кабинет
// Чтобы имитировать переход в личный кабинет, нужно:
//
// Текст заголовка необходимо заменить на «Welcome, name!», где name - это имя залогиненного пользователя.
//     Внимание: имя - это не username, а то, что пользователь вводил в full name!    Текст на кнопке «Sign In» заменить на «Exit»
//     и заменить слушатель на этой кнопке: теперь она должна просто перезагружать страницу, чтобы имитировать выход на страницу регистрации.
//     Все остальные элементы (текст под заголовком, поля Username и Password, ссылку "Registration") нужно удалить

            if (userAccount) {
                let foundClient = clients.find(client => {
                    return client.username === loginClient.username;
                });
                console.log(foundClient);
                document.getElementById('title').innerText = 'Welcome, ' + foundClient.name; // меняем заголовок
                document.querySelectorAll('label').forEach((item) => {
                    item.remove(); //
                })
                document.querySelectorAll('input').forEach((item, index) => {
                    if (item.id === 'button') {
                        return;
                    }
                    item.remove();
                })
                button.value = 'Exit';
                button.removeEventListener('click', logIn);
                button.addEventListener('click', function () {
                    window.location.reload();
                });
                haveAccount.remove();
            }
        }
    }
}
