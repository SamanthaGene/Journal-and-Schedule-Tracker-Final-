import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { enUS } from 'date-fns/locale';
import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarPage() {
  const [newEvent, setNewEvent] = useState({ title: '', start: null, end: null });
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Add error state here
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = auth.currentUser.uid;
        const eventsRef = collection(db, 'Users', userId, 'calendar');
        const snapshot = await getDocs(eventsRef);
        const eventsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const formattedEvents = eventsData.map((event) => ({
          ...event,
          start: event.start.toDate ? event.start.toDate() : new Date(),
          end: event.end.toDate ? event.end.toDate() : new Date(),
        }));

        setAllEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events: ', error);
        setError('Failed to load events.');  // Set error message
      } finally {
        setLoading(false);
      }
    };

    if (auth.currentUser) {
      fetchEvents();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // If there's an error, show the error message
  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;  // Display error message
  }

  return (
    <div>
      <h2>Calendar</h2>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>

      <input
        type="text"
        placeholder="Event Title"
        value={newEvent.title}
        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
      />
      <DatePicker
        selected={newEvent.start}
        onChange={(start) => setNewEvent({ ...newEvent, start })}
        placeholderText="Start Date"
        showTimeSelect
        dateFormat="Pp"
      />
      <DatePicker
        selected={newEvent.end}
        onChange={(end) => setNewEvent({ ...newEvent, end })}
        placeholderText="End Date"
        showTimeSelect
        dateFormat="Pp"
      />
      <button onClick={handleAddEvent}>Add Event</button>

      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, marginTop: '20px' }}
        eventPropGetter={(event) => ({
          style: { backgroundColor: '#2e3d49', color: 'white', borderRadius: '5px' },
        })}
      />

      <div>
        <h4>Your Events:</h4>
        {allEvents.length > 0 ? (
          <ul>
            {allEvents.map((event) => (
              <li key={event.id}>
                <h5>{event.title}</h5>
                <p>{format(new Date(event.start), 'PPP')} - {format(new Date(event.end), 'PPP')}</p>
                <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
