<div className="container"> 
      <header> 
        <div class="header">
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
            <div class="icons">
             {token ? ( 
               <Link href="#login">Login</Link>
              ) : ( 
              <Link href="#">logout</Link>
              )}
              &nbsp&nbsp&nbsp <Link href="#signup">signup</Link>
             </div>
      </div>
          <div class="MainHeader">
            <div id="MenuBtn" class="fas fa-bars"></div>

            <nav class="navbar">
                <Link href="#Home">Home</Link>
                <Link href="#Products">Products</Link>
                <Link href="#Category">Category</Link>
            </nav>
           <div class="about">
            <Link href="about">About</Link>
                <Link href="contact">Contact</Link>
           </div>
           </div>
      </header> 
      <section class="home" id="Home">
      <div class="content">  
          
            <span>Welcome to HERBAL HUB</span>
            <h3>your one-stop destination for all your herbal 
            plant needs! 
          </h3> 
        <div class="welcomepara"> 
          <p> 
            At Herbal Hub, we believe in the power of nature to enhance our 
            well-being and bring harmony to our lives. We offer  wide selection 
            of premium quality herbal plants that are carefully sourced and 
            nurtured to ensure their vitality and effectiveness. 
          </p> 
        </div> 
        <div class="link"> 
         {" "} 
          {token ? ( 
            <Link to="/products">Shop Now</Link> 
          ) : ( 
            <Link href="#" class="btn">Shop Now</Link>
          )}
        </div> 
      </div> 
     </section>
     <section id="Category" class="category">

      <h1 class="heading">Shop By <span>Category</span></h1>

      <div class="boxContainer">


          <div class="box">
              <h3>Herbal plants</h3>
              <img src="https://i0.wp.com/gathervictoria.com/wp-content/uploads/2019/09/Recently-Updated1708.jpg?resize=500%2C500&ssl=1" alt="" height="55%"></img>
              <Link href="#" class="btn">Shop Now</Link>
          </div>

          <div class="box">
              <h3> Herbal Flowers</h3>
              <img src="https://i.etsystatic.com/10784385/r/il/6d424d/2422755290/il_794xN.2422755290_74i4.jpg" alt="" height="55%"> </img>
              <Link href="#" class="btn">Shop Now</Link>
          </div>


          <div class="box">
              <h3>Herbal Tea</h3>
              <img src="https://tastylicious.com/wp-content/uploads/2022/04/Chamomile-tea.jpg" alt="" height="55%"></img>
              <Link href="#" class="btn">Shop Now</Link>
          </div>

          <div class="box">
              <h3>House plants</h3>
              <img src="https://www.kidsdogardening.com/wp-content/uploads/2019/06/Herbs-Small-Pots-1024x757.jpeg" alt="" height="55%"></img>
              <Link href="#" class="btn">Shop Now</Link>
          </div>
          <div class="box">
            <h3>Medicinal</h3>
            <img src="https://th.bing.com/th/id/R.85cff284db77cd516680bc17fab2c135?rik=%2fYUPZf7eDIJ3DQ&riu=http%3a%2f%2fnicolastocken.com%2fwp-content%2fuploads%2f2014%2f11%2fwpid11980-The-Crest-Garden-in-June-GTHC023-nicola-stocken.jpg&ehk=YfGf9kTTnBFVPRVEeo%2f0IOEeHXGKZo9aMU8Rg74NfPs%3d&risl=&pid=ImgRaw&r=0" alt="" height="55%"></img>
            <Link href="#" class="btn">Shop Now</Link>
        </div>
        <div class="box">
          <h3>Rare Herbs</h3>
          <img src="https://thumbs.dreamstime.com/z/fresh-dried-herb-selection-hemp-paper-background-92765733.jpg" alt="" height="55%"></img>
          <Link href="#" class="btn">Shop Now</Link>
      </div>

      </div>

      </section>
      <footer class="footer"> 
        <h1 class="credit"> &copy; 2023 <span>HerbalHub</span>. All Rights Reserved. </h1>
      </footer> 
      </div>
