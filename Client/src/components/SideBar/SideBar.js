import React from 'react'
import "./SideBar.css"


function SideBar({ filterItem, noFilterItem }) {

  return (
    <>
      <div id='SideBar'>
        <span id='headingCategory'>Category</span>
        <hr></hr>
        <div id="categoryBox">
          <div className="subcategoaryBox"><span onClick={() => filterItem("Travling")}>Travling</span></div>
          <div className="subcategoaryBox"><span onClick={() => filterItem("Study")}>Study</span></div>
          <div className="subcategoaryBox"><span onClick={() => filterItem("Home")}>Home</span></div>
          <div className="subcategoaryBox"><span onClick={() => filterItem("Love")}>Love</span></div>
          <div className="subcategoaryBox"><span onClick={() => filterItem("College")}>College</span></div>
          <div className="subcategoaryBox"><span onClick={() => filterItem("Music")}>Music</span></div>
          <div className="subcategoaryBox"><span onClick={() => filterItem("Game")}>Game</span></div>
          <div className="subcategoaryBox"><span onClick={() => filterItem("Flower")}>Flower</span></div>
          <div className="subcategoaryBox"><span onClick={() => noFilterItem("All")}>All Blogs</span></div>
        </div>
      </div>
    </>
  )
}

export default SideBar
