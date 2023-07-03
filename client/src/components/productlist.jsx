import React from "react";
import {Link} from "react-router-dom";

function Productlists({plants}) {
    return (
      <section>
          {/* Search bar section */}
          <div className="search-bar">
            <input type="text" placeholder="Search for plants..." />
            <button>Search</button>
          </div>
       
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