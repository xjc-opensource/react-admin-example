import {ReactRequest} from "../../compenents/ReactRequest";
import {FieldType} from "./FieldConstants";

export class FunctionRequest extends ReactRequest {
    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    FieldType = FieldType;
    itemContentElement = () => {
    };

    getRequestParam(fieldsValue) {
        return {};
    };
}