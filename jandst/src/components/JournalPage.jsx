import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function JournalPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && content) {
      try {
        await addDoc(collection(db, 'journals'), {
          title,
          content,
          createdAt: serverTimestamp(),
          userId: auth.currentUser.uid,
        });
        navigate('/dashboard');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  return (
    <div>
      <h2>Add New Journal</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Save Journal</button>
      </form>
    </div>
  );
}

export default JournalPage;
