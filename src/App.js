import React from "react";
import './styles/tailwind.css';
import {BrowserRouter as Router,Route,Switch,Link,withRouter} from 'react-router-dom';
import LoginUser from './components/login-user';
import RegisterUser from './components/register-user';
import CreatePost from './components/create-post';
import EditPost from './components/edit-post';
import Posts from './components/load-posts';
import ViewPost from './components/view-post';                              
import config from './config';
import Error from './components/error';

import { Auth } from "aws-amplify";


class App extends React.Component {	
    constructor(props){
        super(props)    
        this.state ={
            isAuthenticated:false,
            name:'',
            lastname:'',
        }
        this.hasAuthenticated = this.hasAuthenticated.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.loadFacebookSDK = this.loadFacebookSDK.bind(this);
    }

    componentWillMount(){
        console.log("WHY");
        this.loadFacebookSDK();
        this.onLoad();
    }
loadFacebookSDK(){
    window.fbAsyncInit = function() {
        window.FB.init({
            appId:config.social.FB,
            autoLogAppEvents : true,
            xfbml: true,
            oauth: true,
            status: true,
            version: 'v3.1',
        });
        window.FB.getLoginStatus(function(response) {
                if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                 window.FB.api('/me', function(response) {
                console.log('Good to see you, ' + response.name + '.');
            //     let fulname= response.name.split();
            //     this.state.name = fulname[0];
            //     this.state.lastname = fulname[1 || ''];
             });
                } else {
                console.log('User cancelled login or did not fully authorize.');
                }
            });
    }.bind(this);
    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
}
 async onLoad() {
    try {
        console.log("TRYING");
        await Auth.currentSession();
        this.hasAuthenticated();
    }
    catch(e) {
        if (e !== 'No current user') {
        alert(e);
        }
    }

    }
    
    hasAuthenticated(){
        console.log("DID IT");
        Auth.currentAuthenticatedUser()
        .then(user => {
            console.log("USER");
            console.log(user);
        if(user.attributes === null || user.attributes === undefined){
            // window.FB.api('/me').then(response => {
            // console.log('Good to see you, ' + response.name + '.');

            // });
            
        }else{
        this.setState({name:user.attributes.name, lastname:user.attributes.family_name});
    }
        this.setState({isAuthenticated:true});
    })
    }
    async handleLogout() {
        await Auth.signOut();

        this.setState({isAuthenticated:false})
        console.log(this.state.isAuthenticated);
        this.props.history.push("/login");
        window.location.reload();
      }
	render() {
        console.log(this.state);
    	return (
            <div>
            <Router path="/App" >
            <nav className="flex flex-wrap w-full justify-center h-16 border-b-2 border-solid font-sans border-gray-300">
            <div class="flex items-center justify-end w-full px-6 font-bold">
              
            <Link to="/" className="text-gray-800 text-lg font-semibold hover:text-green-600 mr-4">Home</Link>
            <Link to="/create" className="text-gray-800 text-lg font-semibold hover:text-green-600 mr-4">Create Post</Link>
            {
              this.state.isAuthenticated ?(
                        <div class="hidden sm:flex sm:items-center">

          <button class="text-gray-800 text-lg font-semibold hover:text-green-600 mr-4" onClick={this.handleLogout}>Logout</button>
          </div>
            )
          :(
            <div class="hidden sm:flex sm:items-center">
          <Link to="/login" class="text-gray-800 text-lg font-semibold hover:text-green-600 mr-4">Sign in</Link>
          <Link to="/signup" class="text-gray-800 text-lg font-semibold border px-4 py-2 rounded-lg hover:text-green-600 hover:border-green-600">Sign up</Link>
          </div> 
          )
            }
          </div>
            
      </nav>            <br/>
                <Switch>

                <Route exact path="/" render={props => <Posts {...props} isAuthenticated={this.state.isAuthenticated} hasAuthenticated={this.hasAuthenticated}/>} />
                <Route path="/edit/:id" exact component={EditPost}/>
                <Route path="/post/:id" exact component={ViewPost}/>

                <Route path="/create" exact render ={props => <CreatePost {...props} firstname={this.name} family_name={this.family_name}/>}/>
                <Route path="/signup" exact render={props => <RegisterUser {...props} isAuthenticated={this.isAuthenticated} hasAuthenticated={this.hasAuthenticated}/>}/>

                <Route path="/login" render={props => <LoginUser {...props} isAuthenticated={this.state.isAuthenticated} hasAuthenticated={this.hasAuthenticated}/>}
                />
                <Route component={Error}/>
                </Switch>
            </Router >
            </div>
        )
	}
}

export default withRouter(App);
