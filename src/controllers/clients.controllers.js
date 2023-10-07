import data from '../models/data.json' assert { type: "json" };
// import {fs} from 'fs';


const clients = data.clients;

export const getClients = (req, res) => {
    res.json(clients);
}

export const getClientById = (req, res) => {
    const {id} = req.params;
    const client = clients.find(client => client.id == id);
    res.json(client)
}

export const createClient = (req, res) => {
    const {id, client_name} = req.body;
    const newClient = {id, client_name};

    // fs.readFile('data.json', 'utf8', (err, data) => {
    //   if (err) {
    //     console.error('Error al leer el archivo JSON:', err);
    //     return;
    //   }
    //   const json = JSON.parse(data);
    //   // Ahora tienes el contenido del archivo JSON en el objeto 'json'.
    // });
    
    // clients.push(newClient);
}

export const updateClient = (req, res) => {
    return null;
}

export const deleteClient = (req, res) => {
    return null;
}
