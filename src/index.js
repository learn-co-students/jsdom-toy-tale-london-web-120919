let addToy = false
const toys = []
const toysURL = "http://localhost:3000/toys"


document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const addToyForm = document.querySelector('.add-toy-form')
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  
// adding new toy when created in form!
  addToyForm.addEventListener('submit', function(e){
    e.preventDefault()
    createAToy(e)
      .then(newBook => toys.push(newBook))
      .then(createCards())
    e.target.reset()
  })
  
  getToys(toysURL)
  
})

// fetch toys from API
function getToys(url) {
  fetch(url)
    .then(response => response.json())
    .then(data=> createToysArray(data))
}

// put make toys array
function createToysArray(data) {
  for(const element of data) {
    toys.push(element)
  }
  createCards()
}

// create cards from each toy in array and add to page
function createCards() {
  const toyCollection = document.querySelector("#toy-collection")
  toyCollection.innerHTML = ""
  for(const element of toys) {
    card = document.createElement("div")
    card.classList = "card"
    card = addToyInfo(element, card)
    toyCollection.appendChild(card)
  }
}

// add toy into to each card when created
function addToyInfo(element, card) {
  toyName = document.createElement("h2")
  toyName.innerText = element.name
  pic = document.createElement("img")
  pic.src = element.image
  pic.classList = "toy-avatar"
  likes = document.createElement("p")
  likes.innerText = `${element.likes} Likes`
  likeButton = document.createElement("button")
  likeButton.innerText = "Like <3"
  likeButton.classList = "like-btn"
  addLikes(likeButton, element)
  card.append(toyName, pic, likes, likeButton)
  return card
}

// create a new toy
function createAToy(e) {
  const nameField = document.querySelector('input[name="name"]').value
  const imgField = document.querySelector('input[name="image"]').value
  const configObj = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify({
      "name": nameField,
      "image": imgField,
      "likes": 0
    })
  }
  return fetch(toysURL, configObj)
    .then(response => response.json())
}

// add functionality to like button
function addLikes(likeButton, element) {
  likeButton.addEventListener('click', function(e){
    let id = e.target.parentElement
    const likesPara = e.target.previousElementSibling
    let noOfLikes = parseInt(likesPara.innerText.charAt(0))
    const configObj = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        "likes": (noOfLikes + 1)
      })
    }
    return fetch(`${toysURL}/${element.id}`, configObj)
    .then(response => response.json())
    .then(toy => refreshLikes(toy, likesPara))
  })
}

function refreshLikes(toy, likesPara) {
  likesPara.innerText = `${toy.likes} Likes`
}