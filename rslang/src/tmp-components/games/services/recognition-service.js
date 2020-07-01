export default class RecognitionService {
  constructor() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new window.SpeechRecognition();
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';
  }

  onRecognitionResults = (event, recognitionResultsChanged) => {
    const transcript = Array.from(event.results).map((result) => result[0]).map((result) => result.transcript).join('');
    recognitionResultsChanged(transcript);
  }
}
