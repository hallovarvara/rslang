import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MainPage = (props) => <h2 className="title" style={{ fontSize: 30, textAlign: 'center' }}>
  {props.name ? `Hello, ${props.name}` : null}
</h2>;

function mapStateToProps(state) {
  return {
    name: state.auth.name,
  };
}

MainPage.propTypes = {
  name: PropTypes.string,
};
export default connect(mapStateToProps)(MainPage);
