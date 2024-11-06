import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { GoogleMap, Marker, LoadScript, InfoWindow } from '@react-google-maps/api';
import './App.css';  // Import the updated CSS file

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQPOImxI-2976grCFJ_77nkOIaPBRalj0",
  authDomain: "tracking-system-f4617.firebaseapp.com",
  databaseURL: "https://tracking-system-f4617-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tracking-system-f4617",
  storageBucket: "tracking-system-f4617.appspot.com",
  messagingSenderId: "274709147711",
  appId: "1:274709147711:web:730665ff54bc5da2e9c88a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const App = () => {
  const [busLocation, setBusLocation] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const busLocationRef = ref(db, 'busLocation');
    
    onValue(busLocationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBusLocation({ lat: data.latitude, lng: data.longitude });
        setLoading(false);
      }
    });
  }, []);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <div className="app-container">
      <h1 className="title">
        <span className="bus">Bus</span>
        <span className="buddy">Buddy</span>
        <span className="subtitle">
          : Track Your Bus
          <img
            src="https://cdn-icons-png.flaticon.com/128/6544/6544041.png"
            alt="Location Icon"
            className="location-icon"
          />
        </span>
      </h1>

      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading Bus Location...</p>
        </div>
      ) : (
        <LoadScript googleMapsApiKey="AIzaSyAYE55g7FkOAJq8jHGBBgdC9DjhRW8bRPA">
          <GoogleMap
            mapContainerClassName="map-container"
            center={busLocation}
            zoom={15}
            onLoad={handleMapLoad}
            onClick={() => setShowInfo(false)}
          >
            {mapLoaded && (
              <Marker
                position={busLocation}
                onClick={() => setShowInfo(true)}
                icon={{
                  url: 'https://cdn-icons-png.flaticon.com/128/3448/3448339.png',
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            )}
            {showInfo && (
              <InfoWindow position={busLocation} onCloseClick={() => setShowInfo(false)}>
                <div>
                  <h3>Bus Location</h3>
                  <p>Latitude: {busLocation.lat}</p>
                  <p>Longitude: {busLocation.lng}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${busLocation.lat},${busLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#007BFF', textDecoration: 'none', fontWeight: 'bold' }}
                  >
                    View on Google Maps
                  </a>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default App;
