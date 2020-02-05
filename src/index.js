

let addToy = false;
const toyURL = 'http://localhost:3000/toys'
const toyRL = 'http://localhost:3000/toys/'


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
//   const form = document.querySelector('form')
  

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });


// When the page loads, make a 'GET' request to fetch all the toy objects.// 
function fetchAll(){
    fetch(toyURL)
        .then(function(response){
            return response.json()
        })
        .then(function(toys){
            renderToys(toys)
        })
}

function renderToys(toys){
    for (let i = 0; i < toys.length; i++) {
        renderToy(toys[i])
    }
}

function renderToy(toy){
     // On the index.html page, there is a div with the id "toy-collection." DONE
    // With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.
     const divCard = document.createElement('div')
     divCard.classList.add("card")
    // h2 tag with the toy's name
    const h2 = document.createElement('h2')
    h2.innerText = toy.name
    // img tag with the src of the toy's image attribute and the class name "toy-avatar"
    const image = document.createElement('img')
    image.src = toy.image
    image.classList.add("toy-avatar")
    // p tag with how many likes that toy has
    const likes = document.createElement('p')
    likes.innerText = `${toy.likes} likes`
    // button tag with a class "like-btn"
    const button = document.createElement('button')
    button.classList.add("like-btn")
    button.innerText = "Likes <3"
    // DELETE BUTTON
    const deleteButton = document.createElement("button")
    deleteButton.innerText = "DELETE"
    // APPEND ALL
    divCard.append(h2, image, likes, button, deleteButton)
    toyCollection.appendChild(divCard)
    //EVENTE LISTENER FOR DELETE BUTTON
    deleteButton.addEventListener("click", function(e){
        e.target.parentNode.remove()
        fetch(toyRL + toy.id, {
            method: "DELETE"
        })
        .then(function(response){
            return response.json()
        })
    })

    //EVENT LISTENER FOR LIKE BUTTON
    button.addEventListener('click', function(e){
        let like = ++toy.likes
        likes.innerText = `${like} likes`
        const configurationObject = {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify({
                likes: like
            })
        }
        fetch(toyRL + toy.id, configurationObject)
            .then(function(response){
                return response.json()
            })
            
    })
    

}

const form = document.querySelector('.add-toy-form')
form.addEventListener("submit", function(e){
    e.preventDefault()
    // class="", id="", name=""
    let name = document.querySelector('input[name="name"]').value
    let image = document.querySelector('input[name="image"]').value
    const newToy = {
        name: name,
        image: image,
        likes: 0
    }
    fetch(toyURL, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(newToy)
    })
    // .then(toy => toy.json())
    .then(function(response){
        return response.json()
    })
    .then(function(newToy){
        renderToy(newToy)
    })
    e.target.reset()
})








fetchAll()

}) // END OF CONTENT LOADED EVENTLISTENER


