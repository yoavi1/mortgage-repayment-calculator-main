//dom variable
const mortagageAmount = document.querySelector('#Mortgage-Amount');
const mortgageTerm = document.querySelector('#Mortgage-Term');
const interestRate = document.querySelector('#Interest-Rate');
const numberPaymentsPerYear = 12;
const radioOptionsElement = document.querySelectorAll(
  'input[name="radio-options"]'
);
const btn = document.querySelector('#btn');
const resultSide = document.querySelector('.result-side');
const resultEmpty = document.querySelector('#not-complited');
const resultCompleted = document.querySelector('#complited');
const montlhyRepaymentValueElem = document.querySelector('#montlhy-repayment');
const totalRepaymentValueElem = document.querySelector('#total-repayment');

//this event listener call the function calculate when the user click
//on the caclculation button
btn.addEventListener('click', calculate);

//calculation main function
function calculate(event) {
  event.preventDefault();

  //check if the user choose option and entered valid input. if not the functoin stop
  if (!CheckedRadioOption()) {
    return;
  }
  if (!isValidForm(mortagageAmount, mortgageTerm, interestRate)) {
    validationError();
    return;
  }
  //aisne input value from user to variable
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

  //use dom manipulatins  to display the results

  resultEmpty.classList.add('wraper-result-not-empty');
  resultCompleted.classList.remove('wraper-results-not-completed');
  resultSide.classList.remove('result-side-empty');
  resultSide.classList.add('result-side-complete');

  // this switch decide by the user option what is the specific result to display
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
      montlhyRepaymentValueElem.textContent = Number(
        MonthlyInterestOnlyRepayment.toFixed(2)
      ).toLocaleString();
      totalRepaymentValueElem.textContent = Number(
        TotalInterestOnlyRepayment.toFixed(2)
      ).toLocaleString();
      console.log('Total Interest Only Repayment', TotalInterestOnlyRepayment);
      console.log(
        'Monthly Interest Only Repayment',
        MonthlyInterestOnlyRepayment
      );
      break;
  }
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

// check that the user check option if true return the choise
function CheckedRadioOption() {
  let choise;
  radioOptionsElement.forEach((option) => {
    if (option.checked) {
      choise = option.value;
      return;
    }
  });
  return choise;
}

// check if the input is only numbers bigger then zero
function isValidForm(...elems) {
  let flag = true;
  elems.forEach((element) => {
    console.log(element.value);
    if (isNaN(element.value) || Number(element.value) <= 0) {
      flag = false;
      return;
    }
  });

  return flag;
}
// display errors in the page
function validationError() {
  const spansError = document.querySelectorAll('.input-box span');
  const warningDivs = document.querySelectorAll('.error-warning');
  spansError.forEach((span) => {
    span.classList.add('error-colors');

    setTimeout(() => {
      span.classList.remove('error-colors');
      span.classList.add('error-not-display');
    }, 3000);
  });

  warningDivs.forEach((div) => {
    div.classList.remove('error-not-display');
    setTimeout(() => {
      div.classList.add('error-not-display');
    }, 3000);
  });
}
