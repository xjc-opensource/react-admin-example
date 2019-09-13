import React from "react";
import TinyMCE from 'react-tinymce';
import {Spin} from "antd";
import {ScriptLoaded} from "@/compenents/ScriptLoaded";

class DemoTinymce extends ScriptLoaded {
    constructor(props) {
        super(props);
        this.loadScriptUrl = process.env.PUBLIC_URL + '/js/tinymce5.0.15/tinymce.min.js';
    }

    handleEditorChange(e) {
        console.log(e.target.getContent());
    }

    getScriptLoadElement = scriptLoaded => {
        if (scriptLoaded) {
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
    };

    componentDidMount(){
    }
}

export default DemoTinymce;