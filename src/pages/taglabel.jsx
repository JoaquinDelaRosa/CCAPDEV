import React from "react";

function TagLabel({content}){
    return (
        <div>
            <div className="bg-sky-200 py-0.5 px-3 w-fit mr-4 mb-2 rounded-full">
                <p className="text-1xl font-bold"> 
                    {content} 
                </p>
            </div>
        </div>
    )
}

export default TagLabel;