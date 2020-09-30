let database = `{
    "users": [
        {
            "id": 1234567890,
            "name": "mhitrov",
            "email": "m.hitrov@gmail.com",
            "age": 17,
            "address": "Simeon Veliki street 62, Troyan, Bulgaria"
        },
        {
            "id": 1234567891,
            "name": "mkoparanov",
            "email": "mkoparanov@gmail.com",
            "age": 21,
            "address": "Simeon Veliki street 60, Troyan, Bulgaria"
        },
        {
            "id": 1234567892,
            "name": "vvalkov",
            "email": "vvalkov@gmail.com",
            "age": 24,
            "address": "Vezhen street 28, Troyan, Bulgaria"
        },
        {
            "id": 1234567893,
            "name": "yvalkova",
            "email": "yvalkova@gmail.com",
            "age": 19,
            "address": "Makedonia street 21, Troyan, Bulgaria"
        },
        {
            "id": 1234567894,
            "name": "svelikov",
            "email": "svelikov@gmail.com",
            "age": 20,
            "address": "u tqh"
        }
    ]
}`;

if(!localStorage.getItem('database')){
    localStorage.setItem("database", database);
}

let tableBody = document
  .getElementById("usersTable")
  .getElementsByTagName("tbody")[0];

const getUsers = async () => {
  let usersJSON = localStorage.getItem("database") || database;
  return JSON.parse(usersJSON).users;
};

const addUserToTable = (user) => {
  let tableRow = document.createElement("tr");

  let idTd = document.createElement("td");
  let nameTd = document.createElement("td");
  let emailTd = document.createElement("td");
  let ageTd = document.createElement("td");
  let addressTd = document.createElement("td");
  let editTd = document.createElement("td");
  let deleteTd = document.createElement("td");

  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  editButton.innerHTML = "Edit";
  deleteButton.innerHTML = "Delete";
  editButton.className = "button";
  deleteButton.className = "button";

  editTd.appendChild(editButton);
  deleteTd.appendChild(deleteButton);

  idTd.innerHTML = user.id;
  nameTd.innerHTML = user.name;
  emailTd.innerHTML = user.email;
  ageTd.innerHTML = user.age;
  addressTd.innerHTML = user.address;

  tableRow.appendChild(idTd);
  tableRow.appendChild(nameTd);
  tableRow.appendChild(emailTd);
  tableRow.appendChild(ageTd);
  tableRow.appendChild(addressTd);
  tableRow.appendChild(editTd);
  tableRow.appendChild(deleteTd);

  tableBody.appendChild(tableRow);
};

const addUserToJSON = (user) => {
  let database = JSON.parse(localStorage.getItem("database"));
  let users = database.users;
  users.push(user);
  localStorage.setItem("database", JSON.stringify({ ...database, users }));
};

getUsers().then((usersObj) => {
  usersObj.forEach(addUserToTable);
});

let form = document.getElementById("form");

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  let id = (Math.random() * 10).toString().replace(".", "").substr(0, 10);
  let name = ev.target.name.value;
  let email = ev.target.email.value;
  let age = ev.target.age.value;
  let address = ev.target.address.value;

  let user = { id, name, email, age, address };

  addUserToTable(user);
  addUserToJSON(user);

  form.reset();
});