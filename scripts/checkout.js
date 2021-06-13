$(document).ready(function () {

    if (localStorage.length > 0) {
        var item = localStorage.getItem(0);
        var total = localStorage.getItem('total');

        // Parse JSON string to object
        var realItem = JSON.parse(item);
        var itemName = realItem.name;
        var itemColour = realItem.colour;
        var itemSize = realItem.size;
        var itemPrice = realItem.price;
        var itemQuantity = realItem.quantity;

        getItems();
    } else {
        document.getElementById("cart-empty-id").style.display = "flex";
        document.getElementById("cart-empty-id").style.float = "none";
        document.getElementById("summaryProduct").style.display = "none";

    }



    var fadeTime = 300;

    function getItems() {
        if (localStorage.length > 0) {
            $(".item-quantity").text(itemQuantity);
            $(".edit-cart").text(itemQuantity);
            $("#priceValue").text(itemPrice);
            $(".item-size").text(itemSize);
            $(".item-colour").text(itemColour);
            $(".item-name").text(itemName);
            $("#product-subtotal").text((itemPrice * itemQuantity).toFixed(2));
            $("#basket-subtotal").text((itemPrice * itemQuantity).toFixed(2));
            $("#basket-total").text((Number(total)).toFixed(2));
        }
    }

    // Shipping Details


    // var itemColour = productRow.children().children('.item-colour').text();
    // var itemSize = productRow.children().children('.item-size').text();
    // var itemPrice = parseFloat(productRow.children('.price').text());

    $("#payment-cta").on('click', () => {
        var itemfName = $("#firstName").val();
        var itemlName = $("#lastName").val();
        var itemAdress = $("#address").val();
        var itemGPS = $("#gps").val();
        var itemCity = $("#city").val();
        var itemState = $("#state").val();
        var itemCode = $("#zipCode").val();
        var itemPhone = $("#phone").val();
        var itemEmail = $("#email").val();

        if(localStorage.length > 0 ){
        if (itemfName.length > 0 && itemlName.length > 0 && itemEmail.length > 0 && itemEmail.length > 0) {
            // console.log(itemfName,itemlName,itemEmail, itemGPS);
            alert("Thank you for your purchase, we will send a link to the payment portal via the email provided.")
            document.getElementById("summaryProduct").style.display = "none";
            document.getElementById("cart-empty-id").style.display = "flex";
            document.getElementById("cart-empty-id").style.float = "none";
            $(':input[type="text"]').val('');
            localStorage.removeItem("0");
            localStorage.removeItem("total");
        } else {
            alert("Please these fields are required:\n\nFirst name, Last name, Email and GPS");
        }
    }else{
        alert("Your shopping cart is empty.")
    }
    })

            /* Remove item from cart */
            function removeItem() {
                /* Remove row from DOM and recalc cart total */
                // var productRow = $(removeButton).parent().parent();
                // productRow.slideUp(fadeTime, function () {
                //     productRow.remove();
                //     recalculateCart();
                //     updateSumItems();
                // });
                // $('.summary-promo').addClass('hide');
                // document.getElementById("shop-cart").innerText = 0;
                document.getElementById("itemInBag").innerText = 0;
        
                localStorage.removeItem("0");
                localStorage.removeItem("total");
            }
})