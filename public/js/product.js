// mobile navigation
function productPage() {
  document
    .querySelector(".sidebar-action-btn")
    .addEventListener("click", () => {
      document.querySelector(".product-grid").classList.toggle("sidebar-open");
    });
}
productPage();

// to get categories
function getCategoryList() {
  fetch("https://shopping-cart-barkat.netlify.app/categories")
    .then((res) => res.json())
    .then((res) => {
      let sideBarList = document.querySelector(".sideBarList");
      for (let index = 0; index < res.length; index++) {
        const li = document.createElement("li");
        li.className = "side-nav-item active";
        li.innerHTML = `<a href="javascript:void(0)" onclick="filterProduct('${res[index].id}')" >${res[index].name}</a>`;
        sideBarList.appendChild(li);
      }
      getProductList();
    })
    .catch((err) => {
      console.log(err);
    });
}

getCategoryList();

// to get product list
let allProducts = [];
function getProductList() {
  fetch("https://shopping-cart-barkat.netlify.app/products")
    .then((res) => res.json())
    .then((res) => {
      allProducts = res;
      filterProduct();
    })
    .catch((err) => {
      console.log(err);
    });
}

function filterProduct(id = "") {
  let productList = [];
  if (id === "") {
    productList = allProducts;
  } else {
    productList = allProducts.filter((list) => list.category === id);
  }
  let productListNode = document.querySelector(".product-list");
  productListNode.innerHTML = "";
  if (productList.length) {
    if (productListNode.className.includes("no-data-found")) {
      productListNode.classList.remove("no-data-found");
    }
    productList.forEach((element) => {
      let item = document.createElement("div");
      item.className = "product-card-item";
      item.innerHTML = `<h3 class="card-item-head-text">${element.name}</h3>
      <img
        class="cart-item-img"
        src="${element.imageURL}"
        alt="${element.name}"
      />
      <p class="product-description">
        ${element.description}
      </p>
      <div class="product-action">
        <p class="product-mrp">MRP Rs. ${element.price}</p>
        <button class="btn btn-buy-now">
          Buy Now <span>@ Rs. ${element.price}</span>
        </button>
      </div>`;
      productListNode.appendChild(item);
    });
  } else {
    productListNode.classList.add("no-data-found");

    let item = document.createElement("div");
    item.innerHTML = "<p>No products available for selected category</p>";
    productListNode.appendChild(item);
  }
}
