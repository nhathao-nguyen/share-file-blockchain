import React from "react";
// INTERNAL IMPORT
import { 
    Logo, 
    Header, 
    Button, 
    Card, 
    Footer, 
    CheckBox, 
    Filter, 
    Donate, 
    Form, 
    Notification, 
    Profile, 
    Login, 
    SignUp, 
    Upload, 
    Product } from "../Components";
    
const layout = () => {
    return (
        <div className="home">
            {/* <Logo /> */}
            <Header />
            <Product />
            {/* <Upload />
            <SignUp />
            <p>LOGIN</p>
            <Login />
            <p>BUTTON</p>
            <Button />
            <p>NOTIFICATION</p>
            <Notification />
            <p>FILTER</p>
            <Filter />
            <p>CARD</p>
            <Card />
            <p>DONATE</p>
            <Donate />
            <p>FORM</p>
            <Form />
            <p>PROFILE</p>
            <Profile />
            <p>CHECKBOX</p>
            <CheckBox />
            <p>FOOTER</p>
            <Footer /> */}
        </div>
    );
};

export default layout;
