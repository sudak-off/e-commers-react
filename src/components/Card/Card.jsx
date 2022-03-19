import React, {useState} from 'react';

import styles from './Card.module.scss'

const Card = ({id, title, imageUrl, price, onFavorite, onPlus, favorited = false}) => {
    const [isAdded, setIsAdded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(favorited);

    const onClickPlus = () => {
        onPlus({title, imageUrl, price})
        setIsAdded(!isAdded)
    }

    const onClickFavorite = () => {
        onFavorite({id, title, imageUrl, price})
        setIsFavorite(!isFavorite)
    }

    const numbFnt = (num) => {
        return num.toLocaleString('ua-UA');
    }


    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavorite}>
                <img src={!isFavorite ? "/img/heart-unliked.svg" : "/img/heart-like.svg"} alt="like"/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="shoes"/>
            <h5>{title}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>Цена:</span>
                    <b>{numbFnt(price)} грн.</b>
                </div>
                <button>
                    <img className={styles.plus} onClick={onClickPlus}
                         src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} alt="plus"/>
                </button>
            </div>
        </div>
    );
};

export default Card;