import React from 'react';
import { RecognitionServiceConsumer } from '../contexts/recognition-service-context';

const withRecognitionService = () => (Wrapped) => (props) => (
  <RecognitionServiceConsumer>
    {
      (recognitionService) => <Wrapped {...props} recognitionService={recognitionService}/>
    }
  </RecognitionServiceConsumer>
);

export default withRecognitionService;
