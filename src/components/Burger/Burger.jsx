import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    let ingredientsArray = Object.keys(props.ingredients)
        .map(ingredient => {
            return [...Array(props.ingredients[ingredient])]
                .map((ingCant, key) => {
                    return <BurgerIngredient type={ingredient} key={ingredient + key}/>
                })
        })
        .reduce((array, elem) => {
            return array.concat(elem);
        }, []);
    
    if(ingredientsArray.length === 0){
        ingredientsArray = <p>Please, add some ingredient</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>   
            {ingredientsArray}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}

export default burger;