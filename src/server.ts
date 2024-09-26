import express, { Application, Request, Response } from "express";

// Definición de la interfaz para un usuario
interface User {
  id: number;
  name: string;
  active: boolean;
}

// Base de datos simulada de usuarios
const db: User[] = [
  { id: 1, name: "Henry", active: true },
  { id: 2, name: "Selene", active: true },
  { id: 3, name: "Paola", active: true },
];

class App {
  app: Application;

  constructor() {
    this.app = express(); // Inicializa la aplicación Express
    this.handleMidleware(); // Maneja los middlewares
    this.hanldeRoutes(); // Configura las rutas de la API
  }

  // Configura los middlewares necesarios
  handleMidleware() {
    this.app.use(express.json());
  }

  //Usecases

  // Crea un nuevo usuario
  create(req: Request, res: Response) {
    const { name } = req.body;
    const newUser: User = {
      id: db.length + 1,
      name,
      active: true,
    };
    db.push(newUser);
    res.json(db);
  }

  // Obtiene un usuario por su ID
  getbyid(req: Request, res: Response) {
    const { id } = req.params;
    const user = db.find((user) => user.id == +id);
    if (!user) res.send("User not found");
    res.json(user);
  }

  // Actualiza un usuario por su ID
  updatebyid(req: Request, res: Response) {
    const { id } = req.params;
    const index = db.findIndex((user) => user.id === +id);
    if (index === -1) res.send("User not found");
    db[index] = { ...db[index], ...req.body };
    res.json(db[index]);
  }

  // Elimina un usuario por su ID
  deletebyid(req: Request, res: Response) {
    const { id } = req.params;
    const users = db.filter((user) => user.id !== +id);
    if (db.length === users.length) res.send("User not found");
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
export { app };
