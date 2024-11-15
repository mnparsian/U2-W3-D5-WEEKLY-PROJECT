function getProducts(data) {
    const products = document.getElementById("cards");
    const singleProduct = document.createElement("div");
    singleProduct.classList.add("col");
    singleProduct.innerHTML = `
        <div class="card shadow-sm">
            <img src=${data.imageUrl} class="bd-placeholder-img card-img-top" />
            <div class="card-body">
            <small class="text-primary text-bold fs-5">${data.brand}</small>
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-primary learn-more-btn" data-id="${data._id}">Learn More</button>
                        <button type="button" class="btn btn-sm btn-outline-success edit-btn" data-id="${data._id}">Edit</button>
                    </div>
                    <small class="text-danger text-bold fs-5">${data.price}€</small>
                </div>
            </div>
        </div>`;
    products.appendChild(singleProduct);
}


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("learn-more-btn")) {
        const productId = e.target.getAttribute("data-id");
        window.location.href = `detail.html?id=${productId}`;
    }
});



document.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
        const productId = e.target.getAttribute("data-id");
        window.location.href = `back_office.html?id=${productId}`;
    }
});




const url = "https://striveschool-api.herokuapp.com/api/product";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTBhMjhhZDEyOTAwMTU4NzZiZDIiLCJpYXQiOjE3MzE2NjE5ODYsImV4cCI6MTczMjg3MTU4Nn0.D51NpZjPOuRmBhrUDstFm0V5l0kpwrfC8qZDRXoivDY";
window.addEventListener("DOMContentLoaded" ,()=>{
fetch(url, {
    method: "GET", 
    headers: {
        "Authorization": key,
        "Content-Type": "application/json" 
    }
})
.then(res => {
    if (!res.ok) {
        throw new Error("Network response was not ok " + res.statusText);
    }
    return res.json();
})
.then(data => {
    console.log(data);
    data.forEach(element => {
        getProducts(element)
    });
})
.catch(error => {
    console.error("There was a problem with the fetch operation:", error);
});
})





























/* const URL = "https://api.pexels.com/v1/search?query=cat"
const URL2 = "https://api.pexels.com/v1/search?query=dog"

function createPage (url,buttonId){
    const API_KEY = "ZIZcZUTKvfiGBK8SPHp4DcIq3HScqtb523Th9cGgTjtMNAisP9NZrAk8";
    fetch(url, {
  headers: {
    Authorization: API_KEY
  }
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  })
  .then((data) => {
    const loadbtn = document.getElementById(buttonId);
    loadbtn.addEventListener("click", () => {  
      const card_list = document.getElementById("cards");
      card_list.innerHTML = ""; 
     
      data.photos.forEach((photo) => {
        console.log(photo.src.original); 
        
        const card = document.createElement("div");
        card.classList.add("col-md-4");
        card.innerHTML = `
          <div class="card mb-4 shadow-sm ">
            <img
              src=${photo.src.original}
              class="bd-placeholder-img card-img-top img-fluid"
              alt="Photo from Pexels"
            />
            <div class="card-body">
              <h5 class="card-title">Lorem Ipsum</h5>
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button btnhide" class="btn btn-sm btn-outline-secondary">Hide</button>
                </div>
                <small class="text-muted">9 mins</small>
              </div>
            </div>
          </div>`;
        card_list.appendChild(card);
      });
    });
  })
 }
const btnhide = document.getElementsByClassName("hide")
btnhide.classList.add.

createPage(URL,"loadimage");
createPage(URL2,"loadimage2"); */