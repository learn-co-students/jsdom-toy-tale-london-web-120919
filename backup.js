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

    /////////////////////////////////////////////

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
        //Each card should have the following child elements:

        card.innerHTML = `
    <h2>${toy.name}</h2>
    <img class ="toy-avatar" src="${toy.image}"/>
    `;
        likes = document.createElement('p');
        likes.innerText = toy.likes;

        likeBtn = document.createElement('button');
        likeBtn.innerText = 'Like me';
        likeBtn.classList.add = 'like-btn';

        card.append(likeBtn, likes);
        toyCollection.appendChild(card);
        // h2 tag with the toy's name
        // img tag with the src of the toy's image attribute and the class name "toy-avatar"
        // p tag with how many likes that toy has
        // button tag with a class "like-btn"
        // likeToy(likeBtn, toy)\
        likeBtn.addEventListener("click", function (e) {
            likeToy(newToy)
                .then(function (response) {
                return response.json()
            })
        })
    }

    function likeToy(toy) {
        const configurationObject = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                likes: toy.likes + 1
            })
        };
        return fetch(`${baseURI}/${toy.id}`, configurationObject)
            .then(function (resp) {
                return resp.json()
            })
            .then(function (newToy) {
                refreshToy
            })
    }

    function refreshToy(newToy) {
        console.log(newToy)
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
        return fetch(baseURI, configurationObject).then(function (resp) {
            return resp.json();
        });
    }



    ////put event listener on FROM not on submit button
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
        createToy(newToy).then(function (newToy) {
            render(newToy);
        });
    });

    // When a user clicks on the add new toy button,
    //a POST request is sent to http://localhost:3000/toys and the new toy is added to Andy's Toy Collection.
    // The toy should conditionally render to the page.
    // In order to send a POST request via Fetch, give the Fetch a second argument of an object.
    // This object should specify the method as POST and also provide the appropriate headers and the JSON - ified data for the request.
    // If your request isn't working, make sure your header and keys match the documentation.

    renderToys();
});

// When the page loads, make a 'GET' request to fetch all the toy objects.With the response data,
//   make a < div class="card" > for each toy and add it to the toy - collection div.
