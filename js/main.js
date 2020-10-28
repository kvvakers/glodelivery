'use strict'

let user = {}
user.login = localStorage.getItem('gloDelivery')
const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth')
const modalAuth = document.querySelector('.modal-auth')
const closeAuthButton = document.querySelector('.close-auth')
const logInForm = document.querySelector('#logInForm')
const loginInput = document.querySelector('#login')
const passInput = document.querySelector('#password')
const userName = document.querySelector('.user-name')
const btnOut = document.querySelector('.button-out')
const body = document.querySelector('body')
const cardsRestaurants = document.querySelector('.cards-restaurants')
const containerPromo = document.querySelector('.container-promo')
const restaurantsBox = document.querySelector('.restaurants')
const menuBox = document.querySelector('.menu')
const logo = document.querySelector('.logo')
const cardsMenu = document.querySelector('.cards-menu')


function toggleModal() {
    modal.classList.toggle("is-open");
}

function toggleModalAuth() {
    modalAuth.classList.toggle('is-open')
    loginInput.style.borderColor = ''
    bodyScrollNone()
}

function bodyScrollNone() {
    body.style.overflow = 'hidden'
    body.style.paddingRight = '16px'
}

function bodyScrollShow() {
    body.style.overflow = ''
    body.style.paddingRight = ''
}

function auth() {
    function logOut() {
        user = {}
        localStorage.removeItem('gloDelivery')
        buttonAuth.style.display = userName.style.display = btnOut.style.display = userName.textContent = ''
        btnOut.removeEventListener('click', logOut)
        checkAuth()
    }

    bodyScrollShow()
    buttonAuth.style.display = 'none'
    userName.style.display = 'block'
    btnOut.style.display = 'block'
    userName.textContent = user.login
    btnOut.addEventListener('click', logOut)
}

function notAuth() {
    function logIn(e) {
        e.preventDefault()
        if (loginInput.value) {
            user.login = loginInput.value;
            user.pass = passInput.value;
            loginInput.value = passInput.value = ''
            localStorage.setItem('gloDelivery', user.login)
            toggleModalAuth()
            buttonAuth.removeEventListener('click', toggleModalAuth)
            closeAuthButton.removeEventListener('click', toggleModalAuth)
            logInForm.removeEventListener('submit', logIn)
            checkAuth()
        } else {
            loginInput.style.borderColor = 'red'
            alert('Поле логина не должно быть пустым!')
        }
    }

    buttonAuth.addEventListener('click', toggleModalAuth)
    closeAuthButton.addEventListener('click', function () {
        toggleModalAuth()
        bodyScrollShow()
    })
    logInForm.addEventListener('submit', logIn)
    modalAuth.addEventListener('click', function (e) {
        if (e.target.classList.contains('is-open')) {
            toggleModalAuth()
            bodyScrollShow()
        }
    })
}

function checkAuth() {
    if (user.login) {
        auth()
    } else {
        notAuth()
    }
}

checkAuth()

function createCardRestaurant() {
    const card = `
        <a href="#" class="card card-restaurant">
            <img src="${require('/img/food-band/preview.jpg')}" alt="image" class="card-image"/>
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">FoodBand</h3>
                    <span class="card-tag tag">40 мин</span>
                </div>
                  <div class="card-info">
                    <div class="rating">
                        4.5
                    </div>
                    <div class="price">От 450 ₽</div>
                    <div class="category">Пицца</div>
                </div>
            </div>
        </a>
  `;
    cardsRestaurants.insertAdjacentHTML('afterbegin', card)
}

createCardRestaurant()
createCardRestaurant()

function createCardGood() {
    const card = document.createElement('div');
    card.classList.add('card')
    card.insertAdjacentHTML('beforeend',`
        <img src="${require('/img/pizza-plus/pizza-vesuvius.jpg')}" alt="image" class="card-image"/>
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">Пицца Везувий</h3>
            </div>
            <div class="card-info">
                <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
                «Халапенье», соус «Тобаско», томаты.
                </div>
            </div>
            <div class="card-buttons">
                <button class="button button-primary button-add-cart">
                    <span class="button-card-text">В корзину</span>
                    <span class="button-cart-svg"></span>
                </button>
                <strong class="card-price-bold">545 ₽</strong>
            </div>
        </div>
    `)

    cardsMenu.insertAdjacentElement('beforeend', card)
}

function openGoods(e) {
    e.preventDefault()
    const target = e.target
    const restaurant = target.closest('.card-restaurant')
    if (user.login) {
        if (restaurant) {
            cardsMenu.textContent = ''
            containerPromo.classList.add('hide')
            restaurantsBox.classList.add('hide')

            menuBox.classList.remove('hide')
            createCardGood()
        }
    } else {
        toggleModalAuth()
    }

}



cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);
cardsRestaurants.addEventListener('click', openGoods)
logo.addEventListener('click', () => {
    containerPromo.classList.remove('hide')
    restaurantsBox.classList.remove('hide')
    menuBox.classList.add('hide')
})