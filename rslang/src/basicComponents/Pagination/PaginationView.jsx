import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@material-ui/lab';

const PaginationView = (props) => {
  const { count = 10 } = props;

  return (
    <Pagination count={count} size='large'/>
  );
};

PaginationView.propTypes = {
  count: PropTypes.number,
};

export default PaginationView;
