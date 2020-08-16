import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto({ dataToday, dataPanel, ScheduleStatistics }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.flexContainer} position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          centered
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {dataPanel.map((item, key) => (
            <Tab label={item} {...a11yProps(key)} key={key} style={{ fontSize: '2rem' }} />
          ))}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {dataToday}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {ScheduleStatistics}
      </TabPanel>
    </div>
  );
}

ScrollableTabsButtonAuto.propTypes = {
  dataToday: PropTypes.node,
  dataPanel: PropTypes.array,
  ScheduleStatistics: PropTypes.node,
};
