// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import { auth, firestore } from './firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(''); 
    const [messages, setMessages] = useState([]);
    const dummy = useRef();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        const messagesQuery = query(
            collection(firestore, 'messages'),
            orderBy('createdAt'),
            limit(50)
        );

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const messages = snapshot.docs.map(doc => doc.data());
            setMessages(messages);
            dummy.current.scrollIntoView({ behavior: 'smooth' });
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const signOut = () => {
        firebaseSignOut(auth);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            const { uid, photoURL } = auth.currentUser;
            await addDoc(collection(firestore, 'messages'), {
                text: message,
                createdAt: serverTimestamp(),
                uid,
                photoURL
            });
            setMessage('');
            dummy.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="App">
            <header>
                <h1>Chat App</h1>
                {user ? <button onClick={signOut}>Sign Out</button> : <button onClick={signInWithGoogle}>Sign In with Google</button>}
            </header>

            <main>
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.uid === auth.currentUser?.uid ? 'sent' : 'received'}`}>
                            <img src={msg.photoURL} alt="User Avatar" />
                            <p>{msg.text}</p>
                        </div>
                    ))}
                    <span ref={dummy}></span>
                </div>

                {user && (
                    <form onSubmit={sendMessage}>
                        <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Say something..." />
                        <button type="submit">Send</button>
                    </form>
                )}
            </main>
        </div>
    );
};

export default App;
