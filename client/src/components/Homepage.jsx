import React,{useState} from 'react';
import {Link} from 'react-router-dom';
// Example data structure for featured or new arrival herbal plants
  
  const Homepage = () => {
    const token=!!localStorage.getItem('token');
    return (
      <div>
        <header><nav>
        <ul className="App-header">
          <li>
            <Link to="/">Home</Link>
          </li>
            <li>
             { token?(<Link to="/logout">Logout</Link>):(<Link to="/login">SignUp/Login</Link>)}
            </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav></header>
        <main>
          <section>
            <h2>Welcome to HERBAL HUB, your one-stop destination for all your herbal plant needs!</h2>
<p>
At Herbal Hub, we believe in the power of nature to enhance our well-being and bring harmony to our lives. We offer a wide selection of premium quality herbal plants that are carefully sourced and nurtured to ensure their vitality and effectiveness.

Discover the wonders of nature with our diverse range of herbal plants. Whether you're looking for medicinal herbs to support your health, culinary herbs to add flavor to your dishes, or fragrant plants to create a soothing ambiance, we have something for everyone.</p>
{ token?(<Link to="/products">Shop Now</Link>):(<Link to="/login">Shop Now</Link>)}
          </section>
          {/* ... */}
        </main>
        <footer>{/* ... */}</footer>
      </div>
    );
  };
  

export default Homepage;