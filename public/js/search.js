//client side js for implementing search

const searchForm=document.getElementById("searchForm");

searchForm.addEventListener('submit',(event)=>
{
    event.preventDefault();
    const searchTerm=searchForm.q.value;

    // Send AJAX request to server to retrieve search results
    fetch(`/search?q=${searchTerm}`)
        .then(response => response.json())
        .then(products => {
            // Generate a card for each product and append to search results
            searchResults.innerHTML = '';
            products.forEach(product => {
                const card = document.createElement('div');
                // card.classList.add('card');
    //             card.innerHTML = `
                //     <img src="${product.imageUrl}" alt="${product.name}">
                //     <h2>${product.name}</h2>
                //     <p>${product.description}</p>
                //     <span>${product.price}</span>
                // `;

                card.innerHTML=`<h2>${product.name}</h2>`;
                
                searchResults.appendChild(card);
            });
        })
        .catch(error => {
            console.error(error);
            searchResults.innerHTML = '<p>Sorry, something went wrong.</p>';
        });
});