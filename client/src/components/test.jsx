<div className="container"> 
<header> 
        <div className="header">
        <div className="logo">
        <img src="C:\Users\Keerthana\Pictures\IMG-20230412-WA0012[268].jpg" alt="" width="200" height="150"/>
         </div>
      
          
          {token ? ( 
              <li style={{ display: "flex", alignItems: "center" ,color:"black"}}> 
                <PersonIcon /> 
                <span style={{ marginLeft: "3px" ,marginTop: "4px" }}> 
                  Hi! {username.toUpperCase()} 
                </span> 
              </li> 
            ) : null} 
            <div className="icons">
             {token ? ( 
              <Link to="/logout">logout</Link>
               
              ) : ( 
             <><Link to="/login">Login</Link>  <Link to="/signupform">signup</Link></>
            
              )}
              
             </div>
      </div>
          <div className="MainHeader">
            <div id="MenuBtn" className="fas fa-bars"></div>

            <nav className="navbar">
                <Link to="/Homepage">Home</Link>
                <Link to="/Products">Products</Link>
                <Link to="#Category">Category</Link>
            </nav>
           <div className="about">
            <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
           </div>
           </div>
      </header> 
      
      <footer className="footer"> 
        <h1 className="credit"> &copy; 2023 <span>HerbalHub</span>. All Rights Reserved. </h1>
      </footer> 
      </div>


 
             
             