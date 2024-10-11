import React, { useState } from 'react';
import "./dashboardPage.css";
import { useAuth } from '@clerk/clerk-react';

const DashboardPage = () => {
    const [response, setResponse] = useState(""); // State to store the backend response
    const [loading, setLoading] = useState(false); // State to manage loading state
    
    const {userId} = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        if (!text) return;

        setLoading(true); // Show loading while fetching

        try {
            const res = await fetch("http://localhost:3000/api/chats", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({  text })
            });
            console.log('Response status:', res.status); // Log status
         const data = await res.json();
         console.log('Response data:', data); // Log full response

         if (data && data.message) {
             setResponse(data.message);
         } else {
             setResponse("No message received from the backend.");
         }
     } catch (error) {
         console.error('Error occurred:', error);
         setResponse("Error occurred while fetching the data.");
     } finally {
         setLoading(false);
     }
 };

    return (
        <div className='dashboardPage'>
            <div className='texts'>
                <div className='logo'>
                    <img src="/logo.png" alt="" />
                    <h1>RYNX AI</h1>
                </div>
                <div className='options'>
                    <div className='option'>
                        <img src="/chat.png" alt="" />
                        <span>Create a New Chat</span>
                    </div>
                    <div className='option'>
                        <img src="/image.png" alt="" />
                        <span>Analyze images</span>
                    </div>
                    <div className='option'>
                        <img src="/code.png" alt="" />
                        <span>Help me with code</span>
                    </div>
                </div>
            </div>

            <div className='formContainer'>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="text" placeholder='Ask me anything...' />
                    <button>
                        <img src="/arrow.png" alt="" />
                    </button>
                </form>
            </div>

            {/* Display the backend response */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='response'>
                    {response && <p>{response}</p>}
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
