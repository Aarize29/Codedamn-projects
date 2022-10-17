import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'


export class News extends Component {
  static defaultProps ={
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes ={
     country: propTypes.string,
     pageSize:propTypes.number,
     category:propTypes.string
  }
  capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
     super(props);
     this.state={
      articles: [],
      loading: false,
      page:1
     }
     document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
  }
   async UpdateNews(){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d5e7d87114804f9f8f5e932bf15414ab&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true
    })
    let data= await fetch(url);
    let parsedData=await data.json();
    this.setState({
      articles: parsedData.articles, 
      totalResult: parsedData.totalResult,
      loading: false
     })
   }
   async componentDidMount(){
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d5e7d87114804f9f8f5e932bf15414ab&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading: true
    // })
    // let data= await fetch(url);
    // let parsedData=await data.json();
    // this.setState({
    //   articles: parsedData.articles, 
    //   totalResult: parsedData.totalResult,
    //   loading: false
    //  })
    this.UpdateNews();

  }

   handlePrev=async ()=>{
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d5e7d87114804f9f8f5e932bf15414ab&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading: true
    // })
    // let data= await fetch(url);
    // let parsedData=await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // }) 
    this.setState({page:this.state.page - 1});
    this.UpdateNews();
  }
  
  handleNext= async ()=>{
  //   if(this.state.page + 1 > Math.ceil(this.state.totalResult/this.props.pageSize)){

  //   }
  //   else{
  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d5e7d87114804f9f8f5e932bf15414ab&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({
  //     loading: true
  //   })
  //   let data= await fetch(url);
  //   let parsedData=await data.json();
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading: false
  //   })
  // }
  this.setState({page:this.state.page + 1});
  this.UpdateNews();
  }


  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin: '35px'}}>NewsMonkey-Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
           {!this.state.loading && this.state.articles.map((element)=>{
            return  <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
          </div> 

           })}
           
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResult/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
