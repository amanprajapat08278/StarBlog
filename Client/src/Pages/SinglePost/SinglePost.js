import React, { useEffect, useState } from 'react'
import "./SinglePost.css"
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import { useParams } from 'react-router-dom'


function SinglePost({ user, userLogin }) {
    const [blog, setBlog] = useState({ authorId: {} })
    let blogId = useParams();


    useEffect(() => {
        async function fetchData() {
            let blogDatas = await axios.get(`http://localhost:4000/blogs/${blogId.blogId}`)
            console.log(blogDatas.data.data)
            setBlog(blogDatas.data.data)
        }
        fetchData()
    }, [])


    let config = {
        headers: {
            "x-api-key": localStorage.getItem("token")
        },
    }
    const deleteBlog = () => {
        if (!userLogin) { window.location.replace("/Login") }
        else {
            let check = window.confirm("Are you sure ?")
            if (check) {
                axios.delete(`http://localhost:4000/blogs/${blogId.blogId}`, config).then(() => {
                    window.location.replace("/")
                }).catch((err) => alert(err.message))
            }
        }
    }


    return (
        <>
            <Navbar user={user} userLogin={userLogin} />
            <div className='SinglePost'>
                <div className='BlogDetails'>
                    <img id='blogImage1' src={blog.blogImage} alt='Error' />
                    <h1>{blog.title}</h1>
                    <div id="authorNameBox">
                        <span>Author : {blog.authorId.fname + " " + blog.authorId.lname} </span>
                        <div id="iconBox10">
                            <a href={`/updateBlogs/${blog._id}`}> <i class="fa-solid fa-pen-to-square"></i></a>
                            <i onClick={deleteBlog} class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                    <p>{blog.body}</p>
                </div>
            </div>
        </>
    )
}

export default SinglePost



// 