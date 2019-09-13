import React from "react";
import TinyMCE from 'react-tinymce';
import Script from 'react-load-script';
import {Spin} from "antd";

class DemoTinymce extends React.Component {
    state = {
        scriptLoaded: false
    }

    handleEditorChange(e) {
        console.log(e.target.getContent());
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

    getTinymceElement() {
        if (this.state.scriptLoaded) {
            return <TinyMCE
                content="<p>This is the initial content of the editor</p>"
                config={{
                    plugins: 'autolink link image lists print preview',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright',
                    language:'zh_CN',
                }}
                onChange={this.handleEditorChange}
            />;
        } else {
            return <Spin spinning={true} tip='组件加载中...'></Spin>;
        }
    }
    render() {
        return (
            <div>
                <Script
                    url={process.env.PUBLIC_URL + '/js/tinymce5.0.15/tinymce.min.js'}
                    onCreate={this.handleScriptCreate.bind(this)}
                    onError={this.handleScriptError.bind(this)}
                    onLoad={this.handleScriptLoad.bind(this)}
                />
                {this.getTinymceElement()}
            </div>
        );
    }

    componentDidMount(){

    }

}

export default DemoTinymce;