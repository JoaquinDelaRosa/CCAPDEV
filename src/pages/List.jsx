import { React, useState } from 'react'
import data from "./feed.jsx"
import Postbox from "./postbox"

function List(props) {
    //create a new array by filtering the original array
    const filteredData = data.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        filteredData.map(element => { 
            return (
              <div key ={element.id} className="flex border-4 px-4 py-2">
                <Postbox content={element}/>
              </div>
            )}
          )
    )
}

export default List