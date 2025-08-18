import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../lib/firebase'; // Assuming you've exported 'db' from your firebase config file

interface Mission {
  id: string;
  name: string;
  description: string;
  // Add other mission fields as needed
}

const MissionList: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const missionsCollection = collection(db, "missions");
        // You can add a query here to filter missions if needed
        // For example, to get a mission named "Data Base Setup":
        // const q = query(missionsCollection, where("name", "==", "Data Base Setup"));
        // const querySnapshot = await getDocs(q);

        const querySnapshot = await getDocs(missionsCollection); // Get all missions for now
        const missionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Mission[];
        setMissions(missionsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching missions:", err);
        setError("Failed to fetch missions.");
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  if (loading) {
    return <div>Loading missions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Missions</h2>
      {missions.length === 0 ? (
        <p>No missions found.</p>
      ) : (
        <ul>
          {missions.map(mission => (
            <li key={mission.id}>
              <h3>{mission.name}</h3>
              <p>{mission.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MissionList;