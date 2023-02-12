$(document).ready(function () {
    axios.get('/category/categories')
        .then(function (response) {
            response.data.forEach((element, index) => {
                // $("#group").append(`<option value=${element._id}>${element.group_name}</option>`)
                $('#category').append(`<option value=${element._id}>${element.name}</option>`)
            });
        })
        .catch(function (error) {
            console.log(error);
        })
        
});