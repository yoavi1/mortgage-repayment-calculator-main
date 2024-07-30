const mortagageAmount = document.querySelector('#Mortgage-Amount');
const mortgageTerm = document.querySelector('#Mortgage-Term');
const interestRate = document.querySelector('#Interest-Rate');
const numberPaymentsPerYear = 12;

// const repaymentRadioOption = document.querySelector('#repayment-option');
// const interestOnlyRadioOption = document.querySelector('#interest-only-option');
const radioOptionsElement = document.querySelectorAll(
  'input[name="radio-options"]'
);
// console.log(mortagageAmount);
const btn = document.querySelector('#btn');
// const calcBtn = document.querySelector('.calculator-btn');

btn.addEventListener('click', calculate);

function calculate(event) {
  event.preventDefault();

  // console.log(CheckedRadioOption());

  if (!CheckedRadioOption()) {
    return;
  }
  const mortagageAmountValue = Number(mortagageAmount.value);
  const mortgageTermValue = Number(mortgageTerm.value);
  const interestRateValue = Number(interestRate.value) / 100;
  const monthlyRepayment = calculateMonthlyRepayment(
    mortagageAmountValue,
    mortgageTermValue,
    interestRateValue
  );
  const totalRepayment = calculateTotalRepayment(
    monthlyRepayment,
    mortgageTermValue
  );
  const MonthlyInterestOnlyRepayment = calculateMonthlyInterestOnlyRepayment(
    mortagageAmountValue,
    interestRateValue
  );
  const TotalInterestOnlyRepayment = calculateTotalInterestOnlyRepayment(
    mortagageAmountValue,
    interestRateValue,
    mortgageTermValue
  );
  // .result-side-complete
  const resultSide = document.querySelector('.result-side');
  const resultEmpty = document.querySelector('#not-complited');
  const resultCompleted = document.querySelector('#complited');
  const montlhyRepaymentValueElem =
    document.querySelector('#montlhy-repayment');
  const totalRepaymentValueElem = document.querySelector('#total-repayment');
  resultEmpty.classList.add('wraper-result-not-empty');
  resultCompleted.classList.remove('wraper-results-not-completed');
  resultSide.classList.remove('result-side-empty');
  resultSide.classList.add('result-side-complete');

  switch (CheckedRadioOption()) {
    case 'repayment':
      montlhyRepaymentValueElem.textContent = Number(
        monthlyRepayment.toFixed(2)
      ).toLocaleString();
      totalRepaymentValueElem.textContent = Number(
        totalRepayment.toFixed(2)
      ).toLocaleString();
      console.log('monthlyRepayment', monthlyRepayment);
      console.log('total repayment', totalRepayment);
      break;
    case 'interest-only':
      console.log(
        'Monthly Interest Only Repayment',
        MonthlyInterestOnlyRepayment
      );
      console.log('Total Interest Only Repayment', TotalInterestOnlyRepayment);
      break;
  }

  // console.log('monthlyRepayment', monthlyRepayment);
  // console.log('total repayment', totalRepayment);
  // console.log('Monthly Interest Only Repayment', MonthlyInterestOnlyRepayment);
  // console.log('Total Interest Only Repayment', TotalInterestOnlyRepayment);
}
function calculateMonthlyRepayment(
  mortagageAmountValue,
  mortgageTermValue,
  interestRateValue
) {
  return (
    (mortagageAmountValue * interestRateValue) /
    numberPaymentsPerYear /
    (1 -
      Math.pow(
        1 + interestRateValue / numberPaymentsPerYear,
        -numberPaymentsPerYear * mortgageTermValue
      ))
  );
}

function calculateTotalRepayment(monthlyRepayment, mortgageTermValue) {
  return monthlyRepayment * numberPaymentsPerYear * mortgageTermValue;
}

function calculateMonthlyInterestOnlyRepayment(
  mortagageAmountValue,
  interestRateValue
) {
  return mortagageAmountValue * (interestRateValue / numberPaymentsPerYear);
}

function calculateTotalInterestOnlyRepayment(
  mortagageAmountValue,
  interestRateValue,
  mortgageTermValue
) {
  return mortagageAmountValue * interestRateValue * mortgageTermValue;
}

//return the radio option that checked by the user if  the user didnt
//checked any option return null.
function CheckedRadioOption() {
  let choise;
  radioOptionsElement.forEach((option) => {
    if (option.checked) {
      choise = option.value;
      return;
    }
  });
  return choise;
  // return null;
}

function isValidForm(params) {}
// M is the monthly mortgage payment.
// 𝑃
// P is the principal loan amount.
// 𝑟
// r is the annual interest rate (in decimal form; e.g., 5% is 0.05).
// 𝑛
// n is the number of payments per year (12 for monthly payments).
// 𝑡
// t is the loan term in years.
