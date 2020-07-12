import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
//import { robots } from './robots';
//import { render } from '@testing-library/react';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import { searchField, setSearchField } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}
class App extends Component {
    constructor(){
        super();
        this.state = {
            robots: []
        }
        //console.log('constructor');
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
   // console.log('componentDidMount');
}

    render() {
        // instead of keep using this.state.robots, we can destructure it:
        const {robots} = this.state;
        const { searchField, onSearchChange } = this.props;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        //console.log('render');
        return !robots.length ?
            <h1>...Loading...</h1> :
            (
            <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
            <CardList robots={filteredRobots}/>
            </ErrorBoundry>
            </Scroll>
            </div>
        );
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(App);