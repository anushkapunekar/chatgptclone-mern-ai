import './signupPage.css'
import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignupPage =()=>{
    return(
    <div className='signupPage'>
        <SignUp path="/sign-up" signInUrl='/sign-in' />
        </div>
    );
};
export default SignupPage;