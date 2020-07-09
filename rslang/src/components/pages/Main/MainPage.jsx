import React from 'react';
import { connect } from 'react-redux';

const MainPage = (props) => <h2 className="title" style={{ fontSize: 30, textAlign: 'center' }}>
  {props.name ? `Hello, ${props.name}` : null}
</h2>;

function mapStateToProps(state) {
  return {
    name: state.auth.name,
  };
}
export default connect(mapStateToProps)(MainPage);
