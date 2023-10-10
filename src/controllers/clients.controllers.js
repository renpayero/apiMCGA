import data from '../models/data.json' assert { type: "json" };
import * as fs from 'node:fs';


const clients = data.clients;

export const getClients = (req, res) => {
    res.json(clients);
}

export const getClientById = (req, res) => {
    const {id} = req.params;
    const client = clients.find(client => client.id == id);
    res.json(client)
}

export const createClient = async (req, res) => {
    const { id, client_name } = req.body;

    if ([id, client_name].includes("")) {
        return res.status(403).send("Campos incompletos");
    }

    try {
        //Traemos la data del archivo json y le agregamos en la variable el nuevo cliente que vino del front.
        const data = await fs.promises.readFile('./src/models/data.json');
        const jsonData = JSON.parse(data);
        jsonData.clients.push(req.body);
    
        //Modifica el json con el cliente nuevo agregado.
        await fs.promises.writeFile("./src/models/data.json", JSON.stringify(jsonData, null, 2), 'utf-8')
        return res.send("Cliente creado exitosamente");
    
      } catch (error) {
        return res.status(403).send(`Hubo un error: ${error}`)
      }
}

export const updateClient = async (req, res) => {
    const { id } = req.params;
    const { client_name } = req.body;

    if ([id, client_name].includes("")) {
        return res.status(403).send("Campos incompletos");
    }

    try {
        //Traemos la data del archivo json y le agregamos en la variable el nuevo client que vino del front.
        const data = await fs.promises.readFile('./src/models/data.json');
        const jsonData = JSON.parse(data);

        // Modificamos el cliente comparando el ID del arreglo del json con el del front
        jsonData.clients = jsonData.clients.map(client => {
            if (client.id == id) {
            client.id = Number(id),
            client.client_name = client_name;
            }
            return client;
        });
    
        //Modifica el json con el cliente nuevo agregado.
        await fs.promises.writeFile("./src/models/data.json", JSON.stringify(jsonData, null, 2), 'utf-8')
        return res.send("Cliente editado exitosamente");
    
      } catch (error) {
        return res.status(403).send(`Hubo un error: ${error}`)
      }
}

export const deleteClient = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(403).send("No se envió ningún cliente");
    }

    try {
        //Traemos la data del archivo json
        const data = await fs.promises.readFile('./src/models/data.json');
        const jsonData = JSON.parse(data);
    
        //Filtramos los clientes que tengan el ID diferente al que viene del front
        jsonData.clients = jsonData.clients.filter(client => client.id != id);
    
        //Modifica el archivo json con el cliente nuevo editado.
        await fs.promises.writeFile("./src/models/data.json", JSON.stringify(jsonData, null, 2), 'utf-8')
        return res.send("Cliente eliminado exitosamente");
    
      } catch (error) {
        return res.status(403).send(`Hubo un error: ${error}`)
      }
}
