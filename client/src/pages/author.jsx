import React from "react";
import { Link } from "react-router-dom";


function Author({context, author}) {
    return (
    <span className={(author.length > 0 ? "hover:text-blue-300" : "")}>
        { author.length > 0  && 
        <Link to={"../profile?id=" + author}>
            {(author.length > 0) ? author : "<Anonymous>"}
        </Link>
        }

        { author.length <= 0 &&
          "<Anonymous>"
        }
    </span>
    )
}

export default Author;