// buscando uf do estado
function populateUFs (){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res =>  res.json())
    .then( states => {

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            
        }

         
    } )
}

populateUFs()

//buscando cidades por estado
function getCities(evento){
    //buscando o objeto no html
    const citySelect = document.querySelector("[name=city]")


    //convertendo os valores do ibge
    const stateInput = document.querySelector("[name=state]")

    //valor do populateUFs
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    //url dos estados
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    //limpando o campo cidade
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    //reutilização de código 
    fetch(url)
    .then( res =>  res.json())
    .then( cities => {
        
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
         
    } )







}



// evento e target
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coleta

//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")


let selectedItems = []

//pegando apenas os números
function handleSelectedItem(event){
    
    const itemLi = event.target
    //adicionar ou remver uma classe com javascript
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id
    console.log('ITEM ID: ', itemId)
    


    //verificar se existe itens selecionados, se sim
    //pegar os itens selecionados

    const alreadySeleceted = selectedItems.findIndex( item => {
        const itemFounde = item == itemId //isso será true ou false
        return itemFounde
    })

   

    //se já estiver selecionado, 
    if(alreadySeleceted >=0 ){
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId 
            return itemIsDifferent
    })
    
    selectedItems = filteredItems

    } else {
        //se não estiver seelcionado 
        //adicionar a seleção
        selectedItems.push(itemId)
    }

    console.log('selectedItems: ',selectedItems)
   
    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems     

}