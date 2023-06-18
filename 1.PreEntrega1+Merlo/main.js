const user1 = 'Pepito'
const pass1 = '12345'

const productId = 1
const productCode = 'P001'
const productName = 'Producto 1'
let productPrice = 1000
let productStock = 100

document.write(`<ul>Producto existente: <li>${productId}</li> <li>${productCode}</li> <li>${productName}</li> <li>${productPrice}</li> <li>${productStock}</li> </ul>`)

function createProduct () {
    const code = prompt('Ingrese el codigo del nuevo producto');
    if (code !== null){
        if(code == productCode) { 
            alert('Codigo de producto ya existente')
            createProduct();
        } else {
            const name = prompt('Ingrese el nombre del nuevo producto');
            const price = Number(prompt('Ingrese el precio del nuevo producto'));
            const stock = Number(prompt('Ingrese el stock inicial'));
            const newProduct = {
                id: productId + 1,
                code: code,
                name: name,
                price: price,
                stock: stock
            }
            console.log("--------------------------");
            document.write(`<ul>Producto creado:`)
            for(let prodData in newProduct) {
                console.log(`${prodData}: ${newProduct[prodData]}`);
                document.write(`<li>${prodData}: ${newProduct[prodData]}</li>`)
            }
            document.write(`</ul>`)
            console.log("--------------------------");
            alert('Producto creado');
            selectOperation();    
        }
    } else {
        exit("1");
    }
}

function stockReceipt () {
    const code = prompt('Ingrese el codigo de producto');
    if (code !== null){
        if(code == productCode) {
            let qty = Number(prompt('Cantidad a ingresar (S para salir)'));
            if (qty !== null){
                while (qty<=0 && !isNaN(qty)) {
                    alert('La cantidad debe ser mayor a cero');
                    qty = Number(prompt('Cantidad a ingresar (S para salir)'));
                }
                if(qty > 0) {
                    productStock = productStock + qty;
                    console.log("--------------------------");
                    console.log('Nuevo stock: '+ productStock);
                    console.log("--------------------------");
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
    const code = prompt('Ingrese el codigo de producto');
    if (code !== null){
        if(code == productCode) {
            let qty = Number(prompt('Stock: '+productStock+'. Cantidad a consumir (S para salir)'));
            if (qty !== null){
                while (qty<=0 && !isNaN(qty)) {
                    alert('La cantidad debe ser mayor a cero');
                    qty = Number(prompt('Stock: '+productStock+'. Cantidad a consumir (S para salir)'));
                }
                if(qty > 0) {
                    if (productStock >= qty) {
                        productStock = productStock - qty;
                        console.log("--------------------------");
                        console.log('Nuevo stock: '+ productStock);
                        console.log("--------------------------");
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
                selectOperation();
                break;  
            default: 
                console.log("Debe seleccionar una opción")
        }
    }
}
function selectOperation () {
    console.log("1: Crear producto");
    console.log("2: Ingresar stock");
    console.log("3: Consumir stock");
    console.log("4: Salir");
    let op = prompt("¿Qué quiere hacer hoy?");

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
            alert('Hasta luego');
            break;  
        default: 
            console.log("Debe seleccionar una opción")
    }
}

function logIn(){
    const enter = confirm('¿Desea hacer el log in?');
    if(enter == true) {
        const userId = prompt('Ingrese el usuario');
        if(userId == user1){
            const password = prompt('Ingrese la contraseña');
            if(password == pass1){
                alert('Bienvenido '+ userId);
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
        alert('Hasta luego');    
    }
}

setTimeout(logIn(),3000);