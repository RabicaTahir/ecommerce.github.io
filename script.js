const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar')

if(bar){
    bar.addEventListener('click', () =>{
        nav.classList.add('active')
    })
}

if(close){
    close.addEventListener('click', () =>{
        nav.classList.remove('active')
    })
}



// /Add to cart javascript code/

// let add_to_cart_btns = document.getElementsByClassName('cart');
// let add_to_cart_btns = document.getElementById('cartt');
let add_to_cart_btns = document.getElementsByClassName('cartt')
let main_container = document.getElementsByTagName('tbody')[0];

let quantity_fields = document.getElementsByClassName('num');
let removeBtns = document.getElementsByClassName("danger");

let itemContainer = JSON.parse(localStorage.getItem('cartt'));

for (let i = 0; i < add_to_cart_btns.length; i++){
    add_to_cart_btns[i].addEventListener('click', addToCart);
}



function addToCart(event){
    localStorage.setItem('cartt',JSON.stringify(itemContainer));
    if(!itemContainer){
        itemContainer = [];
    }
    let cartt = event.target;
    let cartt_parent = cartt.parentElement;
    let cartt_grandparent = cartt.parentElement.parentElement;
    let cartt_grandgrandparent = cartt.parentElement.parentElement.parentElement;
    // let cart_grandgrandgrandparent = cart.parentElement.parentElement.parentElement;
    let itemName = cartt_parent.children[0].innerText;
    let itemPrice = cartt_grandgrandparent.children[1].innerText;
    let itemImage = cartt_grandparent.children[0].src;




    let itemContainer = document.createElement('tr');
    itemContainer.innerHTML = `<td><i class="fa-solid fa-trash-can"></i></td>
    <td><img src="${itemImage}" alt="Loading"></td>
    <td>${itemName}</td>
    <td>${itemPrice}</td>
    <td><input type="number" value="1"></td>
    <td>${itemPrice}</td>`

        // main_container.append(itemContainer);
   
        for (let i = 0; i < quantity_fields.length; i++){
            quantity_fields[i].value = 1;
            quantity_fields[i].addEventListener('change', updateTotal);
        }

        for (let i = 0; i < removeBtns.length; i++){
            removeBtns[i].addEventListener('click', removeItem);
        }

        grandTotal()
}


function updateTotal(event){
     number_of_items = event.target;
    number_of_items = number_of_items.parentElement.parentElement;
    price_field = number_of_items.getElementsByClassName('item-price')[0];
    price_field = number_of_items.getElementsByClassName('total-price')[0];
    price_field_content = price_field.children[0].innerText.replace('$','');
    total_field.children[0].innerText = '$' + number_of_items.value * price_field_content;

    if(isNaN(number_of_items.value) || number_of_items.value <=0){
        number_of_items.value = 1
    }
    grandTotal()
    // console.log(price_field_content);


}

function grandTotal(){
    let total = 0;
    let grand_total = document.getElementsByClassName('grand_total')[0];
    let total_price = document.getElementsByClassName('total-price');
    for (let i = 0; i < total_price.length; i++){
       total_price_content = Number(total_price[i].innerText.replace('$',''));
       total += total_price_content;

    }
    grand_total.children[0].innerText = `$` + total;
    console.log(total);
}

function removeItem(event){
    removeBtns = event.target;
    remove_btn_grandparent = remove_btn.parentElement.parentElement;
    remove_btn_grandparent.remove()
    console.log(remove_btn)
    grandTotal()
}

// cartt();
