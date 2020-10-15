window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const btn = document.querySelector('.add-btn');
  const salaryBlock = document.querySelector('.salary');
  
  function getDate() {
    const today = new Date();
    const date = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()} ` + 
          `${today.getHours()}:${today.getMinutes()}`;
    return date;
  }

  function getSorteredLocalStorage() {

    let archive = {},
        keys = Object.keys(localStorage).sort(),
        i = keys.length;

    while ( i-- ) {
        archive[ keys[i] ] = localStorage.getItem( keys[i] );
    }
    return archive;
}


  function renderSalariesTable() {
     const archive  = getSorteredLocalStorage(); 

    for (let [sum, date] of Object.entries(archive)) {
      addSalaryToTable(date, sum);
    }
  }
  
  renderSalariesTable();
  countAndRenderTotalSalary();




  
  
/*   function setSalary(sum, date) {
    if (sum.match(/\d/g)) {
      localStorage.setItem(date, sum.toString());
    } else {
       alert('Введите число');
       return;
      
    }

  }
    
  function setSalaryToLocalStorage(date) {
    const sum = prompt('Введите сумму').replace(/\s/g, '');
    
    if (sum.match(/\D/g) || sum === '') {
      alert('Введите число');
    } else {
      localStorage.setItem(date, sum.toString().trim());
      return sum;
    }
    
  } */
  
  function setSalaryToLocalStorage(date) {
    const sum = prompt('Введите сумму').replace(/\s/g, '');
    
    if (sum.match(/\d/g)) {
      localStorage.setItem(date, sum.toString());
      return sum;
    } else {
       alert('Введите число');
       return;
    }
  }

  function addSalaryToTable(sum, date) {
    const div = document.createElement('div');

    div.innerHTML = `
      <div class="salary__row">
        <data class="salary__col-sm salary__date">${date}</data>
        <p class="salary__col-lg salary__sum">${sum}</p>
      </div>
    `;

    salaryBlock.append(div);
  }

  function countAndRenderTotalSalary() {
    const totalSalaryArr = [];

    document.querySelectorAll('.salary__sum').forEach(item => totalSalaryArr.push(+item.textContent));
    document.querySelector('.salary-total').textContent =`Итого: ${totalSalaryArr.reduce((sum, item) => sum + item)}`;
  }



  btn.addEventListener('click', () => {
    const date = getDate();
    const sum = setSalaryToLocalStorage(date);
    
    /* setSalary(sum, date); */
    if ((sum.match(/\d/g))) {addSalaryToTable(sum, date);}
    countAndRenderTotalSalary();
});

function highliteSalary() {
  const allSalaryRows = document.querySelectorAll('.salary__row');

  allSalaryRows.forEach(item => {
    item.addEventListener('click', (e) => {
      const target = e.target;
  
      if (target.classList.contains('salary__sum')) {
        e.target.closest('.salary__row').classList.toggle('salary__row_choosed');
        getSumOfHighlitedSalary();
      }
    });

  });

}

highliteSalary();

function getSumOfHighlitedSalary() {
  const highlitedSalary = document.querySelectorAll('.salary__row_choosed .salary__sum');
  let sumOfHighlitedSalary = 0;

  highlitedSalary.forEach(item => {
    sumOfHighlitedSalary += parseInt(item.innerHTML, 10);
  });
  console.log(sumOfHighlitedSalary);

  return sumOfHighlitedSalary;
  
}

getSumOfHighlitedSalary();

function activateShowSumButton() {
  if (document.querySelectorAll('.salary-row_choosed')) {
    document.querySelector('.btn_disabled').classList.remove('btn_disabled');
  }
}

activateShowSumButton();

});