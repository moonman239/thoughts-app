"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Thought } from "./types";

export default function Home() {
  const [thoughts,setThoughts] = useState<Thought[] | null>(null);
  const [userThought,setUserThought] = useState<Thought | null>(null);
  useEffect(()=>{
    fetch("api/thoughts")
    .then(response=>response.json() as Promise<Thought[]>)
    .then(thoughts=>setThoughts(thoughts))
  },[])
  return (  <div>
    <form onSubmit={async (event)=>{
      event.preventDefault();
      if (userThought !== null)
      {
        // submit to api/thoughts and check if the thought was uploaded successfully.
      const response = await fetch("api/thoughts",{
        method: "POST",
        body: JSON.stringify(userThought)
      })
      if (response.status === 201) // post created successfully
        console.log("submission successful")  
      else
        console.error(`server responded with status code ${response.status}`);
      }
      else
        alert("please input a thought");
    }}>
      please enter a thought:
      <textarea className="h-50 w-50" onChange={(event)=>setUserThought({content: event.target.value})}>

      </textarea>
      <button type="submit">Post Thought</button>
      <table>
        <tbody>
        {
        thoughts?.map(
          thought=>
          (<tr key={thought.id}>
            <td>{thought.created_at}</td>
            <td>{thought.content}</td>
            </tr>
          ))}
        </tbody>
      </table>

  </form>
  </div>);
}
