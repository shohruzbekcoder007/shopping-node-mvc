$(document).ready(function () {
    const selectElement = document.querySelector('#file');

    selectElement.addEventListener('change', async (event) => {

        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        try {
            const response = await axios({
                method: "post",
                url: '/file/uploadimg',
                data: formData,
            });
            console.log(response.data);
            document.querySelector("#img_url").classList.add("text-green");
            $('#img_url').attr("img_url", response.data);
        } catch (error) {
            console.log(error);
        }

        document.querySelector('#add-product').addEventListener('click', async () => {

            const formData = {};

            formData.category = $('#category').val()
            formData.name = $('#name').val()
            formData.text = $('#text').val()
            formData.price = $('#price').val()
            formData.img_url = $('#img_url').attr( "img_url" )

            console.log(formData)

            try {
                const response = await axios({
                    method: "post",
                    url: '/product/create',
                    data: formData,
                });
                console.log(response.data);
                if(document.querySelector('#product-body')){
                    $('#product-body').append(`<tr><td>###</td><td>${response.data.name}</td><td>${response.data.text}</td><td>${response.data.price}</td><td><a href="${response.data.img_url}" target="_blank" rel="noopener">Biriktirilgan rasm</a></td></tr>`)
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
            }

        })

    });
});