import React, {Component} from 'react';
import Translate from 'react-translate-component';
import { Form, FormGroup, ControlLabel, FormControl, Col, Alert, Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn, ExportCSVButton } from 'react-bootstrap-table';
import { monthLabels, dayLabels } from 'config/translation';
import DatePicker from 'react-bootstrap-date-picker';
import SideMenu from 'component/SideMenu';

export default class ReportComponent extends Component {

	constructor(props) {
		super(props);

		this.state = {formData: { organization: '' }};

		this.onDateFieldChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	onDateFieldChange = (name, value) => {
		let formData = this.state.formData;
		formData[name] = value;
	    this.setState({ formData });
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
          <ExportCSVButton><Translate content="report.button.exportCsv"/></ExportCSVButton>
        );
    }

	render() {
		var items = this.props.items;
	    const menuItems = [
	    	{label: 'home', link: '/', roles: ['ROLE_USER', 'ROLE_ADMIN']},
	    	{label: 'users', link: '/users', roles: ['ROLE_ADMIN']},
	        {label: 'reports', link: '/reports', roles: ['ROLE_ADMIN']}
	      ];
	    const menu = <SideMenu items={menuItems} role={this.props.role}/>;
	    
	    return (
	      <div className="content">
			<aside className="aside">
			{menu}
			</aside>
			<main className="main">
				<div className="row g-35">
					<div className="col-xs-12">
						<h1 className="m-b-35 align-c"><Translate content='report.title'/></h1>
				        <Form horizontal ref="form" onSubmit={this.handleSubmit}>
			        	<FormGroup>
				    		<Col componentClass={ControlLabel} sm={2}>
				    			<Translate content="report.label.timeframe" />
							</Col>
				    		<Col id="timeframe">
						    	<Col sm={4}>
						    		<DatePicker name="dateFrom" value={this.state.formData.dateFrom}
						    			onChange={(v) => {this.onDateFieldChange('dateFrom', v)}}
						    			monthLabels={monthLabels} dayLabels={dayLabels} dateFormat="DD/MM/YYYY" />
								</Col>
						    	<Col sm={4}>
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
							<TableHeaderColumn dataField="pointName" columnClassName={ this.columnClassNameFormat }><Translate content='report.label.colPoint'/></TableHeaderColumn>
							<TableHeaderColumn dataField="userName"><Translate content='report.label.colUser'/></TableHeaderColumn>
							<TableHeaderColumn dataField="model"><Translate content='report.label.model'/></TableHeaderColumn>
							<TableHeaderColumn dataField="saleCount" columnClassName={ this.columnClassNameFormat }><Translate content='report.label.colSales'/></TableHeaderColumn>
							<TableHeaderColumn dataField="replacementCount" columnClassName={ this.columnClassNameFormat }><Translate content='report.label.colReplacementCount'/></TableHeaderColumn>
							<TableHeaderColumn dataField="replacementNumber"><Translate content='report.label.colReplacementNumber'/></TableHeaderColumn>
						</BootstrapTable>
					</div>
				</div>
		    </main>
	      </div>
	    );
    }

	handleSubmit(e) {
		e.preventDefault();
    const { dateFrom, dateTo } = this.state.formData;
		this.props.loadReport(this.props.userOrgId, dateFrom, dateTo);
		return false;
	}
}
