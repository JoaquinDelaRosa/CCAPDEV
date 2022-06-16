import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";


function Author({context, author}) {
    return (
    <span className="hover:text-blue-300">
        <Link to={"../profile?username=" + author}>
            {(author.length > 0) ? author : "<Anonymous>"}
        </Link>
    </span>
    )
}

export default Author;