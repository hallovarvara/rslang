import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import style from './PhraseElementsView.module.scss';

// TODO helper
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves an item from one list to another list.
 */
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
    const { puzzleItems, answerItems } = props;
    console.log(answerItems, 1);
    this.state = {
      items: puzzleItems,
      selected: [],
      isCheck: false,
    };
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.errorCount, 3);
    if (this.props.errorCount !== prevProps.errorCount) {
      this.setState({
        items: [],
        selected: this.props.answerItems,
      });
    }
    if (this.props.answerItems !== prevProps.answerItems) {
      this.setState({
        answer: this.props.answerItems,
      });
    }
    if (this.props.puzzleItems !== prevProps.puzzleItems) {
      this.setState({
        items: this.props.puzzleItems,
        selected: [],
      });
    }
  }

  /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
  id2List = {
    droppable: 'items',
    droppable2: 'selected',
  };

  getItems = (array) => array.map((word, index) => ({
    id: `${index}`,
    content: `${word}`,
  }));

  getList = (id) => this.state[this.id2List[id]];

  onDragEnd = (result) => {
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index,
      );
      let state = { items };
      if (source.droppableId === 'droppable2') {
        state = { selected: items };
      }
      this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination,
      );
      this.setState({
        items: result.droppable,
        selected: result.droppable2,
      });
    }
  };

  handleClickCheck = () => {
    this.setState({ isCheck: true });
  }

  // handleClickItem = (item) => {
  //   console.log(item, 45)
  //   const {items, selected } = this.state;

  //   selected.push(item)
  //   this.setState({selected})

  // }

  itemStyleSelected = (isCheck, isDragging, item, index) => {
    console.log(item, index, 111)
    classNames(
      style.item,
      { [style.active]: isDragging },
      { [style.wrong]: isCheck && (item.id !== index) },
      { [style.right]: isCheck && (item.id === index) },
    );
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const itemStyleSelected = (isCheck, isDragging, item, index) => classNames(
      style.item,
      { [style.active]: isDragging },
      { [style.wrong]: isCheck && (+item.id !== index) },
      { [style.right]: isCheck && (+item.id === index) },
    );
    const itemStyle = (isDragging) => classNames(style.item, { [style.active]: isDragging });
    return (
      <>
      <button onClick={() => this.props.handleClickCheck(this.state.selected)}>Ckeck</button>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className={style.table}>
        <Droppable droppableId="droppable2" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={style.container}>
                {this.state.selected.map((item, index) => (
                    <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={itemStyleSelected(this.props.isCheck, snapshot.isDragging, item, index)}
                                >
                                {item.content}
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
          {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                className={style.containerItems}>
                {this.state.items.map((item, index) => (
                    <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={itemStyle(snapshot.isDragging)}
                                // onClick={(item) => this.handleClickItem(item)}
                              >
                                {item.content}
                            </div>
                        )}
                    </Draggable>
                ))}
                {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* <button onClick={() => this.handleClickCheck()}>Check</button> */}
      </>
    );
  }
}

PhraseElementsView.propTypes = {
  phrase: PropTypes.array,
  puzzleItems: PropTypes.array,
  errorCount: PropTypes.number,
  answerItems: PropTypes.array,
};

export default PhraseElementsView;
