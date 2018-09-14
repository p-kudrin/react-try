import React, {Component} from 'react';
import Translate from 'react-translate-component';
import { Form, FormGroup, ControlLabel, FormControl, Col, Alert, Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn, ExportCSVButton } from 'react-bootstrap-table';
import { monthLabels, dayLabels } from 'config/translation';
import DatePicker from 'react-bootstrap-date-picker';

export default class ReportComponent extends Component {

	constructor(props) {
		super(props);

		this.state = {formData: { organization: '' }};

		this.onFieldChange.bind(this);
		this.onDateFieldChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
	}

	onFieldChange = (e) => {
		let formData = this.state.formData;
		formData[e.target.name] = e.target.value;
	    this.setState({ formData });
	}

	onDateFieldChange = (name, value) => {
		let formData = this.state.formData;
		formData[name] = value;
	    this.setState({ formData });
	}

	componentWillMount() {
		this.props.fetchOrgs();
	}
	
	columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
		  // fieldValue is column value
		  // row is whole row object
		  // rowIdx is index of row
		  // colIdx is index of column
		  return row.total ? 'td-column-total' : '';
	}

	totalFormatter(cell, row) {
		  return row.total ? <Translate content='report.label.total'/> : `${cell}`;
	}

    createCustomExportCSVButton = (onClick) => {
        return (
            <ExportCSVButton><Translate content="report.button.exportCsv" /></ExportCSVButton>
        );
    }

	render() {
		var items = this.props.items;
		var orgs = new Array({id: '', name: 'Все организации'}).concat(this.props.orgs);
	
	    return (
	      <div>
	      	<Translate component="h3" content='report.title'/>	
	        <Col sm={12}>
		        <Form horizontal ref="form" onSubmit={this.handleSubmit}>
		        	<FormGroup>
		        		<Col componentClass={ControlLabel} sm={2}>
			            	<Translate content="report.label.org" />
		    			</Col>
		            	<Col id="organization" sm={6}>
				  			  <FormControl name="organization" value={this.state.formData.organization} componentClass="select" onChange={this.onFieldChange}>
							    {orgs.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
							  </FormControl>
		    			</Col>
		        	</FormGroup>
		        	<FormGroup>
			    		<Col componentClass={ControlLabel} sm={2}>
			    			<Translate content="report.label.timeframe" />
						</Col>
			    		<Col id="timeframe">
					    	<Col sm={3}>
					    		<DatePicker name="dateFrom" value={this.state.formData.dateFrom} 
					    			onChange={(v) => {this.onDateFieldChange('dateFrom', v)}} 
					    			monthLabels={monthLabels} dayLabels={dayLabels} dateFormat="DD/MM/YYYY" />
							</Col>
					    	<Col sm={3}>
				    			<DatePicker name="dateTo" value={this.state.formData.dateTo} 
				    				onChange={(v) => {this.onDateFieldChange('dateTo', v)}} 
				    				monthLabels={monthLabels} dayLabels={dayLabels} dateFormat="DD/MM/YYYY" />
							</Col>
						</Col>
		        	</FormGroup>
		            <FormGroup>
			            <Col smOffset={2} sm={2}>
			              <Button type="submit">
			              	<Translate content="report.button.loadReport" />
			              </Button>
			            </Col>
		            </FormGroup>
		        </Form>
		        
				<BootstrapTable data={items} striped={true} hover={true} options={ { noDataText: <Translate content='report.label.noData'/>, exportCSVBtn: this.createCustomExportCSVButton } } exportCSV>
					<TableHeaderColumn dataField="dateCreated" isKey={true} columnClassName={ this.columnClassNameFormat } dataFormat={this.totalFormatter}><Translate content='report.label.colDateCreated'/></TableHeaderColumn>
					<TableHeaderColumn dataField="organizationName" hidden={ this.props.currentOrg !== null } columnClassName={ this.columnClassNameFormat }><Translate content='report.label.colOrganizationName'/></TableHeaderColumn>
					<TableHeaderColumn dataField="pointName" columnClassName={ this.columnClassNameFormat }><Translate content='report.label.colPoint'/></TableHeaderColumn>
					<TableHeaderColumn dataField="userName"><Translate content='report.label.colUser'/></TableHeaderColumn>
					<TableHeaderColumn dataField="model"><Translate content='report.label.model'/></TableHeaderColumn>
					<TableHeaderColumn dataField="saleCount" columnClassName={ this.columnClassNameFormat }><Translate content='report.label.colSales'/></TableHeaderColumn>
					<TableHeaderColumn dataField="replacementCount" columnClassName={ this.columnClassNameFormat }><Translate content='report.label.colReplacementCount'/></TableHeaderColumn>
					<TableHeaderColumn dataField="replacementNumber"><Translate content='report.label.colReplacementNumber'/></TableHeaderColumn>
				</BootstrapTable>
		    </Col>        
	      </div>
	    );
    }

	handleSubmit(e) {
		e.preventDefault();
	    const { organization, dateFrom, dateTo } = this.state.formData;
		this.props.loadReport(organization === '' ? null : organization, dateFrom, dateTo);
		return false;
	}
}
