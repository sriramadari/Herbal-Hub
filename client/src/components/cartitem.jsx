import React,{useState} from "react";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import plantsData from "./plantsdata";
function CartItem({cartItem,updateSubtotal,pid}){
  const plantid=pid;
  const selectedProduct = Object.entries(plantsData).find(
    ([productId]) => productId === plantid
  );
  console.log(selectedProduct);
    const [count, setCount] = useState(cartItem.quantity);
    const [error,seterror]=useState();
    const itemid=cartItem._id;
    const [isDeleted, setIsDeleted] = useState(false);
  const incQuantity = async () => {
    try {
        var newQuantity=count+1;
        const response = await axios.post('http://localhost:5000/cart', {
            itemid,
          newQuantity
        });
        updateSubtotal();
        
        console.log(response.data.message);

      } catch (error) {
        seterror(error.response.data.message);
      }
    setCount(count + 1);
    console.log(count);
  };

  const decQuantity = async () => {
    if (count > 1) {
        try {
            var newQuantity=count-1;
            const response = await axios.post('http://localhost:5000/cart', {
                itemid,
            newQuantity
            });
            updateSubtotal();
            console.log(response.data.message);
          } catch (error) {
            seterror(error.response.data.message);
          }
      setCount(count - 1);
      console.log(count);
    }
    
  };

  const deleteitem=async()=>{
    try {
      const response = await axios.post('http://localhost:5000/delete', {
          itemid
      });
      setIsDeleted(true);
      console.log(response.data.message);
    } catch (error) {
      seterror(error.response.data.message);
    }
  }
if(isDeleted){
  return null;
}
if (!cartItem) {
  return null; 
}
    return(
      <div className="productcard" key={cartItem._id}>
      <div className="top-row">
      <img className="plantimg" src={selectedProduct[1].url} alt="plant" />
        <h3 className="plink">{cartItem.name}</h3>
        <IconButton className="delete-button" onClick={deleteitem} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
      <div className="bottom-row">
        <div className="quantity-container">
          <button className="quantity-button" onClick={decQuantity}>-</button>
          <p className="quantity">Quantity: {count}</p>
          <button className="quantity-button" onClick={incQuantity}>+</button>
        </div>
        <p className="price">Price: ₹{cartItem.price}</p>
      </div>
    </div>
    )
}
export default CartItem;