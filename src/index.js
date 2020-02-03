let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  addBtn.addEventListener('click', () => {
    //hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = 'block';
    } else {
      toyForm.style.display = 'none';
    }
  });

  ///////////////////////////

  const baseURI = 'http://localhost:3000/toys';

  ///fetch
  function fetchToys() {
    return fetch(baseURI)
      .then(function (resp) {
        return resp.json()
      });
  }


  ///render all = call fetch and take one and show
  function renderToys(toys) {
    return fetchToys().then(function show(toys) {
      for (let i = 0; i < toys.length; i++) {
        showToy(toys[i]);
      }
    });
  }

  function showToy(toy) {
    // On the index.html page, there is a div with the id "toy-collection."
    const toyCollection = document.querySelector('#toy-collection');
    // make a < div class="card" > for each toy and add it to the toy - collection div.
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <h2>${toy.name}</h2>
    <img class ="toy-avatar" src="${toy.image}"/>
    `;
    const likes = document.createElement('p');
    likes.innerText = toy.likes;

    const likeBtn = document.createElement('button');
    likeBtn.innerText = 'Like me';
    likeBtn.classList.add = 'like-btn';

    const deletBtn = document.createElement('button');
    deletBtn.innerText = 'Delete me';

    card.append(likeBtn, likes, deletBtn);
    toyCollection.appendChild(card);
  
    likeBtn.addEventListener("click", function (e) {
      likeToy(toy, likes)
    })

    deletBtn.addEventListener('click', function (e) {
      deletToy(toy)
        .then(function () {
        e.target.parentNode.remove()
      })

    })
  }

  function deletToy(toy) {
    const configurationObject = {
      method: "DELETE"
    }
    return fetch(`${baseURI}/${toy.id}`, configurationObject)
      .then(function (response) {
        return response.json()
      })
  }


  function likeToy(toy, likes) {
    likes.innerText++
    const configurationObject = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({
        likes: likes.innerText
      })
    };
    return fetch(`${baseURI}/${toy.id}`, configurationObject)
      .then(function (resp) {
        return resp.json()
      })
  }


  // const newToyButton = document.querySelector('.submit')
  function createToy(toy) {
    const configurationObject = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(toy)
    };
    return fetch(baseURI, configurationObject)
      .then(function (resp) {
      return resp.json();
    });
  }



  //put event listener on FROM not on submit button
  const form = document.querySelector('.add-toy-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const newToyName = document.querySelector('input[name="name"]').value;
    const newToyUrl = document.querySelector('input[name="image"]').value;
    const newToy = {
      name: newToyName,
      image: newToyUrl,
      likes: 0
    };
    createToy(newToy)
      .then(function (newToy) {
       showToy(newToy);
    });
  });

  renderToys();
});

