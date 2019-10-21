import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class NavBar extends Component{
    render() {
        return(
        <nav className="flex flex-wrap w-full justify-center h-16 border-b-2 border-solid font-sans border-gray-300">
            <div class="flex items-center justify-end w-full px-6 font-bold">
              
            <Link to="/" className="text-gray-800 text-lg font-semibold hover:text-green-600 mr-4">Home</Link>
            <Link to="/" className="text-gray-800 text-lg font-semibold hover:text-green-600 mr-4">Posts</Link>

            <Link to="/create" className="text-gray-800 text-lg font-semibold hover:text-green-600 mr-4">Create Post</Link>
            <Link to="/user" className="text-gray-800 text-lg font-semibold hover:text-green-600 mr-4">Register User</Link>
            {
              this.props.isAuthenticated ?(
                        <div class="hidden sm:flex sm:items-center">

          <button class="text-gray-800 text-lg font-semibold hover:text-green-600 mr-4" onClick={this.props.handleLogout}>Logout</button>
          </div>
            )
          :(
            <div class="hidden sm:flex sm:items-center">
          <Link href="/user" class="text-gray-800 text-lg font-semibold hover:text-green-600 mr-4">Sign in</Link>
          <Link href="/user" class="text-gray-800 text-lg font-semibold border px-4 py-2 rounded-lg hover:text-green-600 hover:border-green-600">Sign up</Link>
          </div> 
          )
            }
          </div>
            
      </nav>
        );
    }
}