import React,{Component} from 'react';
import { API, Auth } from "aws-amplify";
export default class LoadPost extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading:true,
            posts:[],
        }
        this.renderPosts = this.renderPosts.bind(this);
        this.hasAuthenticated = this.props.hasAuthenticated.bind(this);
    }
    componentDidMount(){
        this.onLoad();
    }
    goTo(e){
        this.props.history.push(`/post/${e.target.value}`);
    }
    renderPosts(){
        let returns = [];
        let current = this.state.posts;
        for(let item in current){
            let body = current[item];
            returns.push(       
            <tr class="hover:bg-grey-lighter">
            <td class="py-4 px-6 border-b border-grey-light">{body.firstname}</td>
            <td class="py-4 px-6 border-b border-grey-light">{body.lastname}</td>
            <td class="py-4 px-6 border-b border-grey-light">{new Date(body.createdAt).toLocaleString()}</td>
            <td class="py-4 px-6 border-b border-grey-light">{new Date(body.updatedAt).toLocaleString()}</td>
            <td class="py-4 px-6 border-b border-grey-light">
                <button value={body.nodeId} onClick={e => this.goTo(e)} className="text-gray-800 text-lg font-semibold hover:text-green-600 mr-4">View Post</button>
            </td>
          </tr>
          )
            console.log(current[item]);
        }
        return returns;
    }
    async onLoad() {
        try{
        await Auth.currentSession();
        let user = await Auth.currentAuthenticatedUser();
        this.hasAuthenticated();
        let returns;
        if(user.attributes.profile === "admin"){
            console.log("HERE");
            returns = await this.getAdminPosts();
        }
        else{
            console.log("THERE");

            returns = await this.getPosts();
        }
        this.setState({posts:returns,isLoading:false});
        console.log(returns);
        }
        catch(e){
        }
        console.log(this.props.isAuthenticated);
    
  }
  getPosts(){
        console.log(this.props);
        return  API.get("posts", "/posts");
  }
  getAdminPosts(){
        return  API.get("posts", "/adminposts");

  }
    render() {
        console.log(this.state.isLoading);
        return(
            !this.props.isAuthenticated ?
        (<div><p>Home page - please login for posts</p></div>):(
        <div>
            <p>Logged In: here are your posts</p>
                {!this.state.isLoading &&
                <div>
                        <table class="text-left w-full border-collapse"> 
      <thead>
        <tr>
            <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">FirstName</th>
            <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Last Name</th>
            <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Creation Date</th>
            <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Update Date</th>
            <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Go To File</th>
        </tr>
      </thead>
      <tbody>
          {this.renderPosts()}
          </tbody>
          </table>
                </div> }
        </div>)
        );
    }
}