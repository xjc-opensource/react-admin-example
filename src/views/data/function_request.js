import {ReactRequest} from "../../compenents/ReactRequest";

export class FunctionRequest extends ReactRequest {
    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    itemContentElement = () => {
    };

    getRequestParam(fieldsValue) {
        return {};
    };
}