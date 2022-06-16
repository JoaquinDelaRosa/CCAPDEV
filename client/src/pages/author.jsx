import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";


function Author({context, author}) {
    return (
    <Link to={"../profile?username=" + author}>
        {(author.length > 0) ? author : "<Anonymous>"}
    </Link>
    )
}

export default Author;