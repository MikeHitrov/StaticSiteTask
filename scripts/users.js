let database = `{
    "users": [
        {
            "id": "1234567890",
            "name": "mhitrov",
            "email": "m.hitrov@gmail.com",
            "age": 17,
            "address": "Simeon Veliki street 62, Troyan, Bulgaria"
        },
        {
            "id": "1234567891",
            "name": "mkoparanov",
            "email": "mkoparanov@gmail.com",
            "age": 21,
            "address": "Simeon Veliki street 60, Troyan, Bulgaria"
        },
        {
            "id": "1234567892",
            "name": "vvalkov",
            "email": "vvalkov@gmail.com",
            "age": 24,
            "address": "Vezhen street 28, Troyan, Bulgaria"
        },
        {
            "id": "1234567893",
            "name": "yvalkova",
            "email": "yvalkova@gmail.com",
            "age": 19,
            "address": "Makedonia street 21, Troyan, Bulgaria"
        },
        {
            "id": "1234567894",
            "name": "svelikov",
            "email": "svelikov@gmail.com",
            "age": 20,
            "address": "u tqh"
        }
    ]
}`;

//Using this object as a reference to the table rows.
let trMap = {};

const nameRegex = /[A-za-z]{1,30}/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const addressRegex = /\w{1,300}/;

if (!localStorage.getItem("database")) {
  localStorage.setItem("database", database);
}

let tableBody = document
  .getElementById("usersTable")
  .getElementsByTagName("tbody")[0];

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
  editButton.className = "button";
  editButton.addEventListener("click", () => loadUserToForm(user));

  deleteButton.innerHTML = "Delete";
  deleteButton.className = "button";
  deleteButton.addEventListener("click", () => deleteUser(user));

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

  trMap[user.id] = {
    name: nameTd,
    email: emailTd,
    age: ageTd,
    address: addressTd,
    row: tableRow,
  };
};

const addUserToJSON = (user) => {
  let users = getUsers();
  users.push(user);
  localStorage.setItem("database", JSON.stringify({ getDatabase(), users }));
};

getUsers().then((usersObj) => {
  usersObj.forEach(addUserToTable);
});

let form = document.getElementById("form");

form.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let id = ev.target.id.value;

  let newUserId = (Math.random() * 10).toString().replace(".", "").substr(0, 10);
  let name = ev.target.name.value;
  let email = ev.target.email.value;
  let age = ev.target.age.value;
  let address = ev.target.address.value;

  if (!nameRegex.test(name)) {
    alert(
      "Name should be between 1-30 characters, uppercase and lowercase letters and space are allowed."
    );
  } else if (!emailRegex.test(email)) {
    alert("Email should be valid.");
  } else if (age < 0 || age > 150) {
    alert("Age should be between 0-150.");
  } else if (!addressRegex.test(address)) {
    alert(
      "Address should be betweeen 1-300 characters and uppercase, lowercase, numbers, space are allowed."
    );
  } else {
    let user = { id: id || newUserId, name, email, age, address };

    if (id) {
      editUser(user);
    } else {
      addUserToTable(user);
      addUserToJSON(user);
    }

    form.reset();
  }
});

const loadUserToForm = (user) => {
  //Loads the data from the local storage, because the form doesn't update until the page is refreshed.
  let userData = getUsers().find((u) => u.id === user.id);

  form.id.value = userData.id;
  form.name.value = userData.name;
  form.email.value = userData.email;
  form.age.value = userData.age;
  form.address.value = userData.address;
};

const editUser = (user) => {
  let database = getDb();
  let users = getUsers();

  let userIndex = users.findIndex((u) => {
    return user.id === u.id;
  });

  if (userIndex > -1) {
    users[userIndex] = user;
    localStorage.setItem("database", JSON.stringify({ ...database, users }));
    const userObject = trMap[user.id];

    userObject.name.innerHTML = user.name;
    userObject.email.innerHTML = user.email;
    userObject.age.innerHTML = user.age;
    userObject.address.innerHTML = user.address;
  } else {
    alert("No user found.");
  }
};

const getDatabase = () => {
  return JSON.parse(localStorage.getItem("database"));
}

const getUsers = () => {
  return JSON.parse(localStorage.getItem("database")).users;
};

const deleteUser = (user) => {
  let deleteModal = confirm(`Do you want to delete user ${user.name}?`);

  if (deleteModal) {
    tableBody.removeChild(trMap[user.id].row);

    let users = getUsers().filter((u) => u.id !== user.id);
    localStorage.setItem("database", JSON.stringify({ getDatabase(), users }));
  }
};
