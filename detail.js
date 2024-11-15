const url = "https://striveschool-api.herokuapp.com/api/product";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTBhMjhhZDEyOTAwMTU4NzZiZDIiLCJpYXQiOjE3MzE2NjE5ODYsImV4cCI6MTczMjg3MTU4Nn0.D51NpZjPOuRmBhrUDstFm0V5l0kpwrfC8qZDRXoivDY";


const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

if (productId) {
    fetch(`${url}/${productId}`, {
        method: "GET",
        headers: {
            "Authorization": key,
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        const productDetails = document.getElementById("productDetails");
        productDetails.innerHTML = `
            <img src="${data.imageUrl}" class="card-img-top img-fluid" alt="${data.name}" />
            <div class="card-body">
                <h1 class="card-title">${data.name}</h1>
                <h5 class="text-muted">${data.brand}</h5>
                <p class="card-text">${data.description}</p>
                <h3 class="text-primary">Price: ${data.price} €</h3>
                <button class="btn btn-danger mt-3" onclick="window.location.href='index.html'">Back to Home</button>
            </div>
        `;
    })
    .catch(error => console.error("Error fetching product details:", error));
}
