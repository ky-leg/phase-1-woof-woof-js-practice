const url = "http://localhost:3000/pups/"

document.addEventListener('DOMContentLoaded', () => {

fetchDogs();

const filterBtn = document.getElementById('good-dog-filter')
filterBtn.addEventListener('click', () => goodDogFilter())

function fetchDogs(){
    fetch(url)
    .then((resp) => resp.json())
    .then((obj) => addDogsToDOM(obj))
}

function addDogsToDOM(obj){
    const dogBar = document.getElementById('dog-bar');
    if (filterBtn.innerText === 'Filter good dogs: ON') {
        console.log(obj)
        const goodDogArr = [];
        for (const key in obj){
            if (obj[key].isGoodDog === true){
                goodDogArr.push(obj[key])
            } 
        }
        console.log(goodDogArr)
        addToDOM(goodDogArr)
    }
    else {
        addToDOM(obj);
    }

    function addToDOM(obj){
        dogBar.innerText = ""
        console.log(obj)
        console.log(typeof obj)
        for (const key in obj) {

            // grab from obj
            const id = obj[key].id
            const name = obj[key].name
            // const isGoodDog =
            // const image = obj[key].image
            // elements 
            const span = document.createElement('span')
    
            // append
            span.id = id
            span.setAttribute('class', `${obj[key].isGoodDog}`)
            span.innerText = name
            span.addEventListener('click', e => displayDoggo(obj[key]))
            dogBar.appendChild(span)
        }
    }
}

function displayDoggo(obj){

    // grabber
    const dogInfo = document.getElementById('dog-info');

    // elements 
    const div = document.createElement('div')
    const img = document.createElement('img')
    const h2 = document.createElement('h2')
    const btn = document.createElement('button')
    

    // append 
    dogInfo.innerText = ""
    div.id = obj.id
    img.src = obj.image   
    h2.innerText = obj.name
    btn.id = obj.id
    if (obj.isGoodDog) {
        btn.innerText = 'Good Dog!'
    }
    else {
        btn.innerText = 'Bad Dog!'
    }
    btn.addEventListener('click', (e) => {
        obj.isGoodDog = !obj.isGoodDog
        patch(obj);
        
        if (obj.isGoodDog) {
            btn.innerText = 'Good Dog!'
            fetchDogs();
        }
        else {
            btn.innerText = 'Bad Dog!'
            fetchDogs();
        }
        const span = document.getElementById(`${obj.id}`)
        span.setAttribute('class', `${obj.isGoodDog}`)
        
        
    })
    
    div.append(img, h2, btn)
    dogInfo.appendChild(div)
}

function goodDogFilter() {
    // grabber
    const dogInfo = document.getElementById('dog-info');
    const goodDogs = document.getElementsByClassName('true')
    if (filterBtn.innerText === 'Filter good dogs: OFF'){
        filterBtn.innerText = 'Filter good dogs: ON'
    }
    else if (filterBtn.innerText === 'Filter good dogs: ON'){
        filterBtn.innerText = 'Filter good dogs: OFF'
    }

    fetchDogs();
    // dogInfo.removeChild();

    // grabber
    
}

function patch(obj){
    fetch(`${url}${obj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "isGoodDog": obj.isGoodDog
        })
    })
}

})