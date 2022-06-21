import React from "react";

function TagLabel({content, text = "text-white", bg="bg-sky-200"}){
  return (
    <div>
      <div className= {bg + " " + text + " py-0.5 px-4 w-fit mr-4 mb-2 rounded-full"}>
        <p className="text-2xl font-bold font-mono text-center"> 
          {content} 
        </p>
      </div>
    </div>
  )
}

export default TagLabel;