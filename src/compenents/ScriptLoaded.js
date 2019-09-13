import React from "react";
import Script from 'react-load-script';

export class ScriptLoaded extends React.Component {
    constructor(props) {
        super(props);
        this.loadScriptUrl = props.url;
    }

    state = {
        scriptLoaded: false,
        scriptError: false,
    }

    handleScriptCreate() {
        console.log("handleScriptCreate");
        this.setState({scriptLoaded: false});
    }

    handleScriptError() {
        console.log("handleScriptError");
        this.setState({scriptError: true});
    }

    handleScriptLoad() {
        console.log("handleScriptLoad");
        this.setState({scriptLoaded: true});
    }

    getScriptLoadElement(scriptLoaded) {
    }

    render() {
        return (
            <div>
                <Script
                    url= {this.loadScriptUrl}
                    onCreate={this.handleScriptCreate.bind(this)}
                    onError={this.handleScriptError.bind(this)}
                    onLoad={this.handleScriptLoad.bind(this)}
                />
                {this.getScriptLoadElement(this.state.scriptLoaded)}
            </div>
        );
    }
}