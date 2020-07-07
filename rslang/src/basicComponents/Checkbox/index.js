import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { learnCardPreviewSettingsChanged } from '../../redux/actions';
import CheckboxView from './CheckboxView.jsx';

const Checkbox = (props) => {
  const { previewSettingName = null, settingChanged } = props;
  const onChange = previewSettingName && settingChanged.bind(null, previewSettingName);
  return <CheckboxView {...props} onChange={onChange} />;
};

Checkbox.propTypes = {
  previewSettingName: PropTypes.string,
  settingChanged: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => (
  {
    settingChanged: (previewSettingName) => {
      dispatch(
        learnCardPreviewSettingsChanged(previewSettingName),
      );
    },
  }
);

export default connect(undefined, mapDispatchToProps)(Checkbox);
