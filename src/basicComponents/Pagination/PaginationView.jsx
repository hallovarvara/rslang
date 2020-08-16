import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@material-ui/lab';

import { count as amount } from '../../helpers/constants';

const PaginationView = ({
  count = amount.elementsPerPage,
  className = '',
  onChange = () => {},
}) => (
    <Pagination
    className={className}
    count={count}
    onChange={(event, page) => onChange(event, page)}
    size="large"
    />
);

PaginationView.propTypes = {
  count: PropTypes.number,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default PaginationView;
