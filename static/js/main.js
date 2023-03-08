(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);

        axios.get('/category/categories')
            .then(function (response) {
                response.data.forEach((element, index) => {
                    $('#all-catigory').append(`<a class="nav-item nav-link" href="/?category=${element._id}">${element.name}</a>`)
                });
            })
            .catch(function (error) {
                console.log(error);
            })

        getProductCount()

        const isNumericInput = (event) => {
            const key = event.keyCode;
            return ((key >= 48 && key <= 57) || // Allow number line
                (key >= 96 && key <= 105) // Allow number pad
            );
        };
        
        const isModifierKey = (event) => {
            const key = event.keyCode;
            return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
                (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
                (key > 36 && key < 41) || // Allow left, up, right, down
                (
                    // Allow Ctrl/Command + A,C,V,X,Z
                    (event.ctrlKey === true || event.metaKey === true) &&
                    (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
                )
        };
        
        const enforceFormat = (event) => {
            // Input must be of a valid number format or a modifier key, and not longer than ten digits
            if(!isNumericInput(event) && !isModifierKey(event)){
                event.preventDefault();
            }
        };
        
        const formatToPhone = (event) => {
            if(isModifierKey(event)) {return;}
        
            const input = event.target.value.replace(/\D/g,'').substring(0,10); // First ten digits of input only
            const areaCode = input.substring(0,2);
            const middle = input.substring(2,5);
            const last = input.substring(5,9);
        
            if(input.length > 5){event.target.value = `(${areaCode}) ${middle} - ${last}`;}
            else if(input.length > 2){event.target.value = `(${areaCode}) ${middle}`;}
            else if(input.length > 0){event.target.value = `(${areaCode}`;}
        };
        
        const inputElement = document.getElementById('phoneNumber');
        inputElement.addEventListener('keydown',enforceFormat);
        inputElement.addEventListener('keyup',formatToPhone);
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

    $('.product-action .btn-outline-dark').click(function (event) {
        event.preventDefault()
        console.log(event.target.getAttribute('data-product-id'))
        console.log(getMachineId())

        axios.post('/order-product/create', {
            machine_id: getMachineId(),
            product_id: event.target.getAttribute('data-product-id')
          })
          .then(function (response) {
            console.log(response);
            getProductCount()
          })
          .catch(function (error) {
            console.log(error);
            alert('Error: ' + error)
          });
        
    });

})(jQuery);

