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

if (!localStorage.getItem("database")) {
  localStorage.setItem("database", database);
}

let tableBody = document
  .getElementById("usersTable")
  .getElementsByTagName("tbody")[0];

let form = document.getElementById("form");

const nameRegex = /[A-za-z ]{1,30}/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const addressRegex = /\w{1,300}/;

const getDatabase = () => {
  return JSON.parse(localStorage.getItem("database"));
};

const getUsers = () => {
  return JSON.parse(localStorage.getItem("database")).users;
};

const sanitize = (string) => {
  return string
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
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
  editButton.className = "button";
  editButton.id = "editButton";

  deleteButton.innerHTML = "Delete";
  deleteButton.className = "button";
  deleteButton.id = "deleteButton";

  editTd.appendChild(editButton);
  deleteTd.appendChild(deleteButton);

  idTd.innerHTML = sanitize(user.id);
  nameTd.innerHTML = sanitize(user.name);
  emailTd.innerHTML = sanitize(user.email);
  ageTd.innerHTML = sanitize(user.age.toString());
  addressTd.innerHTML = sanitize(user.address);

  tableRow.appendChild(idTd);
  tableRow.appendChild(nameTd);
  tableRow.appendChild(emailTd);
  tableRow.appendChild(ageTd);
  tableRow.appendChild(addressTd);
  tableRow.appendChild(editTd);
  tableRow.appendChild(deleteTd);

  tableRow.id = user.id;

  tableBody.appendChild(tableRow);
};

getUsers().forEach((usersObj) => {
  addUserToTable(usersObj);
});

document.getElementById("usersTable").onclick = (event) => {
  if (event.target.id !== "editButton" && event.target.id !== "deleteButton") {
    return;
  }

  let userId = event.target.parentElement.parentElement.children[0].innerHTML;
  let user = getUsers().find((u) => u.id === userId);

  if (event.target.id == "editButton") {
    loadUserToForm(user);
  } else if (event.target.id == "deleteButton") {
    console.log(1);
    deleteUser(user);
  }
};

const addUserToJSON = (user) => {
  let users = getUsers();
  users.push(user);
  localStorage.setItem(
    "database",
    JSON.stringify({
      ...getDatabase(),
      users,
    })
  );
};

form.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let id = ev.target.id.value;

  let newUserId = (Math.random() * 10)
    .toString()
    .replace(".", "")
    .substr(0, 10);
  let name = ev.target.name.value;
  let email = ev.target.email.value;
  let age = ev.target.age.value;
  let address = ev.target.address.value;

  let nameError = document.getElementById("nameError");
  let emailError = document.getElementById("emailError");
  let ageError = document.getElementById("ageError");
  let addressError = document.getElementById("addressError");

  if (
    !nameRegex.test(name) ||
    !emailRegex.test(email) ||
    age < 0 ||
    age > 150 ||
    !addressRegex.test(address)
  ) {
    if (!nameRegex.test(name)) {
      nameError.innerHTML =
        "Name should be between 1-30 characters, uppercase and lowercase letters and space are allowed.";
    } else {
      nameError.innerHTML = "";
    }
    if (!emailRegex.test(email)) {
      emailError.innerHTML = "Email should be valid.";
    } else{
      emailError.innerHTML = "";
    }
    if (age < 0 || age > 150 || age.toString() === "") {
      ageError.innerHTML = "Age should be between 0-150.";
    } else{
      ageError.innerHTML = "";
    }
    if (!addressRegex.test(address)) {
      addressError.innerHTML =
        "Address should be betweeen 1-300 characters and uppercase, lowercase, numbers, space are allowed.";
    }else{
      addressError.innerHTML = "";
    }
  } else {
    nameError.innerHTML = "";
    emailError.innerHTML = "";
    ageError.innerHTML = "";
    addressError.innerHTML = "";

    let user = {
      id: id || newUserId,
      name,
      email,
      age,
      address,
    };

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

  form.id.value = sanitize(userData.id);
  form.name.value = sanitize(userData.name);
  form.email.value = sanitize(userData.email);
  form.age.value = sanitize(userData.age.toString());
  form.address.value = sanitize(userData.address);

  form.scrollIntoView();
};

const editUser = (user) => {
  let database = getDatabase();
  let users = getUsers();
  let userRow = document.getElementById(user.id).children;

  let userIndex = users.findIndex((u) => {
    return user.id === u.id;
  });

  if (userIndex > -1) {
    users[userIndex] = user;
    localStorage.setItem(
      "database",
      JSON.stringify({
        ...database,
        users,
      })
    );

    userRow[1].innerHTML = sanitize(user.name);
    userRow[2].innerHTML = sanitize(user.email);
    userRow[3].innerHTML = sanitize(user.age.toString());
    userRow[4].innerHTML = sanitize(user.address);
  } else {
    alert("No user found.");
  }
};

const deleteUser = (user) => {
  let deleteModal = confirm(`Do you want to delete user ${user.name}?`);

  if (deleteModal) {
    tableBody.removeChild(document.getElementById(user.id));

    let users = getUsers().filter((u) => u.id !== user.id);
    localStorage.setItem(
      "database",
      JSON.stringify({
        ...getDatabase(),
        users,
      })
    );
  }
};
