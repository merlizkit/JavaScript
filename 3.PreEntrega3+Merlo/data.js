// el localStorage se reinicia cuando se carga la pagina del index.

const users = [
    {
        id: 1,
        user: 'Pepito',
        pass: '12345'
    }
]

const products = [
    {
        id: 1,
        code: 'P001',
        description: 'Producto 1',
        price: 1000,
        stock: 100
    },
    {
        id: 2,
        code: 'P002',
        description: 'Producto 2',
        price: 1050,
        stock: 75
    }
]

localStorage.setItem('users', JSON.stringify(users));
localStorage.setItem('products', JSON.stringify(products));