import AppContext from "../context";
import {useContext} from "react";

export const useCart = () => {
    const {cartItems, numbFnt, setCartItems} = useContext(AppContext)
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

    return {cartItems, numbFnt, totalPrice, setCartItems}
}