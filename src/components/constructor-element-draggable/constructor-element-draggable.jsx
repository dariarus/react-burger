import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

import { burgerConstructorSlice } from "../services/toolkit-slices/burger-constructor.js";
import { ingredientCounterSlice } from "../services/toolkit-slices/ingredient-counter";

import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import burgerConstructor from "../burger-constructor/burger-constructor.module.css";

export function ConstructorElemenetDraggable(props) {
    const { burgerConstructorIngredients } = useSelector(state => {
        return state
    });

    const dispatch = useDispatch();

    const actionsConstructor = burgerConstructorSlice.actions;
    const actionsIngredientCounter = ingredientCounterSlice.actions;

    const ref = React.useRef(null);

    const [{ isDragging }, dragRef] = useDrag({
        type: 'index',
        item: () => {
            return { index: props.index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    })

    const moveIngredientsListItem = 
        (dragIndex, hoverIndex) => {
            dispatch(actionsConstructor.setIngredientToDrag({ dragIndex: dragIndex, hoverIndex: hoverIndex }))
        }


    const [{ isOver }, dropSortRef] = useDrop({
        accept: 'index',
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }),
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index
            const hoverIndex = props.index

            if (dragIndex === hoverIndex) {
                return;
            }

            console.log(`dragIndex: ${dragIndex}`);
            console.log(`hoverIndex: ${hoverIndex}`);

            const hoverBoundingRect = ref.current.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveIngredientsListItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const dragDropRef = dragRef(dropSortRef(ref))

    return (
        <div
            ref={dragDropRef}
            className={burgerConstructor.wrapper}
            key={props.itemWithId.uniqueId}>
            <div className="mr-1">
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={props.itemWithId.item.name}
                price={props.itemWithId.item.price}
                thumbnail={props.itemWithId.item.image}
                handleClose={() => {
                    dispatch(actionsConstructor.deleteIngredientFromOrder(props.itemWithId.uniqueId));
                    dispatch(actionsIngredientCounter.counter_decrement(props.itemWithId.item._id));
                }}
            />
        </div>
    )
}