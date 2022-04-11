import React, {FunctionComponent} from "react";

import order from './created-order.module.css';

import {IngredientIcon} from "../ingredient-icon/ingredient-icon";
import {useAppDispatch, useSelector} from "../../services/types/hooks";
import {TOrders} from "../../services/types/data";
import {
  calculateTotalPrice, replaceBunToStart, cutDuplicatesFromArray,
  defineActualOrderDateInformation,
  mapBunAndIngredientsFromArray,
  mapBurgerIngredientFromId, countNotUniqueIngredients
} from "../../utils/burger-data";

import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {handleModalSlice} from "../../services/toolkit-slices/modal";

export const CreatedOrder: FunctionComponent<{ order: TOrders, status: boolean }> = (props) => {
  const {burgerDataState} = useSelector(state => {
    return state;
  })

  const actionsModal = handleModalSlice.actions;
  const dispatch = useAppDispatch();

  /***---- getting ingredient properties by ingredient id; separating bun and pushing it to start ----***/
  const burgerIngredient = mapBurgerIngredientFromId(props.order.ingredients, burgerDataState.burgerData);
  const burgerIngredientBunSorted = replaceBunToStart(burgerIngredient);
  const burgerIngredientCutDuplicates = cutDuplicatesFromArray(burgerIngredientBunSorted);

  /*** if ingredient-array is longer than 6 ***/
  const burgerIngredientSixFirst = burgerIngredientCutDuplicates.slice(0, 6);
  // [const cutCount = burgerIngredientBunSorted.length;
  // const burgerIngredientRest = burgerIngredientBunSorted.splice(6, cutCount);
  // const countOfRestedIngredients = burgerIngredientRest.length;]

  let restIngredientCount = 0;
  if (burgerIngredientCutDuplicates.length > 6) {
    restIngredientCount = burgerIngredientCutDuplicates.length - 6;
  }

  const countOfDuplicatedIngredients = countNotUniqueIngredients(props.order.ingredients);

  /***---- total price ----***/
  const calculateTotalFeedOrderPrice = React.useMemo(() => {
    const newBurgerIngredient = mapBunAndIngredientsFromArray(burgerIngredientBunSorted);
    return calculateTotalPrice(newBurgerIngredient.bun, newBurgerIngredient.ingredients);
  }, [burgerIngredientBunSorted])

  /***---- date format ----***/
  const orderCreatedAt = defineActualOrderDateInformation(props.order.createdAt);

  return (
    <div className={order.wrapper}
         onClick={() => {
           dispatch(actionsModal.setIngredientForModal(props.order));
           dispatch(actionsModal.handleModalOpen({
             modalOrderDetailsOpened: true
           }))
         }}>
      <div className={order.preview}>
        <p className="text text_type_digits-default">{`#${props.order.number}`}</p>
        <p className="text text_type_main-default text_color_inactive">{orderCreatedAt}</p>
      </div>
      <h2 className={`text text_type_main-medium ${order.burgerName}`}>{props.order.name}</h2>
      {
        props.status &&
        (
          props.order.status === 'done'
            ? <p className={`mt-2 text text_type_main-default ${order.textDone}`}>Выполнен</p>
            : props.order.status === 'created'
              ? <p className="mt-2 text text_type_main-default">Создан</p>
              : <p className="mt-2 text text_type_main-default">Готовится</p>
        )
      }
      <div className={order.ingredients}>
        <div className={order.ingredientsWrapper}>
          {
            burgerIngredientCutDuplicates.length <= 6
              ? burgerIngredientCutDuplicates.reverse().map((ingredient, index) => ingredient && ingredient.name && ingredient.image // получаем ingredient - чтобы он при поиске не был undefined
                && <IngredientIcon key={index} image={ingredient.image} imageName={ingredient.name} isSixth={false}
                                   ingredientCount={countOfDuplicatedIngredients[ingredient._id]}/>)
              : burgerIngredientSixFirst.reverse().map((ingredient, index) => ingredient && ingredient.name && ingredient.image // получаем ingredient - чтобы он при поиске не был undefined
                && <IngredientIcon key={index} image={ingredient.image} imageName={ingredient.name} isSixth={true}
                                   index={index}
                                   restCount={restIngredientCount}
                                   ingredientCount={countOfDuplicatedIngredients[ingredient._id]}/>
              )
          }

        </div>
        <div className={order.price}>
          <p className="mr-2 text text_type_digits-default">{calculateTotalFeedOrderPrice}</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </div>
  )
}
