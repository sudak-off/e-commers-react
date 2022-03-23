import React from 'react';
import Info from "./Info";

const Drawer = ({onClose, onRemove, items = []}) => {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className='d-flex justify-between mb-30'>Корзина
                    <img onClick={onClose} className='cu-p' src="/img/btn-remove.svg" alt="remove"/>
                </h2>

                {
                    items.length > 0 ? (
                        <div className='wrapper-items'>
                            <div className="items">
                                {
                                    items.map((obj) => (
                                        <div key={obj.id}
                                             className="cartItem d-flex justify-between align-center mb-20">
                                            <img width={70} height={70} src={obj.imageUrl} alt="shoes"/>
                                            <div className='ml-20 mr-10'>
                                                <p>{obj.title}</p>
                                                <b>{obj.price} грн.</b>
                                            </div>
                                            <img onClick={() => onRemove(obj.id)} className='removeBtn'
                                                 src="/img/btn-remove.svg"
                                                 alt="remove"/>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="cartTotalBlock">
                                <ul>
                                    <li className='d-flex'>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>21 234 грн.</b>
                                    </li>
                                    <li className='d-flex'>
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>2 890 грн.</b>
                                    </li>
                                </ul>

                                <button className='greenButton'>Оформить заказ <img src="/img/arrow.svg" alt="arrow"/>
                                </button>

                            </div>
                        </div>
                    ) : (
                        <Info title='Корзина пустая'
                              description='Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                              image='/img/empty-cart.jpg'/>
                    )
                }


            </div>
        </div>
    );
};

export default Drawer;