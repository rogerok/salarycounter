window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const btn = document.querySelector('.add-btn');
  const salaryBlock = document.querySelector('.salary');
  const today = new Date();
  const date = `${today.getDate()} - ${today.getMonth() + 1} - ${today.getFullYear()} ` + 
               `${today.getHours()} : ${today.getMinutes()}`;




  function setSalary(sum) {
    if (sum.match(/\d/g)) {
      localStorage.setItem(date, sum.toString());
        renderRow(sum);
    } else {
      alert('Введите число');
    }

  }

  function renderRow(sum, date) {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="salary__row">
        <data class="salary__col-sm salary__data">${date}</data>
        <p class="salary__col-lg salary__sum">${sum}</p>
      </div>
    `;
    salaryBlock.append(div);
  }


  btn.addEventListener('click', () => {

    let sum = prompt('Введите сумму');
    setSalary(sum);
    getValues();
    /* console.log(JSON.stringify(localStorage)); */
  });

function getValues() {
  for (const [date, sum] of Object.entries(localStorage)) {
    return {
      date: date,
      sum: sum
    };
  }
}

const sums = getValues();
console.log(sums);
  
});