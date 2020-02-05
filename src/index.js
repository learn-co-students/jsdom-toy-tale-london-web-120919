let addToy = false;
const baseURI = "http://localhost:3333/toys/"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
  const newForm = document.querySelector(".add-toy-form")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  
  // make a 'GET' request to fetch all the toy objects
function fetchToys() {
  return fetch(baseURI)
    .then(function (response) {
    return response.json()
    })
}

function renderToys() {
  fetchToys()
    .then(function(toys) {
      for (let i = 0; i < toys.length; i++) {
        renderToy(toys[i])
      }
  })
}
  
  function renderToy(toy) {
    // make a `<div class="card">` for each toy and add it to the toy - collection `div`
    let card = document.createElement('div')
    card.classList.add("card")
    // create child elements: 
    let h2Name = document.createElement("h2")
    h2Name.innerText = toy.name
    let img = document.createElement("img")
    img.src = toy.image
    img.className = "toy-avatar"
    let pLikes = document.createElement("p")
    pLikes.innerText = `${toy.likes} Likes`
    let likeButton = document.createElement("button")
    likeButton.className = "like-btn"
    likeButton.innerText = "Like <3"
    likeButton.addEventListener("click", e => {
      addLikes(toy)
    })
    card.append(h2Name, img, pLikes, likeButton)
    toyCollection.append(card)
  }

  // Add new Toy 
  newForm.addEventListener("submit", function (e) {
    e.preventDefault()
    //create new toy object
    const newName = document.querySelector('input[name="name"]').value 
    const newImg = document.querySelector('input[name="image"]').value 
    const newToy = {
      name: newName,
      img: newImg,
      likes: 0
    }
    createToy(newToy)
      .then(renderToy(newToy))
  })

  //tell server to save new toy 
  function createToy(toyObj) {
    const configurationObject = {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyObj)
    }
    return fetch(baseURI, configurationObject)
      .then(function (response) {
      return response.json()
    })
  }
  
  function addLikes(toy){
    let pLikes = toy.likes++
    const configurationObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, 
      body: JSON.stringify({
        likes: pLikes
      })
    }
    fetch(`${baseURI}/${toy.id}`, configurationObject)
    .then(function (response){
      renderToys()
    })
      
    }
  
  renderToys()
});

    
    // function renderToy(toy) {
      //   const card = document.createElement("div")
//   card.classList.add("card")
//   card.innerHTML = `
//   <h2>${toy.name}</h2>
//   <img class ="toy-avatar" src="${toy.image}"/>`
//   const likes = document.createElement("p")
//   likes.innerText = toy.likes 

//   card.appendChild(likes);

//   likeBtn = document.createElement("button");
//   likeBtn.innerText = "Like";
//   likeBtn.classList.add("likeBtn");

//   card.appendChild(likeBtn);
//   divCollect.appendChild(card)

//   likeBtn.addEventListener("click", function(e) {
//     toyLikes(newToy)
//       .then(function (response) {
//       return response.json()
//     })
//   })
// }

 // function addNewtoy(e){
 //   e.preventDefault()
 //   const configurationObject = {
 //     method: "POST",
 //     headers: {
 //       "Content-Type": "application/json",
 //       "Accept": "application/json"
 //     },
 //     body: JSON.stringify({
 //       name: inputName.value,
 //       image: inputImage.value,
 //       likes: 0
 //     }), 
 //     .then(resp => resp.json())
 //       .then(renderToy);
 //     form.reset();
 //     });

 // }

// function addToy(newToy) {
//   const configurationObject = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify(toy)
//   }
//   return fetch(baseURI, configurationObject)
//     .then(function (response) {
//       return response.json()
//     }
//   }

// const form = document.querySelector('.add-toy-form');
// form.addEventListener('submit', function (e) {
//   e.preventDefault();
//   const ToyName = document.querySelector('input[name="name"]').value;
//   const ToyImg = document.querySelector('input[name="image"]').value;
//   const newToy = {
//     name: ToyName,
//     image: ToyImg,
//     likes: 0
//   };
//   createToy(newToy).then(function (newToy) {
//     render(newToy);
//   });
// });
















