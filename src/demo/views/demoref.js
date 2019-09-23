import React from 'react'

class DemoRef extends React.Component {
    constructor(props) {
        super(props);
        this.state.userInput = "Hello World";
        this.myRef = React.createRef();
    }

    state = {
        userInput: "",
    }

    handleChange(e) {
        this.setState({userInput: e.target.value});
    }

    clearAndFocusInput() {
        this.setState({userInput: ''});
        this.myRef.current.focus();
    }

    render() {
        return (
            <div>
                <div onClick={this.clearAndFocusInput.bind(this)}>
                    Click to Focus and Reset
                </div>
                <input
                    ref={this.myRef}
                    value={this.state.userInput}
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        )
    }
}

export default DemoRef