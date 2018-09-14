import React, {Component} from 'react';
import ReportComponent from 'component/ReportComponent';
import {connect} from 'react-redux';
import {loadReport} from 'reducers/reports';
import {fetchOrgs} from 'reducers/orgs';

const mapDispatchToProps = (dispatch) => {
	  return {
		  loadReport: (organization, dateFrom, dateTo) => {
			  dispatch(loadReport(organization, dateFrom, dateTo))
		  },
		  fetchOrgs: () => {
			  dispatch(fetchOrgs())
		  }
	  }
	}

export default connect(
  state => ({
	  items: state.reports.items,
	  orgs: state.orgs.items,
      currentOrg: state.reports.currentOrg
  }),
  mapDispatchToProps
)(ReportComponent);
