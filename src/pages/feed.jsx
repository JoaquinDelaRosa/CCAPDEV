import React, { useEffect, useState } from "react";
import Postbox from "./postbox";
import TagLabel from "./taglabel";

// TODO: Feed should fetch content from DB rather than content being hardcoded.
//       Handle searching by title and by tag

const content = [{
  "id": 1,
  "title": "Introducing The turboencabulator",
  "author": "Anonymous",
  "date": new Date(),
  "mediaPath": require("../images/sample.png"),
  "mediaAlt": "",
  "upvotes": 1534,
  "downvotes": 420,
  "favorites": 120,
  "views": 5401,
  "tags" : ["funny", "meme", "random", "technobabble"],
  "comments" : [ 
    {
      "id": 1,
      "author"    : "CoolDude21",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "Damn! That is cool dude",
      "upvotes"  : 500,
      "downvotes" : 20,
      "views"     : 550,
      "comments" : []
    },
    {
      "id": 2,
      "author"    : "SOngs",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "What is that?",
      "upvotes"  : 250,
      "downvotes" : 18,
      "views"     : 314,
      "comments" : []
    },
    {
      "id": 3,
      "author"    : "Insert_here",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "Hmmm... Interesting",
      "upvotes"  : 845,
      "downvotes" : 31,
      "views"     : 1062,
      "comments" : []
    },
    {
      "id": 4,
      "author"    : "Pokemon_Lover",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "Is that what pokeball are made of?",
      "upvotes"  : 156,
      "downvotes" : 210,
      "views"     : 404,
      "comments" : []
    },
    {
      "id": 5,
      "author"    : "Official_Harvard",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "We would like to admit you to Harvard University! Please contact us here: admissions@harvard",
      "upvotes"  : 456,
      "downvotes" : 12,
      "views"     : 651,
      "comments" : []
    }
  ]
}, 

{
  "id": 2,
  "title": "This is what smoking does...(cleaned 2-3 months ago)",
  "author": "nobody____special",
  "date": new Date(),
  "mediaPath": require("../images/p2.png"),
  "mediaAlt": "",
  "upvotes": 1110,
  "downvotes": 345,
  "favorites": 130,
  "views": 100,
  "tags" : ["health", "advisory", "science"],
  "comments" : [
    {
      "id": 1,
      "author"    : "UntrimmedBagel",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "I've been trying to get my GPU to quit smoking but it's a never ending battle",
      "upvotes"  : 15,
      "downvotes" : 12,
      "views"     : 20,
      "comments" : [
        {
          "id": 1,
          "author"    : "Duuuuuuuuuuh",
          "date"      : new Date(),
          "mediaPath" : null,
          "mediaAlt" : "",
          "body" : "Permanent 20% fps loss, sorry man",
          "upvotes"  : 15,
          "downvotes" : 12,
          "views"     : 20,
          "comments" : []
        }]
    },
    {
      "id": 2,
      "author"    : "mvffin",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "Sounds like it needs a patch",
      "upvotes"  : 88,
      "downvotes" : 12,
      "views"     : 13,
      "comments" : []
    },
    {
      "id": 3,
      "author"    : "Particular_Diet_4010",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "Everyone: Smoking kills you Pcmasterace: Smoking gets your components dusty Edit: Thank you all for the upvotes",
      "upvotes"  : 1104,
      "downvotes" : 102,
      "views"     : 3400,
      "comments" : []
    },
    {
      "id": 4,
      "author"    : "GGU_Doofus",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "Ugh. I do not miss being a repair tech. I'd see this all of the time. A few times, they would put me on call to do on-site repairs. Not only did the inside of the PC look like this, but the desk, chair, walls, etc. were all sticky and yellow. So gross.",
      "upvotes"  : 813,
      "downvotes" : 95,
      "views"     : 1674,
      "comments" : []
    },
    {
      "id": 5,
      "author"    : "MyrtleTurtle4u",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "Epilepsy Warning...lol",
      "upvotes"  : 94,
      "downvotes" : 8,
      "views"     : 415,
      "comments" : []
    }
  ]
}, 

{
  "id": 3,
  "title": "Does anyone know the name of this drawing technique in which you do shadows with lines? Do you guys know any good material that teaches how to draw like that? Btw the Drawing is Pythagoras by D. Cunego",
  "author": "Dragon_Leviosa",
  "date": new Date(),
  "mediaPath": require("../images/p3.png"),
  "mediaAlt": "",
  "upvotes": 1021,
  "downvotes": 48,
  "favorites": 44,
  "views": 100,
  "tags" : ["art", "style", "design", "question", "drawing"],
  "comments" : [
    {
      "id": 1,
      "author"    : "Kidkyotedc",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "Engraving is the process, crosshatching is the technique",
      "upvotes"  : 321,
      "downvotes" : 21,
      "views"     : 602,
      "comments" : [
        {
          "id": 1,
          "author"    : "LuunaMuuna",
          "date"      : new Date(),
          "mediaPath" : null,
          "mediaAlt" : "",
          "body" : "they are in fact, engravings",
          "upvotes"  : 20,
          "downvotes" : 0,
          "views"     : 102,
          "comments" : []
        }]
    },
    {
      "id": 2,
      "author"    : "CoughingFish73",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "The best resource I have found is Alphonso Dunn. I bought his books and watch his videos on YouTube. He is the reason I got into pen and ink to begin with",
      "upvotes"  : 112,
      "downvotes" : 12,
      "views"     : 350,
      "comments" : []
    },
    {
      "id": 3,
      "author"    : "mlc2475",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "Not technically crosshatching. Specifically what you are looking at is an intaglio (engraving) piece but the style is called cross contour where your lines follow the contour of the surface and intersect at 30-45 degrees. This one is done using hard ground",
      "upvotes"  : 218,
      "downvotes" : 34,
      "views"     : 280,
      "comments" : []
    },
    {
      "id": 4,
      "author"    : "olibolicoli",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "As a previous commenter said, this is crosshatching. You might want to look up engraving or etching as those also have similar art styles.",
      "upvotes"  : 70,
      "downvotes" : 9,
      "views"     : 120,
      "comments" : []
    },
    {
      "id": 5,
      "author"    : "Same_Dragonfruit_805",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "Look up Albrecht Dürer My favorite of his ingravings is the Is 4 horsemen of the Apocalypse.",
      "upvotes"  : 7,
      "downvotes" : 0,
      "views"     : 25,
      "comments" : []
    }
  ]
}, 

{
  "id": 4,
  "title": "Overwatch vs TF2, Character Types",
  "author": "HEV_tux",
  "date": new Date(),
  "mediaPath": require("../images/p4.png"),
  "mediaAlt": "",
  "upvotes": 4195,
  "downvotes": 794,
  "favorites": 642,
  "views": 100,
  "tags" : ["game", "funny", "meme", "tf2", "overwatch", "character-comparison"],
  "comments" : [
    {
    "id": 1,
    "author"    : "UniverseBear",
    "date"      : new Date(),
    "mediaPath" : null,
    "mediaAlt" : "",
    "body" : "Woah woah woah, sniper's just working a job mate.",
    "upvotes"  : 4804,
    "downvotes" : 694,
    "views"     : 6074,
    "comments" : [
      {
        "id": 1,
        "author"    : "atomicBlaze21",
        "date"      : new Date(),
        "mediaPath" : null,
        "mediaAlt" : "",
        "body" : "It's challenging work.",
        "upvotes"  : 20,
        "downvotes" : 0,
        "views"     : 102,
        "comments" : []
      }]
  },
  {
    "id": 2,
    "author"    : "1creeperbomb",
    "date"      : new Date(),
    "mediaPath" : null,
    "mediaAlt" : "",
    "body" : "The voice lines in the game really nail every character's personality.",
    "upvotes"  : 2506,
    "downvotes" : 195,
    "views"     : 3129,
    "comments" : []
  },
  {
    "id": 3,
    "author"    : "N0tional",
    "date"      : new Date(),
    "mediaPath" : null,
    "mediaAlt" : "",
    "body" : "Do you believe in magic?",
    "upvotes"  : 758,
    "downvotes" : 31,
    "views"     : 1062,
    "comments" : []
  },
  {
    "id": 4,
    "author"    : "Gyarydos",
    "date"      : new Date(),
    "mediaPath" : null,
    "mediaAlt" : "",
    "body" : "I’m not a crazed gunman dad, I’m an assassin",
    "upvotes"  : 2584,
    "downvotes" : 62,
    "views"     : 3409,
    "comments" : []
  },
  {
    "id": 5,
    "author"    : "UX-Edu",
    "date"      : new Date(),
    "mediaPath" : null,
    "mediaAlt" : "",
    "body" : "The sniper, at least, is a professional. He has standards.",
    "upvotes"  : 2106,
    "downvotes" : 94,
    "views"     : 3648,
    "comments" : []
  }
  ]
}, 

{
  "id": 5,
  "title": "R301 and Rampage in Crafting for S13",
  "author": "Spyrogrunt2",
  "date": new Date(),
  "mediaPath": require("../images/p5.png"),
  "mediaAlt": "",
  "upvotes": 521,
  "downvotes": 24,
  "favorites": 512,
  "views": 100,
  "tags" : ["apex-legends", "gaming"],
  "comments" : [
    {
      "id": 1,
      "author"    : "hootboy200000",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "This just in: Crafting station use up 900% in the last 24 hours. Analysts are baffled.",
      "upvotes"  : 5398,
      "downvotes" : 1005,
      "views"     : 6249,
      "comments" : [
        {
          "id": 1,
          "author"    : "Bjonik_twitch",
          "date"      : new Date(),
          "mediaPath" : null,
          "mediaAlt" : "",
          "body" : "I think i craft nearly every Game right after being done with first loot / Team",
          "upvotes"  : 20,
          "downvotes" : 0,
          "views"     : 102,
          "comments" : []
        }]
    },
    {
      "id": 2,
      "author"    : "SirAlbertthe3rd",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "People fighting over fabricators would be amusing to see",
      "upvotes"  : 1058,
      "downvotes" : 216,
      "views"     : 2501,
      "comments" : []
    },
    {
      "id": 3,
      "author"    : "quetzakoatlus",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "Finally I don't have to look around whole match for r301",
      "upvotes"  : 1865,
      "downvotes" : 403,
      "views"     : 3498,
      "comments" : []
    },
    {
      "id": 4,
      "author"    : "LostLobsters",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "They actually did it lol",
      "upvotes"  : 436,
      "downvotes" : 32,
      "views"     : 948,
      "comments" : []
    },
    {
      "id": 5,
      "author"    : "Dinkin---Flicka",
      "date"      : new Date(),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "Oh damn. That will be super interesting to see how it shakes up the meta.",
      "upvotes"  : 577,
      "downvotes" : 68,
      "views"     : 843,
      "comments" : []
    }
  ]
}]
 


function Feed() {
  const [postList, setPostList] = useState([]);

    useEffect(
      () => { setPostList(content) }, []
    );

  return (
    <div className="pt-2 bg-gray-800 text-white">
      <div className="flex w-full text-black px-10 pt-5">
        <input type="search" 
          className="w-5/6"
          placeholder="Search for a post" 
          onChange={event => {/* Handle search here*/ }}></input>
      </div>

      <div id="header" className="px-10 h-fit pt-5 ph-3 pb-5 w-full font-mono text-cyan-400">
        <h2 className="text-left font-semibold font-sans text-4xl align-baseline tracking-wider"> 
            See What's up!
        </h2>
      </div>

      {/* This should be fetched from the DB probably, but for now we can hard code it*/}
      <div className="flex flex-auto">
        <div id = "feed" className="w-fit pl-10 h-fit mb-5 ml-4">
          {
            postList.map(element => { 
              return (
                <div key ={element.id} className="flex">
                  <Postbox content={element}/>
                </div>
              )}
            )
            
            // <List input={postList} />
          }
        </div>

        <div id = "Sidebar" className="ml-32 mr-32 border-2 border-gray-700 p-4 h-fit w-full">
          <h2 className="font-bold font-mono text-3xl pb-2 w-full text-cyan-400"> Trending Tags</h2>

          <ul className="marker:text-sky-400 list-disc pl-5 space-y-2 text-xl font-medium font-mono ">
            <TagLabel content={"funny"} text="text-gray" bg="bg-green-600"/>
            <TagLabel content={"random"} text="text-gray" bg="bg-green-600"/>
            <TagLabel content={"science"} text="text-gray" bg="bg-green-600"/>
            <TagLabel content={"meme"} text="text-gray" bg="bg-green-600"/>
            <TagLabel content={"game"} text="text-gray" bg="bg-green-600"/>
          </ul>
        </div>

      </div>

      <div id = "Footer" className="pt-10">

      </div>
    </div>
  )
}

export default Feed;