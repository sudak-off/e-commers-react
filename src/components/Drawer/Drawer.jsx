import React, {useContext, useState} from 'react';
import axios from 'axios'

import {useCart} from "../../hooks/useCart";
import Info from "../Info";

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({onClose, onRemove, items = [], opened}) => {
    const {cartItems, totalPrice, numbFnt, setCartItems} = useCart()
    const [orderId, setOrderId] = useState(null);
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false)


    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://622a55b914ccb950d21a16d7.mockapi.io/orders', {
                items: cartItems,
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://622a55b914ccb950d21a16d7.mockapi.io/Cart/' + item.id);
                await delay(1000);
            }
        } catch (e) {
            alert('Ошибка при создании заказа :(');
            console.error(e)
        }
        setIsLoading(false);
    };

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
        <div className={styles.drawer}>
            <h2 className='d-flex justify-between mb-30'>Корзина
                <img onClick={onClose} className='cu-p' src="img/btn-remove.svg" alt="remove"/>
            </h2>

            {items.length > 0 ? (<div className='d-flex flex-column flex'>
                <div className="items flex">
                    {items.map((obj) => (<div key={obj.id}
                                              className="cartItem d-flex justify-between align-center mb-20">
                        <img width={70} height={70} src={obj.imageUrl} alt="shoes"/>
                        <div className='ml-20 mr-10'>
                            <p>{obj.title}</p>
                            <b>{numbFnt(obj.price)} грн.</b>
                        </div>
                        <img onClick={() => onRemove(obj.id)} className='removeBtn'
                             src="img/btn-remove.svg"
                             alt="remove"/>
                    </div>))}
                </div>
                <div className="cartTotalBlock">
                    <ul>
                        <li className='d-flex'>
                            <span>Итого:</span>
                            <div></div>
                            <b>{numbFnt(totalPrice)} грн.</b>
                        </li>
                    </ul>

                    <button disabled={isLoading} onClick={onClickOrder} className='greenButton'>Оформить заказ <img
                        src="img/arrow.svg" alt="arrow"/>
                    </button>

                </div>
            </div>) : (<Info title={isOrderComplete ? 'Заказ оформлен' : 'Корзина пустая'}
                             description={isOrderComplete
                                 ? `Ваш заказ #${orderId} скоро будет передан курьерской доставкой`
                                 : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
                             image={isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}/>)}


        </div>
    </div>);
};

export default Drawer;