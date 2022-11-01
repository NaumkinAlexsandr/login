document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const form = document.getElementById("profile");
  const language = document.getElementsByClassName("language");
  const passOne = document.querySelector(".passOne");
  const passTwo = document.querySelector(".passTwo");
  const spanError = document.querySelectorAll("span");

  const reqNameOne = /\d/gi;
  const reqNameTwo = /\s/gi;

  const reqAdressOne = /^[a-яё0-9_ -]{3,50}$/;
  const reqAdressTwo = /^[a-яё0-9_ -]{5,50}$/;
  const reqEmail =
    /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/gi;
  const reqEmailTwo = /\w/gi;
  const reqPassword =
    /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;

  const validateElement = (element) => {
    if (element.className === "fullName") {
      if (reqNameOne.test(element.value) && element.value !== "") {
        element.style.border = "3px solid red";
        element.nextElementSibling.textContent =
          "Внимание! В вашем имени присутствует цифра.";
      } else if (!reqNameTwo.test(element.value)) {
        element.style.border = "3px solid red";
        element.nextElementSibling.textContent =
          "Внимание! Вы написали имя и фамилию слитно.";
      } else {
        element.style.border = "2px solid green";
        element.nextElementSibling.textContent = "";
      }
    }

    if (element.className === "address") {
      if (!reqAdressOne.test(element.value) && element.value !== "") {
        element.style.border = "3px solid red";
        element.nextElementSibling.textContent = "Внимание! Вы не ввели адрес.";
      } else if (!reqAdressTwo.test(element.value)) {
        element.style.border = "3px solid red";
        element.nextElementSibling.textContent =
          "Внимание! Ваш адрес очень короткий.";
      } else {
        element.style.border = "2px solid green";
        element.nextElementSibling.textContent = "";
      }
    }

    if (element.className === "e-mail") {
      if (element.value === "") {
        element.style.border = "3px solid red";
        element.nextElementSibling.textContent = "Внимание! Введите email";
      } else if (!reqEmailTwo.test(element.value)) {
        element.style.border = "3px solid red";
        element.nextElementSibling.textContent =
          "Внимание! Email не должен содержать кириллицу.";
      } else if (!reqEmail.test(element.value)) {
        element.style.border = "3px solid red";
        element.nextElementSibling.textContent =
          "Внимание! Email адрес введен некорректно. Email адрес должен содержать . и @ ";
      } else {
        element.style.border = "2px solid green";
        element.nextElementSibling.textContent = "";
      }
    }

    if (element.type === "password") {
      if (!reqPassword.test(passOne.value)) {
        passOne.style.border = "3px solid red";
        passOne.nextElementSibling.textContent =
          "Пароль не надёжный! Минимум 2 заглавные буквы, 3 маленьких, 2 цифры и 1 символ.";
      } else if (passTwo.value === "") {
        passOne.style.border = "3px solid red";
        passTwo.style.border = "3px solid red";
        passTwo.nextElementSibling.textContent = "Внимание! Повторите пароль.";
      } else if (passOne.value !== passTwo.value) {
        passOne.style.border = "3px solid red";
        passTwo.style.border = "3px solid red";
        passOne.nextElementSibling.textContent =
          "Внимание! Пароли не совпадают.";
        passTwo.nextElementSibling.textContent =
          "Внимание! Пароли не совпадают.";
      } else if (passOne.value === passTwo.value) {
        passOne.style.border = "2px solid green";
        passTwo.style.border = "2px solid green";
        passOne.nextElementSibling.textContent = "";
        passTwo.nextElementSibling.textContent = "";
      }
    }
    if (
      language[0].checked === true ||
      language[1].checked === true ||
      language[2].checked === true
    ) {
      language[0].nextElementSibling.textContent = "";
      language[1].nextElementSibling.textContent = "";
      language[2].nextElementSibling.textContent = "";
    } else if (
      language[0].checked !== true ||
      language[1].checked !== true ||
      language[2].checked !== true
    ) {
      language[0].nextElementSibling.textContent =
        "Внимание! Выберите хотя бы один язык.";
      language[1].nextElementSibling.textContent =
        "Внимание! Выберите хотя бы один язык.";
      language[2].nextElementSibling.textContent =
        "Внимание! Выберите хотя бы один язык.";
    }
  };

  for (let element of form.elements) {
    if (
      !element.classList.contains("gender") &&
      !element.classList.contains("born") &&
      !element.classList.contains("email") &&
      element.tagName !== "BUTTON"
    ) {
      element.addEventListener("blur", () => {
        validateElement(element);
      });
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    for (let element of form.elements) {
      if (
        !element.classList.contains("gender") &&
        !element.classList.contains("born") &&
        !element.classList.contains("email") &&
        element.tagName !== "BUTTON"
      ) {
        if (element.value === "") {
          element.nextElementSibling.textContent =
            "Внимание! Поле не заполнено.";
          element.style.border = "3px solid red";
        } else {
          element.nextElementSibling.textContent = "";
          element.style.border = "2px solid green";
        }
      }
    }

    if (
      spanError[0].innerText ||
      spanError[1].innerText ||
      spanError[2].innerText ||
      spanError[3].innerText ||
      spanError[4].innerText ||
      spanError[5].innerText ||
      spanError[6].innerText !== ""
    ) {
      alert("Заполните форму корректно.");
    } else if (passOne.value === passTwo.value) {
      const formData = new FormData(form);

      const formPairs = {};
      for (let [name, value] of formData) {
        if (!formPairs[name]) {
          formPairs[name] = value;
        } else if (Array.isArray(formPairs[name])) {
          formPairs[name].push(value);
        } else {
          formPairs[name] = [formPairs[name]];
          formPairs[name].push(value);
        }
      }

      console.log(formPairs);
    }
  });
});
