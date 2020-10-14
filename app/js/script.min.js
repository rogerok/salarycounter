window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const btn = document.querySelector('.add-btn');
  const salaryBlock = document.querySelector('.salary');
  
  function firstRender() {
    const archive  = allStorage();
    
    for (let [sum, date] of Object.entries(archive)) {
      renderRow(date, sum);
    }
  }
  
  
  firstRender();

  function setSalary(sum, date) {
    if (sum.match(/\d/g)) {
      localStorage.setItem(date, sum.toString());
    } else {
       alert('Введите число');
       return;
      
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
  
 function allStorage() {

    var archive = {},
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        archive[ keys[i] ] = localStorage.getItem( keys[i] );
    }
    return archive;
}
  
  

    
  function getSum(date) {
    const sum = prompt('Введите сумму').replace(/\s/g, '');
    
    if (sum.match(/\D/g) || sum === '') {
      alert('Введите число');
    } else {
      localStorage.setItem(date, sum.toString().trim());
      return sum;
    }
    
  }
  

  function totalSalary() {
    
    const totalSalaryArr = [];

    document.querySelectorAll('.salary__sum').forEach(item => totalSalaryArr.push(+item.textContent));
    document.querySelector('.salary-total').textContent =`Итого: ${totalSalaryArr.reduce((sum, item) => sum + item)}` ;
      
    }

  btn.addEventListener('click', () => {
    const today = new Date();
    const date = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()} ` + 
          `${today.getHours()}:${today.getMinutes()}`;
    const sum = getSum(date);
    
    setSalary(sum, date);
    renderRow(sum, date);
    totalSalary();
});


const fakeObj = {'1601853284000': '1', '1602026084000': '2', '1591485284000': '3', '1591571684000': '4'};  
const dates = Object.keys(fakeObj).map(item => new Date(item).getMonth()).sort();
console.log(dates);

localStorage.setItem(Date.now(), sum);


const matchedMonths = [];

for (let i; i < dates.length; i++) {
  if(new Date(dates[i]).getMonth() === new Date(dates[i++]).getMonth) {
    matchedMonths.push();
  }
}

const newArr = dates.map(key, index => {
  if(index !== 0) {
    isPrevMonthEqual(key, dates[index - 1]);
  }
});



console.log(newArr);

});