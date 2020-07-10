import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@material-ui/lab';

import { count } from '../../helpers/constants';

const PaginationView = ({ count = count.elementsPerPage, className = '' }) => (
    <Pagination className={className} count={count} size="large"/>
);

PaginationView.propTypes = {
  count: PropTypes.number,
  className: PropTypes.string,
};

export default PaginationView;
