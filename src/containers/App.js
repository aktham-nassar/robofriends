import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
//import { robots } from './robots';
//import { render } from '@testing-library/react';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component {
    constructor(){
        super();
        this.state = {
            robots: [],
            searchField: ''
        }
        console.log('constructor');
    }
componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response =>{
        return response.json();
    })
    .then(users => {
        this.setState({ robots: users})
    });
   // this.setState({robots: robots});
    console.log('componentDidMount');
}
    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
    }
    render() {
        // instead of keep using this.state.robots, we can destructure it:
        const {robots, searchField} = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        console.log('render');
        return !robots.length ?
            <h1>...Loading...</h1> :
            (
            <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
            <CardList robots={filteredRobots}/>
            </ErrorBoundry>
            </Scroll>
            </div>
        );
    }

}
export default App;