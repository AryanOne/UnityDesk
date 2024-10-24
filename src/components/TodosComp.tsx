"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Todo{
    id:number;
    content:String;
    done:Boolean
}

export function TodosComponent() {
    
    const [todo, setTodo] = useState("");
    const[list,setList]=useState<Todo[]>();
    
    useEffect(()=>{
       listHandler();
    },[]);

    const listHandler=async()=>{
        try{
            const getRes=await axios('http://localhost:3000/api/todoRoute');
            console.log('listhandler');
            setList(getRes.data);
        }catch(e){
            console.log("could not get todos")
        }
    }

    const todoHandler=async()=>{
        try{
            await axios.post('http://localhost:3000/api/todoRoute',{
                content:todo
            }); 
            setTodo("");
            listHandler();
        }catch(error){
            console.log("counted fetch data",error);
        }
    }

    return( 
        <div className="border w-[40rem] h-[45rem] m-5 p-10">
            <h1>
                Add Todos here:-
            </h1>

            <input 
                placeholder="enter todo.."
                value={todo}
                onChange={(e)=>{
                    setTodo(e.target.value);
                }}
                className="bg-black border rounded-lg w-[27rem] px-3 py-2" />
            
            <button
                onClick={todoHandler} 
                className="bg-red-700 font-bold ml-3 px-4 py-[0.6rem] rounded-lg">Add Tasks</button>
            
            <div className="border h-[35rem] mt-5">
                {
                    list && list.filter((item)=>!item.done).map((item)=>{
                        return( 
                            <div key={item.id} className="border-t flex">
                                <div className="flex justify-center items-center w-12">
                                    <button
                                        className="border rounded-full w-[1.2rem] h-[1.2rem] group active:w-[1.3rem] active:h-[1.3rem] active:ml[0.8rem]"
                                        onClick={async()=>{
                                            axios.put('http://localhost:3000/api/todoRoute',{
                                                id:item.id,
                                                done:true
                                            })
                                            listHandler();
                                        }}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                                            className="h-fully w-full opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-opacity duration-500 ease-in-out"
                                            style={{ transform: 'scale(0.95)' }}>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M16.5056 9.00958C16.2128 8.71668 15.7379 8.71668 15.445 9.00958L10.6715 13.7831L8.72649 11.8381C8.43359 11.5452 7.95872 11.5452 7.66583 11.8381C7.37294 12.1309 7.37293 12.6058 7.66583 12.8987L10.1407 15.3736C10.297 15.5299 10.5051 15.6028 10.7097 15.5923C10.8889 15.5833 11.0655 15.5104 11.2023 15.3735L16.5056 10.0702C16.7985 9.77735 16.7985 9.30247 16.5056 9.00958Z" fill="currentColor">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-3 pl-0">
                                    {item.content}
                                </div>
                            </div>
                        )}
                    )
                }
            </div>
        </div>
    )
}