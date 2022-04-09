import React, {useState} from "react";

function TextBox({onReply}){
  const [text, setText] = useState("");

  return (
    <div>
      <form>
        <textarea
        className="w-full h-fit mb-1 text-lg font-mono bg-slate-50 overflow-hidden resize-none"
        onChange={(e) => {
            setText(e.target.value);
            e.target.style.height = 'inherit';
            e.target.style.height = `${e.target.scrollHeight}px`; 
        }}
        required
        />

        <input type="submit"
        defaultValue={"Post"}
        disabled={text===""}
        className= {"w-auto text-white mt-2 text-lg font-mono " + 
        (text === "" ? "bg-blue-200" : "bg-green-500 hover:cursor-pointer")}
        onSubmit={() => {
          if(text!=="")
            onReply(text)
        }}
        />
      </form>
    </div>
  )
}

export default TextBox;