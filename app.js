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


// =============================
// 2 - Populate data and methods
const modalObj = {
  toggleModal(){
    modal.classList.toggle('active')
  }
}

// content object
const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    id: 2,
    description: 'Agua',
    amount: -20000,
    date: '23/01/2021'
  },
  {
    id: 3,
    description: 'Website',
    amount: 80012,
    date: '24/01/2021'
  },
]

// content methods
const transactionObj = {
  all: transactions,
  add(transaction) {
    this.all.push(transaction)
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
    tr.innerHTML = this.innerHTMLTransaction(transaction)
    this.transactionContainer.appendChild(tr)
  },
  // content to tr
  innerHTMLTransaction(transaction) {
    const cssClass = transaction.amount > 0 ? 'income' : 'expense'
    const amount = utils.formatCurrency(transaction.amount)
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${cssClass}">R$ ${amount}</td>
      <td class="date">${transaction.date}</td>
      <td id=${transaction.id}>
        <img src="./assets/minus.svg" alt="Remover transação">
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
  }
}


// =============================
// 5 - Initialze app
const app = {
  init() {
    transactionObj.all.forEach(transaction => {
      renderDom.addTransaction(transaction)
    })
    renderDom.updateBalance()
  },
  reaload() {
    renderDom.clearTransactions()
    app.init()
  }
}
app.init()


// add transactions
transactionObj.add({
  id: 9,
  description: 'teste',
  amount: 200,
  date: '31/01/2021'
})


// =============================
// 3- Event Listeners
buttonNewTrasaction.addEventListener('click', () => {
  modalObj.toggleModal();
})

buttonCancel.addEventListener('click', () => {
  modalObj.toggleModal()
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
})