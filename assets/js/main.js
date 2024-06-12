// ABRIR & FECHAR CARRINHO
const cartIcon = document.querySelector("#cart-shop");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Iniciar quando o documento estiver pronto
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// =============== INICIAR ====================
function start() {
  addEvents();
}

// ============= ATUALIZAR & REEXIBIR ===========
function update() {
  addEvents();
  updateTotal();
}

// =============== ADICIONAR EVENTOS ===============
function addEvents() {
  // Remover itens do carrinho
  let cartRemove_btns = document.querySelectorAll(".cart-remove");
  console.log(cartRemove_btns);
  cartRemove_btns.forEach((btn) => {
    btn.addEventListener("click", handle_removeCartItem);
  });

  // Alterar quantidade do item
  let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
  cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change", handle_changeItemQuantity);
  });

  // Adicionar item ao carrinho
  let addCart_btns = document.querySelectorAll(".new__button");
  addCart_btns.forEach((btn) => {
    btn.addEventListener("click", handle_addCartItem);
  });

  // Comprar Pedido
  const buy_btn = document.querySelector(".btn-buy");
  buy_btn.addEventListener("click", handle_buyOrder);
}

// ============= FUNÇÕES DE MANIPULAÇÃO DE EVENTOS =============
let itemsAdded = [];
let cartCount;

function handle_addCartItem() {
  let product = this.parentElement;
  let title = product.querySelector(".new__title").innerHTML;
  let price = product.querySelector(".new__price").innerHTML;
  let imgSrc = product.querySelector(".new__img").src;
  console.log(title, price, imgSrc);

  let newToAdd = {
    title,
    price,
    imgSrc,
  };

  // Lidar com item já existente
  if (itemsAdded.find((el) => el.title == newToAdd.title)) {
    alert("Este Item Já Existe!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  // Adicionar produto ao carrinho
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = document.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  // Incrementar contador do carrinho
  let count = parseInt(cartCount.innerText);
  cartCount.innerText = count + 1;

  // Adicionar evento ao botão de remover do carrinho
  newNode.querySelector('.cart-remove').addEventListener('click', handle_removeCartItem);

  update();
}

function handle_removeCartItem() {
  this.parentElement.remove();
  itemsAdded = itemsAdded.filter(
    (el) =>
      el.title !=
      this.parentElement.querySelector(".cart-product-title").innerHTML
  );

  // Decrementar contador do carrinho
  let count = parseInt(cartCount.innerText);
  cartCount.innerText = count - 1;

  update();
}

function handle_changeItemQuantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  this.value = Math.floor(this.value); // para mantê-lo inteiro

  update();
}

function handle_buyOrder() {
  if (itemsAdded.length <= 0) {
    alert("Não há nenhum pedido para fazer ainda! \nPor favor, faça um pedido primeiro.");
    return;
  }
  // const cartContent = document.querySelector(".cart-content");
  // cartContent.innerHTML = "";
  // alert("Seu pedido foi feito com sucesso :)");
  // itemsAdded = [];

  // Resetar contador do carrinho
  cartCount.innerText = 0;

  update();
}

// =========== FUNÇÕES DE ATUALIZAÇÃO & REEXIBIÇÃO =========
function updateTotal() {
  let cartBoxes = document.querySelectorAll(".cart-box");
  const totalElement = document.querySelector(".total-price");
  let total = 0;
  cartBoxes.forEach((cartBox) => {
    let priceElement = cartBox.querySelector(".cart-price");
    let price = parseFloat(priceElement.innerHTML.replace("R$", ""));
    let quantity = cartBox.querySelector(".cart-quantity").value;
    total += price * quantity;
  });

  // manter 2 dígitos após o ponto decimal
  total = total.toFixed(2);
  // ou você também pode usar
  // total = Math.round(total * 100) / 100;

  totalElement.innerHTML = "R$" + total;
}

// ============= COMPONENTES HTML =============
function CartBoxComponent(title, price, imgSrc) {
  return `
    <div class="cart-box">
        <img src=${imgSrc} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- REMOVER CARRINHO  -->
        <i class='bx bxs-trash-alt cart-remove'></i>
    </div>`;
}

document.addEventListener('DOMContentLoaded', function() {
  // Seleciona o ícone do carrinho e o contador
  const cartIcon = document.querySelector('.cart');
  cartCount = document.querySelector('#cart-count');

  // Seleciona todos os botões de adicionar ao carrinho
  const addCartButtons = document.querySelectorAll('.add-cart');
  
  // Adiciona evento de clique a cada botão de adicionar ao carrinho
  addCartButtons.forEach(button => {
      button.addEventListener('click', handle_addCartItem);
  });

  // Adicionar eventos de clique para os botões de remover do carrinho
  // Para botões que já estão presentes no DOM
  const removeCartButtons = document.querySelectorAll('.cart-remove');
  removeCartButtons.forEach(button => {
      button.addEventListener('click', handle_removeCartItem);
  });

  // Atualizar função para adicionar itens dinamicamente
  function update() {
    updateTotal();
  }
});


/*=============== SHOW LOGIN ===============*/
const login = document.getElementById('login'),
      loginButton = document.getElementById('login-button'),
      loginClose = document.getElementById('login-close')

/*===== LOGIN SHOW =====*/
/* Validate if constant exists */
if(loginButton) {
  loginButton.addEventListener("click", () => {
    login.classList.add('show-login')
  })
}

/*===== LOGIN HIDDEN =====*/
/* Validate if constant exists */
if(loginClose) {
  loginClose.addEventListener("click", () => {
    login.classList.remove('show-login')
  })
}

/*=============== HOME SWIPER ===============*/
var homeSwiper = new Swiper(".home-swiper", {
    spaceBetween: 30,
    loop: 'true',

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById('header')
  // when the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== NEW SWIPER ===============*/
var newSwiper = new Swiper(".new-swiper", {
  spaceBetween: 16,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: 'true',
});


/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');
  // when the scroll is higher than 350 viewport height, add the show-scroll class to a tag with the scroll-top class
  if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== LIGHT BOX ===============*/


/*=============== QUESTIONS ACCORDION ===============*/
const accordionItem = document.querySelectorAll('.questions__item')

accordionItem.forEach((item) => {
  const accordionHeader = item.querySelector('.questions__header')

  accordionHeader.addEventListener('click', () => {
    const openItem = document.querySelector('.accordion-open')

    toggleItem(item)

    if(openItem && openItem !== item) {
      toggleItem(openItem)
    }
  })
})

const toggleItem = (item) => {
  const accordionContent = item.querySelector('.questions__content')

  if(item.classList.contains('accordion-open')) {
    accordionContent.removeAttribute('style')
    item.classList.remove('accordion-open')
  }
  else {
    accordionContent.style.height = accordionContent.scrollHeight + 'px'
    item.classList.add('accordion-open')
  }
}

/*=============== STYLE SWITCHER ===============*/
const styleSwitcherToggle = document.querySelector(".style__switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
  document.querySelector(".style__switcher").classList.toggle("open");
})

// HIDE STYLE SWITCHER ON SCROLL
window.addEventListener("scroll", () => {
  if(document.querySelector(".style__switcher").classList.contains("open")) {
    document.querySelector(".style__switcher").classList.remove("open");
  }
})

// THEME COLORS
function themeColors() {
  const colorStyle = document.querySelector(".js-color-style"),
        themeColorsContainer = document.querySelector(".js-theme-colors");
  themeColorsContainer.addEventListener("click", ({target}) => {
    if(target.classList.contains("js-theme-color-item")) {
      localStorage.setItem("color", target.getAttribute("data-js-theme-color"));
      setColors();
    }
  })
  function setColors() {
    let path = colorStyle.getAttribute("href").split("/");
    path = path.slice(0, path.length - 1);
    colorStyle.setAttribute("href", path.join("/") + "/" + localStorage.getItem("color") + ".css");

    if(document.querySelector(".js-theme-color-item.active")) {
      document.querySelector(".js-theme-color-item.active").classList.remove("active");
    }
    document.querySelector("[data-js-theme-color=" + localStorage.getItem("color") + "]").classList.add("active");
  }
  if(localStorage.getItem("color") !== null) {
    setColors();
  }
  else {
    const defaultColor = colorStyle.getAttribute("href").split("/").pop().split(".").shift();
    document.querySelector("[data-js-theme-color" + defaultColor + "]").classList.add("active");
  }
}

themeColors();

const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('nav__menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');
});





const cartone = []; // Array para armazenar os itens no carrinho

function addToCart(productName) {
    cart.push(productName); // Adiciona o nome do produto ao carrinho
    updateCartDisplay(); // Atualiza a exibição do carrinho
}

function updateCartDisplay() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = ''; // Limpa o conteúdo atual do carrinho

    for (let i = 0; i < cart.length; i++) {
        const itemElement = document.createElement('div');
        itemElement.textContent = cart[i];
        cartElement.appendChild(itemElement);
    }
}