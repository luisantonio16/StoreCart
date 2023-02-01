const cartContainer = document.querySelector(".cart-container");
const tablebody = document.querySelector(".table-body");
const shoesContainer = document.querySelector(".shoes-container");
const shoesbox = document.querySelector(".shoes-box");
const btns = document.querySelector('.shoes-box-btn');
const totalCart = document.querySelector('.table-total ');
const totalCartcant = document.querySelector('.table-cantidad');
const wp = document.querySelector('.nav-cart-img');
const btnClear = document.querySelector('.vaciar-carrito');
const cantCart = document.querySelector('.nav-cart-total');

let cart= [];



tablebody.addEventListener('click', e =>{
   btnAccion(e);
  //console.log(e.target);
});
wp.addEventListener('click' , ()=>{
    cartContainer.classList.toggle("show")
});
  
btnClear.addEventListener('click', ()=>{
    cart = [];
    ClearCart();
});
shoesContainer.addEventListener('click', e =>{
    addtocCart(e);
});
  
document.addEventListener('DOMContentLoaded', ()=>{
    createProducts(products);
    if(localStorage.getItem('carrito')){
        cart  = JSON.parse(localStorage.getItem('carrito')) || [];
        ClearCart();
        createTable();
        
    }
    
});

const products = [
    {id:"1", nombre:"Jordan 4 mectalic Purple", precio: "400", image:"/assets/jordan4.jpg"},
    {id:"2", nombre:"Jordan 1 hight blue", precio:"250", image:"/assets/jordan1.jpg"},
    {id:"3", nombre:"Jordan 10 Retro", precio:" 150", image:"/assets/jordan10.jpg"},
    {id:"4",nombre:"Nike Air force 1", precio:" 100", image:"/assets/nike1.jpg"},
    {id:"5", nombre:"UnderArmour Curry MVP 2016", precio:" 500", image:"/assets/currymvp.jpg"},
    {id:"6", nombre:"Vans old Skool", precio:"200", image:"/assets/vans.jpg"},
    {id:"7", nombre:"Adidas SuperStar", precio:"90", image:"/assets/adidasSuperstar.jpg"},
    {id:"8", nombre:"Jordan 1 Air Dior", precio:"1000", image:"/assets/jordanDior.jpg"}
];






function createProducts(products){
    shoesContainer.innerHTML = '';
    products.forEach(element => {
        shoesContainer.innerHTML += `
        <div class="shoes-box">
           <div class="shoes-box-img">
            <img src="${element.image}" class="shoes-img" alt="">
           </div>
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

function createTable(){
    tablebody.innerHTML= '';
     cart.forEach(element => {
        let Total = element.cantidad * element.precio;
        //const {image,name,precio,cantidad,id} = element;
        tablebody.innerHTML += `
        <tr>
            <td><img src="${element.image}" class="img-table" alt=""></td>
            <td>${element.name}</td>
            <td>US$ ${element.precio}</td>
            <td>${ element.cantidad}</td>
            <td>$ ${Total}</td>
            <td>
                <button class="table-btn btn-mas" data-id="${element.id}">+</button>
                <button  class="table-btn btn-menos" data-id="${element.id}">-</button>
            </td>
         </tr>
    `    
    });
   
    cal();
    localStorage.setItem('carrito' , JSON.stringify(cart));  
    cantCart.textContent = cart.length;
    ClearCart();

    
    
   
}

function cal(){
    const ncantidad = cart.reduce((acc,{cantidad})=> acc + cantidad ,0);
    const ntotal = cart.reduce((acc,{cantidad, precio})=> acc + cantidad * precio,0);
    totalCartcant.textContent = ncantidad;
    totalCart.textContent = ntotal;
}

function addtocCart(e){
    if(e.target.classList.contains("shoes-box-btn")){
        setCarrito(e.target.parentElement.parentElement);
    }
}

function setCarrito(objeto){
    console.log(objeto);
    const products = {
        id: objeto.querySelector('.shoes-box-btn').dataset.id,
        image: objeto.querySelector('.shoes-img').src,
        name: objeto.querySelector('.shoes-box-title').textContent,
        precio: objeto.querySelector('.box-shoes-price').textContent,
        cantidad:1,
        total: 0
    }

    const existe = cart.some(pro => pro.id === products.id);
    if (existe) {
        const article = cart.map(pro =>{
            if (pro.id === products.id) {
                pro.cantidad ++;
                return pro;
            }else{
                return pro;
            }
        });
        cart = [...article];
        createTable();
        
    }else{
        cart = [...cart, products]
        createTable(cart); 
    }

   
  
    //cart = {...cart, products};
    /*if(cart.hasOwnProperty(products.id)){
        products.cantidad= cart[products.id].cantidad + 1;
        //products.total = products.total * products.cantidad;
    }*/
   
   
}

function ClearCart(){
    if(cart.length === 0){
        tablebody.innerHTML = `
        <tr>
            <td class="td-clear" colspan="6">Carrito Vacio!!!</td>    
        </tr>
    `
    cal();
    return
}
}

function btnAccion(e){
    if(e.target.classList.contains('btn-mas')){
        const id = e.target.dataset.id;
        const products = cart.some(pro => pro.id === id)
        if(products){
            const pro = cart.map(cant=> {
                if(cant.id === id){
                    cant.cantidad++;  
                    return cant;   

                }
                              
            })
            cart[pro.id] = [...pro]
            createTable();
        }
      
        
    }
    if(e.target.classList.contains('btn-menos')){
        const id = e.target.dataset.id;
        const products = cart.some(pro => pro.id === id)
        if(products){
            const pro = cart.map(cant=> {
                if(cant.id === id){
                    cant.cantidad--;  
                     

                    if(cant.cantidad === 0){
                        const Cart = cart.filter(cart => cart.id !==id)
                        cart = [...Cart]
                        createTable();
                        ClearCart();
                        return;
                    }
                    return cant; 
                }                 
            })
            cart[pro.id] = [...pro]
            createTable();
        }
    }
    e.stopPropagation();
}


ClearCart();

















