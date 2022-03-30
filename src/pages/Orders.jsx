import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios'
import Card from "../components/Card/Card";
import AppContext from "../context";

const Orders = () => {

    const {onAddToCart, onAddToFavorite } = useContext(AppContext)
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
         try{
             const {data} = await axios.get('https://622a55b914ccb950d21a16d7.mockapi.io/orders');
             // console.log(data.map(obj => obj.items).flat())
             setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
             setIsLoading(false)
         }catch (e) {
             alert('Ошибка при оформление заказа')
             console.error(e)
         }
        })()
    }, []);


    return (
        <div className="content p-40">
            <div className='d-flex align-center mb-40 justify-between'>
                <h1>Мои заказы</h1>
            </div>
            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        // onFavorite={(obj) => onAddToFavorite(obj)}
                        // onPlus={(obj) => onAddToCart(obj)}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
};

export default Orders;