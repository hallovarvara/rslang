import React from 'react';

const {
  Provider: LocalStorageServiceProvider,
  Consumer: LocalStorageServiceConsumer,
} = React.createContext();

export {
  LocalStorageServiceProvider,
  LocalStorageServiceConsumer,
};
