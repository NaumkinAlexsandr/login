const buttom = document.getElementById('buttom_login');
const getMask = document.getElementById('mask');
const form = buttom.parentElement.attributes[0].value;

window.onload = function () {
  buttom.addEventListener('click', function (event) {
    event.preventDefault();
    getMask.style.display = 'flex';
    setTimeout(() => (window.location = form), 3000);
  });
};
const email = document.querySelector('.email').value;
console.log(email);

function myFunction() {
  const pass = document.querySelector('.email').value;
  console.log(pass);
}

function myFunctionPass() {
  console.log(document.querySelector('.pass').value);
}
