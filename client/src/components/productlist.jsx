import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
function Productlists({plants}) {
  // const [plantname,setplantname]=useState('');
  // const handlesearch=(e)=>{
  //   setplantname(e.target.value);
  // }
  // const handlesubmit=async (e)=>{
  //   e.preventDefault();
  //   const response =await axios.post("/search")
     
  // }
    return (
      <section>
          {/* Search bar section */}
          {/* <div className="search-bar">
            <input type="text" placeholder="Search for plants..." onChange={handlesearch} value={plantname} />
            <button onSubmit={handlesubmit}>Search</button>
          </div> */}
       
      <ul>
        {Object.entries(plants).map(([id, {name}]) => (
          <li key={id}>
            <Link to={`/products/${id}`}>
              <h3>{name}</h3>
            </Link>
          </li>
        ))}
      </ul>
      </section>
    );
  }
  

export default Productlists;