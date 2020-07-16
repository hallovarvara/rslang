import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { SnackbarProvider, useSnackbar } from 'notistack';

const defaultMessages = {
  success: 'Поздравляем! Вы позанимались английским минимально необходимое время на сегодня. Продолжайте тренировку, чтобы выучить больше слов.',
  error: 'Подключиться к базе данных слов не удалось. Если ошибка появится снова, пожалуйста, сообщите на почту hallovarvara@gmail.com',
};

function MyApp(props) {
  const { enqueueSnackbar } = useSnackbar();

  const { variant = 'success' } = props;

  const {
    message = defaultMessages[variant] || 'Хорошего дня ;)',
  } = props;

  useEffect(() => {
    enqueueSnackbar(message, { variant });
  }, [enqueueSnackbar, message, variant]);

  return <></>;
}

MyApp.propTypes = {
  variant: PropTypes.string,
  message: PropTypes.string,
};

export default function IntegrationNotistack(props) {
  const classes = {
    root: `notification-root notification_${props.variant}`,
  };

  const {
    afterClose = () => {},
    duration = 50000,
    position = {
      vertical: 'bottom',
      horizontal: 'left',
    },
  } = props;

  return (
    <SnackbarProvider
      classes={classes}
      autoHideDuration={duration}
      anchorOrigin={position}
      maxSnack={3}
      onExited={afterClose}
    >
      <MyApp {...props} />
    </SnackbarProvider>
  );
}

IntegrationNotistack.propTypes = {
  afterClose: PropTypes.func,
  duration: PropTypes.number,
  position: PropTypes.object,
  variant: PropTypes.string,
};
