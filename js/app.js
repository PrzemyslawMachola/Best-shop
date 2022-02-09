const option = document.querySelectorAll(".select__dropdown li");
let chosenoption = "";
let productsSum = 0;
let ordersSum = 0;
let packageSum = 0;
let accountingSum = 0;
let terminalSum = 0;

let total = 0;

const products = {
  domLocation: document.querySelector("#products"),
  displayField: document.querySelector("li[data-id='products']"),
  quantity: "",
  price: "",
  handle: function() {
    products.quantity = products.domLocation.value;
    products.price = products.displayField.dataset.price;
    productsSum = products.quantity * products.price;
    document.querySelector("li[data-id='products'] .item__calc").innerText = products.quantity + " * $" + products.price;
    document.querySelector("li[data-id='products'] .item__price").innerText = "$" + productsSum;
    products.domLocation.value ? products.displayField.style.display = "flex" : products.displayField.style.display = "none";
    totalSum.display();
  },
};

const orders = {
  domLocation: document.querySelector("#orders"),
  displayField: document.querySelector("li[data-id='orders']"),
  quantity: "",
  price: "",
  handle: function() {
    orders.quantity = orders.domLocation.value;
    orders.price = orders.displayField.dataset.price;
    ordersSum = orders.quantity * orders.price;
    document.querySelector("li[data-id='orders'] .item__calc").innerText = orders.quantity + " * $" + orders.price;
    document.querySelector("li[data-id='orders'] .item__price").innerText = "$" + ordersSum;
    orders.domLocation.value ? orders.displayField.style.display = "flex" : orders.displayField.style.display = "none";
    totalSum.display();
  },
};

const package = {
  domLocation: document.querySelector("#package"),
  displayField: document.querySelector("li[data-id='package']"),
  priceDisplayField: document.querySelector("li[data-id='package'] .item__price"),

  openDropdown: function () {
    document.querySelector(".select__dropdown").classList.toggle("d-none");
    document.querySelector(".select__input").classList.toggle("select__open");
  },

  handle: function() {
    chosenoption = this.innerText;
    document.querySelector(".select__input").innerText = chosenoption;
    document.querySelector("li[data-id='package'] .item__calc").innerText = chosenoption;

    let basicPrice = document.querySelector("p[data-variant='basic']");
    let professionalPrice = document.querySelector("p[data-variant='professional']");
    let premiumPrice = document.querySelector("p[data-variant='premium']");

    chosenoption === "Basic" ? package.priceDisplayField.innerText = "$" + basicPrice.innerText.slice(1) : "";
    chosenoption === "Professional" ? package.priceDisplayField.innerText = "$" + professionalPrice.innerText.slice(1) : "";
    chosenoption === "Premium" ? package.priceDisplayField.innerText = "$" + premiumPrice.innerText.slice(1) : "";
    packageSum = parseInt(package.priceDisplayField.innerText.slice(1));
    !package.domLocation.value ? package.displayField.style.display = "flex" : package.displayField.style.display = "none";
    totalSum.display();
  },
};

const accounting = {
  domLocation: document.querySelector("#accounting"),
  displayField: document.querySelector("li[data-id='accounting']"),

  handle: function() {
    if (accounting.domLocation.checked) {
      accountingSum = parseInt(accounting.displayField.dataset.price);
      document.querySelector("li[data-id='accounting'] .item__price").innerText = "$" + accountingSum;
      accounting.displayField.style.display = "flex";
    }
    else {
      accountingSum = 0;
      accounting.displayField.style.display = "none";
    }
    totalSum.display();
  },
};

const terminal = {
  domLocation: document.querySelector("#terminal"),
  displayField: document.querySelector("li[data-id='terminal']"),

  handle: function() {
    if (terminal.domLocation.checked) {
    terminalSum = parseInt(terminal.displayField.dataset.price);
    document.querySelector("li[data-id='terminal'] .item__price").innerText = "$" + terminalSum;
    terminal.displayField.style.display = "flex";
    }
    else {
      terminalSum = 0;
      terminal.displayField.style.display = "none";
    }
    totalSum.display();
  },
};

const totalSum = {
  domLocation: document.querySelector("#total-price"),
  display: function () {
    total = productsSum + ordersSum + packageSum + accountingSum + terminalSum;
    document.querySelector(".total__price").innerText = "$" + total;
    total > 0 ? totalSum.domLocation.style.display = "flex" : totalSum.domLocation.style.display = "none";
  },
};

products.domLocation.addEventListener("keyup", products.handle);
products.domLocation.addEventListener("change", products.handle);
orders.domLocation.addEventListener("keyup", orders.handle);
orders.domLocation.addEventListener("change", orders.handle);
accounting.domLocation.addEventListener("change", accounting.handle);
terminal.domLocation.addEventListener("change", terminal.handle);
package.domLocation.addEventListener("click", package.openDropdown);
option.forEach (function (element) {
  element.addEventListener("click", package.handle)
});
