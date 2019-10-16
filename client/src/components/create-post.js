import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
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
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        this.setState({
            users:['testuser'],
            username:'testuser'
        })
    }
    onChange(e){
        this.setState({
            [e.target.id]:e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();
        const post  ={
            username:this.state.username,
            content:this.state.content,
            title:this.state.title,
            price:this.state.price,
            image:this.state.image,
            date:this.state.date,
        }
        console.log(post);
       // window.location = '/'
    }
    render() {
        return(
            <div className="flex items-center h-full w-full">
            <div className="container-sm border-2 border-solid border-green-600 max-w-sm mx-auto mt-1/10 bg-white rounded p-10 shadow-lg">
                <p className="w-full block font-sans text-2xl font-bold text-center justify-center mb-14">
      Write new Post
        </p>
      <form onSubmit={this.onSubmit}>
        <div className="items-center flex justify-center"> 
          <label className="font-bold">Username: </label>
          <select ref="userInput"
                id="username"
              required
              className="form-control"
              value={this.state.username}
              onChange={e => this.onChange(e)}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="items-center flex justify-center"> 
          <label className="font-bold">Title: </label>
          <input  type="text"
            id="title"
              required
              className="w-32"
              value={this.state.description}
              onChange={e => this.onChange(e)}
              />
        </div>
        <div className="items-center flex justify-center">
          <label className="font-bold">Price: </label>
          <input 
            id="price"
              type="number" 
              className="w-24"
              value={this.state.duration}
              onChange={e => this.onChange(e)}
              />
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
      </form>
    </div>
    </div>
    
        );
    }
}