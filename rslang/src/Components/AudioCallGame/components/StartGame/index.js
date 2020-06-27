// import React from 'react';
import StartGame from './StartGameView.jsx';

// class StartGame extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isStart: false,
//     };
//   }

//   handleChooseLevel = (e) => {
//     const level = e.target.value;
//     this.setState({ level: +level });
//     console.log(level);
//   }

//   setNumberLevel = (e) => {
//     const amountQuestions = e.target.value;
//     this.setState({ numberLevel: +amountQuestions });
//   }

//   setNumberAnswers = (e) => {
//     const numberAnswers = e.target.value;
//     this.setState({ numberAnswers: +numberAnswers });
//   }

//   handleSubmitForm = () => {
//     this.setState({ isStart: true });
//   }

//   render() {
//     const { level } = this.state;
//     console.log(this.state);
//     return (
//       <StartGameView
//         handleChooseLevel={this.handleChooseLevel}
//         setNumberLevel={this.setNumberLevel}
//         setNumberAnswers={this.setNumberAnswers}
//         handleSubmitForm={this.handleSubmitForm}
//         level={level}
//       />
//     );
//   }
// }

export default StartGame;
