const modules = [
    "@tailwindcss/forms@0.5.2",
    "@testing-library/jest-dom@5.16.4",
    "@testing-library/react@12.1.5",
    "@testing-library/user-event@13.5.0",
    "autoprefixer@10.4.7",
    "bcrypt@5.0.1",
    "concurrently@7.2.2",
    "cookie-parser@1.4.6",
    "cors@2.8.5",
    "date-and-time@2.3.1",
    "debug@2.6.9",
    "express-fileupload@1.4.0",
    "express@4.16.4",
    "http-errors@1.6.3",
    "jade@0.29.0",
    "js-cookie@3.0.1",
    "mongoose@6.4.1",
    "morgan@1.9.1",
    "node-uuid@1.4.8",
    "nodemon@2.0.18",
    "postcss@8.4.14",
    "react-dom@18.0.0",
    "react-router-dom@6.3.0",
    "react-scripts@5.0.1",
    "react@18.0.0",
    "tailwindcss@3.1.2",
    "web-vitals@2.1.4"
]

function About() {
  return (
    <div className="bg-gray-800 text-white min-h-full">
      <div id="post-section" className= "w-full min-h-full">
        <div id="title" className="px-10 h-fit pt-5 pb-3">
          <strong className="text-left font-extrabold font-sans text-4xl align-baseline tracking-wider"> 
            Trendbytes
          </strong>
        </div>

        <div className="px-10 h-fit pb-5">
          <p className="font-mono text-justify">
            An image board web application. 
          </p>
          
          <p className="font-mono text-justify">
            Made by: Chua Andrei; Dela Rosa, Joaquin; Ong, Shaun 
          </p>
          
          <div id="separator" className="h-[3rem]"/>
            <p className="font-mono text-justify">
                Node Modules Used: 
            </p>
        </div> 


        <div className=" w-fit h-auto px-12">
            {
                modules.map((value) => {
                return (
                  <div className="flex my-2">
                    <p className="font-mono text-justify"> 
                      {value} 
                    </p>
                  </div>
                )
                })
            }
        </div>

        <div id="footer" className="h-[3rem]"/>
      </div>
    </div>
  )
}

export default About;