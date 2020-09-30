var users = `{
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

localStorage.setItem("users", users);

let tableBody = document
  .getElementById("usersTable")
  .getElementsByTagName("tbody")[0];

const getUsers = async () => {
  let usersJSON = localStorage.getItem(users) || users;
  return JSON.parse(usersJSON).users;
};

getUsers().then((usersObj) => {
  usersObj.forEach((user) => {
    let tableRow = document.createElement("tr");

    let idTd = document.createElement("td");
    let nameTd = document.createElement("td");
    let emailTd = document.createElement("td");
    let ageTd = document.createElement("td");
    let addressTd = document.createElement("td");

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

    tableBody.appendChild(tableRow);
  });
});
