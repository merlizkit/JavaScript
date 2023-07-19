class createUser {
    constructor (usr) {
        this.id = usr.id
        this.user = usr.user;
        this.mail = usr.mail;
        this.pass = usr.pass;
    }    
}    

class createProducts {
    constructor (product) {
        this.id = product.id,
        this.code = product.code,
        this.description = product.description,
        this.price = product.price,
        this.stock = product.stock
    }    
}    

let prodList;
if((document.querySelector('#login'))) {
    const formLogIn = document.querySelector('#login');
    formLogIn.addEventListener('click', logIn);
};

if((document.querySelector('#register'))) {
    const formReg = document.querySelector('#register');
    formReg.addEventListener('click', register);
};

    
function createProduct () {
    const prodCode = prompt('Ingrese el codigo del nuevo producto');
    if (prodCode !== null){
        const prodIdx = products.findIndex(prod => prod.code === prodCode);
        if(prodIdx !=-1) { 
            alert('Codigo de producto ya existente')
            createProduct();
        } else {
            const prodDesc = prompt('Ingrese el nombre del nuevo producto');
            const prodPrice = Number(prompt('Ingrese el precio del nuevo producto'));
            const prodStock = Number(prompt('Ingrese el stock inicial'));
            const maxId = products.reduce((prods,item)=> prods = prods > item.id ? prods: item.id,0 )
            const newProduct = {
                id: maxId + 1,
                code: prodCode,
                description: prodDesc,
                price: prodPrice,
                stock: prodStock
            }    
            products.push(new createProducts(newProduct))
            alert(`Producto ${newProduct.code} creado`);
            console.log("---------------Producto Creado---------------");
            console.log(`Code: ${newProduct.code}\nDescription: ${newProduct.description}\nPrice: ${newProduct.price}\nStock: ${newProduct.stock}\nID: ${newProduct.id}`)
            console.log("--------------------------------------------");
            selectOperation();    
        }    
    } else {
        exit("1");
    }    
}    


if((document.querySelector('.prod-list'))) {
    prodList = document.querySelector('.prod-list');
    listProducts();
};

function listProducts () {
    products.forEach(product => {
        const fila = document.createElement('ul');
        fila.innerHTML = `
        <ul>Código: ${product.code} 
            <li>Descripción: ${product.description}</li>
            <li>Precio: ${product.price}</li>
            <li>Stock: ${product.stock}</li>
            <li>Id: ${product.id}</li>
        </ul>
        `
        prodList.appendChild(fila);
    })    
    //selectOperation();
}    

function productStatus() {
    const prodCode = prompt('Ingrese el codigo de producto');
    if (prodCode !== null){
        const prodIdx = products.findIndex(prod => prod.code === prodCode);
        if(prodIdx !=-1) { 
            console.log("---------------Estado Producto--------------");
            console.log(`Code: ${products[prodIdx].code}\nDescription: ${products[prodIdx].description}\nPrice: ${products[prodIdx].price}\nStock: ${products[prodIdx].stock}\nID: ${products[prodIdx].id}`)
            console.log("--------------------------------------------");
            selectOperation();
        } else {
            exit("5");
        }    
    } else {
        alert('Codigo inexistente');
        productStatus();
    }    
}    

function stockReceipt () {
    const prodCode = prompt('Ingrese el codigo de producto');
    if (prodCode !== null){
        const prodIdx = products.findIndex(prod => prod.code === prodCode);
        if(prodIdx !=-1) { 
            let qty = Number(prompt('Stock: '+products[prodIdx].stock+'.\nIndicar cantidad a ingresar (S para salir):'));
            if (qty !== null){
                while (qty<=0 && !isNaN(qty)) {
                    alert('La cantidad debe ser mayor a cero');
                    qty = Number(prompt('Stock: '+products[prodIdx].stock+'.\nIndicar cantidad a ingresar (S para salir):'));
                }    
                if(qty > 0) {
                    products[prodIdx].stock = products[prodIdx].stock + qty;
                    console.log("--------------Stock ingresado---------------");
                    console.log('Producto: '+ products[prodIdx].code);
                    console.log('Nuevo stock: '+ products[prodIdx].stock);
                    console.log("--------------------------------------------");
                    selectOperation();
                } else{
                    exit("2");
                }    
            } else {
                exit("2");
            }    
        } else {
            alert('Codigo inexistente');
            stockReceipt();
        }    
    } else {
    exit("2");    
    }
}    

function stockIssue() {
    const prodCode = prompt('Ingrese el codigo de producto');
    if (prodCode !== null){
        const prodIdx = products.findIndex(prod => prod.code === prodCode);
        if(prodIdx !=-1) { 
            let qty = Number(prompt('Stock: '+products[prodIdx].stock+'.\nIngrese cantidad a consumir (S para salir):'));
            if (qty !== null){
                while (qty<=0 && !isNaN(qty)) {
                    alert('La cantidad debe ser mayor a cero');
                    qty = Number(prompt('Stock: '+products[prodIdx].stock+'.\nIngrese cantidad a consumir (S para salir):'));
                }    
                if(qty > 0) {
                    if (products[prodIdx].stock >= qty) {
                        products[prodIdx].stock = products[prodIdx].stock - qty;
                        console.log("---------------Stock consumido--------------");
                        console.log('Producto: '+ products[prodIdx].code);
                        console.log('Nuevo stock: '+ products[prodIdx].stock);
                        console.log("--------------------------------------------");
                        selectOperation();
                    } else {
                        alert('No hay stock suficiente');
                        stockIssue();
                    }    
                } else {
                    exit("3");
                }    
            } else {
                exit("3");
            }    
        } else {
            alert('Codigo inexistente');
            stockIssue();
        }    
    } else {
        exit("3");
    }    
}    

function exit (op) {
    const exit = confirm('¿Desea volver al menú principal?')
    if(exit === true) {
        selectOperation();
    } else {
        switch(op){
            case "1":
                createProduct();
                break;
            case "2":
                stockReceipt(); 
                break;
            case "3":
                stockIssue();
                break;
            case "4":
                listProducts(products);
                break;
            case "5":
                productStatus();
                break;  
            case "6":
                selectOperation();
                break;  
            default:     
                console.log("Debe seleccionar una opción")
        }        
    }    
}    
function selectOperation () {
    let op = prompt("¿Qué quiere hacer a continuación?\n\n   1: Crear producto\n   2: Ingresar stock\n   3: Consumir stock\n   4: Listar productos\n   5: Consulta producto\n\n   6: Salir");

    switch(op){
        case "1":
            createProduct();
            break;
        case "2":
            stockReceipt(); 
            break;
        case "3":
            stockIssue();
            break;
        case "4":
            listProducts(products);
            break;  
        case "5":
            productStatus();
            break;  
        case "6":
            alert('Hasta luego');
            break;  
        default:     
            console.log("Debe seleccionar una opción")
    }        
}    

function logIn(e){
    e.preventDefault();
    if(e.target.id == 'log-btn'){
        const enteredUser = document.querySelector('#login #log-user').value;
        const userIdx = users.findIndex(user => user.user == enteredUser)
        if(userIdx != -1){
            const enteredPass = document.querySelector('#login #log-pass').value;
            if(enteredPass === users[userIdx].pass){
                alert('Bienvenido '+ enteredUser);
                location.href = '/pages/menu.html'
            
            } else {
                alert('Contraseña incorrecta');
                logIn();
            }
        } else {
            alert('Usuario incorrecto');
            logIn();
        }
    }
}

function register(e){
    e.preventDefault();
    if(e.target.id == 'reg-btn'){
        const enteredUser = document.querySelector('#register #reg-user').value;
        const userIdx = users.findIndex(user => user.user == enteredUser)
        if(userIdx === -1){
            const enteredPass = document.querySelector('#register #reg-pass').value;
            const enteredMail = document.querySelector('#register #reg-email').value;
            const maxId = users.reduce((users,usr)=> users = users > usr.id ? users: usr.id,0 )
            alert('Bienvenido '+ enteredUser);
            const newUser = {
                id: maxId + 1,
                user: enteredUser,
                mail: enteredMail,
                pass: enteredPass
            }
            users.push(new createUser(newUser));
            location.href = '/pages/menu.html'
        } else {
            alert('Usuario ya esistente');
            logIn();
        }
    }
}

function start() {
    let op = prompt("¡Bienvenido!\nIngrese el numero de opción elegida:\n\n   1: Ingresar\n   2: Registrarse\n\n   3: Salir");

    switch(op){
        case "1":
            logIn();
            break;
        case "2":
            register(); 
            break;
        case "3":
            alert('Hasta luego');
            break;  
        default: 
            console.log("Debe seleccionar una opción")
    }
}

//start();