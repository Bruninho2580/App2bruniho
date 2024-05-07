import express, { json } from 'express';
import fs from "fs";
import bodyparser from "body-parser";

const app= express();
app.use(bodyparser.json());


const readData = () => {
    try{
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
        }
    catch (error)
    {
        console.log("error");
    }
    };
    
const writeData = (data) => {
    try{
    fs.writeFileSync("./db.json", JSON.stringify(data));
    }
    catch (error)
    {
        console.log("error");
    }

};

    app.get("/", (req, res) => {
    res.send("Bienvenidos!!!")
})

app.get("/clientes", (req, res)=>{ 
    const data = readData();
    res.json(data.clientes);
});

app.get("/clientes/:id", (req,res) => {
const data= readData();
const id= parseInt(req.params.id);
const cliente= data.clientes.find((cliente) => cliente.id===id);
res.json(cliente);

});

app.post("/clientes", (req,res)=> {
const data= readData();
const body = req.body;
const newCliente = {
id: data.clientes.length + 1,
...body,
};
data.clientes.push(newCliente);
writeData(data);
res.json(newCliente);
});

app.put("/Clientes/:id", (req, res)=> {
    const data= readData();
    const body = req.body;
    const id= parseInt(req.params.id);
    const clienteindex = data.clientes.findIndex((cliente) => cliente.id === id);
    data.clientes[clienteindex] = {
        ...data.clientes[clienteindex],
        ...body,
    };
    writeData(data);
    res.json({message: "Los parametros fueron actualizados correctamente"});
});

app.delete("/clientes/:id", (req, res) => {
    const data= readData();
    const id= parseInt(req.params.id);
    const clienteIndex = data.clientes.findIndex((cliente) => cliente.id === id);
    data.clientes.splice(clienteIndex, 1);
    writeData(data);
    res.json({message:"El cliente fué borrado"});
});

app.listen(3000, () => {
    console.log('El servidor esta vivo en el puerto 3000')
});