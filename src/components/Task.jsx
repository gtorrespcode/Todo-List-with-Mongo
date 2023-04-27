import { useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { IoMdRemoveCircleOutline} from "react-icons/io";


export default function Task(props){

    const [isDecorated, setIsDecorated] = useState(false);


    function Remove(){
        props.onRemove();
        if (isDecorated){
            setIsDecorated(!isDecorated);
        }
        
    }

    function Decorate(){
        setIsDecorated(!isDecorated);
    }


  

    return (
        <div className="py-4 w-[98%] h-[1%] my-[6%] bg-[#3E76B6] flex items-center rounded-lg shadow-[2px_2px_2px_black]">
        <p className={isDecorated ? "text-xs w-[80%] px-4 break-words line-through decoration-2 text-white" : "text-xs w-[80%] px-4 break-words text-white"}>{props.content}</p>

        <div>
        <GiConfirmed onClick={Decorate} className="mr-1 inline cursor-pointer  text-white hover:text-black"/>
        <IoMdRemoveCircleOutline onClick={Remove} className="inline cursor-pointer text-white hover:text-black"/>
        </div>
        
        
        </div>
    )
}