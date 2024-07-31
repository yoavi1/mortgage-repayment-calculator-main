const mortagageAmount = document.querySelector('#Mortgage-Amount');
const mortgageTerm = document.querySelector('#Mortgage-Term');
const interestRate = document.querySelector('#Interest-Rate');
const numberPaymentsPerYear = 12;

const radioOptionsElement = document.querySelectorAll(
  'input[name="radio-options"]'
);
const btn = document.querySelector('#btn');

btn.addEventListener('click', calculate);

function calculate(event) {
  event.preventDefault();

  if (!CheckedRadioOption()) {
    return;
  }
  if (!isValidForm(mortagageAmount, mortgageTerm, interestRate)) {
    validationError();
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
