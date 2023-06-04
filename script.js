let foodItems = undefined;
function getMenu() {
    return fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
      .then(response => response.json())
      .then(data => {
        foodItems=data;
        // Display the menu to the user
        let container = document.getElementById('container');
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            let menuItem = document.createElement('div');
            menuItem.className="menu-items";
            menuItem.innerHTML=` <img class="food-img" src="${element.imgSrc}" >
            <p id="title"> ${element.name}</p>
            <p id="price">Price : $${element.price}</p>`
            container.append(menuItem);
            
        }
        console.log('Menu:', data);
    })
    .catch(error => {
        console.error('Error fetching menu:', error);
    });
}

function addToCart(){
    let cart = document.getElementById('cart-container');
    let totalPrice=0;
    let orderedItems=[];
    for(let i =0 ; i<3 ; i++){
    const element = foodItems[i];
    let menuItem = document.createElement('div');
    menuItem.className="menu-items1";
    menuItem.innerHTML=` <img class="food-img1" src="${element.imgSrc}" >
    <div>
    <p id="title1"> ${element.name} Qty.= 1</p>
    <p id="price">Price : $${element.price}</p>
    </div>`
    cart.append(menuItem);
    totalPrice+=element.price;
    orderedItems.push(element.name);
    }
    let totalContainer = document.getElementById('totalAmount');
    totalContainer.innerHTML=`<h3>Total Amount = $${totalPrice}</h3>`;
    return orderedItems;
}
  function takeOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        // const burgers = ['Burger A', 'Burger B', 'Burger C']; // Randomly chosen burgers
        let orderedItems = addToCart();
        const order = { orderedItems };
        resolve(order);
      }, 2500);
    });
  }
  
  function orderPrep() {
    return new Promise(resolve => {
      setTimeout(() => {
        const orderStatus = true;
        const paid = false;
        let ordSt = document.getElementById('status-msg')
        ordSt.innerHTML= "Order Placed"
        resolve({ orderStatus, paid });
      }, 1500);
    });
  }
  
  function payOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        const orderStatus = true;
        const paid = true;
        let ordSt = document.getElementById('status-msg')
        ordSt.innerHTML= "Order Complete and Paid "
        ordSt.style.backgroundColor='green'
        resolve({ orderStatus, paid });
      }, 1000);
    });
  }
  
  function thankyouFnc() {
    alert('Thank you for eating with us today!');
    console.log('Thank you for eating with us today!');
  }
  
  async function main() {
    try {
      await getMenu();
      const order = await takeOrder();
      console.log('Order:', order);
      const prepStatus = await orderPrep();
      console.log('Preparation:', prepStatus);
      const paymentStatus = await payOrder();
      console.log('Payment:', paymentStatus);
      thankyouFnc();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Run the main function
  main();
  