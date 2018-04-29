
const firstname = document.getElementById("first_name");
const lastname = document.getElementById("last_name");
const tel = document.getElementById("tel");
const submitBtn = document.getElementById("submit-btn");
const resultsList = document.querySelector(".results");

//Обьект для хранения информации юзера
const userData = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  validation: false
}

//Проверка на валидацию формы
const firstNameLat = /^([^\d\s\-\_]+[a-z]\s)?([^\d\s\-\_]+[a-z]\s)?([^\d\s\-\_]+[a-z])$/i;
const lastNameLat = /^([^\d\s\-\_]+[a-z])\s?-?\s?([^\d\s\-\_]+[a-z])$/i;
const regNum = /^\+[\d(\)\ -]{11}\d$/;

//Функция валидации
const validate = event => {
  event.preventDefault();
  //Проверка на заполненные поля
  if(firstname.value && lastname.value && tel.value){
    //Проверка на валидацию формы и присвоение значения переменным
    let name = firstNameLat.test(firstname.value);
    let last = lastNameLat.test(lastname.value);
    let phone = regNum.test(tel.value);
    let arr = []; //Массив агрументов true false по результатам проверки
    arr.push(name, last, phone);
    showResults(arr);

    //Если все три поля заполнены правильно, записываем значения в обьект userData
    if(name && last && phone){
       userData.firstName = firstname.value;
       userData.lastName = lastname.value;
       userData.phoneNumber = tel.value.replace(/[\s-]g/, '').replace('/^(\+{1}\d{3})(\d{2})(\d{2})(\d{2})(\d{3})$/, $1 $2 $3 $4 $5');
       userData.validation = true; // Присваеваем значение о прохождении валидации
       console.log(userData)
    } 
  }
    //Заполните все поля
    else{
      resultsList.insertAdjacentHTML('beforeEnd', `<li class = "errors">Put in all rows plz</li>`);
    } 
}

//Функция вывода результата на экран
const showResults = results => {
  results.forEach(function(i){ //Проверяем массив на значения true false
    if(i){
      resultsList.insertAdjacentHTML('beforeEnd', `<li class="success">SUCCESS: passed validation</li>`); // true
    } else {
      resultsList.insertAdjacentHTML('beforeEnd', `<li class="error">ERROR: failed validation</li>`); // false
    } 
  }); 
}

// Кнопка и событие клин по кнопке
submitBtn.addEventListener("click", validate); 

