import React from "react";


function Unauthorized() {
    return (
    <div className="flex items-center justify-center h-screen">
        <span>
            <p className="text-3xl">401 Unauthorized</p>
            <br/>
            <p>You do not have permission to edit this page</p>
        </span>
    </div>
    )
}

export default Unauthorized;