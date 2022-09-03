(() => {
  const productsContainer = document.getElementById("products-container");
  const productForm = document.getElementById("product-form");
  const productSubmit = document.getElementById("product-submit");

  class Product {
    constructor({ id, name, description, price }) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
    }

    append() {
      const productContainer = document.createElement("div");
      productContainer.classList.add("product-container");
      productContainer.setAttribute("data-id", this.id);

      const removeButton = document.createElement("div");
      removeButton.classList.add("btn-remove");
      removeButton.append(
        document.createElement("div"),
        document.createElement("div")
      );
      removeButton.onclick = removeProduct;

      const productAttributes = document.createElement("div");
      productAttributes.classList.add("product-attributes");

      const name = document.createElement("p");
      name.innerText = `Name: ${this.name}`;
      name.classList.add("product-name");

      const description = document.createElement("p");
      description.innerText = `Description: ${this.description}`;
      description.classList.add("product-description");

      const price = document.createElement("p");
      price.innerText = `Price: ${this.price}`;
      price.classList.add("product-price");

      productAttributes.append(name, description, price);

      productContainer.append(removeButton, productAttributes);
      productsContainer.appendChild(productContainer);
    }
  }

  productSubmit.addEventListener("click", async () => {
    const productData = new FormData(productForm);
    const productObject = {};
    productObject["name"] = productData.get("name");
    productObject["description"] = productData.get("description");
    productObject["price"] = productData.get("price");
    const result = await fetch("http://127.0.0.1:8080/api/products", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productObject),
    })
      .then((resp) => resp.json())
      .then((json) => displayProducts(json.data));
  });

  fetch("http://127.0.0.1:8080/api/products")
    .then((resp) => resp.json())
    .then((json) => displayProducts(json.data));

  function displayProducts(products) {
    for (d of products) {
      const product = new Product(d);
      product.append();
    }
  }

  function removeProduct(e) {
    const target = e.target.classList.contains("btn-remove")
      ? e.target
      : e.target.parentElement;
    const container = target.parentElement;
    const id = container.getAttribute("data-id");
    const url = `http://127.0.0.1:8080/api/products/${id}`;
    fetch(url, {
      method: "DELETE",
    }).then(() => {
      container.classList.add("fading-out");
      setTimeout(() => {
        container.remove();
      }, 490);
    });
  }
})();
