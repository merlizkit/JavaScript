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
if (!document.querySelector('.index') 
    && !document.querySelector('#register') 
    && !document.querySelector('#login') 
    && !document.querySelector('.form-control')) {
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case "Numpad1":
                    case "Digit1":
                        location.href = '/pages/newProduct.html';
                break;
            case "Numpad2":
                case "Digit2":
                    location.href = '/pages/stockReceipt.html';
                    break;
            case "Numpad3":
            case "Digit3":
                location.href = '/pages/stockIssue.html';
                break;
                case "Numpad4":
                    case "Digit4":
                        location.href = '/pages/productList.html';
                break;
            case "Numpad5":
            case "Digit5":
                location.href = '/pages/findProduct.html';
                break;
                case "Numpad6":
                    case "Digit6":
                        location.href = '/pages/menu.html';
                    }
    });
}
if (document.querySelector('.index')) {
    document.addEventListener('keydown', (e) => {
        switch(e.code) {
            case "Numpad1":
            case "Digit1":
                location.href = '/pages/login.html';
                break;
                case "Numpad2":
                    case "Digit2":
                        location.href = '/pages/register.html';
                        break;
                    }
                });
            }
// let shortcuts=0;
// if(document.querySelector('.shortcuts') && shortcuts === 0) {
    //     document.addEventListener('click', (e) => {
        //         e.preventDefault;
        //         Swal.fire({
//             icon: 'success',
//             title: 'Atajos de teclado',
//             html: '<p>1: Crear Producto</p><p>2: Ingresar Stock</p><p>3: Consumo de stock</p><p>4: Lista de productos</p><p>5: Buscar Producto</p><p>6: Menu</p>',
//         }).then(()=> shortcuts = 1);
//     });
//     console.log(document.querySelector('.shortcuts'));
// };
let fx; // funcion en la que se está operando
if(document.querySelector('#login')) {
    fx = document.querySelector('#login');
    fx.addEventListener('click', logIn);
};
if(document.querySelector('#register')) {
    fx = document.querySelector('#register');
    fx.addEventListener('click', register);
};
if(document.querySelector('.prod-list')) {
    fx = document.querySelector('.prod-list');
    listProducts();
};
if(document.querySelector('#issue')) {
    fx = document.querySelector('#issue');
    fx.addEventListener('click', stockIssue);
};
if(document.querySelector('#receipt')) {
    fx = document.querySelector('#receipt');
    fx.addEventListener('click', stockReceipt);
};
if(document.querySelector('#create-product')) {
    fx = document.querySelector('#create-product');
    fx.addEventListener('click', createProduct);
};
if(document.querySelector('.find-code')) {
    fx = document.querySelector('.find-code');
    btn = document.querySelector('#find-btn');
    btn.addEventListener('click', productStatus);
};


function createProduct (e) {
    e.preventDefault();
    if(e.target.id == 'cre-btn'){
        const prodCode = document.querySelector('#cre-code').value
        console.log(prodCode);
        const prodIdx = products.findIndex(prod => prod.code === prodCode);
        if(prodIdx !=-1) { 
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Codigo de producto ya existente',
            })
        } else {
            const prodDesc = document.querySelector('#cre-desc').value;
            const prodPrice = document.querySelector('#cre-price').value;
            const prodStock = document.querySelector('#cre-stock').value;
            const maxId = products.reduce((prods,item)=> prods = prods > item.id ? prods: item.id,0 )
            const newProduct = {
                id: maxId + 1,
                code: prodCode,
                description: prodDesc,
                price: prodPrice,
                stock: prodStock
            }
            products.push(new createProducts(newProduct))
            const item = document.createElement('ul');
            item.innerHTML = `
            <ul class="container fs-4">Producto <strong>${newProduct.code}</strong> creado:
                <li class="fs-5"><strong>Descripcion: ${newProduct.description}</strong></li>
                <li class="fs-5"><strong>Precio: ${newProduct.price}</strong></li>
                <li class="fs-5"><strong>Stock: ${newProduct.stock}</strong></li>
                <li class="fs-5"><strong>ID: ${newProduct.id}</strong></li>
            </ul> 
            `
            document.querySelector('.cre-info').replaceChildren(item);
        }    
    }     
}    

function listProducts () {
    products.forEach(product => {
        const item = document.createElement('ul');
        item.innerHTML = `
        <ul class="container fs-4">Código: <strong>${product.code}</strong>
            <li class="fs-5">Descripción: <strong>${product.description}</strong></li>
            <li class="fs-5">Precio: <strong>${product.price}</strong></li>
            <li class="fs-5">Stock: <strong>${product.stock}</strong></li>
            <li class="fs-5">Id: <strong>${product.id}</strong></li>
        </ul>
        `
        fx.appendChild(item);
    });
}    

function productStatus(e) {
    e.preventDefault();
    if(e.target.id = 'find-btn'){
        const prodCode = document.querySelector('#find-code').value
        const prodIdx = products.findIndex(prod => prod.code === prodCode);
        if(prodIdx !=-1) { 
            const item = document.createElement('ul');
            item.innerHTML = `
            <ul class="container fs-4">Codigo: <strong>${products[prodIdx].code}</strong>
                <li class="fs-5">Descripcion: <strong>${products[prodIdx].description}</strong></li>
                <li class="fs-5">Precio: <strong>${products[prodIdx].price}</strong></li>
                <li class="fs-5">Stock: <strong>${products[prodIdx].stock}</strong></li>
                <li class="fs-5">ID: <strong>${products[prodIdx].id}</strong></li>
            </ul> 
            `
            document.querySelector('.prod-info').replaceChildren(item);
        } else {
            const item = document.createElement('p');
            item.innerHTML = '<p class="msg container">Codigo inexistente</p>';
            document.querySelector('.prod-info').replaceChildren(item);
        }
    }     
}    

function stockReceipt (e) {
    e.preventDefault();
    if(e.target.id == 'rcp-btn'){
        const prodCode = document.querySelector('#receipt #rcp-code').value
        if (prodCode !== null){
            const prodIdx = products.findIndex(prod => prod.code === prodCode);
            if(prodIdx !=-1) { 
                let qty = Number(document.querySelector('#receipt #rcp-qty').value);
                if(qty > 0) {
                    products[prodIdx].stock = products[prodIdx].stock + qty;
                    const item = document.createElement('ul');
                    item.innerHTML = `
                    <ul class="container fs-4">Código: <strong>${products[prodIdx].code}</strong>
                        <li class="fs-5">Descripción: <strong>${products[prodIdx].description}</strong></li>
                        <li class="fs-5">Precio: <strong>${products[prodIdx].price}</strong></li>
                        <li class="fs-5">Stock: <strong>${products[prodIdx].stock}</strong></li>
                        <li class="fs-5">Id: <strong>${products[prodIdx].id}</strong></li>
                    </ul>
                    `
                    document.querySelector('.receipt').replaceChildren(item); // puede que falte indicar la clase del p del html
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'La cantidad debe ser mayor que 0',
                      })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Codigo inexistente',
                })
            }    
        }
    }
}

function stockIssue(e) {
    e.preventDefault();
    if(e.target.id == 'iss-btn'){
        const prodCode = document.querySelector('#issue #iss-code').value
        const prodIdx = products.findIndex(prod => prod.code === prodCode);
        if(prodIdx !=-1) {
            let qty = Number(document.querySelector('#issue #iss-qty').value);  
            if(qty > 0) {
                if (products[prodIdx].stock >= qty) {
                    products[prodIdx].stock = products[prodIdx].stock - qty;
                    const item = document.createElement('ul');
                    item.innerHTML = `
                    <ul class="container fs-4">Código: <strong>${products[prodIdx].code}</strong>
                        <li class="fs-5">Descripción: <strong>${products[prodIdx].description}</strong></li>
                        <li class="fs-5">Precio: <strong>${products[prodIdx].price}</strong></li>
                        <li class="fs-5">Stock: <strong>${products[prodIdx].stock}</strong></li>
                        <li class="fs-5">Id: <strong>${products[prodIdx].id}</strong></li>
                    </ul>
                    `
                    document.querySelector('.issue').replaceChildren(item);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        html: `<p>No hay stock suficiente</p><p>Stock disponible: ${products[prodIdx].stock}</p>`,
                    })
                }    
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La cantidad debe ser mayor a cero',
                })
            }    
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Codigo inexistente',
            })
        }    
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
                Swal.fire(
                    '¡Bienvenido!',
                    enteredUser,
                    'success'
                    ).then(() => location.href = '/pages/menu.html')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario o contraseña incorrectos',
                    footer: '<a href="./register.html">Registrarse</a>'
                  })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario o contraseña incorrectos',
                footer: '<a href="./register.html">Registrarse</a>'
              })
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
            Swal.fire(
                '¡Bienvenido!',
                enteredUser,
                'success'
              )
            const newUser = {
                id: maxId + 1,
                user: enteredUser,
                mail: enteredMail,
                pass: enteredPass
            }
            users.push(new createUser(newUser));
            location.href = '/pages/menu.html'
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario ya existente',
                footer: '<a href="./logIn.html">Login</a>'
              })
        }
    }
}
