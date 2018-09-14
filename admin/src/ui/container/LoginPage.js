import {connect} from 'react-redux';

import {login} from '../../reducers/authentication';
import LoginForm from '../component/LoginForm';

export default connect(
  state => ({errorMessage: state.authentication.errorMessage}),
  {login}
)(LoginForm);
