import React from 'react';
import "./homePage.css";
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='homepage'>
        <img src="/orbital.png" alt="" className='orbital' />
        <div className='left'>
            <h1>RYNX AI</h1>
            <h2>Superchange your creativity and productivity</h2>
            <h3>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit magnam quae nisi inventore unde, odio error aut expedita quia, quas doloribus, fugiat tenetur. Voluptate eveniet explicabo quaerat consequatur nemo facilis asperiores corrupti impedit laudantium.
            </h3>
            <Link to ='/dashboard'>Get Started</Link>
        </div>
        <div className='right'>
            <div className='imgContainer'>
                <div className='bgContainer'>
                    <div className='bg'></div>
                </div>
                <img src="/bot.png" alt="" className='bot' /> 
                      

            </div>
        </div>
       
    
    </div>
  );
};

export default HomePage;
