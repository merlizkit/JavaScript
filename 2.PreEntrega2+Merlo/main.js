class createUser {
    constructor (user,pass) {
        this.user = user;
        this.pass = pass;
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

function listProducts (products) {
    document.write('<ul>Lista productos:');
    console.log("------------Lista de productos--------------");
    products.forEach(product => {

        console.log(`Code: ${product.code}\nDescription: ${product.description}\nPrice: ${product.price}\nStock: ${product.stock}\nID: ${product.id}`)
        document.write(`<ul>Código: ${product.code} <li>Descripción: ${product.description}</li> <li>Precio: ${product.price}</li> <li>Stock: ${product.stock}</li> <li>Id: ${product.id}</li> </ul>`)
    })
    console.log("--------------------------------------------");
    document.write('</ul>');
    selectOperation();
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

function logIn(){
    const enter = confirm('¿Desea hacer el log in?');
    if(enter == true) {
        const enteredUser = prompt('Ingrese el usuario');
        const userIdx = users.findIndex(user => user.user == enteredUser)
        if(userIdx != -1){
            const enteredPass = prompt('Ingrese la contraseña');
            if(enteredPass === users[userIdx].pass){
                alert('Bienvenido '+ enteredUser);
                selectOperation()
            
            } else {
                alert('Contraseña incorrecta');
                logIn();
            }
        } else {
            alert('Usuario incorrecto');
            logIn();
        }
    } else {
        start();    
    }
}

function register(){
    const enter = confirm('¿Desea registrarse?');
    if(enter == true) {
        const enteredUser = prompt('Ingrese el usuario');
        const userIdx = users.findIndex(user => user.user == enteredUser)
        if(userIdx === -1){
            const enteredPass = prompt('Ingrese la contraseña');
            alert('Bienvenido '+ enteredUser);
            const user = new createUser(enteredUser, enteredPass);
            users.push(user);
            selectOperation()
        } else {
            alert('Usuario ya esistente');
            logIn();
        }
    } else {
        start();
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

start();