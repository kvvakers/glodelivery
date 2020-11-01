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
const inputSearch = document.querySelector('.input-search')
const modalBody = document.querySelector('.modal-body')
const modalPrice = document.querySelector('.modal-pricetag')
const btnClearCart = document.querySelector('.clear-cart')
let login = localStorage.getItem(`gloDelivery`)
const getStorage = localStorage.getItem(`gloDelivery_${login}`) || ''
let cart = []
if (getStorage) {
    cart = JSON.parse(getStorage)
}
function saveCart () {
    if (login) {
        localStorage.setItem(`gloDelivery_${login}`, JSON.stringify(cart))
    }
}
function downloadCart() {
    if (localStorage.getItem(`gloDelivery_${login}`)) {
        const data = JSON.parse(localStorage.getItem(`gloDelivery_${login}`))
        data.forEach(item => {
            console.log(cart);
        })
    }
}
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
        cartButton.style.display = ''
        btnOut.removeEventListener('click', logOut)
        checkAuth()
    }

    bodyScrollShow()
    buttonAuth.style.display = 'none'
    userName.style.display = 'block'
    btnOut.style.display = 'block'
    userName.textContent = user.login
    cartButton.style.display = 'flex'
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
            downloadCart()
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

function createCardGood({ name, price, id }) {
    const card = document.createElement('div');
    card.id = id
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
            const titleRest = restaurant.dataset.name
            document.querySelector('.restaurant-title').textContent = titleRest
            const priceRest = restaurant.dataset.price
            document.querySelector('.menu .section-heading .price').textContent = priceRest
            const catRest = restaurant.dataset.cat
            document.querySelector('.menu .section-heading .card-info .category').textContent = catRest

            getData(`db/${restaurant.dataset.products}`).then(function (data) {
                data.forEach(createCardGood)
            })
            location.hash = `#${titleRest}`
        }
    } else {
        toggleModalAuth()
    }

}

function addToCart(e) {
    const target = e.target
    const addButton = target.closest('.button-add-cart')
    if (addButton) {
        const card = target.closest('.card')
        const title = card.querySelector('.card-title-reg').textContent
        const cost = card.querySelector('.card-price-bold').textContent
        const id = card.id
        const food = cart.find((item) => {
            return item.id === id
        })
        if (food) {
            food.count++
        } else {
            cart.push({id, title, cost, count: 1})
        }
        saveCart()
    }
}

function renderCart() {
    modalBody.textContent = ''
    console.log('modal')
    if (cart.length > 0) {
        cart.forEach((item) => {
            const itemCart = `
    <div class="food-row">
        <span class="food-name">${item.title}</span>
        <strong class="food-price">${item.cost}</strong>
        <div class="food-counter">
            <button class="counter-button counter-minus" data-id="${item.id}">-</button>
            <span class="counter">${item.count}</span>
            <button class="counter-button counter-plus" data-id="${item.id}">+</button>
        </div>
    </div>
    `
            modalBody.insertAdjacentHTML('afterbegin', itemCart)
        })


        const totalPrice = cart.reduce(function (result, item) {
            return result + (parseFloat(item.cost) * item.count)
        }, 0)
        modalPrice.textContent = totalPrice + ' ₽'
    }
}

function changeCount (e) {
    const target = e.target
    if (target.classList.contains('counter-button')) {
        const food = cart.find(item => {
            return item.id === target.dataset.id
        })
        if (target.classList.contains('counter-minus')) {
            food.count--
            if (food.count === 0) {
                cart.splice(cart.indexOf(food), 1)
            }
        }
        if (target.classList.contains('counter-plus')) {
            food.count++
        }
        renderCart()
    }

}

function init () {
    getData('db/partners.json').then(function (data) {
        data.forEach(createCardRestaurant)
    })
    cartButton.addEventListener("click", () => {
        renderCart()
        if (cart.length > 0) {
            toggleModal()
        } else {
            alert('Ваша корзина пуста')
        }
    });
    btnClearCart.addEventListener('click', function () {
        toggleModal()
        localStorage.setItem(`gloDelivery_${login}`, '')
        cart.length = 0
        renderCart()
    })
    modalBody.addEventListener('click', changeCount)
    cardsMenu.addEventListener('click', addToCart)
    close.addEventListener("click", toggleModal);
    cardsRestaurants.addEventListener('click', openGoods)
    logo.addEventListener('click', () => {
        containerPromo.classList.remove('hide')
        restaurantsBox.classList.remove('hide')
        menuBox.classList.add('hide')
    })
    checkAuth()
    inputSearch.addEventListener('keypress', function (e) {
        if(e.charCode === 13) {
            const val = e.target.value.trim()
            if (val) {
                getData('db/partners.json').then((data) => {
                    return  data.map((partner) => {
                        return partner.products
                    })
                }).then((linkProduct) => {

                    cardsMenu.textContent = ''
                    linkProduct.forEach(function (link) {
                        getData(`db/${link}`)
                            .then(function (data) {
                                const resultSearch = data.filter((item) => {
                                    const name = item.name.toLowerCase()
                                    return name.includes(val.toLowerCase())
                                })
                                containerPromo.classList.add('hide')
                                restaurantsBox.classList.add('hide')
                                menuBox.classList.remove('hide')
                                document.querySelector('.restaurant-title').textContent = 'Result search'
                                document.querySelector('.menu .section-heading .price').textContent = ''
                                document.querySelector('.menu .section-heading .card-info .category').textContent = ''
                                resultSearch.forEach(createCardGood)
                            })
                    })
                })
            }

        }
    })
    new Swiper('.swiper-container', {
        sliderPerView: 1,
        loop: true,
        autoplay: true,
        effect: 'cube'
    })
}
init()