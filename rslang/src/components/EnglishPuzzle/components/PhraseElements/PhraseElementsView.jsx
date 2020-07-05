// import React from 'react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import { shuffle } from '../../helpers';
import style from './PhraseElementsView.module.scss';

// TODO helper
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

class PhraseElementsView extends Component {
  constructor(props) {
    super(props);
    this.phrase = props.phrase;
    this.state = {
      items: shuffle(this.getItems(this.phrase)),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  getItems = (array) => array.map((word, index) => ({
    id: `${index}`,
    content: `${word}`,
  }));

  onDragEnd(result) {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    const items = reorder(
      this.state.items,
      source.index,
      destination.index,
    );
    this.setState({
      items,
    });
  }

  render() {
    const itemStyle = (isDragging) => classNames(style.item, { [style.active]: isDragging });
    const { items } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd} className={style.container}>
        <Droppable droppableId="droppable" direction="horizontal" className={style.container}>
          {(provided) => (
            <div
              className={style.container}
              ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={itemStyle(snapshot.isDragging)}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
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
    );
  }
}

PhraseElementsView.propTypes = {
  phrase: PropTypes.array,
};

export default PhraseElementsView;
