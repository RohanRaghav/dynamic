import React, { useEffect, useState } from 'react';

const TeamPanel = () => {
  const [team, setTeam] = useState(null);
  const [newMember, setNewMember] = useState({ name: '', number: '', email: '', uid: '', gender: '' });
  const [missingFields, setMissingFields] = useState({});
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const uid = localStorage.getItem('uid'); // Retrieve UID from localStorage

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/team/${uid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch team details');
        }
        const data = await response.json();

        // Identify missing fields
        const missing = {};
        [ 'objective', 'problemStatement', 'problemDefinition', 'softwareTechnology'].forEach(field => {
          if (!data[field]) {
            missing[field] = '';
          }
        });

        setTeam(data);
        setMissingFields(missing);
      } catch (error) {
        console.error(error);
      }
    };

    if (uid) {
      fetchTeamDetails();
    }
  }, [uid]);

  // Handle input change for missing fields
  const handleFieldChange = (e, field) => {
    setMissingFields({ ...missingFields, [field]: e.target.value });
  };

  // Handle new member input change
  const handleMemberChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  // Submit updated details
  const updateDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/team/update/${uid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...missingFields }),
      });

      if (!response.ok) {
        throw new Error('Failed to update details');
      }

      setTeam({ ...team, ...missingFields });
      setMissingFields({});
    } catch (error) {
      console.error(error);
    }
  };

  // Add new team member
  const addMember = async () => {
    if (!newMember.name || !newMember.number || !newMember.email || !newMember.uid || !newMember.gender) {
      alert('Please fill all member details');
      return;
    }

    // Check if the UID already exists in the team
    const isUIDExists = team.students.some((student) => student.uid === newMember.uid);
    if (isUIDExists) {
      alert('UID already exists in the team');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/team/addMember/${uid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newMember }),
      });

      if (!response.ok) {
        throw new Error('Failed to add member');
      }

      const updatedTeam = { ...team, students: [...team.students, newMember] };
      setTeam(updatedTeam);
      setNewMember({ name: '', number: '', email: '', uid: '', gender: '' });

      setSuccessMessage('New member added successfully!');
      setShowSubmitButton(updatedTeam.students.length > 2); // Show submit button if more than 2 members
    } catch (error) {
      console.error(error);
    }
  };

  const submitTeam = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/team/submit/${uid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ students: team.students }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit team');
      }

      alert('Team successfully submitted');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='overflow'>
      <div className="dashboard">
        <div className="navbar">
          <div></div>
          <div className="navbardash">
            <ul>
              <li>Home</li>
              <li>Guidelines</li>
              <li>
                <button className="logout">Logout</button>
              </li>
            </ul>
          </div>
        </div>

        <div className='centering'>
          {team ? (
            <div className='coloring'>
              <h1>MEMBER’S REGISTRATION</h1>
                <div className='divisions'>
                  <div className='teamholder'>{team.teamName}</div>
                  <div className='teamholder'>{team.leaderName}</div>
                  <div className='teamholder'>{team.email}</div>
                  <div className='teamholder'>{team.phoneNumber}</div>
                  <div className='teamholder'>{team.department}</div>
                  <div className='teamholder'>{team.gender}</div>
                </div>
              {/* Editable Fields for Missing Information */}
              {Object.keys(missingFields).length > 0 ? (
                <div>
                  <h3>Complete Missing Information</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                  {Object.entries(missingFields).map(([key, value]) => (
                    <div key={key} style={{ display: "flex", flexDirection: "column" }}>
                    <input
                      type="text"
                      placeholder={key.replace(/([A-Z])/g, " $1")}
                      value={value}
                      onChange={(e) => handleFieldChange(e, key)}
                      style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                  </div>
                  ))}
                  </div>
                  <button onClick={updateDetails} className='logout'>Save Details</button>
                </div>
              ) : (
                <div>
                  <h3>Team Information</h3>
                  <div className='divisions'>
                  <p><strong>Objective:</strong> {team.objective}</p>
                  <p><strong>Problem Statement:</strong> {team.problemStatement}</p>
                  </div>
                  <div className='divisions'>
                  <p><strong>Problem Definition:</strong> {team.problemDefinition}</p>
                  <p><strong>Software Technology:</strong> {team.softwareTechnology}</p>
                </div></div>
              )}
<center>
<h3>Team Members:</h3>
<div className="divisions">
  {team.students.map((student, index) => (
    <div key={index} className="student-row">
      <div className="teamholder">{student.name}</div>
      <div className="teamholder">{student.number}</div>
      <div className="teamholder">{student.email}</div>
      <div className="teamholder">{student.uid}</div>
      <div className="teamholder">{student.gender}</div>
    </div>
  ))}
</div>
</center>

              {/* Add New Team Member */}
              {team.students.length < 4 && (
                <div>
                  <h3>Add New Member</h3>
                  <div className='divisions'>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newMember.name}
                    onChange={handleMemberChange}
                  />
                  <input
                    type="text"
                    name="number"
                    placeholder="Phone Number"
                    value={newMember.number}
                    onChange={handleMemberChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newMember.email}
                    onChange={handleMemberChange}
                  />
                  <input
                    type="text"
                    name="uid"
                    placeholder="UID"
                    value={newMember.uid}
                    onChange={handleMemberChange}
                  />
                  </div><div className='divisions'>
                    <select
                      name="gender"
                      className='gender-selects'
                      value={newMember.gender}
                      onChange={handleMemberChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  <button onClick={addMember} className='logout'>+ Add Member</button>
                  </div>
                </div>
              )}

              {successMessage && <p>{successMessage}</p>}

              {/* Show Submit Button if more than 2 members are added */}
              {showSubmitButton && (
                <button onClick={submitTeam} className='logout'>Submit Team</button>
              )}
            </div>
          ) : (
            <p>Loading team details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamPanel;
