const hideColor = '#999999';
export const successColor = '#2ab823';
export const fewErrorsColor = '#f28029';
export const manyErrorsColor = '#db4621';

export const hideWordStyles = {
  backgroundColor: hideColor,
  color: hideColor,
  pointerEvents: 'none',
  userSelect: 'none',
};

export const showWordStyles = {
  backgroundColor: 'transparent',
  color: 'inherit',
  pointerEvents: 'auto',
  userSelect: 'auto',
};

const absolutElement = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  left: '0',
  top: '0',
};

export const inputWrapper = {
  ...absolutElement,
  zIndex: '10',
  transition: 'all 0.5s ease',
};

export const bgElement = {
  ...absolutElement,
  zIndex: 5,
  backgroundColor: hideColor,
};

export const inputField = {
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
  zIndex: '11',
};
