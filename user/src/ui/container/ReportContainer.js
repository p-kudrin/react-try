import React, {Component} from 'react';
import ReportComponent from 'component/ReportComponent';
import {connect} from 'react-redux';
import {loadReport} from 'reducers/reports';

const mapDispatchToProps = (dispatch) => {
	  return {
		  loadReport: (organization, dateFrom, dateTo) => {
			  dispatch(loadReport(organization, dateFrom, dateTo))
		  }
	  }
	}

export default connect(
  state => ({
	  items: state.reports.items,
	  userOrgId: state.authentication.organizationId,
	  role: state.authentication.role
  }),
  mapDispatchToProps
)(ReportComponent);
