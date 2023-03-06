const products = (category) => {
    axios.get(`/product/category-products?category=${category}`)
        .then(function (response) {
            if(document.querySelector('#product-body')){
                $('#product-body').html('')
                response.data.products.forEach((element, index) => {
                    $('#product-body').append(`<tr><td>${index+1}</td><td>${element.name}</td><td>${element.text}</td><td>${element.price}</td><td><a href="${element.img_url}" target="_blank" rel="noopener">Biriktirilgan rasm</a></td></tr>`)
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

$(document).ready(function () {
    axios.get('/category/categories')
        .then(function (response) {
            response.data.forEach((element, index) => {
                $('#category').append(`<option value=${element._id}>${element.name}</option>`)
            });
            products(response.data[0]._id)
        })
        .catch(function (error) {
            console.log(error);
        })

    document.querySelector('#category').addEventListener('change', () => {
        products(document.querySelector('#category').value)
    })

});