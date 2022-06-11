

function SearchBar({setPostList}){
  
  return (
  <div className="flex w-full text-black px-10 pt-5">
    <input type="search" 
      className="w-5/6"
      placeholder="Search for a post" 
      onChange={event => {/* Handle search here*/ }}></input>
  </div>
  )
}


export default SearchBar;