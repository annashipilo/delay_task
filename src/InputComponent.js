import React, { Component } from 'react';
import './App.css';

class InputComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            headers: '',
            isLoading: false,
            isBlockedButton: false,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleClick() {
        this.setState({
            isLoading: !this.state.isLoading,
            isBlockedButton: !this.state.isBlockedButton,
        });
        fetch("http://httpbin.org/delay/" + this.state.value)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.headers);
                    this.setState({
                        headers: result.headers,
                        isLoading: false,
                        isBlockedButton: false
                    });
                },
                (error) => {
                    this.setState({
                        isLoading: false,
                    });
                }
            )
    }

    render() {
        const status = this.state.isLoading ? "Loading..." : '';
        const headers = this.state.headers;

        return (
            <div>
                <input 
                    value={this.state.value} 
                    onChange={this.handleChange} 
                    placeholder="Enter delay from 1 to 10">
                </input>
                <button 
                    disabled={!this.state.value || this.state.value < 1 || this.state.value > 10 || isNaN(this.state.value) || this.state.isBlockedButton} 
                    onClick={() => this.handleClick()}>
                    Send request
                </button>
                <div>{status}</div>
                <ul className={this.state.isLoading ? "hidden" : ""}>
                    {
                        Object.keys(headers).map(item => {
                        return (<li key={item}>{item}</li>)
                        })
                    }
                </ul>
            </div >
        )
    }
}

export default InputComponent;