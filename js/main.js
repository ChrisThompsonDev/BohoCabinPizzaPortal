//On submit, all checked boxes, and Name need to be pushed into a new Div in the aside. This needs to be saved to local storage.
//Add a button to clear local storage.

//global assignment
let originalDiv = document.querySelector('#orders')

//check local storage to generate DOM Items
function allStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    let newDiv = document.createElement("div")
    let newDivName = document.createElement('h3')
    let toppingsList = document.createElement('ul')
    let localKey = localStorage.key(i)
    let toppingsArr = localStorage.getItem(`${localKey}`)
    let toppings = toppingsArr.split(',')

    //Create li's with toppings array
    toppings.forEach((item)=>{
      let li = document.createElement('li')
      li.innerText = item
      toppingsList.appendChild(li)
    })
    //append Dom Elements
    newDivName.textContent = localStorage.key(i)
    originalDiv.appendChild(newDiv)
    newDiv.appendChild(newDivName)
    newDiv.appendChild(toppingsList)
  }
    

  
}
allStorage()


document.querySelector('#submit').addEventListener('click', storeOrder)

function storeOrder(){
  //Store User Name
  let name = document.querySelector('#name').value
  //fill array with checked boxes
  let toppings = []
  
  let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
  for (let i = 0; i < checkboxes.length; i++) {
    toppings.push(checkboxes[i].name)
  }

  //Store in Local Storage
  localStorage.setItem(name, toppings)

  
  
  
//Clear Name box and checkboxes
document.querySelectorAll('input[type="text"]')
    .forEach(el => el.value = '')
document.querySelectorAll('input[type="checkbox"]')
    .forEach(el => el.checked = false)

//refresh DOM
document.querySelector('#orders').innerHTML = ''
allStorage()
}



//Clear All submitted orders
document.querySelector('#clear').addEventListener('click', clearOrders)

function clearOrders() {
  localStorage.clear()
  document.querySelector('#orders').innerHTML = ''
  allStorage()
}

