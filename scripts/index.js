$(document).ready(function () {

    $(".up").click(function () {
        increaseCount(this);
    });

    $(".down").click(function () {
        decreaseCount(this);
    });

    $(".add-btn").click(function () {
        addItem();
    });

    function increaseCount(b) {
        var input = b.previousElementSibling;
        var value = parseInt(input.value, 10);
        if (value < 10) {
        value = isNaN(value) ? 0 : value;
        value++;
        input.value = value;
        }
    }

    function decreaseCount(b) {
        var input = b.nextElementSibling;
        var value = parseInt(input.value, 10);
        if (value > 1) {
            value = isNaN(value) ? 0 : value;
            value--;
            input.value = value;
        }
    }

    var productRow = $(".item-name").parent();
    var itemName = productRow.children('.item-name').text();
    var itemColour = productRow.children().children('.item-colour').text();
    var itemSize = productRow.children().children('.item-size').text();
    var itemPrice = parseFloat(productRow.children('.price').text());

    function addItem() {
        var itemQuantity = Number($('#item-count').val());

        if (localStorage.length > 0) {
            // Retrieve the JSON string
            var item = localStorage.getItem(0);

            // Parse JSON string to object
            var realItem = JSON.parse(item);

            itemQuantity += realItem.quantity
        }

        var itemObject = {
            name: itemName,
            colour: itemColour,
            size: itemSize,
            price: itemPrice,
            quantity: itemQuantity
        };

        localStorage.setItem(0, JSON.stringify(itemObject));
        document.getElementById("shop-cart").innerText = itemQuantity;
        $(".cd-qty").text(itemQuantity);
        $(".item-name").text(itemName);
        $(".cd-price").text(itemPrice);
        $(".slide-total").text((itemQuantity*itemPrice).toFixed(2));
        document.getElementById("cd-cart-itemsId").style.display = "block";
    };

    getQuantity();

    // This reupdates the shopping cart 
    function getQuantity() {
        if(localStorage.length>0){
            var item = localStorage.getItem(0);
    
            // Parse JSON string to object
            var realItem = JSON.parse(item);
    
            var itemName = realItem.name;
            var itemColour = realItem.colour;
            var itemSize = realItem.size;
            var itemPrice = realItem.price;
            var itemQuantity = realItem.quantity;
    
            $("#shop-cart").text(itemQuantity);
            $(".cd-qty").text(itemQuantity);
            $(".item-name").text(itemName);
            $(".cd-price").text(itemPrice);
            $(".slide-total").text((itemQuantity*itemPrice).toFixed(2));
        }
    }

    $("#sub-image-1").on("click", ()=>{
        imagefun("sub-image-1");
    })

    $("#sub-image-2").on("click", ()=>{
        imagefun("sub-image-2");
    })

    $("#sub-image-3").on("click", ()=>{
       imagefun("sub-image-3");
    })

    function imagefun(imageID) {
        var sub_Id = document.getElementById(imageID);
        var main_Id = document.getElementById("main-image")
        if(sub_Id.src.match(main_Id.src)){
            sub_Id.src = main_Id.src;
            console.log('printed here')
        }
        else{
            var a = main_Id.src ;
            main_Id.src = sub_Id.src;
            sub_Id.src = a;
        }
    } 

})