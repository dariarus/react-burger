import React, {FunctionComponent} from "react";

import numbersList from './order-numbers-list.module.css';

export const OrderNumbersList: FunctionComponent<{listName: string}> = (props) => {
  return (
    <div className={numbersList.container}>
      <p className="text text_type_main-medium">{props.listName}</p>
      <div className={numbersList.wrapper}>
        <div className={numbersList.wrapperList}>
          <div className={numbersList.list}>
            {/*<p className="mb-2 mr-2 text text_type_digits-default">123654</p>*/}
            {/*<p className="mb-2 mr-2 text text_type_digits-default">123654</p>*/}
            {/*<p className="mb-2 mr-2 text text_type_digits-default">123654</p>*/}
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}
