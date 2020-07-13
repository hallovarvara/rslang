import React from 'react';

import { LocalStorageServiceConsumer } from '../contexts/local-storage-service-context';

const withLocalStorageService = () => (Wrapped) => (props) => (
  <LocalStorageServiceConsumer>
  {
    (localStorageService) => <Wrapped {...props} localStorageService={localStorageService} />
  }
</LocalStorageServiceConsumer>
);

export default withLocalStorageService;
