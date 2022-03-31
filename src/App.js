import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {Route} from 'react-router-dom'
import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
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


    useEffect(() => {
        async function fetchData() {
            try {

                // setIsLoading(true)

                const [cartResponse, favoriteResponse, itemsResponse] = await Promise.all([
                    axios.get('https://622a55b914ccb950d21a16d7.mockapi.io/Cart'),
                    axios.get('https://622a55b914ccb950d21a16d7.mockapi.io/favorites'),
                    axios.get('https://622a55b914ccb950d21a16d7.mockapi.io/Items')
                ])

                // setIsLoading(false)

                setIsLoading(false)
                setCartItems(cartResponse.data);
                setFavorites(favoriteResponse.data);
                setItems(itemsResponse.data);
            } catch (e) {
                alert('Ошибка при запросе данных');
                console.error(e)
            }
        }

        fetchData();
    }, []);

    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
            if (findItem) {
                setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
                await axios.delete(`https://622a55b914ccb950d21a16d7.mockapi.io/Cart/${findItem.id}`);
            } else {
                setCartItems((prev) => [...prev, obj]);
                const { data } = await axios.post('https://622a55b914ccb950d21a16d7.mockapi.io/Cart', obj);
                setCartItems((prev) =>
                    prev.map((item) => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id,
                            };
                        }
                        return item;
                    }),
                );
            }
        } catch (error) {
            alert('Ошибка при добавлении в корзину');
            console.error(error);
        }
    };

    const onRemoveItem = async (id) => {
        try {
            await axios.delete(`https://622a55b914ccb950d21a16d7.mockapi.io/Cart/${id}`);
            setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)))
        } catch (e) {
            alert('Ошибка при удалении данных')
            console.error(e)
        }
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
        } catch (e) {
            alert('Не удалось добавить в фавориты')
            console.error(e)
        }
    }

    const isItemsAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id))
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
                <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}
                        opened={cartOpened}/>
                <Header onClickCart={() => setCartOpened(true)}/>

                <Route path='' exact>
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

                <Route path="favorites" exact>
                    <Favorites/>
                </Route>

                <Route path="orders">
                    <Orders/>
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
