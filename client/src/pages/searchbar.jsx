import { useState } from "react";

function SearchBar({setPostList}){
  const [query, setQuery] = useState("");

  return (
  <div className="flex w-full text-black px-10 pt-5" >
    <form className="w-screen" method = "GET" action={"/#/feed?q=" + query }>
      <input type="text" 
        placeholder="Search for a post" 
        className="w-5/6"
        onChange={(e) => {setQuery(e.target.value)}}
      />

      <input type = "submit"
        className= "text-white text-3xl hover:cursor-pointer"
        value="🔍"
      />
    </form>
  </div>
  )
}


export default SearchBar;