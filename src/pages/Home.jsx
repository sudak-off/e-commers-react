import React from 'react';
import Card from "../components/Card/Card";

const Home = ({items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart}) => {
    return (
        <div className="content p-40">
            <div className='d-flex align-center mb-40 justify-between'>
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : `Вся обувь`}</h1>
                <div className='search-block d-flex'>
                    <img src="/img/search.svg" alt="search"/>
                    {searchValue && (
                        <img
                            onClick={() => setSearchValue('')}
                            className="clear cu-p"
                            src="/img/btn-remove.svg"
                            alt="Clear"
                        />
                    )}
                    <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder='Поиск...'/>
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {items.filter((item) => item.title.toLowerCase().includes(searchValue)).map((item, index) => (
                    <Card
                        key={index}
                        title={item.title}
                        price={item.price}
                        imageUrl={item.imageUrl}
                        onFavorite={(obj) => onAddToFavorite(obj)}
                        onPlus={(obj) => onAddToCart(obj)}
                        {...items}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;