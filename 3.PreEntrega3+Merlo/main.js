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

let fx; // funcion en la que se está operando
if((document.querySelector('#login'))) {
    fx = document.querySelector('#login');
    fx.addEventListener('click', logIn); // ¿si hace click en cualquier lado igual registra?
};

if((document.querySelector('#register'))) {
    fx = document.querySelector('#register');
    fx.addEventListener('click', register);
};

if((document.querySelector('.prod-list'))) {
    fx = document.querySelector('.prod-list');
    listProducts();
};

if((document.querySelector('#issue'))) {
    fx = document.querySelector('#issue');
    fx.addEventListener('click', stockIssue);
};

if((document.querySelector('#receipt'))) {
    fx = document.querySelector('#receipt');
    fx.addEventListener('click', stockReceipt);
};

if((document.querySelector('#create'))) {
    fx = document.querySelector('#create');
    fx.addEventListener('click', createProduct);
};

function createProduct (e) {
    e.preventDefault();
    if(e.target.id == 'cre-btn'){
        const prodCode = document.querySelector('#cre-code #cre-code').value
        if (prodCode !== null){
            const prodIdx = products.findIndex(prod => prod.code === prodCode);
            if(prodIdx !=-1) { 
                alert('Codigo de producto ya existente') // poner el aviso en el mensaje del campo del form
            } else {
                const prodDesc = document.querySelector('#cre-desc #cre-desc').value;
                const prodPrice = document.querySelector('#cre-price #cre-price').value;
                const prodStock = document.querySelector('#cre-stock #cre-stock').value;
                const maxId = products.reduce((prods,item)=> prods = prods > item.id ? prods: item.id,0 )
                const newProduct = {
                    id: maxId + 1,
                    code: prodCode,
                    description: prodDesc,
                    price: prodPrice,
                    stock: prodStock
                }    
                products.push(new createProducts(newProduct))
                const fila = document.createElement('ul');
                fila.innerHTML = `
                Producto ${newProduct.code} creado
                <ul>Codigo: ${newProduct.code}
                    <li>Descripcion: ${newProduct.description}</li>
                    <li>Precio: ${newProduct.price}</li>
                    <li>Stock: ${newProduct.stock}</li>
                    <li>ID: ${newProduct.id}</li>
                </ul> 
                `
                fx.appendChild(fila);
            }    
        } else {
            alert('Ingrese un producto'); // poner el aviso en el mensaje del campo del form
        }
    }     
}    

function listProducts (e) {
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
    });
    if(e.target.id = 'find-btn'){
        const prodCode = document.querySelector('#find-code #find-code').value
        if (prodCode !== null){
            const prodIdx = products.findIndex(prod => prod.code === prodCode);
            if(prodIdx !=-1) { 
                const fila = document.createElement('ul');
                fila.innerHTML = `
                <ul>Codigo: ${products[prodIdx].code}
                    <li>Descripcion: ${products[prodIdx].description}</li>
                    <li>Precio: ${products[prodIdx].price}</li>
                    <li>Stock: ${products[prodIdx].stock}</li>
                    <li>ID: ${products[prodIdx].id}</li>
                </ul> 
                `
                fx.appendChild(fila);
            } else {
                alert('Codigo inexistente'); // poner el aviso en el mensaje del campo del form
            }    
        } else {
            alert('Ingrese un producto'); // poner el aviso en el mensaje del campo del form
        }
    }
}    

function productStatus() {
    e.preventDefault();
    if(e.target.id = 'find-btn'){
        const prodCode = document.querySelector('#find-code #find-code').value
        if (prodCode !== null){
            const prodIdx = products.findIndex(prod => prod.code === prodCode);
            if(prodIdx !=-1) { 
                const fila = document.createElement('ul');
                fila.innerHTML = `
                <ul>Codigo: ${products[prodIdx].code}
                    <li>Descripcion: ${products[prodIdx].description}</li>
                    <li>Precio: ${products[prodIdx].price}</li>
                    <li>Stock: ${products[prodIdx].stock}</li>
                    <li>ID: ${products[prodIdx].id}</li>
                </ul> 
                `
                fx.appendChild(fila);
            } else {
                alert('Codigo inexistente'); // poner el aviso en el mensaje del campo del form
            }    
        } else {
            alert('Ingrese un producto'); // poner el aviso en el mensaje del campo del form
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
                const fila = document.createElement('ul');
                fila.innerHTML = `
                <ul>Código: ${products[prodIdx].code} 
                    <li>Descripción: ${products[prodIdx].description}</li>
                    <li>Precio: ${products[prodIdx].price}</li>
                    <li>Stock: ${products[prodIdx].stock}</li>
                    <li>Id: ${products[prodIdx].id}</li>
                </ul>
                `
                fx.appendChild(fila); // puede que falte indicar la clase del p del html
                let qty = document.querySelector('#issue #rcp-qty').value;
                if (qty !== null){
                    while (qty<=0 && !isNaN(qty)) {
                        alert('La cantidad debe ser mayor a cero'); // poner el aviso en el mensaje del campo del form
                        qty = document.querySelector('#issue #rcp-qty').value;
                    }    
                    if(qty > 0) {
                        products[prodIdx].stock = products[prodIdx].stock + qty;
                    } else{
                        alert('La cantidad debe ser mayor a cero'); // poner el aviso en el mensaje del campo del form
                    }    
                } else {
                    alert('La cantidad debe ser mayor a cero'); // poner el aviso en el mensaje del campo del form
                }    
            } else {
                alert('Codigo inexistente'); // poner el aviso en el mensaje del campo del form
            }    
        } else {
            alert('Ingrese un producto'); // poner el aviso en el mensaje del campo del form
        }
}    

function stockIssue(e) {
    e.preventDefault();
    if(e.target.id == 'iss-btn'){
        const prodCode = document.querySelector('#issue #iss-code').value
        if (prodCode !== null){ 
            const prodIdx = products.findIndex(prod => prod.code === prodCode);
            if(prodIdx !=-1) {
                const fila = document.createElement('ul');
                fila.innerHTML = `
                <ul>Código: ${products[prodIdx].code} 
                    <li>Descripción: ${products[prodIdx].description}</li>
                    <li>Precio: ${products[prodIdx].price}</li>
                    <li>Stock: ${products[prodIdx].stock}</li>
                    <li>Id: ${products[prodIdx].id}</li>
                </ul>
                `
                fx.appendChild(fila); // puede que falte indicar la clase del p del html
                let qty = document.querySelector('#issue #iss-qty').value;
                if (qty !== null){
                    while (qty<=0 && !isNaN(qty)) {
                        alert('La cantidad debe ser mayor a cero'); // poner el aviso en el mensaje del campo del form
                        qty = document.querySelector('#issue #iss-qty').value;
                    }    
                    if(qty > 0) {
                        if (products[prodIdx].stock >= qty) {
                            products[prodIdx].stock = products[prodIdx].stock - qty;
                        } else {
                            alert('No hay stock suficiente'); // poner el aviso en el mensaje del campo del form
                        }    
                    } else {
                        alert('La cantidad debe ser mayor a cero'); // poner el aviso en el mensaje del campo del form
                    }    
                } else {
                    alert('La cantidad debe ser mayor a cero'); // poner el aviso en el mensaje del campo del form
                }    
            } else {
                alert('Codigo inexistente'); // poner el aviso en el mensaje del campo del form
            }    
        } else {
            alert('Ingrese un producto'); // poner el aviso en el mensaje del campo del form
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
