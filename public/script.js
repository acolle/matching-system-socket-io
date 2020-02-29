let socket;

const form = document.getElementById('form');
const userList = document.getElementById('userList');
const clearButton = document.getElementById('clear-button');
const inputElements = [
  document.getElementsByName('username'),
  document.getElementsByName('p1'),
  document.getElementsByName('p2'),
  document.getElementsByName('p3'),
  document.getElementsByName('p4'),
  document.getElementsByName('r1'),
  document.getElementsByName('r2'),
  document.getElementsByName('r3'),
  document.getElementsByName('r4')
]

// Add Event Listeners
window.addEventListener('load', () => {
  socket = io();

  socket.on('get user list', (users) => {
    userList.innerHTML = "";
    users.forEach((user) => {
      userList.append(addUser(user.username));
    })
  });

  socket.on('update user list', (user) => {
    userList.append(addUser(user.username));
  });

  socket.on('proceed match', ({ user, matchedUser }) => {
    console.log(`${user.username} has been matched with ${matchedUser.username}`);
    // TODO: Implement UI
  });
});
form.addEventListener('submit', submitForm);
clearButton.addEventListener('click', clearForm);

// async function postData(url, data) {
//   const response = await fetch(url, {
//     method: 'POST',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer',
//     body: JSON.stringify(data)
//   });
//   return await response.json();
// }

// Add a new user to the list
function addUser(user) {
  let listnode = document.createElement("LI");
  let divnode = document.createElement("DIV");
  divnode.classList.add('panel-block', 'is-active');
  let spannode = document.createElement("SPAN");
  spannode.classList.add('panel-icon');
  let inode = document.createElement("I");
  inode.classList.add('fas', 'fa-user');
  inode.setAttribute('aria-hidden', 'true');
  spannode.appendChild(inode);
  divnode.appendChild(spannode);
  let textnode = document.createTextNode(user);
  divnode.appendChild(textnode);
  listnode.appendChild(divnode);
  return listnode;
}

// Format input data before sending to server
function formatInputData(data) {
  let formattedData = {}
  data.forEach((node, i) => {
    let name = node[0].name;
    let value = node[0].value;
    formattedData = {
      ...formattedData,
      [name]: value
    }
  });
  return formattedData;
}

function submitForm(event) {
  event.preventDefault();
  const data = formatInputData(inputElements);
  socket.emit('add user', data);
  // clearForm();

  // postData('http://localhost:3000/match', { message: "Hello from the client" })
  // .then((data) => {
  //   console.log(data);
  // });
}

function clearForm() {
  form.reset();
}
