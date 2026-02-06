let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let total = document.querySelector("#total");
let discount = document.querySelector("#discount");
let ads = document.querySelector("#ads");
let category = document.querySelector("#category");
let count = document.querySelector("#count");
let submit = document.querySelector("#submit");

let mood = "create";

//getTotal
function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;

    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "rgba(230, 0, 0, 0.877)";
  }
}

//create product
let arrayProduct;
//localstorage
if (localStorage.product != null) {
  arrayProduct = JSON.parse(localStorage.product);
} else {
  arrayProduct = [];
}

submit.onclick = function () {
  let newObject = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value != "" && category.value != "" && newObject.count <= 100) {
    if (mood === "create") {
      if (newObject.count > 1) {
        for (let i = 0; i < newObject.count; i++) {
          arrayProduct.push(newObject);
        }
      } else {
        arrayProduct.push(newObject);
      }
      clear();
    } else {
      arrayProduct[temp] = newObject;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
  }

  localStorage.setItem("product", JSON.stringify(arrayProduct));

  ShowData();
};

//clear inputs
function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
ShowData();

//read data
function ShowData() {
  getTotal();
  let table = [];
  for (let i = 0; i < arrayProduct.length; i++) {
    table += `<tr>
              <td>${i + 1}</td>
              <td>${arrayProduct[i].title}</td>
              <td>${arrayProduct[i].price}</td>
              <td>${arrayProduct[i].taxes}</td>
              <td>${arrayProduct[i].ads}</td>
              <td>${arrayProduct[i].discount}</td>
              <th>${arrayProduct[i].total}</th>
              <td>${arrayProduct[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">Update</button></td>
              <td><button onclick ="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let BtnDelete = document.querySelector("#deleteAll");
  if (arrayProduct.length > 0) {
    BtnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${arrayProduct.length})</button>`;
  } else {
    BtnDelete.innerHTML = "";
  }
}
ShowData();

//delete data
function deleteProduct(i) {
  arrayProduct.splice(i, 1);
  localStorage.product = JSON.stringify(arrayProduct);
  ShowData();
}

//deleteAll
function deleteAll() {
  localStorage.clear();
  arrayProduct.splice(0);
  ShowData();
}

//update
function updateData(i) {
  title.value = arrayProduct[i].title;
  price.value = arrayProduct[i].price;
  taxes.value = arrayProduct[i].taxes;
  ads.value = arrayProduct[i].ads;
  discount.value = arrayProduct[i].discount;
  category.value = arrayProduct[i].category;
  submit.innerHTML = "Update";
  mood = "Update";
  temp = i;
  getTotal();
  count.style.display = "none";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//searchMood
let searchMood = "title";

function getSearchMode(id) {
  let search = document.querySelector("#search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "search by " + searchMood;
  search.focus();
  search.value = "";
  ShowData();
}

//search
function search(value) {
  let table = "";
  for (let i = 0; i < arrayProduct.length; i++) {
    if (searchMood == "title") {
      if (arrayProduct[i].title.includes(value.toLowerCase())) {
        table += `<tr>
              <td>${i}</td>
              <td>${arrayProduct[i].title}</td>
              <td>${arrayProduct[i].price}</td>
              <td>${arrayProduct[i].taxes}</td>
              <td>${arrayProduct[i].ads}</td>
              <td>${arrayProduct[i].discount}</td>
              <th>${arrayProduct[i].total}</th>
              <td>${arrayProduct[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">Update</button></td>
              <td><button onclick ="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>`;
      }
    } else {
      if (arrayProduct[i].category.includes(value.toLowerCase())) {
        table += `<tr>
              <td>${i}</td>
              <td>${arrayProduct[i].title}</td>
              <td>${arrayProduct[i].price}</td>
              <td>${arrayProduct[i].taxes}</td>
              <td>${arrayProduct[i].ads}</td>
              <td>${arrayProduct[i].discount}</td>
              <th>${arrayProduct[i].total}</th>
              <td>${arrayProduct[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">Update</button></td>
              <td><button onclick ="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>`;
      }
    }
  }
  document.querySelector("#tbody").innerHTML = table;
}
