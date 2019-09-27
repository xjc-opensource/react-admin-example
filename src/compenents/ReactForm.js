import {ReactRequest} from "./ReactRequest";

export class ReactForm extends ReactRequest {
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