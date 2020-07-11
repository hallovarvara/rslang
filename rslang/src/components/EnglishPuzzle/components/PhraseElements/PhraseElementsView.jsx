import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import classNames from 'classnames';
import { replaseUrlBackground } from '../../helpers';
import style from './PhraseElementsView.module.scss';

// TODO helper
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

class PhraseElementsView extends React.Component {
  constructor(props) {
    super(props);
    this.url = replaseUrlBackground();
    const { puzzleItems } = props;
    this.state = {
      items: puzzleItems,
      selected: [],
    };
  }

  async componentDidUpdate(prevProps) {
    if (this.props.errorCount !== prevProps.errorCount) {
      this.setState({
        items: [],
        selected: this.props.answerItems,
      });
    }
    if (this.props.puzzleItems !== prevProps.puzzleItems) {
      // const picture = await this.getPicture();
      // console.log(picture, 125)
      this.setState({
        items: this.props.puzzleItems,
        selected: [],
      });
    }
  }

  // getPicture = () => axios
  // .get('https://nexgenua.github.io/images/level1/deerlake.jpg')
  // .then((response) => {
  //  console.log(response,12)
  // })
  // .catch((error) => {
  //   console.log(error)
  // })


  id2List = {
    droppable: 'items',
    droppable2: 'selected',
  };

  getItems = (array) => array.map((word, index) => ({
    id: `${index}`,
    content: `${word}`,
  }));

  getList = (id) => this.state[this.id2List[id]];

  onDragEnd = ({ source, destination }) => {
    if (source && destination) {
      const { updateIsShow, updateIsCheck } = this.props;
      if (source.droppableId === destination.droppableId) {
        const items = reorder(
          this.getList(source.droppableId),
          source.index,
          destination.index,
        );
        let state = { items };
        if (source.droppableId === 'droppable2') {
          state = { selected: items };
          const check = state.selected.every((item, index) => +item.id === index);
          updateIsCheck(check);
        }
        this.setState(state);
      } else {
        const result = move(
          this.getList(source.droppableId),
          this.getList(destination.droppableId),
          source,
          destination,
        );
        if (result.droppable2 && (result.droppable2.length === this.props.answerItems.length)) {
          const check = result.droppable2.every((item, index) => +item.id === index);
          updateIsShow();
          updateIsCheck(check);
        }
        this.setState({
          items: result.droppable,
          selected: result.droppable2,
        });
      }
    } return '';
  };

  getWidthPharase = () => {
    const { answerItems } = this.props;
    return answerItems.reduce((acc, item) => (acc + item.content.length), 0);
  }

  getBackgroundPosition = (index) => {
    const { answerItems } = this.props;
    return answerItems.slice(0, index).reduce((acc, item) => (acc + item.content.length), 0);
  }

  getItemStyle = (item, index, draggableStyle, numberRow) => ({
    backgroundRepeat: 'no-repeat',
    backgroundImage: `${this.props.isBackground ? this.props.backgroundUrl : ''}`, // TODO add level from start form
    width: `${(100 * item) / this.getWidthPharase()}%`,
    backgroundPosition: `-${(800 * this.getBackgroundPosition(index)) / this.getWidthPharase()}px -${numberRow * 40}px`,
    ...draggableStyle,
  })

  render() {
    const { level } = this.props;
    const itemStyleSelected = (isCheck, isDragging, item, index) => classNames(
      style.item,
      { [style.active]: isDragging },
      { [style.wrong]: isCheck && (+item.id !== index) },
      { [style.right]: isCheck && (+item.id === index) },
    );
    const itemStyle = (isDragging) => classNames(style.item, { [style.active]: isDragging });
    this.getBackgroundPosition();
    return (
      <>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={style.table}>
        <Droppable droppableId="droppable2" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                className={style.container}>
                {this.state.selected.map((selectedItem, index) => (
                  <Draggable
                    key={selectedItem.id}
                    draggableId={selectedItem.id}
                    index={index}>
                    {(provided, snapshot) => (
                      <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={itemStyleSelected(
                        this.props.isCheck,
                        snapshot.isDragging,
                        selectedItem,
                        index,
                      )}
                      style={this.getItemStyle(
                        selectedItem.content.length,
                        selectedItem.id,
                        provided.draggableProps.style,
                        level,
                      )}
                      >
                        {selectedItem.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
            </div>
            )}
          </Droppable>
        </div>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              className={style.containerItems}>
              {this.state.items.map((droppableItem, index) => (
                <Draggable
                  key={droppableItem.id}
                  draggableId={droppableItem.id}
                  index={index}>
                  {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={itemStyle(snapshot.isDragging)}
                    style={this.getItemStyle(
                      droppableItem.content.length,
                      droppableItem.id,
                      provided.draggableProps.style,
                      level,
                    )}
                    >
                      {droppableItem.content}
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
          )}
        </Droppable>
      </DragDropContext>
      </>
    );
  }
}

PhraseElementsView.propTypes = {
  phrase: PropTypes.array,
  puzzleItems: PropTypes.array,
  errorCount: PropTypes.number,
  answerItems: PropTypes.array,
  updateIsCheck: PropTypes.func,
  updateIsShow: PropTypes.func,
  isCheck: PropTypes.bool,
  isBackground: PropTypes.bool,
  level: PropTypes.number,
  backgroundUrl: PropTypes.string,
};

export default PhraseElementsView;
