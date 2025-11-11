// Base de datos de productos - Array dinámico
const productos = [
    {
        id: 1,
        nombre: "Trufas de Chocolate Negro",
        descripcion: "Deliciosas trufas elaboradas con chocolate negro premium 70% cacao",
        precio: 12.99,
        categoria: "trufas",
        imagen: "https://images.unsplash.com/photo-1590080876876-436c0e0e1e5b?w=500&h=400&fit=crop"
    },
    {
        id: 2,
        nombre: "Bombones Surtidos",
        descripcion: "Caja de 12 bombones artesanales con diferentes rellenos",
        precio: 18.50,
        categoria: "bombones",
        imagen: "https://images.unsplash.com/photo-1606312619070-d48b4cda8e0f?w=500&h=400&fit=crop"
    },
    {
        id: 3,
        nombre: "Tableta de Chocolate con Leche",
        descripcion: "Tableta de 200g de chocolate con leche suave y cremoso",
        precio: 8.99,
        categoria: "tabletas",
        imagen: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500&h=400&fit=crop"
    },
    {
        id: 4,
        nombre: "Chocolate Blanco con Fresas",
        descripcion: "Chocolate blanco premium con trozos de fresa deshidratada",
        precio: 10.50,
        categoria: "tabletas",
        imagen: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&h=400&fit=crop"
    },
    {
        id: 5,
        nombre: "Trufas de Café",
        descripcion: "Trufas con ganache de café colombiano y chocolate negro",
        precio: 14.99,
        categoria: "trufas",
        imagen: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=500&h=400&fit=crop"
    },
    {
        id: 6,
        nombre: "Bombones de Licor",
        descripcion: "Bombones rellenos de licores finos - Solo para adultos",
        precio: 22.00,
        categoria: "bombones",
        imagen: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&h=400&fit=crop"
    },
    {
        id: 7,
        nombre: "Chocolate Amargo 85%",
        descripcion: "Tableta de chocolate amargo con 85% de cacao orgánico",
        precio: 11.99,
        categoria: "tabletas",
        imagen: "https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=500&h=400&fit=crop"
    },
    {
        id: 8,
        nombre: "Trufas de Frambuesa",
        descripcion: "Trufas con centro de frambuesa y cobertura de chocolate",
        precio: 13.50,
        categoria: "trufas",
        imagen: "https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=500&h=400&fit=crop"
    },
    {
        id: 9,
        nombre: "Caja de Chocolates Premium",
        descripcion: "Selección especial de 24 chocolates artesanales variados",
        precio: 35.00,
        categoria: "chocolates",
        imagen: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&h=400&fit=crop"
    },
    {
        id: 10,
        nombre: "Bombones de Caramelo",
        descripcion: "Bombones con delicioso centro de caramelo salado",
        precio: 16.99,
        categoria: "bombones",
        imagen: "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?w=500&h=400&fit=crop"
    },
    {
        id: 11,
        nombre: "Chocolate con Almendras",
        descripcion: "Tableta de chocolate con leche y almendras tostadas",
        precio: 9.99,
        categoria: "tabletas",
        imagen: "https://images.unsplash.com/photo-1575735252886-fec4e8949e74?w=500&h=400&fit=crop"
    },
    {
        id: 12,
        nombre: "Trufas de Menta",
        descripcion: "Trufas refrescantes con esencia natural de menta",
        precio: 12.50,
        categoria: "trufas",
        imagen: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=500&h=400&fit=crop"
    },
    {
        id: 13,
        nombre: "Chocolate con Avellanas",
        descripcion: "Chocolate cremoso con pasta de avellanas de primera calidad",
        precio: 10.99,
        categoria: "tabletas",
        imagen: "https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=500&h=400&fit=crop"
    },
    {
        id: 14,
        nombre: "Bombones de Naranja",
        descripcion: "Bombones con ganache de naranja natural y chocolate negro",
        precio: 17.50,
        categoria: "bombones",
        imagen: "https://images.unsplash.com/photo-1609663398779-e3a1d6d69ea2?w=500&h=400&fit=crop"
    },
    {
        id: 15,
        nombre: "Caja San Valentín",
        descripcion: "Caja especial con 16 chocolates en forma de corazón",
        precio: 28.00,
        categoria: "chocolates",
        imagen: "https://images.unsplash.com/photo-1518057111178-44a106bad636?w=500&h=400&fit=crop"
    },
    {
        id: 16,
        nombre: "Trufas de Coco",
        descripcion: "Trufas con chocolate blanco y ralladura de coco natural",
        precio: 13.99,
        categoria: "trufas",
        imagen: "https://images.unsplash.com/photo-1582054593960-0a1e8e8a8275?w=500&h=400&fit=crop"
    }
];

// Función para obtener un producto por ID
function obtenerProductoPorId(id) {
    return productos.find(producto => producto.id === id);
}

// Función para obtener productos por categoría
function obtenerProductosPorCategoria(categoria) {
    if (categoria === 'todos') {
        return productos;
    }
    return productos.filter(producto => producto.categoria === categoria);
}

// Función para buscar productos
function buscarProductos(termino) {
    const terminoLower = termino.toLowerCase();
    return productos.filter(producto =>
        producto.nombre.toLowerCase().includes(terminoLower) ||
        producto.descripcion.toLowerCase().includes(terminoLower)
    );
}