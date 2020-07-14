import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { SnackbarProvider, useSnackbar } from 'notistack';

const defaultMessages = {
  success: 'Поздравляем! Вы позанимались английским минимально необходимое время на сегодня. Продолжайте тренировку, чтобы стать еще продуктивнее и выучить больше слов.',
  error: 'Подключиться к базе данных слов не удалось. Если ошибка появится снова, напишите в поддержку example@team39.by',
};

function MyApp(props) {
  const { enqueueSnackbar } = useSnackbar();

  const { variant = 'success' } = props;

  const {
    message = defaultMessages[variant] || 'Your message Here',
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
    root: 'notification-root',
  };

  const {
    afterClose = () => { },
    duration = 5000,
    position = {
      vertical: 'top',
      horizontal: 'center',
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
};
