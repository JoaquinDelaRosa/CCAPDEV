function SearchBar({setPostList}){
  return (
  <div className="flex w-full text-black px-10 pt-5" >
    <form className="w-screen" method = "GET" action={"../feed"}>
      <input type="text" 
        placeholder="Search for a post" 
        className="w-5/6"
        name="q"
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