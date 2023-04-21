const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8080;

app.use(express.json());

class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const existingProduct = this.products.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      console.log("Este producto ya existe.");
    } else if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Ingrese los datos para cada uno de sus campos.");
    } else {    
      const newProduct = {
        id: this.productIdCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(newProduct);
      this.saveProductsToFile(); // Guardar los productos en el archivo JSON
      console.log(`El producto "${newProduct.title}" ha sido agregado satisfactoriamente.`);
    }
  };

  // Resto de las funciones del ProductManager ...

  saveProductsToFile = () => {
    const data = JSON.stringify(this.products);
    fs.writeFile('products.json', data, (err) => {
      if (err) {
        console.log('Error al guardar los productos en el archivo JSON:', err);
      } else {
        console.log('Los productos han sido guardados en el archivo JSON.');
      }
    });
  };
}

const productManager = new ProductManager();

// Agregar algunos productos de ejemplo
productManager.addProduct(
  "producto prueba 1",
  "Este es un producto prueba 1",
  200,
  "Sin imagen",
  "abc123",
  25
);
productManager.addProduct(
  "producto prueba 2",
  "Este es un producto prueba 2",
  300,
  "Sin imagen",
  "xyz456",
  20
);
productManager.addProduct(
    "producto prueba 3",
    "Este es un producto prueba 3",
    400,
    "Sin imagen",
    "xlajnf",
    20
);
productManager.addProduct(
    "producto prueba 5",
    "Este es un producto prueba 5",
    500,
    "Sin imagen",
    "xylkadmbge",
    20
);
productManager.addProduct(
    "producto prueba 6",
    "Este es un producto prueba 6",
    600,
    "Sin imagen",
    "xpiuh",
    20
);
productManager.addProduct(
    "producto prueba 7",
    "Este es un producto prueba 7",
    700,
    "Sin imagen",
    "lmnfai",
    20
);
productManager.addProduct(
    "producto prueba 8",
    "Este es un producto prueba 8",
    800,
    "Sin imagen",
    "2342mlkn",
    20
);
productManager.addProduct(
    "producto prueba 9",
    "Este es un producto prueba 9",
    900,
    "Sin imagen",
    "9mpa3493",
    20
);
productManager.addProduct(
    "producto prueba 10",
    "Este es un producto prueba 10",
    1000,
    "Sin imagen",
    "kantngn98",
    20
);

// Resto de los productos de ejemplo ...

app.get('/products', (req, res) => {
  const { limit } = req.query;
  const productsToReturn = limit
    ? productManager.products.slice(0, limit)
    : productManager.products;
  res.send(productsToReturn);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const productToReturn = productManager.products.find(
    (product) => product.id === Number(id)
  );
  if (productToReturn) {
    res.send(productToReturn);
  } else {
    res.status(404).send({ error: 'Producto no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

