import { useState, useEffect } from "react";
import Task from "./Task"
import { IoIosAddCircle} from "react-icons/io";
import axios from "axios";



export default function Screen (){

    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState([]); 

    useEffect(() => {
        axios.get("http://localhost:3000/tasks")
        .then(response => {
            setTasks(response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    

    function handleChange(event){
        setInputValue(event.target.value);
        
    }

    function addTasks(event) {
        event.preventDefault();
        if (inputValue){
            const newTask = {content: inputValue};
            axios.post("http://localhost:3000/add-task", newTask)
             
            .then(response => {
                axios.get("http://localhost:3000/tasks")

                .then(response => {
                    setTasks(response.data);
                })

                .catch(error => {
                    console.log(error);
                });
            })
            
            .catch(error => {
                console.log(error);
            });

            setInputValue("");
        }     
    }



    function deleteTask(contentQueue){
        
        axios.delete("http://localhost:3000/remove-task", {data : {content : contentQueue}})

        .then(() => {
            axios.get("http://localhost:3000/tasks")

            .then(response => {
                setTasks(response.data);
            })

            .catch(error => {
                console.log(error);
            });
        })
        .catch((err) => {
            console.log(err);
        })

    }

    

  
   

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-[#56DBA4] to-[#346398] py-[10%] ">
            <div className="w-[70%] h-[85%] mx-auto lg:w-[30%]">
                <header className="p-[8%] flex justify-center items-center bg-white mb-[5%] border-[1px] border-black shadow-[2px_2px_2px_black]">
                <h1 className="text-xl">My ToDo List</h1>
                </header>
                <div className="min-h-[80%] bg-white px-[5%] mb-[5%] flex flex-col  border-[1px] border-black shadow-[2px_2px_2px_black]">
                    

                
                    {tasks.map((task, id) => {
                        return <Task key={id} content={task} onRemove={() => deleteTask(task)}/>
                    })}
                  
                   
                   
                </div>
        
                <form className="bg-white flex items-center border-[1px] border-black shadow-[2px_2px_2px_black]">
                    <textarea value={inputValue} onChange={handleChange} rows="3" placeholder="Escreva sua tarefa aqui..." className="text-white text-xs w-[65%] bg-[#3E76B6] m-[5%] p-[2%] border-[1px] border-black rounded-lg"/>
                    <button onClick={addTasks} type="submit" className="w-8 pl-1 "><IoIosAddCircle className="w-10 h-10 text-[#3E76B6]" /></button>
                </form>
                
            </div>
        </div>
    )
}



