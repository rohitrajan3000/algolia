
import algoliasearch from "algoliasearch";

const client = algoliasearch("X57JWNUFIQ", "ecc73d029274ad6b713c9b7bed8439af");
const index = client.initIndex("search");



let data = []

let resultsRootElement = document.querySelector('.results');

fetch('https://fakestoreapi.com/products').then(res=>res.json()).then(json=>{
    data = json; 
    //console.log(data)
})

console.log('data is ',data)

document.querySelector('#searchInput').addEventListener('keyup', ()=>{
   // console.log(document.querySelector('#searchInput').value)
    let searchTerm = document.querySelector('#searchInput').value;
    let resultsArray = []

    if(String(searchTerm).trim().length > 0){
        index.search(searchTerm ).then(({ hits }) => {
            renderProducts(hits)
        })
        .catch(err => { console.log(err); });
      
    renderProducts(resultsArray)
    }else{removeElements()}
})

function renderProducts(products){
    removeElements()
    products.forEach(product=>{
        renderSingleProduct(product);
    })
}

function renderSingleProduct(product){
  // console.log(product)
    let resultDiv = document.createElement('div')
    let resultImage = document.createElement('img')
    let resultTitel = document.createElement('h4')
    let resultPrice = document.createElement('p')
    let purchaseButton = document.createElement('button')

    resultImage.src = product.image;
    resultTitel.innerText = product.title;
    resultPrice.innerText = product.price;
    purchaseButton.innerText = 'purchase'

    resultDiv.appendChild(resultImage)
    resultDiv.appendChild(resultTitel)
    resultDiv.appendChild(resultPrice)
    resultDiv.appendChild(purchaseButton)
    resultDiv.className = 'result'

    resultsRootElement.appendChild(resultDiv)
}

function removeElements(){
    document.querySelectorAll('.result').forEach(prod=>{
        prod.remove()
    })
}


function addNewProduct(){
    
}