import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let {title,description,imageUrl,newsUrl,author,date}=this.props; 
    return (
      <div className='my-3'>
       <div className="card" >
            <img src={!imageUrl?"https://www.infidigit.com/wp-content/uploads/2022/01/LATEST-NEWS.png":imageUrl} alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}<span class="badge text-bg-success mx-3">New</span></h5>
                <p className="card-text">{description}</p>
                <p className='card-text'><small className='text-muted'>By {author?author:"unknow"} on {new Date(date).toGMTString()} </small></p>
                <a rel="noreferrer"  href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more...</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
