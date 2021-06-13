$(document).ready(function () {

    if(localStorage.length > 0){
    var item = localStorage.getItem(0);
    
    // Parse JSON string to object
    var realItem = JSON.parse(item);

    var itemName = realItem.name;
    var itemColour = realItem.colour;
    var itemSize = realItem.size;
    var itemPrice = realItem.price;
    var itemQuantity = realItem.quantity;

    getItems();

    updateSumItems();

    }
    else{
        document.getElementById("cart-empty-id").style.display = "flex";
        document.getElementById("basket-product").style.display = "none";
        
    }




    function getItems() {
        if (localStorage.length > 0) {
            $(".item-quantity").text(itemQuantity);
            $(".quantity-field").val(itemQuantity);
            $("#priceValue").text(itemPrice);
            $(".item-size").text(itemSize);
            $(".item-colour").text(itemColour);
            $(".item-name").text(itemName);
            $("#product-subtotal").text((itemPrice * itemQuantity).toFixed(2));
            $("#basket-subtotal").text((itemPrice * itemQuantity).toFixed(2));

            recalculateCart(true);
        }
    }

        /* Remove item from cart */
        function removeItem(removeButton) {
            /* Remove row from DOM and recalc cart total */
            var productRow = $(removeButton).parent().parent();
            productRow.slideUp(fadeTime, function () {
                productRow.remove();
                recalculateCart();
                updateSumItems();
            });
            $('.summary-promo').addClass('hide');
            document.getElementById("shop-cart").innerText = 0;
            document.getElementById("itemInBag").innerText = 0;
    
            localStorage.removeItem("0");
            localStorage.removeItem("total");
        }


    /* Recalculate cart */
    function recalculateCart(onlyTotal) {
        var subtotal = 0;

        /* Sum up row totals */
        $('.basket-product').each(function () {
            subtotal += parseFloat($(this).children('.subtotal').text());
        });

        /* Calculate totals */
        var total = subtotal;

        //If there is a valid promoCode
        var promoPrice = parseFloat($('.promo-value').text());
        if (promoPrice) {
            var discount = total * promoPrice / 100;
            total -= discount;
        }

        /*If switch for update only total, update only total display*/
        if (onlyTotal) {
            /* Update total display */
            $('.total-value').fadeOut(fadeTime, function () {
                $('#basket-total').html(total.toFixed(2));
                $('.total-value').fadeIn(fadeTime);
            });
        } else {
            /* Update summary display. */
            $('.final-value').fadeOut(fadeTime, function () {
                $('#basket-subtotal').html(subtotal.toFixed(2));
                $('#basket-total').html(total.toFixed(2));
                if (total == 0) {
                    $('.checkout-cta').fadeOut(fadeTime);
                } else {
                    $('.checkout-cta').fadeIn(fadeTime);
                }
                $('.final-value').fadeIn(fadeTime);
            });
        }
        return total;
    }

        /* Update quantity */
        function updateQuantity(quantityInput) {
            /* Calculate line price */
            var productRow = $(quantityInput).parent().parent();
            var price = parseFloat(productRow.children('.price').text());
            var quantity = $(quantityInput).val();
            var linePrice = price * quantity;
    
            /* Update line price display and recalc cart totals */
            productRow.children('.subtotal').each(function () {
                $(this).fadeOut(fadeTime, function () {
                    $(this).text(linePrice.toFixed(2));
                    recalculateCart();
                    $(this).fadeIn(fadeTime);
                });
            });
    
            productRow.find('.item-quantity').text(quantity);
            document.getElementById("shop-cart").innerText = Number(quantity);
            updateSumItems();
        }

        function updateSumItems() {
            var sumItems = 0;
    
            $('.quantity input').each(function () {
                sumItems += parseInt($(this).val());
            });
            $('.total-items').text(sumItems);
            var itemObject = {
                name: itemName,
                colour: itemColour,
                size: itemSize,
                price: itemPrice,
                quantity: sumItems
            }
            localStorage.setItem(0, JSON.stringify(itemObject));
        }
    


    $('.remove button').click(function () {
        document.getElementById("basket-product").style.display = "none";
        document.getElementById("cart-empty-id").style.display = "flex";
        removeItem(this);
    });



    $(".checkout-cta").on("click", ()=>{
        if(recalculateCart(true)>0){
        localStorage.setItem('total', recalculateCart(true))
    }
    });

    /* Set values + misc */
    var promoCode;
    var promoPrice;
    var fadeTime = 300;

    /* Assign actions */
    $('.quantity input').change(function () {
        updateQuantity(this);
    });
    

    $('.promo-code-cta').click(function () {

        promoCode = $('#promo-code').val();

        if (promoCode.length === 5) {
            //If promoPrice has no value, set it as 10 for the 10OFF promocode
            promoPrice = 50;
        } else if (promoCode != '') {
            alert("Invalid Promo Code");
            promoPrice = 0;
        }
        //If there is a promoPrice that has been set (it means there is a valid promoCode input) show promo
        if (promoPrice) {
            $('.summary-promo').removeClass('hide');
            $('.promo-value').text(promoPrice);
            recalculateCart(true);
        }
    });

});