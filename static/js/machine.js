function getMachineId() {

    let machineId = localStorage.getItem('MachineId');

    if (!machineId) {
        machineId = crypto.randomUUID();
        localStorage.setItem('MachineId', machineId);
    }

    return machineId;
}

function getProductCount() {
    const machine_id = getMachineId()
    axios.get(`/order-product/count?machine_id=${machine_id}`)
        .then((response) => {
            console.log(response.data)
            $('#product-count').text(response.data.length)
            $('#order-list').html('')
            response.data.forEach(element => {
                $('#order-list').append(`<div class="shopping-product"> <div class="shopping-card-image"><img src="${element.product_id.img_url}" alt="Erkaklar futbolkasi Base Unisex, qisqa yengli bilan"></div><div class="shopping-card-text"> <h5>${element.product_id.name}</h5><span>${element.product_id.price * element.count} so'm</span><div class="counter"> <span class="counter-btn subtraction-count">-</span><span class="count">${element.count}</span><span class="counter-btn add-count">+</span></div></div><div class="shopping-card-remove"> <span remove-product-id="${element._id}" onclick="deleteOrderProduct(event)">X</span></div></div>`)
            });
            $('#order-list')
        })
        .catch((error) => console.log(error));
}

async function deleteOrderProduct(event){
    const options = {
        url: '/order-product/remove',
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
            product_id: '' + event.target.getAttribute('remove-product-id')
        }
      };
      
      axios(options)
        .then(response => {
            getProductCount()
        })
        .catch(err => {
            console.log(err);
            alert("Kutilmagan xatolik yuz berdi!")
        })
}