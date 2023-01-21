const cartContainer = document.querySelector(".cart-container");
const shoesContainer = document.querySelector(".shoes-container");
const shoesbox = document.querySelector(".shoes-box");

let cart= [];

const products = [
    {id:"1", nombre:"Jordan 4 mectalic Purple", precio:"USD $400", image:"/assets/jordan4.jpg"},
    {id:"2", nombre:"Jordan 1 hight blue", precio:"USD $250", image:"/assets/jordan1.jpg"},
    {id:"3", nombre:"Jordan 10 Retro", precio:"USD $150", image:"/assets/jordan10.jpg"},
    {id:"4",nombre:"Nike Air force 1", precio:"USD $100", image:"/assets/nike1.jpg"},
    {id:"5", nombre:"UnderArmour Curry MVP 2016", precio:"USD $500", image:"/assets/currymvp.jpg"},
    {id:"6", nombre:"Vans old Skool", precio:"USD $200", image:"/assets/vans.jpg"},
    {id:"7", nombre:"Adidas SuperStar", precio:"USD $90", image:"/assets/adidasSuperstar.jpg"},
    {id:"8", nombre:"Jordan 1 Air Dior", precio:"USD $1000", image:"/assets/jordanDior.jpg"},
];



function createProducts(products){
    shoesContainer.innerHTML = '';
    products.forEach(element => {
        shoesContainer.innerHTML += `
        <div class="shoes-box" data-id="${element.id}">
           <div class="shoes-box-img">
            <img src="${element.image}" class="shoes-img" alt="">
           </div>
           <h6 class="shoes-id">${element.id}</h6>
           <h2 class="shoes-box-title">${element.nombre}</h2>
           <img src="/assets/star.jpg" class="box--img" alt="">
          <div class="shoes-box-prices">
           <h3 class="shoes-box-text">Price:</h3>
           <h3 class="box-shoes-price">${element.precio}</h3>
           </div>
           <div class="box-shoes-btns">
            <button data-id="${element.id}" class="shoes-box-btn">Add to Cart<i class='bx bxs-cart-add'></i></button>
           </div>  
       </div>     
     `  
    });
    
};

createProducts(products);

shoesContainer.addEventListener('click', e =>{
    addtocCart(e);
});

function addtocCart(e){
    console.log(e.target);
    
}









