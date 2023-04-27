
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();


/* add express.json() */
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/taskDB');

const taskSchema = new mongoose.Schema({
    tContent: String
});

const Task = mongoose.model("Task", taskSchema);


app.get("/", async (req, res) => {
    try {
        res.send("Isso é apenas um servidor para alterar o banco de dados da minha lista de tarefas.");
    } catch(err){
        console.log(err);
    }
})

/* add app.get tasks*/

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        console.log("Tarefas obtidas:", tasks);
        const taksValues = tasks.map(myTask => myTask.tContent)
        res.send(taksValues);
    } catch(err){
        console.log(err);
        res.status(500).send("Erro ao obter tarefas");
    }
});



  /* add app.post */
  app.post("/add-task", async (req, res) => {
    try {
        const newTask = new Task({ tContent: req.body.content });
        await newTask.save();
        console.log("Tarefa salva com sucesso", newTask);
        res.send(newTask);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erro ao salvar tarefa");
    }
  });

  /* add app.delete*/

app.delete("/remove-task", async (req, res) => {
    try {
      const removedTask = await Task.findOneAndDelete({ tContent: req.body.content });
      if (!removedTask) {
        console.log("Não foi encontrado nenhum documento para excluir.");
        res.status(404).send();
        return;
      }
      console.log("Dados excluídos: ", removedTask);
      res.send();
    } catch (err) {
      console.log("Erro ao excluir dado:", err);
      res.status(500).send();
    }
  });






app.listen(3000, () => {
    console.log("O server está rodando na porta 3000");
});

