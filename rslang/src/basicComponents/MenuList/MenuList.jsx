import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const SimpleMenu = ({
  menuTitle = 'Menu title',
  menuItems = ['Profile', 'My account', 'Logout'],
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItemClasses = {
    root: 'menu-list-item',
  };

  const menuListClasses = {
    list: 'menu-list',
  };

  return (
    <div className="hello">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onMouseEnter={handleClick}
        onMouseLeave={(event) => {
          if (!event.relatedTarget.closest('.menu-list-popover__paper')) {
            handleClose();
          }
        }}
      >
        {menuTitle}
      </Button>
      <Menu
        classes={menuListClasses}
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        disableScrollLock
        autoFocus={false}
        BackdropComponent={() => <div></div>}
        PopoverClasses={{ root: 'menu-list-popover', paper: 'menu-list-popover__paper' }}
      >
        {
          menuItems.map((item, key) => (
            <MenuItem classes={menuItemClasses} key={key} onClick={handleClose}>{item}</MenuItem>
          ))
        }
      </Menu>
    </div>
  );
};

SimpleMenu.propTypes = {
  menuTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  menuItems: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.element,
  ])),
};

export default SimpleMenu;
