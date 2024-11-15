const url = "https://striveschool-api.herokuapp.com/api/product";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTBhMjhhZDEyOTAwMTU4NzZiZDIiLCJpYXQiOjE3MzE2NjE5ODYsImV4cCI6MTczMjg3MTU4Nn0.D51NpZjPOuRmBhrUDstFm0V5l0kpwrfC8qZDRXoivDY";
const title = document.querySelector("h1");
// 
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

if (productId) {
     title.textContent = "Modify Product"
    // 
    fetch(`${url}/${productId}`, {
        method: "GET",
        headers: {
            "Authorization": key,
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
       
        document.getElementById("productName").value = data.name;
        document.getElementById("productDescription").value = data.description;
        document.getElementById("brandName").value = data.brand;
        document.getElementById("imageUrl").value = data.imageUrl;
        document.getElementById("productPrice").value = data.price;

        // 
        const submitButton = document.querySelector("button[type='submit']");
        submitButton.textContent = "Modify Product";
        submitButton.addEventListener("click", (e) => modifyProduct(e, productId));

        // 
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Product";
        deleteButton.classList.add("btn", "btn-danger", "w-100", "mt-2");
        deleteButton.addEventListener("click", (e) => deleteProduct(e, productId));
        form.appendChild(deleteButton);
    })
    .catch(error => console.error("Error fetching product data:", error));
}
else {
    // 
    title.textContent = "Add New Product";
}

function modifyProduct(e, productId) {
    e.preventDefault();

    const data = {
        name: document.getElementById("productName").value,
        description: document.getElementById("productDescription").value,
        brand: document.getElementById("brandName").value,
        imageUrl: document.getElementById("imageUrl").value,
        price: parseFloat(document.getElementById("productPrice").value)
    };

    fetch(`${url}/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": key,
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    })
    .then(result => {
        alert("Product modified successfully!");
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error("Error modifying product:", error);
        alert("There was an error modifying the product.");
    });
}

function deleteProduct(e, productId) {
    e.preventDefault();

    fetch(`${url}/${productId}`, {
        method: "DELETE",
        headers: {
            "Authorization": key,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        alert("Product deleted successfully!");
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error("Error deleting product:", error);
        alert("There was an error deleting the product.");
    });
}

const form = document.getElementById("productForm");

form.addEventListener("submit", (event) => {
    if (!productId) {
        event.preventDefault();

        const data = {
            name: document.getElementById("productName").value,
            description: document.getElementById("productDescription").value,
            brand: document.getElementById("brandName").value,
            imageUrl: document.getElementById("imageUrl").value,
            price: parseFloat(document.getElementById("productPrice").value)
        };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": key,
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(result => {
            alert("Product added successfully!");
            form.reset();
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error("Error adding product:", error);
            alert("There was an error adding the product.");
        });
    }
});


// 
const resetButton = document.getElementById("resetButton");

resetButton.addEventListener("click", () => {
    document.getElementById("productName").value = "";
    document.getElementById("productDescription").value = "";
    document.getElementById("brandName").value = "";
    document.getElementById("imageUrl").value = "";
    document.getElementById("productPrice").value = "";
    alert("Form has been reset.");
});

