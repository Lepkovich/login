// Вам нужно изменить код валидации формы следующим образом:
// 1. Все поля должны быть заполнены
// 2. Full Name может содержать только буквы и пробел
// 3. Your username - может содержать только буквы, цифры, символ подчеркивания и тире
// 4. Реализовать проверку введенного E-mail на корректность
// 5. Поле пароля должно содержать минимум 8 символов, среди которых есть:
// - хотя бы одна буква в верхнем регистре
// - хотя бы одна цифра
// - хотя бы один спецсимвол
// 6. Password и Repeat Password должны совпадать
// 7. Пользователь должен согласиться с условиями

window.onload = function () { // сначала дождемся когда все элементы страницы будут загружены

    let button = document.getElementById('button');
    let haveAccount = document.getElementById('have-account');

    button.addEventListener('click', SingUp);
    haveAccount.addEventListener("click", signIn); // по клику на 'Already have an account?' запускаем функцию SignIn



    function SingUp(e) {
        e.preventDefault();

        let isValid = true;
        let inputs = document.querySelectorAll('input');

        for (let i = 0; i < inputs.length-2; i++) {
            inputs[i].style.borderColor = ''; // сбрасываем цвет input на стандартный
            inputs[i].nextElementSibling.style.display = 'none' // скрываем сообщение об ошибке
            if (inputs[i].value === '') {
                inputs[i].style.borderColor = 'red';
                inputs[i].nextElementSibling.style.display = 'flex'
                isValid = false;
            }
        }
        let fullName = document.getElementById('full-name');
        let validFullName = fullName.value.match(/^[а-яёА-ЯЁa-zA-Z\s]+$/);
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
        let validUserName = userName.value.match(/^[-_а-яёА-ЯЁa-zA-Z0-9\s]+$/);
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
        let validEmail = email.value.match(/^\S+@\S+\.\S+$/);
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
        }else {
            repeatPassword.nextElementSibling.innerText = 'Please repeat your password';
            repeatPassword.style.borderColor = '';
        }
        let checkBox = document.getElementById('agreement');
        let errorCheckBox = document.getElementById('error-checkbox');

        if (!checkBox.checked && isValid) {
            errorCheckBox.style.display = 'flex'
            isValid = false;
        }

// • Если код прошёл все проверки успешно - должен появиться попап с текстом «На вашу почту выслана ссылка, перейдите по ней,
// чтобы завершить регистрацию» и кнопкой «ОК».
// При нажатии на кнопку «ОК» окно закрывается, форма очищается и пользователя перебрасывает на страницу логина (см. п.6).


        if (isValid) {
            let popup = document.getElementById('popup'),
                closePopup = document.getElementById('close-popup');
            popup.style.display='flex';
            closePopup.addEventListener("click", signIn); // по клику на ОК с ID 'close-popup' запустим SignIn
            closePopup.onclick = function () { // и спрячем popup
                popup.style.display='none';
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
        document.getElementById('title').innerText='Log in to the system'; // меняем заголовок
        let labels = document.querySelectorAll('label');
        labels.forEach((item)=>{
            if (item.className === 'form-label sign-up') {
                return;
            }
            item.remove(); // удаляем все label, кроме тех, у кого в class есть sign-up
        })
        let inputs = document.querySelectorAll('input');

        inputs.forEach((item)=>{

            if (item.id === 'user-name' || item.id === 'password') {
                item.value = '';
                return;
            } else if (item.id === 'button') {
                return;
            }
            item.remove(); // удаляем ненужные нам input
            // item[a].nextElementSibling.remove(); // скрываем сообщения об ошибках, если есть
        })

        // button.removeEventListener("click", SingUp);
        button.value='Sign In';
        button.addEventListener('click', logIn);
        // haveAccount.removeEventListener('click', signIn)
        haveAccount.innerText = 'Registration'; // Заменили текст у ссылки 'Already have an account?'
        haveAccount.addEventListener('click', function (){
            console.log('нажали на Registration')
            window.location.reload();
        });
    }

    function logIn(e) {

        let isValid = true;
        console.log('мы внутри функции Registration');
        let userName=document.getElementById('user-name');
        let password=document.getElementById('password');
        userName.style.borderColor = 'black'; // сбрасываем цвет input на стандартный
        userName.nextElementSibling.style.display = 'none' // скрываем сообщение об ошибке
        password.style.borderColor = 'black'; // сбрасываем цвет input на стандартный
        password.nextElementSibling.style.display = 'none' // скрываем сообщение об ошибке

        if (userName.value === '') {
            userName.nextElementSibling.style.display = 'flex';
            userName.style.borderColor = 'green';
            isValid = false;
        }

        if (password.value === '') {
            password.nextElementSibling.style.display = 'flex';
            password.style.borderColor = 'green';
            isValid = false;
        }
        console.log('мы на выходе Sign In');
    }

}