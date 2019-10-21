import React, {Component} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import ReactLoading from 'react-loading';
import { Auth } from "aws-amplify";
import { API } from "aws-amplify";
import { Storage } from "aws-amplify";

export default class CreatePost extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            content:'',
            title:'',
            date: new Date(),
            price:0,
            image:'',
            users:[],
            selectedFile: null,
            hasFile: false,
            isLoading: false,
            noUser: true,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        this.setState({noUser:false, name:user.attributes.name, lastname:user.attributes.family_name});})
    }catch(e){
      console.log(e);
    }}
    onChange(e){
        this.setState({
            [e.target.id]:e.target.value
        });
    }
   async s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });
console.log(stored.key);
  return stored.key;
}
    async onSubmit(e){
        e.preventDefault();
        console.log(this.state);
        if(this.state.content === '' || this.state.title === '' || this.state.file === null){
          alert("Please fill out all fields");
          return;
        }
        
      const fileKey = this.state.selectedFile ? await this.s3Upload(this.state.selectedFile)
      : null;
        this.setState({isLoading:true});
        const post  ={
            firstname:this.state.name,
            lastname:this.state.lastname,
            content:this.state.content,
            title:this.state.title,
            file:fileKey
        }
    try {
        await this.createPost(post);
        this.props.history.push("/");
      } catch (e) {
        alert(e);
        this.setState({isLoading:false});
      }
    
        console.log(post);
       // window.location = '/'
    }
    createPost(post) {
      console.log(this.state.name,this.state.lastname,this.state.content);
       console.log(post);
        return API.post("posts", "/posts", {
            body:post
        });
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
    render() {
        return(
          
            <div className="flex items-center h-full w-full">
              {this.state.noUser &&
                <div><p>Please login/register to create a post</p></div>
              }
              {!this.state.noUser && 
            <div className="container-sm border-2 border-solid border-green-600 max-w-sm mx-auto mt-1/10 bg-white rounded p-10 shadow-lg">
                <p className="w-full block font-sans text-2xl font-bold text-center justify-center mb-14">
      Write new Post
        </p>
      <form onSubmit={this.onSubmit}>

        <div className="items-center flex justify-center"> 
          <label className="font-bold">Title: </label>
          <input  type="text"
            id="title"
              required
              className="w-32 h-10 border border-solid border-green-600 rounded mb-4"
              value={this.state.description}
              onChange={e => this.onChange(e)}
              />
        </div>
        <div className="items-center flex justify-center">
          <label className="font-bold">File: </label>
           <input type="file" id="file" name="file" className="w-auto border border-solid border-green-600 rounded mb-4 "
 onChange={e => this.onChangeHandler(e)}/>
        </div>
        <div className="items-center block justify-center">
          <label className="font-bold">Description: </label>
          <div>
              <textarea className="w-64 border border-solid border-green-700  rounded h-64 overflow-auto" value={this.state.content} id="content" onChange={e => this.onChange(e)}></textarea>
          </div>
        </div>

        <div className="items-center flex justify-center">
          <input type="submit" value="Create Post" className="px-4 py-2 rounded border border-solid border-green-400" />
        </div>
        {this.state.isLoading && 
        <div className="text-center items-center justify-center flex">
                <ReactLoading type={"bars"} color={"#38a169"} height={'20%'} width={'20%'} />
                </div>
              }
      </form>
    </div>
    }
    </div>
    
        );
    }
}