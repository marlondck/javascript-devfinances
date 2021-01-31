// 1 - select elements
const modal = document.querySelector('.modal-overlay');
const form = document.querySelector('#form');
const buttonNewTrasaction = document.querySelector('.new')
const buttonCancel = document.querySelector('.cancel');
const dataTable = document.querySelector('#data-table tbody')


// 2 - Objet with methods
const modalObj = {
  toggleModal(){
    modal.classList.toggle('active')
  }
}

// objet content
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

const transactionObj = {
  // somar as entradas
  incomes() {

  },
  // somar as saidas
  expenses() {
    
  },
  // mostrar total (entradas - saidas)
  total() {}

}


// 4 - Render content in to DOM
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

// 5 for each in objet transictions and to call method render in html
transactions.forEach(transaction => {
  renderDom.addTransaction(transaction)
})

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