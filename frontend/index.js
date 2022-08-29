(() => {
  const productsContainer = document.getElementById("products-container");

  fetch("http://127.0.0.1:8080/api/products")
    .then((resp) => resp.json())
    .then((json) => displayProducts(json));

  class Product {
    constructor(id, name, description, price) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
    }

    container() {
      const container = document.createElement("div");
      container.classList.add("product-container");
    }

    draw() {
      return container;
    }
  }

  function displayProducts(json) {
    for (d of json.data) {
      const product = new Product(d.id, d.name, d.description, d.price);

      const productContainer = document.createElement("div");
      productContainer.classList.add("product-container");
      productContainer.setAttribute("data-id", product.id);

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
      name.innerText = `Name: ${product.name}`;
      name.classList.add("product-name");

      const description = document.createElement("p");
      description.innerText = `Description: ${product.description}`;
      description.classList.add("product-description");

      const price = document.createElement("p");
      price.innerText = `Price: ${product.price}`;
      price.classList.add("product-price");

      productAttributes.append(name, description, price);

      productContainer.append(removeButton, productAttributes);
      productsContainer.appendChild(productContainer);
    }
  }

  function removeProduct(e) {
    const target = e.target.classList.contains("btn-remove")
      ? e.target
      : e.target.parentElement;
    const container = target.parentElement;
    const id = container.getAttribute("data-id");
    console.log(id);
    const url = `http://127.0.0.1:8080/api/products/${id}`;
    console.log(url);
    fetch(url, {
      method: "DELETE",
    }).then(() => {
      document.removeChild(container);
    });
  }
})();
