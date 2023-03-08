$(document).ready(function () {
    axios.get('/category/categories')
        .then(function (response) {
            response.data.forEach((element, index) => {
                $('#category-body').append(`<tr><td>${index + 1}</td><td>${element.name}</td></tr>`)
            });
        })
        .catch(function (error) {
            console.log(error);
        })
        document.querySelector('#category-add').addEventListener('click', () => {
            axios.post('/category/create', {
                name: $('#category-name').val()
              })
              .then(function (response) {
                location.reload();
              })
              .catch(function (error) {
                console.log(error);
              });
        })
        
});