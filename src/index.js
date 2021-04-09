import ''

let shopItems = {
    product_1: {
        'name': 'Продукт 1',
        'price': '1200',
        'img': 'css/img/bravo-10.png',
        'descr':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis rhoncus mi. Duis ultrices augue nunc, sit amet placerat ligula pretium vel. Aenean eget quam ante. Duis ipsum dui, euismod id tristique id, consectetur vitae enim. Nunc finibus consequat risus, vel tristique ex dapibus et. Proin tempus nulla quis erat blandit vehicula. Duis ipsum dui, euismod id tristique id, consectetur vitae enim. Aliquam quis rhoncus mi.'
        
    },
    product_2: {
        'name': 'Продукт 2',
        'price': '1400',
        'img': 'css/img/bravo-20.png',
        'descr':'Aliquam quis rhoncus mi. Duis ultrices augue nunc, sit amet placerat ligula pretium vel. Aenean eget quam ante. Duis ipsum dui, euismod id tristique id, consectetur vitae enim. Nunc finibus consequat risus, vel tristique ex dapibus et. Proin tempus nulla quis erat blandit vehicula.  Aenean eget quam ante. Duis ipsum dui, euismod id tristique id, consectetur vitae enim.'
 
    },
    product_3: {
        'name': 'Продукт 3',
        'price': '1600',
        'img': 'css/img/bravo-30.png',
        'descr': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis rhoncus mi. Duis ultrices augue nunc, sit amet placerat ligula pretium vel. Aenean eget quam ante.  Proin tempus nulla quis erat blandit vehicula.  Aenean eget quam ante. Duis ipsum dui, euismod id tristique id, consectetur vitae enim.'
    }
};
console.log(shopItems)


init();

const cart = {
    products: {},
    totalPrice:0,
    addProduct:function(key, product) {
        this.products[key] = product;
        this.renderTotalPrice();
    },
    computeTotaPrice:function(){
        this.totalPrice = 0; 
        this.countProduct = 0; 
        for (let product in this.products) {
            this.countProduct += 1
            this.totalPrice += Number(this.products[product].price);
        }
    },
    renderTotalPrice: function () {
        this.computeTotaPrice();
        document.querySelector('.cart-total__cost').innerHTML = `${numberWithSpaces(this.totalPrice)}`;
    },
};

function init() {
    let catalogContainer=document.querySelector("#catalog");
    console.log(catalogContainer);
    let cardsTemplate = "";

    for (let product in shopItems) {
        cardsTemplate += createCard(product,shopItems[product]);
    }

    catalogContainer.innerHTML = cardsTemplate;
}


function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
function createCard(key, {name,price,img,descr} ) {
    return `
    <li class="catalog-list__title" data-key="${key}">
                        <h2 class="catalog-list__title-name">${name}</h2>
                        <img class="catalog-list__title-image" src="${img}">
                        <p class="catalog-list__title-descr">${descr}</p>
                        <p class="catalog-list__title-cost">${numberWithSpaces(price)} руб.</p>
                        <button type="button" class="catalog-list__item-btn">добавить в корзину</button>
    </li>
    `;
}
const buttons = document.querySelectorAll('.catalog-list__item-btn');
buttons.forEach(function(element){
    element.addEventListener('click',function(event){
        event.preventDefault();
        const productKey = event.path[1].getAttribute('data-key');
        event.target.disabled = true;
        event.target.textContent = 'добавлено';
        cart.addProduct(productKey, shopItems[productKey]);
        event.target.classList.toggle('catalog-list__item-btn')
        event.target.classList.toggle('catalog-list__item-btn__selected')    
    })
});




