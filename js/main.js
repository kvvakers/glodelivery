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

const getData = async function (url) {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`error ${url}, status ${response.status}`)
    }
    return await response.json()
}


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


function createCardRestaurant(rest) {
    const { name, price, products, kitchen } = rest
    const card = `
        <a href="#" class="card card-restaurant" data-products="${products}" data-name="${name}" data-price="${price}" data-cat="${kitchen}">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">${name}</h3>
                    <span class="card-tag tag">40 мин</span>
                </div>
                  <div class="card-info">
                    <div class="rating">
                        4.5
                    </div>
                    <div class="price">От ${price}₽</div>
                    <div class="category">Пицца</div>
                </div>
            </div>
        </a>
  `;
    cardsRestaurants.insertAdjacentHTML('afterbegin', card)
}


getData('db/partners.json').then(function (data) {
    data.forEach(createCardRestaurant)
})

function createCardGood({ name, price }) {
    const card = document.createElement('div');
    card.classList.add('card')
    card.insertAdjacentHTML('beforeend',`
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">${name}</h3>
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
                <strong class="card-price-bold">${price} ₽</strong>
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
            getData(`db/${restaurant.dataset.products}`).then(function (data) {
                data.forEach(createCardGood)
            })
            const titleRest = restaurant.dataset.name
            document.querySelector('.restaurant-title').textContent = titleRest
            const priceRest = restaurant.dataset.price
            document.querySelector('.menu .section-heading .price').textContent = priceRest
            const catRest = restaurant.dataset.cat
            document.querySelector('.menu .section-heading .card-info .category').textContent = catRest
        }
    } else {
        toggleModalAuth()
    }

}

function init () {
    getData('db/partners.json').then(function (data) {
        data.forEach(createCardRestaurant)
    })
    cartButton.addEventListener("click", toggleModal);
    close.addEventListener("click", toggleModal);
    cardsRestaurants.addEventListener('click', openGoods)
    logo.addEventListener('click', () => {
        containerPromo.classList.remove('hide')
        restaurantsBox.classList.remove('hide')
        menuBox.classList.add('hide')
    })
    checkAuth()
    new Swiper('.swiper-container', {
        sliderPerView: 1,
        loop: true,
        autoplay: true,
        effect: 'cube'
    })
}
init()