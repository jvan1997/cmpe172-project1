import React from 'react';
import './styles/tailwind.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import CreateUser from './components/create-user';
import CreatePost from './components/create-post';
import EditPost from './components/edit-post';
import Posts from './components/load-post';
import NavBar from './components/bar';
class App extends React.Component {	

	render() {
    	return (
            <Router>
                <NavBar/>
                <br/>
                <Route path="/" exact component={Posts}/>
                <Route path="/edit/:id" exact component={EditPost}/>
                <Route path="/create" exact component={CreatePost}/>
                <Route path="/user" exact component={CreateUser}/>
            </Router>
        )
	}
}

export default App;
