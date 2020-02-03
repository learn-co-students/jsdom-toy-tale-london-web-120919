let addToy = false

const toysURL = "http://localhost:3000/toys"

function makeElement(element, classList = "") {
  let el = document.createElement(element)
  el.classList = classList
  return el
}


document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const addToyForm = document.querySelector('.add-toy-form')
  const toyCollection = document.querySelector("#toy-collection")
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  // fetch toys from API
  function getToys(url) {
    fetch(url)
      .then(response => response.json())
      .then(toys=> renderToys(toys))
  }

  // render all toys
  function renderToys(toys){
    for(const toy of toys) {
      renderToy(toy)
    }
  }

// create a toy
  function renderToy(toy) {
    const { name, image, likes} = toy
    let card = makeElement("div", "card")
    let toyName = makeElement("h2")
    let pic = makeElement("img", "toy-avatar")
    let noLikes = makeElement("p")
    let likeButton = makeElement("button", "like-btn")

    toyName.innerText = name
    pic.src = image
    noLikes.innerText = `${likes} Likes`
    likeButton.innerText = "Like <3"
    addLikes(likeButton, toy)

    card.append(toyName, pic, noLikes, likeButton)
    toyCollection.append(card)
  }


// add likes event listener and update back and front end when clicking like button
  function addLikes(button, toy) {
    button.addEventListener("click", function(){
      let noOfLikes = toy.likes++
      const configObj = {
        method: "PATCH",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
          likes: noOfLikes
        })
      }
      fetch(`${toysURL}/${toy.id}`, configObj)
        .then(button.previousElementSibling.innerText = `${noOfLikes} Likes`)
    })
  }

// add a new toy when created in the form
  addToyForm.addEventListener('submit', function(e){
    const nameField = addToyForm.name.value
    const imgField = addToyForm.image.value
    e.preventDefault()
    let configObj = {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({
        name: nameField,
        image: imgField,
        likes: 0
      })
    }
    
    fetch(toysURL, configObj)
      .then( response => response.json())
      .then(toy => renderToy(toy))

    addToyForm.reset()
  })

// get and render toys in the page
  getToys(toysURL)

})



// old code pre-refactoring

// // const toys = []

//   // put make toys array
//   function createToysArray(data) {
//     for(const element of data) {
//       toys.push(element)
//     }
//     createCards()
//   }

//   // create cards from each toy in array and add to page
//   function createCards() {
//     const toyCollection = document.querySelector("#toy-collection")
//     toyCollection.innerHTML = ""
//     for(const element of toys) {
//       card = document.createElement("div")
//       card.classList = "card"
//       card = addToyInfo(element, card)
//       toyCollection.appendChild(card)
//     }
//   }

//   // add toy into to each card when created
//   function addToyInfo(element, card) {
//     toyName = document.createElement("h2")
//     toyName.innerText = element.name
//     pic = document.createElement("img")
//     pic.src = element.image
//     pic.classList = "toy-avatar"
//     likes = document.createElement("p")
//     likes.innerText = `${element.likes} Likes`
//     likeButton = document.createElement("button")
//     likeButton.innerText = "Like <3"
//     likeButton.classList = "like-btn"
//     addLikes(likeButton, element)
//     card.append(toyName, pic, likes, likeButton)
//     return card
//   }


  // // adding new toy when created in form!
  // addToyForm.addEventListener('submit', function(e){
  //   e.preventDefault()
  //   createAToy(e)
  //     .then(newToy => toys.push(newToy))
  //     .then(createCards())
  //   e.target.reset()
  // })
  // // create a new toy
  // function createAToy(e) {
  //   const nameField = document.querySelector('input[name="name"]').value
  //   const imgField = document.querySelector('input[name="image"]').value
  //   const configObj = {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //       "accept": "application/json"
  //     },
  //     body: JSON.stringify({
  //       "name": nameField,
  //       "image": imgField,
  //       "likes": 0
  //     })
  //   }
  //   return fetch(toysURL, configObj)
  //     .then(response => response.json())
  // }

  // // add functionality to like button
  // function addLikes(likeButton, element) {
  //   likeButton.addEventListener('click', function(e){
  //     let id = e.target.parentElement
  //     const likesPara = e.target.previousElementSibling
  //     let noOfLikes = parseInt(likesPara.innerText.charAt(0))
  //     const configObj = {
  //       method: "PATCH",
  //       headers: {
  //         "content-type": "application/json",
  //         "accept": "application/json"
  //       },
  //       body: JSON.stringify({
  //         "likes": (noOfLikes + 1)
  //       })
  //     }
  //     return fetch(`${toysURL}/${element.id}`, configObj)
  //     .then(response => response.json())
  //     .then(toy => refreshLikes(toy, likesPara))
  //   })
  // }

  // function refreshLikes(toy, likesPara) {
  //   likesPara.innerText = `${toy.likes} Likes`
  // }

