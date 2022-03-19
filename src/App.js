import React, {useEffect, useState} from "react";
import axios from "axios";
import {Route} from 'react-router-dom'
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";


function App() {
    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [favorites, setFavorites] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false)


    useEffect(() => {
        axios.get('https://622a55b914ccb950d21a16d7.mockapi.io/Items').then(res => {
            setItems(res.data)
        });
        axios.get('https://622a55b914ccb950d21a16d7.mockapi.io/Cart').then(res => {
            setCartItems(res.data)
        });
        axios.get('https://622a55b914ccb950d21a16d7.mockapi.io/favorites').then(res => {
            setFavorites(res.data)
        });
    }, []);

    const onAddToCart = (obj) => {
        axios.post('https://622a55b914ccb950d21a16d7.mockapi.io/Cart', obj);
        setCartItems(prev => [...prev, obj])
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
        try{
            if (favorites.find(favObj => favObj.id === obj.id)) {
                axios.delete(`https://622a55b914ccb950d21a16d7.mockapi.io/favorites/${obj.id}`);
                setFavorites(prev => prev.filter(item => item.id !== obj.id))
            } else {
                const { data } = await axios.post('https://622a55b914ccb950d21a16d7.mockapi.io/favorites', obj);
                setFavorites(prev => [...prev, data])
            }
        }catch (error) {
            alert('Не удалось добавить в фавориты')
        }
    }

    return (<div className="wrapper clear">
        {cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/> : null}
        <Header onClickCart={() => setCartOpened(true)}/>

        <Route path='/' exact>
            <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
            />
        </Route>

        <Route path="/favorites" exact>
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
        </Route>


    </div>);
}

export default App;
