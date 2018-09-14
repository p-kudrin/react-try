import React, {Component} from 'react';
import Translate from 'react-translate-component';

const defaultData = {
		formData: {
			guarantee: ''
	    }
};

export default class GuaranteeBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {...defaultData};
    }
	
	changedValue = (e) => {
		let formData = this.state.formData;
		formData[e.target.name] = e.target.value;
	    this.props.action(formData);
	}
	
	render() {
		return (
			<div>
				<hr/>
            	<p className="fz-15"><b><Translate content="side.guaratnee.1" /></b></p>
            	<p className="text-primary fz-13"><Translate content="side.guaratnee.2" /></p>
            	<input type="text" name="guarantee" className="form-control m-b-15" value={this.state.formData.name} onBlur={this.changedValue}/>
            	<p className="fz-10 text-muted"><Translate content="side.guaratnee.3" /></p>
			</div>
		);
	}
}
