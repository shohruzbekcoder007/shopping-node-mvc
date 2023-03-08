function getMachineId(){

    let machineId = localStorage.getItem('MachineId');

    if (!machineId) {
        machineId = crypto.randomUUID();
        localStorage.setItem('MachineId', machineId);
    }

    return machineId;
}

function getProductCount(){
    const machine_id = getMachineId()
    axios.get(`/order-product/count?machine_id=${machine_id}`)
        .then((response) => {
            $('#product-count').text(response.data.length)
            $('#order-list').html('')
            response.data.forEach(element => {
                $('#order-list').append(`<div class="shopping-product">
                        <div class="shopping-card-image">
                            <img src="${element.product_id.img_url}" alt="Erkaklar futbolkasi Base Unisex, qisqa yengli bilan">
                        </div>
                        <div class="shopping-card-text"> 
                            <h5>${element.product_id.name}</h5>
                            <span price-product-id="${element._id}">${element.product_id.price * element.count} so'm</span>
                            <div class="counter">
                                <span class="counter-btn subtraction-count" subtraction-product-id="${element._id}" onclick="subtractionOrderProduct(event)">-</span>
                                <span class="count" count-product-id="${element._id}">${element.count}</span>
                                <span class="counter-btn add-count" add-product-id="${element._id}" onclick="addOrderProduct(event)">+</span>
                            </div>
                        </div>
                        <div class="shopping-card-remove">
                            <span remove-product-id="${element._id}" onclick="deleteOrderProduct(event)">X</span>
                        </div>
                    </div>`)
            });
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

async function addOrderProduct(event){
    const options = {
        url: '/order-product/add',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
            product_id: '' + event.target.getAttribute('add-product-id')
        }
      };
      
      axios(options)
        .then(response => {
            if (response.data.add) {
                $(`span[count-product-id="${event.target.getAttribute('add-product-id')}"]`).text(response.data.count)
                $(`span[price-product-id="${event.target.getAttribute('add-product-id')}"]`).text(response.data.price + " so'm")
            }
        })
        .catch(err => {
            console.log(err);
            alert("Kutilmagan xatolik yuz berdi!")
        })
}

async function subtractionOrderProduct(event){
    const options = {
        url: '/order-product/subtraction',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
            product_id: '' + event.target.getAttribute('subtraction-product-id')
        }
      };
      
      axios(options)
        .then(response => {
            if (response.data.subtraction) {
                $(`span[count-product-id="${event.target.getAttribute('subtraction-product-id')}"]`).text(response.data.count)
                $(`span[price-product-id="${event.target.getAttribute('subtraction-product-id')}"]`).text(response.data.price + " so'm")
            }
        })
        .catch(err => {
            console.log(err);
            alert("Kutilmagan xatolik yuz berdi!")
        })
}

async function orderFinally(event) {
    const machine_id = getMachineId()
    const delivered = true
    const tel_number = $('#phoneNumber').val()
    const _id = event.target.getAttribute('order-id')
    console.log({
        machine_id,
        delivered,
        tel_number
    })
    if(tel_number){
        const options = {
            url: '/order/create',
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                machine_id: machine_id,
                tel_number: tel_number
            }
          };
          
          axios(options)
            .then(response => {
                if(response.data.delivered){
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err);
                alert("Kutilmagan xatolik yuz berdi!")
            })
    } else {
        alert("Tel nomerini kiriting")
    }
    
}