import React from 'react'
import "./Carousel.css"



function Carousel() {
    return (
        <div id='CarouselBox'>
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="4000">
                        <img src="https://bloggerspassion.com/wp-content/uploads/2019/12/best-programming-blogs.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item"  data-bs-interval="4000">
                        <img src="https://bloggerspassion.com/wp-content/uploads/2022/05/top-travel-blogs-in-India.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="4000">
                        <img src="https://blog.feedspot.com/wp-content/uploads/2016/12/Relationship-Blogs.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="4000">
                        <img src="https://www.ecampusnews.com/files/2016/01/blogs.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="4000">
                        <img src="https://dicc.in/blog/wp-content/uploads/2022/01/image-1-min-29.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="4000">
                        <img src="https://mllj2j8xvfl0.i.optimole.com/cb:pJlS~36fbd/w:794/h:397/q:90/f:avif/https://themeisle.com/blog/wp-content/uploads/2018/03/free-blogging-sites.png" className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default Carousel
