import React,{Component} from 'react';
import { Auth } from "aws-amplify";
import ReactLoading from 'react-loading';

export default class RegisterUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            name: '',
            lastname: '',
            isLoading: false,
            newUser: false,
            confirmationCode: '',
            adminP:'',

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.setIsLoading=this.setIsLoading.bind(this);
        this.submitCode = this.submitCode.bind(this);
        this.validCode = this.validCode.bind(this);
        this.hasAuthenticated = this.props.hasAuthenticated.bind(this);

    }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0 && this.state.name.length>0 && this.state.lastname.length>0;
      }
    setIsLoading(){
        this.setState({isLoading:true});
    }
    async submitCode(e){
        e.preventDefault();
        this.setIsLoading();
        try {
        await Auth.confirmSignUp(this.state.username, this.state.confirmationCode);
        await Auth.signIn(this.state.username, this.state.password);

        this.props.hasAuthenticated(true);
        this.props.history.push("/");
        } catch (e) {
        alert(e.message);
        this.setState({isLoading:false})
        }
        console.log(this.state.confirmationCode);
    }
    validCode(){
        return this.state.confirmationCode.length > 0;
    }
    onChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.id]:e.target.value
        });
    }
    async onSubmit(event) {
        event.preventDefault();
        let data ={
                username: this.state.username,
                password: this.state.password,
                attributes: {
                    family_name: this.state.lastname,
                    name: this.state.name
                }
                };
        if(this.state.adminP !== null && this.state.adminP === "0000"){
            data.attributes.profile = "admin";
        }
        else if(this.state.adminP !== null && this.state.adminP === ""){
            data.attributes.profile = "user";
        }
        else{
            alert("Incorrect admin password, try again or remove the whole field.");
            return;
        }
        try {
            this.setIsLoading();
            console.log(data);
            await Auth.signUp(data);
            this.setState({newUser:true});
            this.setState({isLoading:false});
        } catch (e) {
          alert(e.message);
            this.setState({isLoading:false});

        }
      }
    render() {
        return(
            
            <div className="flex items-center h-full w-full">
                <div className="container-sm w-full-w/o-margins max-w-sm mx-auto mt-1/10 bg-white text-center rounded">
            {this.state.newUser === false ?
                (
                    
            <form onSubmit={this.onSubmit}>
                <h3>Create New User</h3>

                <label>Username: </label>
                <div className="flex flex-col w-full mb-4 items-center">
                            <input className="shadow appearance-none bg-white font-bold border border-solid border-green-600 w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                id="username" onChange={this.onChange} type="email" value={this.state.username}placeholder="Enter email" />
                </div>
                <label>Name: </label>
                <div className="flex flex-col w-full mb-4 items-center">
                            <input className="shadow appearance-none bg-white font-bold border border-solid border-green-600 w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                id="name" onChange={this.onChange} type="text" value={this.state.name}placeholder="Enter first name" />
                </div>
                <label>Last Name: </label>
                <div className="flex flex-col w-full mb-4 items-center">
                            <input className="shadow appearance-none bg-white font-bold border border-solid border-green-600 w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                id="lastname" onChange={this.onChange} type="text" value={this.state.lastname}placeholder="Enter last name" />
                </div>
                <label>Password </label>
                <div className="flex flex-col w-full mb-4 items-center">
                            <input className="shadow appearance-none bg-white font-bold border border-solid border-green-600 w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                id="password" onChange={this.onChange} type="password" value={this.state.password}placeholder="Enter password" />
                </div>
                <label>If you are an admin, enter the admin password</label>
                <div className="flex flex-col w-full mb-4 items-center">
                            <input className="shadow appearance-none bg-white font-bold border border-solid border-green-600 w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                id="adminP" onChange={this.onChange} type="password" value={this.state.adminP}placeholder="Enter password" />
                </div>
              <div className="form-group">
                <input type="submit" value="Create User" disabled={!this.validateForm()} className="font-bold cursor-pointer border border-solid p-2 border-green-600 rounded text-gray-700" />
              </div>
            {this.state.isLoading &&
                <div className="text-center items-center justify-center flex">
                <ReactLoading type={"bars"} color={"#38a169"} height={'20%'} width={'20%'} />
                </div>
            }
            </form>
            
                ):(
          <div>
                <h3>Confirmation Code</h3>
                <h4>Please check your email for the code</h4>
                <form onSubmit={this.submitCode}>
                <label>Confirmation Code </label>
                <div className="flex flex-col w-full mb-4 items-center">
                <input className="shadow appearance-none bg-white font-bold border border-solid border-green-600 w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmationCode" onChange={this.onChange} type="text" value={this.state.confirmationCode}placeholder="Enter Code" />
                </div>
                <div className="form-group">
                <input type="submit" value="Submit Code" disabled={!this.validCode()} className="font-bold cursor-pointer border border-solid p-2 border-green-600 rounded text-gray-700" />
              </div>
                          {this.state.isLoading &&
                <div className="text-center items-center justify-center flex">
                <ReactLoading type={"bars"} color={"#38a169"} height={'20%'} width={'20%'} />
                </div>
            }
                </form>
          </div>
          ) }
          </div>
          
                    </div>

        );
    }
}