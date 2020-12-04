import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// need to use connect whenever we are using redux'
// only an expression so we can keep arrow function
// after alerts.map => is known as JSX
// when mapping through in JSX we need to have a key
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// we want to get the alert state
const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);
