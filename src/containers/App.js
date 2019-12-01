import React from 'react';
import { connect } from 'react-redux'
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from "../components/ErrorBoundry"
import './App.css';

import { setSearchField, requestRobots } from '../action'

const mapStateToProps = state => {
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

class App extends React.Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         robots: []
    //     }
    // }

    componentDidMount() {
        // fetch('https://jsonplaceholder.typicode.com/users')
        // .then(response => {return response.json()})
        // .then(users => {this.setState({robots: users})});
        this.props.onRequestRobots();
    }

    // rule of thumb: every time you write your own function, it is better to use =>
    // using arrow, it can ensure that "this" refers to the "App"
    // onSearchChange = (event) => {
    //     // event.target.value returns what the event object holding
    //     // console.log(event.target.value);

    //     // fixed syntax to modify state
    //     this.setState({ searchfield: event.target.value })
    //     // const filteredRobots = this.state.robots.filter(robot =>{
    //     //     return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    //     // })
    //     // this.setState({ robots: filteredRobots })
    //     // console.log(this.state.robots)
    // }

    render() {
        const { robots, searchField, onSearchChange, isPending } = this.props;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return (
            <div className="tc">
                <h1 className="f1">RobotFriends</h1> 
                <SearchBox searchChange={onSearchChange}/>
                {/* <CardList robots={this.state.robots}/> */}
                <Scroll>
                    {   isPending ? <h1> Loading </h1> :
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    }
                </Scroll>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);