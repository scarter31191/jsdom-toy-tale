let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//collecting and displaying toy data
const toyCollection = document.querySelector('#toy-collection') 

function renderToy(toy) { //setting attributes for the api data

  let name = document.createElement('h2')
  name.innerText = toy.name

  let image = document.createElement('img')
  image.src = toy.image
  image.classList.add("toy-avatar")

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.innerText = "Like <3"
  btn.classList.add("like-btn")
  btn.setAttribute("id", toy.id)
  btn.addEventListener("click", function(e) {
    updateLikes(e)
  })


  let card = document.createElement('div')
  card.classList.add("card")
  toyCollection.appendChild(card)

  card.appendChild(name)
  card.appendChild(image)
  card.appendChild(p)
  card.appendChild(btn)


};

fetch('http://localhost:3000/toys') // collects the API then sends it to the 'renderToy' funtion
    .then(function (response) {
      return response.json()
    })
    .then(function (json){
      for (let toy of json) {
        renderToy(toy)
      }
    });

//adding a toy
let toyForm = document.querySelector('.add-toy-form')
toyForm.addEventListener('submit', function(e) {
  e.preventDefault
  submitData(e.target)
})

function submitData(toy) {
  let configObj = {
    method: 'POST',
    headers:
    {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "name": toy.name.value,
      "image": toy.image.value,
      "likes": 0
    })
  };

  fetch('http://localhost:3000/toys', configObj) //.then
    .then(function(res){
      return res.json()
    })
    .then(function(object){
      renderToy(object)
    })
    .catch(function(error){
      console.log(error.message)
    })
}

//increase likes
function updateLikes(e) {
  more = parseInt(e.target.previousElementSibling.innerText) + 1

  let configObj = {
    method: 'PATCH',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": more
    }) 
  }

   fetch(`http://localhost:3000/toys/${e.target.id}`, configObj)
   .then(function(res){
     return res.json()
   })
   .then(function(object){
     e.target.previousElementSibling.innerText = `${more} likes`
   })
  }
 



