import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false,
        };
    }

    toggleDropdown = () => {
        console.log("Dropdown toggled");
        this.setState(prevState => ({
            showDropdown: !prevState.showDropdown
        }));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="header">
                        <img src="https://via.placeholder.com/50" alt="Logo" className="logo" />
                        <div className="project-name" onMouseEnter={this.toggleDropdown} onMouseLeave={this.toggleDropdown}>
                            Project Name
                            <span className="dropdown-arrow">▼</span>
                            {this.state.showDropdown && (
                                <ul className="dropdown-list">
                                    <li>Project 1</li>
                                    <li>Project 2</li>
                                    <li>Project 3</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;