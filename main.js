const billAmount = document.querySelector(".bill-input");
const numberOfPeople = document.querySelector(".people-input");
const tipPercentage = document.getElementById("tip-amount");
const tipPerPersonAmount = document.getElementById("total-amount");
const tips = document.querySelectorAll(".tips");
const tipsCustom = document.querySelector(".tip-custom");
const resetBtn = document.querySelector(".reset");
const error = document.querySelector(".error");

billAmount.addEventListener("input", billAmountFun);
numberOfPeople.addEventListener("input", numberOfPeopleFun);
tips.forEach(function (val) {
  val.addEventListener("click", handleClick);
});

tipsCustom.addEventListener("input", tipInputFun);
resetBtn.addEventListener("click", reset);

billAmount.value = "0.0";
numberOfPeople.value = "1";
tipPercentage.innerText = "$" + (0.0).toFixed(2);
tipPerPersonAmount.innerText = "$" + (0.0).toFixed(2);

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15;

function billAmountFun() {
  billValue = parseFloat(billAmount.value);
  calculateTip();
}

function numberOfPeopleFun() {
  peopleValue = parseFloat(numberOfPeople.value);

  if (peopleValue < 1) {
    error.style.display = "flex";
    numberOfPeople.style.border = "thick solid red";
  } else {
    error.style.display = "none";
    numberOfPeople.style.border = "none";
    calculateTip();
  }
}
function handleClick(event) {
  tips.forEach(function (val) {
    val.classList.remove("active-tip");
    if (event.target.innerHTML == val.innerHTML) {
      val.classList.add("active-tip");
      tipValue = parseFloat(val.innerHTML) / 100;
    }
  });
  calculateTip();
}

function tipInputFun() {
  tipValue = parseFloat(tipsCustom.value) / 100;

  tips.forEach(function (val) {
    val.classList.remove("active-tip");
  });
  calculateTip();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue + tipAmount) / peopleValue;
    tipPercentage.innerHTML = "$" + tipAmount.toFixed(2);
    tipPerPersonAmount.innerHTML = "$" + total.toFixed(2);
  }
}

function reset() {
  billAmount.value = "0.0";
  billAmountFun();
  numberOfPeople.value = "1";
  numberOfPeopleFun();
  tipsCustom.value = "";
}
