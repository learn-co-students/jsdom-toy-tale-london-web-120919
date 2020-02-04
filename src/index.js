let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const buttonT = document.querySelector(".like-btn")
  const newToyForm = document.querySelector(".add-toy-form");
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      
    } else {
      toyForm.style.display = 'none'
    }
  })


// When the page loads, make a 'GET' request to fetch all the toy objects. With the response data,
const url = "http://localhost:3000/toys"

function fetchToys(){
  return fetch(url)
    .then(function(response){
      return response.json() // JUST THE PROMISE!!
    })
  }

function renderToys(toys){
  return fetchToys()
    .then(function show(toys){
      for (let i = 0; i < toys.length; i++) {
        showToy(toys[i]) // CALLING THE FUNCTION TO CALL EVERY TOY!!
      } 
    })
  }

  function showToy(toy){
    // On the index.html page, there is a div with the id "toy-collection."
    const toyCollection = document.querySelector("#toy-collection")
    //  make a <div class="card toy mariola sara tommy javier "> for each toy and add it to the toy-collection div.
    const card = document.createElement("div") 
    card.classList.add("card")
    // Each card should have the following child elements
    // h2 tag with the toy's name 
    // img tag with the src of the toy's image attribute and the class name "toy-avatar"
    // p tag with how many likes that toy has
    // button tag with a class "like-btn"
    const h2Tag = document.createElement("h2")
    h2Tag.innerText = toy.name
    const imgTag = document.createElement("img")
    imgTag.src = toy.image
    imgTag.classList = "toy-avatar"
    const pTag = document.createElement("p")
    pTag.innerText = toy.likes
    const buttonTag = document.createElement("button")
    buttonTag.addEventListener('click', function(e){
      addLikes(toy, pTag)
    })
    buttonTag.classList = "like-btn"
    buttonTag.innerText = "Like <3"
    // card.innerHTML = `
    //   <h2>${toy.name}</h2>
    //   <img src="${toy.image}" class="toy-avatar"/>
    //   <p>${toy.likes}</p>
    //   <button class="like-btn">Like</button>
    // `
    card.append(h2Tag, imgTag, pTag, buttonTag)
    toyCollection.appendChild(card)
  }

// Add a New Toy
// When a user clicks // on the add new toy button //, a POST request // is sent to 
newToyForm.addEventListener("submit", function(e){
  e.preventDefault()
  const newToyName = document.querySelector('input[name="name"]').value
  const newToyUrl = document.querySelector('input[name="image"]').value 
  const newToyObj = {
    name: newToyName,
    image: newToyUrl,
    likes: 0
  }

// The toy should conditionally render to the page.
  createToy(newToyObj)
    .then(function(newToyObj){
      showToy(newToyObj)
    })
    e.target.reset()
})

function createToy(newToy){
  const newToyButton = document.querySelector('.submit')
// In order to send a POST request via Fetch, give the Fetch a second argument of an object. 
  const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify(newToy)
    }

  // http://localhost:3000/toys and the new toy is added to Andy's Toy Collection.
  // This object should specify the method as POST and also provide the appropriate headers and 
  // the JSON-ified data for the request. 
    return fetch(url, configurationObject)
      .then(function(response){
        return response.json()
      })
      
}
const urlToy = "http://localhost:3000/toys/"

// const divCard = document.querySelector(".card")
function addLikes(toy, pTag){
  let numberOfLikes = ++pTag.innerText
  const configurationObject = {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({
        likes: numberOfLikes
      })
  }
  fetch(urlToy+toy.id, configurationObject)
    .then(function(response){
      return response.json()
    })
}

//   likeButton.addEventListener("click", function(e){
//     // divCard.likesP.innerText++
// })

// If your request isn't working, make sure your header and keys match the documentation.
renderToys()
})

