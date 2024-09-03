import React from "react";
import { Link } from "react-router-dom";
import "./hompage.css";
import PersonIcon from "@mui/icons-material/Person";
import jwt_decode from "jwt-decode";
import Carousel from 'react-bootstrap/Carousel';

// Example data structure for featured or new arrival herbal plants

const Homepage = () => {

  const token = !!localStorage.getItem("token");
  if (token) {
    const Token = localStorage.getItem("token");
    var decodedToken = jwt_decode(Token);
    var username = decodedToken.name;
  }

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <h1>Herbal Hub</h1>
            <img src="/images/logo.png" height="60" width="60" />
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>

            {token ? (
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                }}
              >
                <PersonIcon />
                <span style={{ marginLeft: "3px", marginTop: "4px" }}>
                  Hi! Hari
                </span>
              </li>
            ) : null}
            
              {token ? (
                <li><Link to="/logout">Logout</Link></li>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li>
                    <Link to="/signup">SignUp</Link>
                  </li>
                </>
              )}
            
          </ul>
        </nav>
      </header>

      <section className="home" id="Home">
        <div className="content">
          <span>
            <h2>Welcome to Green Amazon <h2>
          </span>
          <h3>Your one-stop destination for all your herbal plant needs!</h3>
          <div className="welcomepara">
            <p>
              At Green Amazon, we believe in the power of nature to enhance our
              well-being and bring harmony to our lives. We offer a wide
              selection of premium quality herbal plants that are carefully
              sourced and nurtured to ensure their vitality and effectiveness.
            </p>
          </div>
          <div className="link">
            {" "}
            {token ? (
              <Link to="/products" className="btn">Shop Now</Link>
            ) : (
              <Link to="/login" className="btn">
                Shop Now
              </Link>
            )}
          </div>
        </div>
        
      </section>
      <section id="Category" className="category">
        <h1 className="heading">
          Shop By <span>Category</span>
        </h1>

        <div className="boxContainer">
          <div className="box">
            <h3>Herbal plants</h3>
            <img
              src="https://i0.wp.com/gathervictoria.com/wp-content/uploads/2019/09/Recently-Updated1708.jpg?resize=500%2C500&ssl=1"
              alt=""
              
            />
            {token ? (
              <Link to="/products" className="btn">Shop Now</Link>
            ) : (
              <Link to="/login" className="btn">
                Shop Now
              </Link>
            )}
          </div>

          <div className="box">
            <h3> Herbal Flowers</h3>
            <img
              src="https://i.etsystatic.com/10784385/r/il/6d424d/2422755290/il_794xN.2422755290_74i4.jpg"
              alt=""
              
            />
             {token ? (
              <Link to="/products" 
               className="btn">Shop Now</Link>
            ) : (
              <Link to="/login" className="btn" >
                Shop Now
              </Link>
            )}
          </div>

          <div className="box">
            <h3>Herbal Tea</h3>
            <img
              src="https://tastylicious.com/wp-content/uploads/2022/04/Chamomile-tea.jpg"
              alt=""
             
            />
           {token ? (
              <Link to="/products" className="btn">Shop Now</Link>
            ) : (
              <Link to="/login" className="btn">
                Shop Now
              </Link>
            )}
          </div>

          <div className="box">
            <h3>House plants</h3>
            <img
              src="https://www.kidsdogardening.com/wp-content/uploads/2019/06/Herbs-Small-Pots-1024x757.jpeg"
              alt=""
              
            />
          {token ? (
              <Link to="/products" className="btn">Shop Now</Link>
            ) : (
              <Link to="/login" className="btn">
                Shop Now
              </Link>
            )}
          </div>
          <div className="box">
            <h3>Medicinal</h3>
            <img 
              src="https://th.bing.com/th/id/R.85cff284db77cd516680bc17fab2c135?rik=%2fYUPZf7eDIJ3DQ&riu=http%3a%2f%2fnicolastocken.com%2fwp-content%2fuploads%2f2014%2f11%2fwpid11980-The-Crest-Garden-in-June-GTHC023-nicola-stocken.jpg&ehk=YfGf9kTTnBFVPRVEeo%2f0IOEeHXGKZo9aMU8Rg74NfPs%3d&risl=&pid=ImgRaw&r=0"
              alt=""
             
            />
            {token ? (
              <Link to="/products" className="btn">Shop Now</Link>
            ) : (
              <Link to="/login" className="btn">
                Shop Now
              </Link>
            )}
          </div>
          
        </div>
      </section>
    
      <footer>
        <ul className="nav-links">
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>© 2023 Herbal Hub, Inc.</li>
        </ul>
      </footer>
    </>
  );
};

export default Homepage;
// let slideIndex = 0;
// function showSlides() {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {slideIndex = 1}
//   slides[slideIndex-1].style.display = "block";
//   setTimeout(showSlides, 2000); // Change image every 2 seconds
// }
// showSlides();
