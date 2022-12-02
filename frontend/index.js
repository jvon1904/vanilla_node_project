(() => {
  const productsContainer = document.getElementById("products-container");
  const productForm = document.getElementById("product-form");
  const productSubmit = document.getElementById("product-submit");

  document.addEventListener("DOMContentLoaded", () => fetchProducts());

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

      const editButton = document.createElement("div");
      editButton.classList.add("btn-edit", "hidden");
      editButton.append(document.createElement("span"));
      editButton.childNodes[0].innerText = "Edit";
      editButton.onclick = editProduct;

      const productButtonContainer = document.createElement("div");
      productButtonContainer.classList.add("product-button-container");
      productButtonContainer.append(editButton, removeButton);

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

      productContainer.append(productButtonContainer, productAttributes);
      productContainer.onmouseover = (e) => {
        if (e.target.classList.contains("product-container")) {
          const editButton = e.target.childNodes[0].childNodes[0];
          editButton.classList.remove("hidden");
        }
      };
      productContainer.onmouseleave = (e) => {
        if (e.target.classList.contains("product-container")) {
          const editButton = e.target.childNodes[0].childNodes[0];
          editButton.classList.add("hidden");
        }
      };
      productsContainer.prepend(productContainer);
    }
  }

  productSubmit.addEventListener("click", async () => {
    const productData = new FormData(productForm);
    clearForm(productForm);
    const productObject = {};
    productObject["name"] = productData.get("name");
    productObject["description"] = productData.get("description");
    productObject["price"] = productData.get("price");
    createProduct(productObject);
  });

  function fetchProducts() {
    fetch("http://127.0.0.1:8080/api/products")
      .then((resp) => resp.json())
      .then((json) => displayProducts(json.data));
  }

  function displayProducts(products) {
    const productsContainer = document.getElementById("products-container");
    for (d of products) {
      const product = new Product(d);
      product.append();
    }
  }

  async function createProduct(data) {
    const result = await fetch("http://127.0.0.1:8080/api/products", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((json) => displayProducts(json.data));
  }

  function editProduct(e) {
    const target = e.target.classList.contains("btn-edit")
      ? e.target
      : e.target.parentElement;
    const container = target.parentElement.parentElement;
    if (target.childNodes[0].innerText === "Submit") {
      return updateProduct(container);
    }
    target.childNodes[0].innerText = "Submit";
    for (p of container.childNodes[1].childNodes) {
      const attribute = p.classList[0].split("-")[1];
      const value = p.innerText.split(": ")[1];
      const label = document.createElement("label");
      label.innerText = attribute;
      const input = document.createElement("input");
      input.value = value;
      p.innerText = "";
      p.append(label, input);
    }
  }

  async function updateProduct(container) {
    const id = container.getAttribute("data-id");
    const productObject = {};
    for (p of container.childNodes[1].childNodes) {
      const attribute = p.childNodes[0].innerText;
      const value = p.childNodes[1].value;
      productObject[attribute] = value;
    }
    const result = await fetch(`http://127.0.0.1:8080/api/products/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productObject),
    }).then((resp) => {
      productsContainer.innerHTML = "";
      fetchProducts();
    });
  }

  function removeProduct(e) {
    const target = e.target.classList.contains("btn-remove")
      ? e.target
      : e.target.parentElement;
    const container = target.parentElement.parentElement;
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

  function clearForm(form) {
    for (div of form.children[0].children) {
      for (element of div.children) {
        if (element.tagName === "INPUT") {
          element.value = "";
        }
      }
    }
  }
})();
