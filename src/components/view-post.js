import React,{Component} from 'react';
import {API,Storage} from 'aws-amplify';
import ReactLoading from 'react-loading';
import cloneDeep from 'lodash/cloneDeep';
export default class ViewPost extends Component{
    constructor(props){
        super(props)
        this.state = {
            post:null,
            content:'',
            loaded:false,
            edit:false,
            deleting:false

        }
        this.changePost = this.changePost.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        let holder = this.state.editPost;
        holder.files = event.target.files[0];
        console.log(holder);
        this.setState({editPost:holder});
}
    componentDidMount(){
        this.onLoad();
    }
    handleChange(e){
        let holder = this.state.editPost;
        holder[e.target.id] = e.target.value;
        this.setState({editPost:holder});
    }
    async loadNote() {
        let postId = this.props.match.params.id;
        console.log(postId);
        return API.get("posts", `/posts/${postId}`);
    }
    async onLoad(){
        try{
        let post = await this.loadNote();
        console.log(post);
        if(post.attachment){
            console.log(post.attachment);
            post.attachmentURL = await Storage.vault.get(post.attachment);
        }
        let post2 = cloneDeep(post);
        this.setState({post:post, loaded:true,editPost:post2});
        console.log(this.state);
    }
    catch(e){
        this.setState({failed:true});
    }

    }
    changePost(){

        let current = this.state.editPost;
        current.title = "holder";
        this.setState({edit:true,editPost:current});
                        console.log(this.state);


    }
       async s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });
console.log(stored.key);
  return stored.key;
}
async startDelete(e){
    e.preventDefault();
    let decision = window.confirm(
    "Confirm deletion of this post."
  );
    if (!decision) {
    return;
  }
  try {
    this.setState({deleting:true});
    let postId = this.props.match.params.id;
    await API.del("posts", `/posts/${postId}`);
    this.props.history.push("/");
  } catch (e) {
    alert(e);
    this.setState({deleting:false});
  }
}
 async newSave(e){
        e.preventDefault();
        let newChange = false;
        for(let item in this.state.post){
            if(this.state.post[item] !== this.state.editPost[item] || (this.state.editPost.files !== null && this.state.editPost.files !== undefined)){
                newChange = true;
            }
        }
        if(newChange === false){
            alert("No new changes found or Empty field found");
            return;
        }
        if(newChange === true || (this.state.editPost.files !== null && this.state.editPost.files !== undefined)){
            const fileKey = this.state.editPost.files ? await this.s3Upload(this.state.editPost.files)
            : this.state.post.attachment;
            console.log(fileKey);
            this.setState({isUpdating:true});
            const post  ={
                firstname:this.state.editPost.firstname,
                lastname:this.state.editPost.lastname,
                content:this.state.editPost.content,
                title:this.state.editPost.title,
                file:fileKey
            }
            try{
            let postId = this.props.match.params.id;

            await API.put("posts", `/posts/${postId}`, {
            body:post
        });
            this.props.history.push('/');
        }catch(e){
            this.setState({isUpdating:false});
            console.log(e);
        }
    }
    }
    render() {
        return(
        <div>
            {this.state.failed &&
            <div>
                <p>Unauthorized access (need to login) or post does not exist</p>
            </div>
            }
            {this.state.loaded && !this.state.edit &&
            <div>
                            <p>This views a Post</p>

                <p>Title: {this.state.post.title}</p>     
                <p>Name: {this.state.post.firstname + " " + this.state.post.lastname}</p>     
                <p>Content: {this.state.post.content}</p>     
                <p>Created: {new Date(this.state.post.createdAt).toLocaleString()}</p>
                <p>Updated: {new Date(this.state.post.updatedAt).toLocaleString()}</p>
                <div className="flex"> 
                <p>Click to download file:</p>
                <p onClick={() => window.location = this.state.post.attachmentURL}className="cursor-pointer text-blue-600 hover:text-blue-300">{this.state.post.attachment}</p>
                </div>
                <button className="h-10 p-2 w-16 rounded text-white bg-green-600 ml-2 mr-2" onClick={() => this.changePost()}>Edit</button>
                <button className="h-10 p-2 rounded text-white bg-red-500 ml-2 " onClick={(e) => this.startDelete(e)}>Delete</button>
                {this.state.deleting &&                
                 <div className="text-center items-center justify-center flex">
                <ReactLoading type={"bars"} color={"#c53030"} height={'20%'} width={'20%'} />
                </div>}
            </div>
        }
        {this.state.loaded && this.state.edit &&
            <div className="">
                <p>This edits a post</p>
                <form className="">
                <label className="mb-2">Title </label>
                <div className="mb-4"> 
                <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title"  onChange={e => this.handleChange(e)}value={this.state.editPost.title} type="text"/>
                </div>
                <label className="mb-2">First Name</label>
                <div className="mb-4">                 
                <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstname"  onChange={e => this.handleChange(e)}value={this.state.editPost.firstname} type="text"/>
                </div>
                <label className="mb-2">Last Name </label>
                <div className="mb-4"> 
                <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname"  onChange={e => this.handleChange(e)}value={this.state.editPost.lastname} type="text"/>
                </div>
                <label className="mb-2">Content </label>
                <div className="mb-4"> 
                <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="content"  onChange={e => this.handleChange(e)}value={this.state.editPost.content} type="text"/>
                </div>
                <div > 
                <p>Current file on reference:</p>
                <p>Please note that if you upload and save a new file, this current file will be removed.</p>
                <p onClick={() => window.location = this.state.post.attachmentURL}className="cursor-pointer text-blue-600 hover:text-blue-300">{this.state.post.attachment}</p>
                </div>
                <div>
                <label className="font-bold">File: </label>
                    <input type="file" id="file" name="file" className="w-auto border border-solid border-green-600 rounded mb-4 "
                        onChange={e => this.onChangeHandler(e)}/>
        
                </div>
                <button className="h-10 p-2 w-16 rounded text-white bg-black ml-2 mr-2" onClick={() => this.setState({edit:false,editPost:cloneDeep(this.state.post)})}>Cancel</button>
                <button value="Save" className="h-10 p-2 rounded text-white bg-green-500 ml-2 " onClick={(e) => this.newSave(e)}>Save </button>
                </form>
                {this.state.isUpdating &&                
                 <div className="text-center items-center justify-center flex">
                <ReactLoading type={"bars"} color={"#38a169"} height={'20%'} width={'20%'} />
                </div>}
            </div>
        }
        </div>
        );
    }
}