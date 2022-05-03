import React, { useState} from "react";

// TODO (Maintenance: Refactor the existing textareas so that they can use Textbox. Refactor Textbox to be suited for most contexts.

function TextBox({reply, setReply}){
  const [text, setText] = useState("");
  const [hidden, setHidden] = useState(false)
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setReply(text);
    setText("");
    setHidden(true);
  }

  return (
    <div hidden={hidden}>
      <form onSubmit={handleSubmit}>
        <textarea
        className="w-full h-fit mb-1 text-lg font-mono bg-slate-50 overflow-hidden resize-none text-black"
        onChange={(e) => {
            setText(e.target.value);
            e.target.style.height = 'inherit';
            e.target.style.height = `${e.target.scrollHeight}px`; 
        }}
        id = "text"
        name = "text"
        required
        />

        <input type="submit"
        defaultValue={"Post"}
        disabled={text===""}
        className= {"w-auto text-white mt-2 text-lg font-mono " + 
        (text === "" ? "bg-blue-200" : "bg-green-500 hover:cursor-pointer")}
        />
      </form>
    </div>
  )
}

export default TextBox;