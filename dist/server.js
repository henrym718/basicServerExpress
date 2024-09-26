"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
// Base de datos simulada de usuarios
const db = [
    { id: 1, name: "Henry", active: true },
    { id: 2, name: "Selene", active: true },
    { id: 3, name: "Paola", active: true },
];
class App {
    constructor() {
        this.app = (0, express_1.default)(); // Inicializa la aplicación Express
        this.handleMidleware(); // Maneja los middlewares
        this.hanldeRoutes(); // Configura las rutas de la API
    }
    // Configura los middlewares necesarios
    handleMidleware() {
        this.app.use(express_1.default.json());
    }
    //Usecases
    // Crea un nuevo usuario
    create(req, res) {
        const { name } = req.body;
        const newUser = {
            id: db.length + 1,
            name,
            active: true,
        };
        db.push(newUser);
        res.json(db);
    }
    // Obtiene un usuario por su ID
    getbyid(req, res) {
        const { id } = req.params;
        const user = db.find((user) => user.id == +id);
        if (!user)
            res.send("User not found");
        res.json(user);
    }
    // Actualiza un usuario por su ID
    updatebyid(req, res) {
        const { id } = req.params;
        const index = db.findIndex((user) => user.id === +id);
        if (index === -1)
            res.send("User not found");
        db[index] = Object.assign(Object.assign({}, db[index]), req.body);
        res.json(db[index]);
    }
    // Elimina un usuario por su ID
    deletebyid(req, res) {
        const { id } = req.params;
        const users = db.filter((user) => user.id !== +id);
        if (db.length === users.length)
            res.send("User not found");
        db.length = 0;
        db.push(...users);
        res.send("Operation is ok");
    }
    // Configura las rutas de la aplicación
    hanldeRoutes() {
        this.app.post("/create", this.create);
        this.app.get("/getbyid/:id", this.getbyid);
        this.app.put("/updatebyod/:id", this.updatebyid);
        this.app.delete("/deletebyid/:id", this.deletebyid);
    }
}
// Inicializa la aplicación Express
const app = new App().app;
exports.app = app;
