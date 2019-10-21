import React,{Component} from 'react';
import { Auth } from "aws-amplify";
import ReactLoading from 'react-loading';
import FacebookButton from "../components/FacebookButton";
export default class LoginUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            isLoading: false,

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.hasAuthenticated = this.props.hasAuthenticated.bind(this);
        this.setIsLoading=this.setIsLoading.bind(this);
    }
    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
      }
    setIsLoading(){
        this.setState({isLoading:true});
    }
    onChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.id]:e.target.value
        });
    }
    handleFbLogin = () => {
  this.props.hasAuthenticated(true);
            this.props.history.push("/");

};
    async onSubmit(event) {
      console.log('thsi is goind it');
        event.preventDefault();
        this.setIsLoading();
      console.log(this.props);
        try {
          await Auth.signIn(this.state.username, this.state.password);
          this.props.hasAuthenticated(true);
          this.props.history.push("/");

        } catch (e) {
          alert(e.message);
          console.log(e);
            this.setState({isLoading:false});

        }
      }
    render() {
        return(
            <div className="flex items-center h-full w-full">
                <div className="container-sm w-full-w/o-margins max-w-sm mx-auto mt-1/10 bg-white text-center rounded">
            <h3>Login User</h3>
            <form onSubmit={this.onSubmit}>
                <label>Username: </label>
                <div className="flex flex-col w-full mb-4 items-center">
                            <input className="shadow appearance-none bg-white font-bold border border-solid border-green-600 w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                id="username" onChange={this.onChange} type="email" value={this.state.username}placeholder="Enter email" />
                </div>
                <label>Password </label>
                <div className="flex flex-col w-full mb-4 items-center">
                            <input className="shadow appearance-none bg-white font-bold border border-solid border-green-600 w-full rounded h-14 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                                id="password" onChange={this.onChange} type="password" value={this.state.password}placeholder="Enter email" />
                </div>
              <div className="form-group">
                <input type="submit" value="Login"  disabled={!this.validateForm()} className="font-boldcursor-pointer border border-solid p-2 border-green-600 rounded text-gray-700" />
              </div>
            </form>
            {/* <FacebookButton
  onLogin={this.handleFbLogin}
/> */}
<hr />
            {this.state.isLoading &&
                <div className="text-center items-center justify-center flex">
                <ReactLoading type={"bars"} color={"#38a169"} height={'20%'} width={'20%'} />
                </div>
            }
          </div>
          </div>
        );
    }
}