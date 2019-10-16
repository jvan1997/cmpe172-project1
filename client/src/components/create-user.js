import React,{Component} from 'react';

export default class CreateUesr extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({
            [e.target.id]:e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();
        let  user =this.state.username;
        console.log(user);
       // window.location = '/'
       this.setState({username:''});
    }
    render() {
        return(
            <div className="flex items-center h-full w-full">
                <div className="container-sm w-full-w/o-margins max-w-sm mx-auto mt-1/10 bg-white rounded">
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
                <label>Username: </label>
                <div className="flex flex-col mb-4 items-center">
                            <input className="shadow appearance-none bg-white font-bold border border-soft-blue w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                id="email" onChange={this.handleChange} type="text" placeholder="Enter email" />
                </div>

              <div className="form-group">
                <input type="submit" value="Create User" className="cursor-pointer" />
              </div>
            </form>
          </div>
          </div>
        );
    }
}