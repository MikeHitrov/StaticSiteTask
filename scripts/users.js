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

const updateDatabase = (database) => {
  localStorage.setItem("database", database);
};

const getDatabase = () => {
  return JSON.parse(localStorage.getItem("database"));
};

const getUsers = () => {
  return JSON.parse(localStorage.getItem("database")).users;
};

if (!getDatabase()) {
  updateDatabase(database);
}

let tableBody = document
  .getElementById("usersTable")
  .getElementsByTagName("tbody")[0];

let form = document.getElementById("form");

const validators = [];

const registerValidator = (validator) => {
  validators.push(validator);
};

const validateUserDetails = (form) => {
  return validators.every((validator) => validator && validator(form));
};

const nameRegex = /[A-za-z ]{1,30}/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const addressRegex = /\w{1,300}/;

const nameValidator = (form) => {
  let name = form.name.value;
  let nameError = document.getElementById("nameError");

  if (!nameRegex.test(name)) {
    nameError.style.display = "block";
  } else {
    nameError.style.display = "none";
  }

  return nameRegex.test(name);
};

const emailValidator = (form) => {
  let email = form.email.value;
  let emailError = document.getElementById("emailError");

  if (!emailRegex.test(email)) {
    emailError.style.display = "block";
  } else {
    emailError.style.display = "none";
  }

  return emailRegex.test(email);
};

const ageValidator = (form) => {
  let age = form.age.value;
  let ageError = document.getElementById("ageError");

  if (age < 0 || age > 150 || age.toString() === "") {
    ageError.style.display = "block";
  } else {
    ageError.style.display = "none";
  }

  return age > 0 || age < 150 || age.toString() !== "";
};

const addressValidator = (form) => {
  let address = form.address.value;
  let addressError = document.getElementById("addressError");

  if (!addressRegex.test(address)) {
    addressError.style.display = "block";
  } else {
    addressError.style.display = "none";
  }

  return addressRegex.test(address);
};

registerValidator(nameValidator);
registerValidator(emailValidator);
registerValidator(ageValidator);
registerValidator(addressValidator);

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
  editButton.name = "editButton";
  editButton.id = sanitize(user.id);

  deleteButton.innerHTML = "Delete";
  deleteButton.className = "button";
  deleteButton.name = "deleteButton";
  deleteButton.id = sanitize(user.id);

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
  if (
    event.target.name !== "editButton" &&
    event.target.name !== "deleteButton"
  ) {
    return;
  }

  let userId = event.target.id;
  let user = getUsers().find((u) => u.id === userId);

  if (event.target.name == "editButton") {
    loadUserToForm(user);
  } else if (event.target.name == "deleteButton") {
    deleteUser(user);
  }
};

const addUserToJSON = (user) => {
  let users = getUsers();
  users.push(user);
  updateDatabase(
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

  if (!validateUserDetails(ev.target)) {
    validateUserDetails(ev.target);
  } else {
    let user = {
      id: id || newUserId,
      name,
      email,
      age,
      address,
    };

    resetForm(ev);

    if (id) {
      editUser(user);
    } else {
      addUserToTable(user);
      addUserToJSON(user);
    }
  }
});

form.addEventListener("reset", (ev) => {
  ev.preventDefault();
  resetForm(ev);
});

const resetForm = (ev) => {
  let id = ev.target.id;
  let name = ev.target.name;
  let email = ev.target.email;
  let age = ev.target.age;
  let address = ev.target.address;

  let nameError = document.getElementById("nameError");
  let emailError = document.getElementById("emailError");
  let ageError = document.getElementById("ageError");
  let addressError = document.getElementById("addressError");

  nameError.style.display = "none";
  emailError.style.display = "none";
  ageError.style.display = "none";
  addressError.style.display = "none";

  name.value = "";
  email.value = "";
  age.value = "";
  address.value = "";
  id.value = "";
};

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
  let users = getUsers();
  let userRow = document.getElementById(user.id).children;

  let userIndex = users.findIndex((u) => {
    return user.id === u.id;
  });

  if (userIndex > -1) {
    users[userIndex] = user;
    updateDatabase(
      JSON.stringify({
        ...getDatabase(),
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
    updateDatabase(
      JSON.stringify({
        ...getDatabase(),
        users,
      })
    );
  }
};
