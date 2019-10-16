import React from 'react';
import logo from './logo.svg';
import './styles/tailwind.css';

class App extends React.Component {	
    constructor(props) {
        super(props);
        this.state={
          loaded:false,
        }
      }
    goTo(event) {
        const value = event.target.value;
        this.props.history.push(`/${value}`);
      }
    componentDidMount(){
      fetch("http://localhost:3001/db")
          .then(function (response) {
            console.log("hi");
              return response.json();
          })
          .then(function (data) {
              if (data["error"]) {
                  this.setState({
                      error: data["message"]
                  });
                  console.log(data);
              }
              else {
                  console.log(data);
                  this.setState({message:data['data']});
                  this.setState({loaded:true});
                  console.log(this.state);
              }
      
          }.bind(this))
    }
    
  loadPosts(){
    let returns = []
    for(var object in this.state.message){
      console.log(object);
      returns.push(
        <div class="w-full">
        <div class="flex cursor-pointer my-1 hover:bg-blue-100 rounded">
            <div class="w-8 h-10 text-center py-1">
              <p class="text-3xl p-0 text-green-dark">&bull;</p>
            </div>
            <div class="w-4/5 h-10 py-3 px-1">
              <p class="hover:text-blue-dark">{this.state.message[object].name}</p>
            </div>
            <div class="w-1/5 h-10 p-3">
              <p class="text-sm text-grey-dark">{"Comment 1"}</p>
            </div>
          </div>
        </div>
      );
    }
    return returns;

  }
	render() {
    	return (
        this.state.loaded &&
        <div className="App flex justify-center items-center align-center h-screen items-center " >
          <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <div class="-mx-3 md:flex mb-6">
              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-item-name">
                  Item Name
                </label>
                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-item-name" type="text" placeholder="Nike Shoes"/>
                <p class="text-red text-xs italic">Please fill out this field.</p>
              </div>
              <div class="md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                  Last Name
                </label>
                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="Doe"/>
              </div>
            </div>
            <div class="md:w-1/2">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                  Price
                </label>
                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="Doe"/>
              </div>
          </div>
            <div class="w-full max-w-screen-xl mx-auto p-6">
              <div class="relative rounded overflow-hidden  mb-8 bg-white">
                <div class="p-4 py-8">
                  <div class="mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
                    <div class="sm:flex sm:items-center px-2 py-4">
                      <div class="flex-grow">
                        <h3 class="font-normal px-2 py-3 leading-tight">Posts</h3>
                      {this.loadPosts()}
                      </div>
                    </div>
                  
                  </div>
                </div>
              </div>
              <img src="https://jvanbucket.s3.us-west-1.amazonaws.com/yunImage_1571101468761.png"></img>

            </div>
          </div>
		)	
	}
}

export default App;
