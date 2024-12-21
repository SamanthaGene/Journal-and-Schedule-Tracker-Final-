import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { collection, query, orderBy, onSnapshot, doc, getDoc, deleteDoc } from 'firebase/firestore';
import "./Dashboard.css";
import "./Dashboard.js";

function Dashboard() {
  const [userDetails, setUserDetails] = useState(null);
  const [journalEntries, setJournalEntries] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const fetchUserDetails = async () => {
          try {
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setUserDetails(docSnap.data());
            } else {
              console.log("No user data found in Firestore");
              setLoading(false);
            }
          } catch (error) {
            console.error("Error fetching user data: ", error);
            setLoading(false);
          }
        };

        fetchUserDetails();
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'journals'), orderBy('createdAt', 'desc')),
      (querySnapshot) => {
        const entries = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setJournalEntries(entries);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching journal entries: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDeleteJournal = async (journalId) => {
    try {
      await deleteDoc(doc(db, 'journals', journalId));
      console.log("Journal deleted successfully!");
    } catch (error) {
      console.error("Error deleting journal: ", error);
    }
  };

  const handleViewJournal = (entry) => {
    setSelectedJournal(entry);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {userDetails ? (
        <>
          <div className="dashboard-body">
            <div className="dashboard-sidebar">
              <div className="dashboard-header"></div>
              <h3>Welcome to your Dashboard, {userDetails.firstName}!</h3>
              {/* Logout Button */}
              <div>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>

            <div className="dashboard-main">
              <div className="dashboard-card">
                <h4>Your Journal Entries:</h4>
                {journalEntries.length > 0 ? (
                  <ul>
                    {journalEntries.map((entry) => (
                      <li key={entry.id}>
                        <h5>{entry.title}</h5>
                        <p>{entry.content.slice(0, 100)}...</p>
                        <button onClick={() => handleViewJournal(entry)}>View Full Entry</button>
                        <button onClick={() => handleDeleteJournal(entry.id)}>Delete</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No journal entries found. Start adding one!</p>
                )}

                <button className="btn btn-primary" onClick={() => navigate('/journal')}>
                  Add New Journal
                </button>
              </div>

              <div className="dashboard-card">
                {selectedJournal && (
                  <div>
                    <h3>Full Entry: {selectedJournal.title}</h3>
                    <p>{selectedJournal.content}</p>
                    <button onClick={() => setSelectedJournal(null)}>Close Entry</button>
                  </div>
                )}
              </div>

              <div className="dashboard-card">
                <h4>View Your Calendar</h4>
                <div className="dashboard-body1">
                <div className="dashboard-1">
                  <div className="dashboard-wrapper">
                    <header>
                      <p className="current-date">December 2024</p>
                      <div className="icons">
                        <span className="material-symbols-rounded">chevron_left</span>
                        <span className="material-symbols-rounded">chevron_right</span>
                      </div>
                    </header>
                    <div className="dashboard-calendar">
                      <ul className="weeks">
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                      </ul>
                      <ul className="days">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
                        <li>11</li>
                        <li>12</li>
                        <li>13</li>
                        <li>14</li>
                        <li>15</li>
                        <li>16</li>
                        <li>17</li>
                        <li>18</li>
                        <li>19</li>
                        <li>20</li>
                        <li className="active">21</li>
                        <li>22</li>
                        <li>23</li>
                        <li>24</li>
                        <li>25</li>
                        <li>26</li>
                        <li>27</li>
                        <li>28</li>
                        <li>29</li>
                        <li>30</li>
                        <li>31</li>
                        <li className="inactive">1</li>
                        <li className="inactive">2</li>
                        <li className="inactive">3</li>
                        <li className="inactive">4</li>
                      </ul>
                    </div>
                  </div>
                </div>
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/calendar')}>
                      Go to Calendar
                    </button>
              </div>
            </div>
          </div>
        </>
      ) : null} 
    </div>
  );
}

export default Dashboard;