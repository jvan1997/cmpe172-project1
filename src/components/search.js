import React, {Component} from 'react';
import ReactLoading from 'react-loading';
import { Auth } from "aws-amplify";
import { API } from "aws-amplify";
import { Storage } from "aws-amplify";
import ImageUploader from 'react-images-upload';
import Pagination from "react-js-pagination";
import styles from '../styles/App.modules.css';
import BootstrapPaginator from 'react-bootstrap-pagination';
import Select from 'react-select';

export default class Search extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:'',
            pages: 1,
            found: false,
            posts:[],
            submitted:false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitName = this.onSubmitName.bind(this);
        this.newSelect= this.newSelect.bind(this);

    }
    componentDidMount(){
        this.setState({
            users:['testuser'],
            username:'testuser'
        })
        try{
        Auth.currentAuthenticatedUser()
        .then(user => {
            console.log("HI");
            console.log(user);
        })
        }catch(e){
            console.log(e);
        }
    }
    async onChange(e){
        await this.setState({
            [e.target.id]:e.target.value
        });
        console.log(this.state.name);
    }
    async onSubmitName(e){
        e.preventDefault();
        if(this.state.name.length === 0){
            alert("Please input something");
            return;
        }
        console.log(this.state.name);
    try {
        await this.setState({pages:1});
        const returns = await this.performSearch(this.state.name,this.state.pages);
        const hasStuff = returns.total > 0 ? true: false
        await this.setState({posts:returns,isLoading:false, found:hasStuff,submitted:true});
        console.log(this.state);
        this.renderPages();
      } catch (e) {
        alert(e);
        this.setState({isLoading:false});
      }
        }
    performSearch(name,pages) {
        this.setState({isLoading:true});
        const content  ={
            content: name,
            page: pages
        }
        console.log(content);
          return API.post("posts", "/getMovies", {
              body:content
          });
  }
        async newSelect(condition){
            console.log(condition.value);
            this.setState({ pages: condition.value });
            const data = await this.performSearch(this.state.name,condition.value);
            const hasStuff = data.total > 0 ? true: false
            await this.setState({posts:data,isLoading:false, found:hasStuff});
            console.log(data);
        }
    onSubmit(e){
        e.preventDefault();
        console.log(this.state.name);
    }
    onSubmit(e){
        e.preventDefault();
        console.log(this.state.name);
    }
    onChangeHandler=event=>{
        let file = event.target.files[0];
    if (file && !file.name) {
       window.alert("Please select a file");
       return false;
    }
    if (file.size > 10e6) {
      window.alert("Please upload a file smaller than 10 MB");
      event.target.value = null;
      return false;
    }
      console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      hasFile: true,
    });

  }
    validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
    async renderPages(){
        console.log("HI");
    const items = [];

      for (let i = 1; i <= this.state.posts.pages; i++) {
        items.push({value: i, label: i});
      }
    await this.setState({items:items});
    console.log(this.state.items);
    }
    generateCards(){
        let returns = [];
        for (let i =0; i< this.state.posts.movies.length; i++) {
            let current = this.state.posts.movies[i];
            returns.push(    
                <div class="flex-shrink-0 m-6 relative inline-block overflow-hidden bg-white rounded-lg max-w-xs w-1/4 shadow-lg">
                <div class="relative pt-10 px-10 flex items-center justify-center">
                <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" ></div>
                <img class="relative w-40 border rounded" src={'https://image.tmdb.org/t/p/w1280'+current.poster_path}/>
                </div>
                <div class="relative px-6 pb-6 mt-6 overflow-x-auto">
                <p class="block opacity-75 text-lg font-bold -mb-1 overflow-x-auto">{current.title}</p>
                </div>
            </div>
            );
        }
        return returns;
    }
    render() {
        return(
          <div className="text-center text-2xl">
            <p className="pb-2">Actor Identifier Search Page</p>
            <section class="bg-blue-500 h-50 p-8">
              <div class="container mx-auto py-8">
                <input class="w-full h-16 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg" type="search" value={this.state.name} onChange={e => this.onChange(e)} id="name" placeholder="Search By Name or Link and Click on the Corresponding Button Below..."/>
                <nav class="flex justify-center">
                  <div class="flex items-center justify-center bg-transparent">
                    <label class="w-48 h-14 flex flex-col items-center bg-transparent rounded shadow-lg tracking-wide uppercase border-2 border-white cursor-pointer hover:border-4 ">
                        <svg class="w-8 h-8" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="mt-2 text-white font-fancy font-bold text-base leading-normal">Search By Photo</span>
                        <input type='file' id="image" class="hidden" name="image" onChange={e => this.onChangeHandler(e) } />
                    </label>
                </div>
                <div class="flex items-center justify-center bg-transparent ml-4 ">
                    <label class="w-48 h-14 flex flex-col items-center bg-transparent rounded shadow-lg tracking-wide uppercase border-2 border-white cursor-pointer hover:border-4 ">
                        <svg class="w-8 h-8" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="mt-2 text-white font-fancy font-bold text-base leading-normal">Search By Youtube</span>
                    </label>
                </div>
                <div onClick={this.onSubmitName} class="flex items-center justify-center bg-transparent ml-4 ">
                    <label class="w-48 h-14 flex flex-col items-center bg-transparent rounded shadow-lg tracking-wide uppercase border-2 border-white cursor-pointer hover:border-4 ">
                        <svg class="w-8 h-8" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="mt-2 text-white font-fancy font-bold text-base leading-normal">Search By Name</span>
                    </label>
                </div>
              </nav>
          </div>
      </section>

        {this.state.found && (
            <div className="w-20 text-sm flex w-full items-center ml-4">
                <div>
                <label className="block text-gray-00 text-sm" for="condition">Page</label>
                <Select value={ {value : this.state.pages, label: this.state.pages }} required onChange={this.newSelect} name="condition" id="condition" className="col-md-8 col-offset-4 flex-none"options = {this.state.items} />
                </div>
                <p className="text-xl ml-8">Found {this.state.posts.total} Results for {this.state.posts.name}</p>
            </div>) }
        {this.state.isLoading && 
            <div className="text-center items-center justify-center flex">
                <ReactLoading type={"bars"} color={"#4299e1"} height={'20%'} width={'20%'} />
            </div>
              }
              {
                  !this.state.isLoading && this.state.found && (
                    <div class="px-24 flex flex-wrap items-center justify-between">
                    {this.generateCards()}
                    </div>
                  )
              }              {
                !this.state.isLoading && !this.state.found &&  this.state.submitted &&(
                <div className="flex flex-wrap justify-center">
              <div className="md:w-1/2 w-full h-64 m-4 p-10 bg-white rounded shadow-xl font-bold items-center text-center justify-center">
                <p className="text-red-500 text-xl font-bold font-sans-pro"> No search results loaded for your query. <br></br> Please try another search.</p>
              </div>
              </div>
                )
            }
          </div>

        );
    }
}
