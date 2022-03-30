import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {Route} from 'react-router-dom'
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";


function App() {
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [favorites, setFavorites] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

console.log(cartItems)

    useEffect(() => {
        async function fetchData() {

            // setIsLoading(true)

            const cartResponse = await axios.get('https://622a55b914ccb950d21a16d7.mockapi.io/Cart');
            const favoriteResponse = await axios.get('https://622a55b914ccb950d21a16d7.mockapi.io/favorites');
            const itemsResponse = await axios.get('https://622a55b914ccb950d21a16d7.mockapi.io/Items');

            // setIsLoading(false)

            setIsLoading(false)
            setCartItems(cartResponse.data);
            setFavorites(favoriteResponse.data);
            setItems(itemsResponse.data);
        }

        fetchData();
    }, []);

    const onAddToCart = (obj) => {
        try {
            if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
                axios.delete(`https://622a55b914ccb950d21a16d7.mockapi.io/Cart/${obj.id}`);
                setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
            } else {
                axios.post('https://622a55b914ccb950d21a16d7.mockapi.io/Cart', obj);
                setCartItems(prev => [...prev, obj])
            }

        } catch (e) {

        }
    }

    const onRemoveItem = (id) => {
        axios.delete(`https://622a55b914ccb950d21a16d7.mockapi.io/Cart/${id}`);
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    const onChangeSearchInput = (event) => {
        // console.log(event.target.value)
        setSearchValue(event.target.value)
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://622a55b914ccb950d21a16d7.mockapi.io/favorites/${obj.id}`);
                setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
            } else {
                const {data} = await axios.post('https://622a55b914ccb950d21a16d7.mockapi.io/favorites', obj);
                setFavorites(prev => [...prev, data])
            }
        } catch (error) {
            alert('Не удалось добавить в фавориты')
        }
    }

    const isItemsAdded = (id) => {
        return cartItems.some((obj) => Number(obj.id) === Number(id))
    }

    const numbFnt = (num) => {
        return num.toLocaleString('ua-UA');
    }

    return (
        <AppContext.Provider value={{
            items,
            cartItems,
            favorites,
            isItemsAdded,
            onAddToFavorite,
            onAddToCart,
            setCartOpened,
            setCartItems,
            numbFnt,
        }}>
            <div className="wrapper clear">
                {cartOpened ?
                    <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/> : null}
                <Header onClickCart={() => setCartOpened(true)}/>

                <Route path='/' exact>
                    <Home
                        items={items}
                        cartItems={cartItems}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        isLoading={isLoading}
                    />
                </Route>

                <Route path="/favorites" exact>
                    <Favorites/>
                </Route>

                <Route path="/orders" >
                    <Orders />
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
