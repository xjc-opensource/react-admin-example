import React from "react";

class DemoHtmlText extends React.Component {
    render() {
        const helloString = '<span style="color:red">Html Text</span>';
        const htmlString = '<div dangerouslySetInnerHTML={{ __html: "'+helloString+' }} />';
        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html: helloString }} />
                <div> code: {htmlString}</div>
            </div>
        )
    }
}


export default DemoHtmlText