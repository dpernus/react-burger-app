import React, { Component, Fragment } from 'react'
import axiosInstance from './../../axios-orders';

import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/BuildControls/BuildControls'
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary'
import Spinner from './../../components/UI/Spinner/Spinner';

import { fastest } from 'sw-toolbox';

const INGREDIENTS_PRICE = {
    salad: 0.4,
    cheese: 0.3,
    meat: 1.3,
    bacon: 0.6
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        purchasable: false,
        purchasing: false,
        totalPrice: 4,
        loading: false,
        error: false,
    }

    addIngredient = (type) => {
        const ingredientCountUpdated = this.state.ingredients[type] + 1;
        const ingredientsUpdated = {
            ...this.state.ingredients,
        };
        ingredientsUpdated[type] = ingredientCountUpdated;

        const priceUpdated = this.state.totalPrice + INGREDIENTS_PRICE[type];

        this.setState({
            totalPrice: priceUpdated,
            ingredients: ingredientsUpdated
        });

        this.updatePurchasable(ingredientsUpdated);
    }

    removeIngredient = (type) => {
        const ingredientCountUpdated = this.state.ingredients[type] - 1;
        const ingredientsUpdated = {
            ...this.state.ingredients,
        };
        ingredientsUpdated[type] = ingredientCountUpdated;

        const priceUpdated = this.state.totalPrice - INGREDIENTS_PRICE[type];

        this.setState({
            totalPrice: priceUpdated,
            ingredients: ingredientsUpdated
        });

        this.updatePurchasable(ingredientsUpdated);
    }

    updatePurchasable = (ingredients) => {
        const ingredientsCantArray = Object.values(ingredients);
        const totalSumIngredients = ingredientsCantArray.reduce((sum, cantIng) => {
                return sum + cantIng;
            }, 0);
        const purchasableUpdated = totalSumIngredients > 0;
        this.setState({purchasable: purchasableUpdated});

    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    cancelPurchase = () => {
        this.setState({purchasing: false});
    }

    continuePurchase = () => {
        //alert('You Continue');
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Diana',
                address: {
                    country: 'Chile',
                },
                deiveryMethod: fastest,
            }
        }

        axiosInstance.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false})
            })
            .catch(error => this.setState({loading: false, purchasing: false}));
    }

    componentDidMount() {
      this.setState({loading: true});
      axiosInstance.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data, loading: false})
            })
            .catch(error => {
              this.setState({loading: false, error: true});
            })
    }

    render() {
        const disabledControls = {
            ...this.state.ingredients
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Can't get ingredients</p> : <Spinner />;

        if (this.state.ingredients) {
          burger = (
            <Fragment>
              <Burger ingredients={this.state.ingredients}/>
              <BuildControls 
                  addClick={this.addIngredient} 
                  removeClick={this.removeIngredient}
                  disabled={disabledControls}
                  purchasable={this.state.purchasable}
                  ordered={this.purchaseHandler}
                  price={this.state.totalPrice}/>
            </Fragment>
          );

          orderSummary = <OrderSummary ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            cancelPurchase={this.cancelPurchase}
            continuePurchase={this.continuePurchase}/>
        }
        

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        for(const ing in disabledControls){
            disabledControls[ing] = disabledControls[ing] <= 0
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} closeModal={this.cancelPurchase}>
                   {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);