import React,{useState} from "react";
import axios from "axios";
function CartItem({cartItem}){
    const [count, setCount] = useState(cartItem.quantity);
    const [error,seterror]=useState();
    const itemid=cartItem._id;
  const incQuantity = async () => {
    try {
        var newQuantity=count+1;
        const response = await axios.post('http://localhost:5000/cart', {
            itemid,
          newQuantity
        });
        
        console.log(response.data.message);
      } catch (error) {
        seterror(error.response.data.message);
      }
    setCount(count + 1);
    console.log(count);
  };

  const decQuantity = async () => {
    if (count > 0) {
        try {
            var newQuantity=count-1;
            const response = await axios.post('http://localhost:5000/cart', {
                itemid,
            newQuantity
            });
            
            console.log(response.data.message);
          } catch (error) {
            seterror(error.response.data.message);
          }
      setCount(count - 1);
      console.log(count);
    }
  };


    return(
        <div className="product-card cart" key={cartItem._id}>
          <h3 className="plink">{cartItem.name}</h3>
          <p className="price">Price: ₹{cartItem.price}</p>
          <button onClick={decQuantity}>-</button>
          <p className="plink">quantity:{count}</p>
        <button onClick={incQuantity}>+</button>
        </div>
    )
}
export default CartItem;