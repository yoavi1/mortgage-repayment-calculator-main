const mortagageAmount = document.querySelector('#Mortgage-Amount');
const mortgageTerm = document.querySelector('#Mortgage-Term');
const interestRate = document.querySelector('#Interest-Rate');
// console.log(mortagageAmount);
const btn = document.querySelector('#btn');
// const calcBtn = document.querySelector('.calculator-btn');

btn.addEventListener('click', function (e) {
  e.preventDefault();
  let mortagageAmountValue = Number(mortagageAmount.value);

  console.log(mortagageAmountValue);
});
