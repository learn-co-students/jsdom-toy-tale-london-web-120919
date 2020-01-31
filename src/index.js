let addToy = false;
let toyArray = [];

document.addEventListener('DOMContentLoaded', () => {
	const addBtn = document.querySelector('#new-toy-btn');
	const toyForm = document.querySelector('.container');
	addBtn.addEventListener('click', () => {
		// hide & seek with the form
		addToy = !addToy;
		if (addToy) {
			toyForm.style.display = 'block';
		} else {
			toyForm.style.display = 'none';
		}
	});

	fetchAllToys();

	document
		.getElementsByClassName('add-toy-form')[0]
		.addEventListener('submit', e => {
			e.preventDefault();

			let name = document.getElementsByName('name')[0].value;
			let image = document.getElementsByName('image')[0].value;
			const newToy = { name, image, likes: 0 };
			fetchNewToy(newToy);
		});
});

function createCard(data) {
	let div = document.createElement('div');
	div.classList.add('card');
	div.innerHTML = `
    <h2>${data.name}</h2>
    <img src=${data.image} class="toy-avatar" />
    <p id='likes'>${data.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  `;

	div.addEventListener('click', e => {
		if (e.target.className == 'like-btn') {
			increaseLikes(data);
		}
	});
	return div;
}

function renderToys(data) {
	let cardNode = document.getElementById('toy-collection');
	cardNode.innerHTML = '';
	for (let index = 0; index < data.length; index++) {
		cardNode.appendChild(createCard(data[index]));
	}
}

function fetchAllToys() {
	fetch('http://localhost:3000/toys')
		.then(res => res.json())
		.then(res => {
			toyArray = res;
			renderToys(res);
		});
}

function fetchNewToy(newToy) {
	fetch('http://localhost:3000/toys', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify(newToy)
	})
		.then(res => res.json())
		.then(res => renderToys([res]))
		.catch(err => console.log(err));
}

function increaseLikes(data) {
	// let like = document.getElementById('likes');
	fetch('http://localhost:3000/toys/' + `${data.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			likes: (data.likes += 1)
		})
	})
		.then(res => res.json())
		.then(fetchAllToys);
}
