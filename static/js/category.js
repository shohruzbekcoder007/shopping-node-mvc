$(document).ready(function () {
    axios.get('/category/categories')
        .then(function (response) {
            response.data.forEach((element, index) => {
                $('#category').append(`<option value=${element._id}>${element.name}</option>`)
            });
        })
        .catch(function (error) {
            console.log(error);
        })
        
});