import React from 'react'
import "./BlogCard.css"
// import axios from "axios"



function BlogCard({blogs}) {

    return (
        <>
            <div id='cardBox'>
                {blogs.map(x => {
                    return (
                        <div className="card" style={{ "width": "18rem", height: "25rem" }}>
                            <img id='blogImage1' src={x.blogImage} style={{ width: "18rem", height: "12rem" }} className="card-img-top" alt="Error" />
                            <div className="card-body">
                                <h5 className="card-title">{x.title}</h5>
                                <p id="para" className="card-text" >{x.body}</p>
                            </div>
                            <a href={`/blogs/${x._id}`}> <button type="button" class="btn btn-primary btn-sm" style={{ width: "6rem", marginInline: "1rem" }}>Read More</button></a>
                        </div>
                    )
                })}
            </div>

        </>
    )
}

export default BlogCard




