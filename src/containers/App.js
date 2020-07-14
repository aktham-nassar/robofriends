import React, { Component } from "react"
import { connect } from "react-redux"
import CardList from "../components/CardList"
import SearchBox from "../components/SearchBox"
import Scroll from "../components/Scroll"
//import { robots } from './robots';
//import { render } from '@testing-library/react';
import "./App.css"
import ErrorBoundry from "../components/ErrorBoundry"
import { setSearchField, requestRobots } from "../actions"

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}
class App extends Component {
  /* 
  // No need for constructor after using Redux. Because state is now being returned as part of props.
  constructor() {
    super();
    this.state = {
      robots: [],
    };
    //console.log('constructor');
  }*/
  componentDidMount() {
    this.props.onRequestRobots()
    /* fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState({ robots: users });
      });*/
    // this.setState({robots: robots});
    // console.log('componentDidMount');
  }

  render() {
    const { searchField, onSearchChange, robots, isPending } = this.props
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })
    //console.log('render');
    return isPending ? (
      <h1>...Loading...</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
