// 1 - Selecionar elementos
const modal = document.querySelector('.modal-overlay');
const form = document.querySelector('#form');
const buttonNewTrasaction = document.querySelector('.new')
const buttonCancel = document.querySelector('.cancel');

// 2 - Criar metodos
// Objet with methods
const modalObj = {
  // Abrir modal
  open(){
    // Adicional a class active no modal
    modal.classList.add('active')
  },
  // Fechar modal
  close(){
    // Remover a class active do modal
    modal.classList.remove('active')
  }
}

// 3 - Adicionar eventos aos elementos
// Event Listeners
buttonNewTrasaction.addEventListener('click', () => {
  modalObj.open();
})

buttonCancel.addEventListener('click', () => {
  modalObj.close()
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
})