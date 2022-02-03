import React, {FunctionComponent, useRef} from 'react';
import {useDrag, useDrop, DropTargetMonitor} from 'react-dnd';

import {burgerConstructorSlice} from "../../services/toolkit-slices/burger-constructor";
import {ingredientCounterSlice} from "../../services/toolkit-slices/ingredient-counter";

import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import burgerConstructor from "../burger-constructor/burger-constructor.module.css";

import {TDraggableElement} from "../../services/types/data";
import {useAppDispatch} from "../../services/types/hooks";

export const ConstructorElementDraggable: FunctionComponent<TDraggableElement> = (props) => {
  const dispatch = useAppDispatch();

  const actionsConstructor = burgerConstructorSlice.actions;
  const actionsIngredientCounter = ingredientCounterSlice.actions;

  const ref = useRef<HTMLDivElement>(null);

  const [{isDragging}, dragRef] = useDrag({
    type: 'index',
    item: () => {
      return {index: props.index}
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  })

  const moveIngredientsListItem =
    (dragIndex: number, hoverIndex: number) => {
      dispatch(actionsConstructor.setIngredientToDrag({dragIndex: dragIndex, hoverIndex: hoverIndex}))
    }

  const [{isOver}, dropSortRef] = useDrop({
    accept: 'index',
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
    hover: (item: { index: number }, monitor: DropTargetMonitor) => {
      if (!ref.current || monitor.getClientOffset() === null) {
        return;
      }
      const dragIndex = item.index
      const hoverIndex = props.index

      if (dragIndex === hoverIndex) {
        return;
      }
//else if (monitor.getClientOffset() !== null) {
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;
      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveIngredientsListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
      // }
    }
  })

//  const dragDropRef = dragRef(dropSortRef(ref));
  dragRef(dropSortRef(ref));

  return (
    <div ref={ref}
         className={burgerConstructor.wrapper}>
      <div className="mr-1">
        <DragIcon type="primary"/>
      </div>
      <ConstructorElement
        text={props.itemWithId.item.name}
        price={props.itemWithId.item.price}
        thumbnail={props.itemWithId.item.image}
        handleClose={() => {
          dispatch(actionsConstructor.deleteIngredientFromOrder(props.itemWithId.uniqueId));
          dispatch(actionsIngredientCounter.counterDecrement(props.itemWithId.item._id));
        }}
      />
    </div>
  )
}

// ConstructorElementDraggable.propTypes = {
//   index: PropTypes.number.isRequired,
//   itemWithId: PropTypes.shape({
//     uniqueId: PropTypes.string.isRequired,
//     item: PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       price: PropTypes.number.isRequired,
//       image: PropTypes.string.isRequired,
//       _id: PropTypes.string.isRequired
//     })
//   }).isRequired
// }
