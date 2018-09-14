import React, {Component} from 'react';
import Translate from 'react-translate-component';

export default class InfoBlock extends Component {
	
  render() {
	  let type = this.props.template ? this.props.template.listTypeName : null;
	  let orientation = this.props.template ? this.props.template.listOrientationName : null;
	  return (
    	<div>
    		<h2><Translate content="side.hint2"/></h2>
    		<ol className="rules">    		
    			<li><Translate content="side.info.1" /> <span className="dashed">{type}</span></li>
    			<li><Translate content="side.info.2" /> <span className="dashed">{orientation}</span></li>
    			<li><Translate content="side.info.3" /></li>
    			<li><Translate content="side.info.4" /></li>
    		</ol>
    	</div>
    );
  }
}