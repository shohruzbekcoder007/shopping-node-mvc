$(document).ready(function () {
    axios.get('/order/orders')
        .then(function (response) {
            response.data.forEach((element, index) => {
                $('#order-body').append(`<tr><td>${index+1}</td><td>${element.tel_number}</td><td><a href="#">Buyurtmani ko'rish</a></td><td><div class="btn-order" data-order-id="${element._id}" onclick="removeOrder(event)">Yetkazildi</div></td></tr>`)
            });
        })
        .catch(function (error) {
            console.log(error);
        })
    
})