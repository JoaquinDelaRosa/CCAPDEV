import React, { useEffect, useState } from "react";
import parseDate from "../utils/date";
import { Link} from "react-router-dom";

const searchURL = '/api/post/favorited';

function UserSaves({id}){
    const [postList, setPostList] = useState([])
    
    useEffect( () => {
      if (id === "")
        return;
        
        let data = fetch(searchURL + "?id=" + id, {
            method : "GET",
            headers : {
              'Content-type' : 'application/json'
            },
          })
          
          .then((response) => {
            if (response) {
              return response.json();
            }
          })
          .catch((error) => {
            console.log("Error in retrieving posts" + error)
          });
          
          if (data) {
            data.then( (postData) => {
              if (postData) {
                setPostList(postData);
              } else{
                setPostList([]);
              }
            });
          }
    }, [id])

    function sortDateAsc(a, b) {
      const d1 = new Date(a.date.toString())
      const d2 = new Date(b.date.toString())
      const t1 = d1.getTime()
      const t2 = d2.getTime();
      return (t1 > t2) ? 1 : -1
    }

    function sortDateDesc(a, b) {
      const d1 = new Date(a.date.toString())
      const d2 = new Date(b.date.toString())
      const t1 = d1.getTime()
      const t2 = d2.getTime();
      return (t1 < t2) ? 1 : -1
    }


    return (
      <span>
          <div className="pl-2 pb-1 text-cyan-400 select-none">
            <b>SAVES</b>
            <span>
                {/* ASCENDING */}
                <button className="tooltip text-orange-400 float-right hover:bg-gray-900 px-2 rounded-md" 
                onClick={
                  (e) => {
                      // sort by date (other categories can be added next time)
                      postList.sort((a, b) => {
                        const d1 = new Date(a.date.toString())
                        const d2 = new Date(b.date.toString())
                        const t1 = d1.getTime()
                        const t2 = d2.getTime();
                        return (t1 > t2) ? 1 : -1
                      });
  
                      setPostList(Array.from(postList))
                  }
                }>
                &#129041;
                <span className="tooltiptext opacity-90">
                    sort asc date
                </span>
                </button>
                {/* DESCENDING */}
                <button className="tooltip text-orange-400 float-right hover:bg-gray-900 px-2 rounded-md" 
                onClick={
                  (e) => {
                      // sort by date (other categories can be added next time)
                      postList.sort((a, b) => {
                        const d1 = new Date(a.date.toString())
                        const d2 = new Date(b.date.toString())
                        const t1 = d1.getTime()
                        const t2 = d2.getTime();
                        return (t1 < t2) ? 1 : -1
                      });
                      setPostList(Array.from(postList));
                  }
                }>
                &#129043;
                <span className="tooltiptext opacity-90">
                    sort desc date
                </span>
                </button>
                {/* Sort by Upvote ASCENDING*/}
                <button className="tooltip text-green-700 float-right hover:bg-gray-900 px-2 rounded-md" 
                onClick={
                (e) => {
                    postList.sort((a, b) => {
                      if(a.upvotes.length === b.upvotes.length)
                        return sortDateDesc(a, b);
                      return (a.upvotes.length > b.upvotes.length) ? 1 : -1
                    });
                    setPostList(Array.from(postList));
                }
                }>
                ???
                <span className="tooltiptext opacity-90">
                    sort asc upvotes
                </span>
                </button>
                {/* Sort by Upvote DESCENDING*/}
                <button className="tooltip text-green-700 float-right hover:bg-gray-900 px-2 rounded-md" 
                onClick={
                (e) => {
                    postList.sort((a, b) => {
                      if(a.upvotes.length === b.upvotes.length)
                        return sortDateDesc(a, b);
                      return (a.upvotes.length < b.upvotes.length) ? 1 : -1
                    });
                    setPostList(Array.from(postList));
                }
                }>
                ???
                <span className="tooltiptext opacity-90">
                    sort desc upvotes
                </span>
                </button>
              {/* Sort by Downvote ASCENDING*/}
              <button className="tooltip text-red-700 float-right hover:bg-gray-900 px-2 rounded-md" 
                onClick={
                (e) => {
                    postList.sort((a, b) => {
                      if(a.downvotes.length === b.downvotes.length)
                        return sortDateDesc(a, b);
                      return (a.downvotes.length > b.downvotes.length) ? 1 : -1
                    });
                    setPostList(Array.from(postList));
                }
                }>
                ???
                <span className="tooltiptext opacity-90">
                    sort asc downvotes
                </span>
                </button>
                {/* Sort by Downvote DESCENDING*/}
                <button className="tooltip text-red-700 float-right hover:bg-gray-900 px-2 rounded-md" 
                onClick={
                (e) => {
                    postList.sort((a, b) => {
                      if(a.downvotes.length === b.downvotes.length)
                        return sortDateDesc(a, b);
                      return (a.downvotes.length < b.downvotes.length) ? 1 : -1
                    });
                    setPostList(Array.from(postList));
                }
                }>
                ???
                <span className="tooltiptext opacity-90">
                    sort desc downvotes
                </span>
                </button>
            </span>
          </div>
          <div className="py-1 min-h-150 font-mono rounded-md ring-1 ring-gray-400 px-1 bg-gray-900">
            <div className="p-2">
              <div className="py-2" id="right-posts" >
                { 
                    (postList.length === 0 || id === "")  && 
                    <span className="flex justify-center items-center">
                        Mmm... Pretty quiet here.
                    </span>
                }
                {
                    !(postList.length === 0 || id === "") && 
                    postList.map(element => {
                      return (
                        element && element.date && element.id && 
                        <div className="border-b border-b-blue-200 pb-2 mb-2 flex items-start py-1 text-wText" key = {element.id} id={element.id}>
                          <Link to={("/postpage/" + element.id)} state={{id: element.id}}>
                            <span className="pr-3" id={element.id + "image"}>
                              <img src={element.mediaPath} alt={element.mediaAlt} className="w-16 h-16 rounded-sm" id={element.id + "img"}></img>
                              </span>
                              Title: {element.title}
                              <br/>
                              Date: {parseDate(new Date(element.date)).toString()}
                          </Link>
                        </div>
                      )
                  })
                }
            </div>
          </div>
        </div>
      </span>
    )
}

export default UserSaves;