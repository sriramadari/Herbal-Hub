import React from "react";
import "./contact.css"
function Contact(){
    return(
        <section className="contact" id="Contact">
            <h1 className="heading"><span>Contact</span> Us</h1>
            <div className="form">
            <form action="">
    
                <div className="inputBox">
                    <input type="text" required placeholder="Name"/>
                    <input type="email" required placeholder="Email"/>
                </div>
    
                <div className="inputBox">
                    <input type="number" required placeholder="Number"/>
                    <input type="text" required placeholder="Subject"/>
                </div>
    
                <textarea required placeholder="How We Can Help You" name="" id="" cols="30" rows="10"></textarea>
    
                <button className="btn">Submit </button>
    
            </form>
            </div>
        </section>
        

    )
}
export default Contact;