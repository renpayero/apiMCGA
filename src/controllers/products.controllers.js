import data from '../models/data.json' assert { type: "json" };
import * as fs from 'node:fs';

const products = data.products;

const getProducts = (req, res) => {
  res.json(products);
}

const getProductById = (req, res) => {
  const { id } = req.params;
  const product = products.find( product => product.id == id);

  return product ? res.json(product) : res.send("No existe el producto"); //Si existe el product lo retorna, sino muestra un mensaje de que no existe
}

const createProduct = async (req, res) => {
  const { id, product_name, price } = req.body;

  //Validamos que no venga un campo vacio del front.
  if ( [id, product_name, price].includes("") ) {
    return res.status(403).send("Hay campos vacíos");
  }
  
  try {
    //Traemos la data del archivo json y le agregamos en la variable el nuevo producto que vino del front.
    const data = await fs.promises.readFile('./src/models/data.json');
    const jsonData = JSON.parse(data);
    jsonData.products.push(req.body);

    //Modifica el json con el producto nuevo agregado.
    await fs.promises.writeFile("./src/models/data.json", JSON.stringify(jsonData, null, 2), 'utf-8')
    return res.send("Producto creado exitosamente");

  } catch (error) {
    return res.status(403).send(`Hubo un error: ${error}`)
  }
}

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { product_name, price } = req.body;

  //Validamos que no venga un campo vacio del front.
  if ( [product_name, price].includes("") ) {
    return res.status(403).send("Hay campos vacíos");
  }

  try {
    //Traemos la data del archivo json 
    const data = await fs.promises.readFile('./src/models/data.json');
    const jsonData = JSON.parse(data);

    // Modificamos el producto comparando el ID del arreglo del json con el del front
    jsonData.products = jsonData.products.map(product => {
      if (product.id == id) {
        product.id = id,
        product.product_name = product_name;
        product.price = price;
      }
      return product;
    });

    //Modifica el archivo json con el producto nuevo editado.
    await fs.promises.writeFile("./src/models/data.json", JSON.stringify(jsonData, null, 2), 'utf-8')
    return res.send("Producto editado exitosamente");

  } catch (error) {
    return res.status(403).send(`Hubo un error: ${error}`)
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    //Traemos la data del archivo json
    const data = await fs.promises.readFile('./src/models/data.json');
    const jsonData = JSON.parse(data);

    //Filtramos los productos que tengan el ID diferente al que viene del front
    jsonData.products = jsonData.products.filter(product => product.id != id);

    //Modifica el archivo json con el producto nuevo editado.
    await fs.promises.writeFile("./src/models/data.json", JSON.stringify(jsonData, null, 2), 'utf-8')
    return res.send("Producto eliminado exitosamente");

  } catch (error) {
    return res.status(403).send(`Hubo un error: ${error}`)
  }
}



export {
  getProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct
}