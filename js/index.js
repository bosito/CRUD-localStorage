import { svgDeleteImage } from './svgDelete.js';

let carslist = []

const formCars = document.getElementById("formCars")
const modal = document.getElementById("myModal");
const updateData = document.getElementById("update-Data")

let updateIndex = null

//inputs
const inputName = document.getElementById('name')
const inputModel = document.getElementById('model')
const inputDoors = document.getElementById('doors')
const inputColor = document.getElementById('color')
const inputBrand = document.getElementById('brand')
//container carsList
let carsListtUI = document.getElementById("containerCads");
const divList = document.getElementById('divList')

// la primera vez que iniciamos la pagina preguntara nuestro nombre de administradores 
const firtslocalStorage = () => {
  const storage = localStorage.getItem('keyCars')
  const storageUser = localStorage.getItem('userAdmin')
  if (storageUser) {
    const parseUser = JSON.parse(storageUser)
    renderUserName(parseUser)
    if (storage) {
      renderList()
    } else {
      localStorage.setItem('keyCars', JSON.stringify(carslist))
    }
  } else {
    const userName = prompt('Ingresa tu nombre completo para continuar')
    if (!userName) firtslocalStorage()
    else {
      renderUserName(userName)
      firtslocalStorage()
      renderList()
    }
  }
}

//esto pinta el nombre que asignamos en panralla cada que entermos nuevamente
const renderUserName = infoUser => {
  const divNameUser = document.getElementById('nameAdmin')
  const isUserRegist = localStorage.getItem('userAdmin')
  if (!isUserRegist) localStorage.setItem('userAdmin', JSON.stringify(infoUser))
  divNameUser.textContent = `Welcome: ${infoUser}`
}

const renderList = () => {

  carsListtUI.innerHTML = ""

  let storageCarsList = JSON.parse(localStorage.getItem('keyCars'))

  //conpruebo si la lista esta vacia para mostrar o no estilos
  if (storageCarsList.length > 0) {
    divList.setAttribute("class", "containerTable")
  } else {
    divList.setAttribute("class", "containerTableFalse")
  }

  storageCarsList.forEach((car, index) => {
    const containerCads = document.getElementById("containerCads")
    const cardForm = document.createElement('div')
    const carsList = document.createElement('div')

    cardForm.setAttribute("class", "cardForm")
    carsList.setAttribute("class", "carsList")
    cardForm.appendChild(carsList)
    containerCads.appendChild(cardForm)

    const spanCircle1 = document.createElement("span")
    const spanCircle2 = document.createElement("span")
    spanCircle1.setAttribute("class", "circle tour")
    spanCircle2.setAttribute("class", "circle five")
    carsList.appendChild(spanCircle1)
    carsList.appendChild(spanCircle2)

    const name = document.createElement("h3")
    const model = document.createElement("h3")
    const doors = document.createElement("h3")
    const color = document.createElement("h3")
    const brand = document.createElement("h3")

    name.setAttribute("class", "titleCard")
    name.textContent = `${car.name}`
    model.textContent = `Model: ${car.model}`
    doors.textContent = `Doors: ${car.doors}`
    color.textContent = `Color: ${car.color}`
    brand.textContent = `Brand: ${car.brand}`

    carsList.appendChild(name)
    carsList.appendChild(model)
    carsList.appendChild(doors)
    carsList.appendChild(color)
    carsList.appendChild(brand)

    const containerButtons = document.createElement("div")
    containerButtons.setAttribute("class", "containerButtons")
    carsList.appendChild(containerButtons)

    //Botones
    const updateBtn = document.createElement("button")
    updateBtn.textContent = "Update"
    updateBtn.setAttribute("class", "btn")
    containerButtons.appendChild(updateBtn)
    updateBtn.addEventListener("click", () => openModal(car, index))

    const deleteBtn = document.createElement("button")
    deleteBtn.setAttribute("class", "btn")
    deleteBtn.innerHTML = svgDeleteImage
    containerButtons.appendChild(deleteBtn)
    deleteBtn.addEventListener("click", () => dleteCarList(index))

  })
}

const dleteCarList = (index) => {
  let storage = JSON.parse(localStorage.getItem("keyCars"))
  let array = [...storage]
  array.splice(index, 1);
  localStorage.setItem("keyCars", JSON.stringify(array))
  renderList();
}

const openModal = (car, index) => {
  modal.style.display = "block";
  document.getElementById("nameModal").value = car.name
  document.getElementById("modelModal").value = car.model
  document.getElementById("doorsModal").value = car.doors
  document.getElementById("colorModal").value = car.color
  document.getElementById("brandModal").value = car.brand
  updateIndex = index
}

const updateCarList = (e) => {
  e.preventDefault();
  
  let updatedCar = {
    name: document.getElementById("nameModal").value,
    model: document.getElementById("modelModal").value,
    doors: document.getElementById("doorsModal").value,
    color: document.getElementById("colorModal").value,
    brand: document.getElementById("brandModal").value
  };

  let lisStorage = JSON.parse(localStorage.getItem('keyCars'))

  lisStorage[updateIndex] = updatedCar;

  localStorage.setItem("keyCars", JSON.stringify(lisStorage))
  updateIndex = null;
  //formModal.reset()
  modal.style.display = "none";
  renderList();
}

const createNewCarList = (e) => {
  e.preventDefault();
  const mensajeError = document.getElementById("mensajeError")
  mensajeError.setAttribute("class", "mensajeError")
  if (inputName.value == "" ||
    inputModel.value == "" ||
    inputDoors.value == "" ||
    inputColor.value == "" ||
    inputBrand.value == "") {
    return mensajeError.textContent = 'Todos los parametros deben de estar llenos'
  }

  mensajeError.textContent = ''

  const data = {
    name: inputName.value,
    model: inputModel.value,
    doors: inputDoors.value,
    color: inputColor.value,
    brand: inputBrand.value
  }

  let lisStorage = JSON.parse(localStorage.getItem('keyCars'))
  console.log(lisStorage, 'estado del storage');
  let newArray = lisStorage ? [...lisStorage, data] : [data]
  console.log(newArray);

  localStorage.setItem("keyCars", JSON.stringify(newArray))
  formCars.reset()
  renderList()
}

let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = () => modal.style.display = "none";

updateData.addEventListener("click", (e) => updateCarList(e))
formCars.addEventListener("submit", (e) => createNewCarList(e))
document.addEventListener("DOMContentLoaded", () => firtslocalStorage())