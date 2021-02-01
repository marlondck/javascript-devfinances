// =============================
// 1 - select elements
const modal = document.querySelector('.modal-overlay');
const form = document.querySelector('#form');
const buttonNewTrasaction = document.querySelector('.new')
const buttonCancel = document.querySelector('.cancel');
const dataTable = document.querySelector('#data-table tbody')
const displayIncome = document.querySelector('#incomeDisplay')
const displayExpense = document.querySelector('#expenseDisplay')
const displayTotal = document.querySelector('#totalDisplay')
const descritionInput = document.querySelector('input#description')
const amountInput = document.querySelector('input#amount')
const dateInput = document.querySelector('input#date')


// =============================
// 2 - Populate data and methods
const modalObj = {
  toggleModal(){
    modal.classList.toggle('active')
  }
}

// content methods
const transactionObj = {
  all: [
    {
      description: 'Luz',
      amount: -50000,
      date: '23/01/2021'
    },
    {
      description: 'Agua',
      amount: -20000,
      date: '23/01/2021'
    },
    {
      description: 'Website',
      amount: 80012,
      date: '24/01/2021'
    },
  ],
  add(transaction) {
    this.all.push(transaction)
    app.reaload()
  },
  remove(index) {
    this.all.splice(index, 1)
    app.reaload()
  },
  // somar as entradas
  incomes() {
    let income = 0
    this.all.forEach(transaction => {
      if(transaction.amount > 0) {
        income += transaction.amount
      }
    })
    return income
  },
  // somar as saidas
  expenses() {
    let expense = 0
    this.all.forEach(transaction => {
      if(transaction.amount < 0) {
        expense += transaction.amount
      }
    })
    return expense
  },
  // mostrar total (entradas - saidas)
  total() {
    return transactionObj.incomes() + transactionObj.expenses()
  }
}


// =============================
// 4 - Render 
const renderDom = {
  // select tbody
  transactionContainer: dataTable,
  addTransaction(transaction, index) {
    // create tr
    const tr = document.createElement('tr')
    // insert content inner tr
    tr.innerHTML = this.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index
    this.transactionContainer.appendChild(tr)
  },
  // content to tr
  innerHTMLTransaction(transaction, index) {
    const cssClass = transaction.amount > 0 ? 'income' : 'expense'
    const amount = utils.formatCurrency(transaction.amount)
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${cssClass}">R$ ${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img onClick="transactionObj.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
      </td>
    `
    return html
  },
  updateBalance() {
    displayIncome.innerHTML = utils.formatCurrency(transactionObj.incomes())
    displayExpense.innerHTML = utils.formatCurrency(transactionObj.expenses())
    displayTotal.innerHTML = utils.formatCurrency(transactionObj.total())
  },
  clearTransactions() {
    renderDom.transactionContainer.innerHTML = ''
  }
}

// Utils to use 
const utils = {
  // format value pattern brasil
  formatCurrency(value) {
    // get signal
    const signal = Number(value) < 0 ? '-' : ''
    //clean string
    // \D -> Encontre tudo que náo é number
    value = String(value).replace(/\D/g, '')
    // convert 
    value = Number(value) / 100
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return signal + value
  },
  formatAmount(value) {
    value = Number(value) * 100
    // other method
    // value = Number(value.replate(/\,\,/g, ''))
    return value
  },
  formatDate(date) {
    const [year, day, mounth] = date.split('-')
    return `${day}/${mounth}/${year}`
  }
}


// =============================
// 6 - Initialze app
const app = {
  init() {
    transactionObj.all.forEach((transaction, index) => {
      renderDom.addTransaction(transaction, index)
    })
    renderDom.updateBalance()
  },
  reaload() {
    renderDom.clearTransactions()
    app.init()
  }
}
app.init()


// =============================
// 3- Event Listeners
buttonNewTrasaction.addEventListener('click', () => {
  modalObj.toggleModal();
})

buttonCancel.addEventListener('click', () => {
  modalObj.toggleModal()
})

const getValues = () => {
  return {
    description: descritionInput.value,
    amount: amountInput.value,
    date: dateInput.value
  }
}

const formatValues = () => {
  let { description, amount, date } = getValues()
  amount = utils.formatAmount(amount)
  date = utils.formatDate(date)
  return {
    description,
    amount,
    date
  }
}

const validateFields = () => {
  const { description, amount, date } = getValues()

  if(description.trim() === '' || amount.trim() === '' || date.trim === '') {
    throw new Error('Por favor, preencha todos os campos')
  }
}

const saveTransaction = (newTransaction) => {
  transactionObj.add(newTransaction)
}

const clearFields = () => {
  descritionInput.value = '',
  amountInput.value = '',
  dateInput.value = ''
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  try {
    validateFields()
    const newTransaction = formatValues()
    saveTransaction(newTransaction)
    clearFields()
    modalObj.toggleModal();
  } catch (error) {
    alert(error.message)
  }
})


// dataTable.addEventListener("dblclick", event => {
//   event.target.parentNode.classList.add("fadeOut");
//   setTimeout(() => {
//     event.target.parentNode.remove();
//   }, 500);
// });