import React, { Fragment } from 'react';

import Button from './../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(ing => {
            return <li key={ing}><span style={{textTransform: 'capitalize'}}>{ing}</span>: {props.ingredients[ing]}</li>
        })

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={props.cancelPurchase}>Cancel</Button>    
            <Button btnType='Success' clicked={props.continuePurchase}>Continue</Button>
        </Fragment>
    );
}
   
export default orderSummary;