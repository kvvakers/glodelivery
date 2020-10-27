const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}
let user = {}
user.login = localStorage.getItem('gloDelivery')
const buttonAuth = document.querySelector('.button-auth')
const modalAuth = document.querySelector('.modal-auth')
const closeAuthButton = document.querySelector('.close-auth')
const logInForm = document.querySelector('#logInForm')
const loginInput = document.querySelector('#login')
const passInput = document.querySelector('#password')
const userName = document.querySelector('.user-name')
const btnOut = document.querySelector('.button-out')

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open')
}
function auth() {
  function logOut() {
    user = {}
    localStorage.removeItem('gloDelivery')
    buttonAuth.style.display = userName.style.display = btnOut.style.display = userName.textContent =  ''
    btnOut.removeEventListener('click', logOut)
    checkAuth()
  }
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
      alert('Поле логина не должно быть пустым!')
    }
  }

  buttonAuth.addEventListener('click', toggleModalAuth)
  closeAuthButton.addEventListener('click', toggleModalAuth)
  logInForm.addEventListener('submit', logIn)
}
function checkAuth() {
  if (user.login) {
    auth()
  } else {
    notAuth()
  }
}
checkAuth()