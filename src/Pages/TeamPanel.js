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
        ['theme', 'objective', 'problemStatement', 'problemDefinition', 'softwareTechnology'].forEach(field => {
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
    <div>
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

        <div>
          {team ? (
            <div>
                <div className='divisions'>
              <p><strong>Team Name:</strong> {team.teamName}</p>
              <p><strong>Leader Name:</strong> {team.leaderName}</p>
              <p><strong>Email:</strong> {team.email}</p>
              <p><strong>Phone Number:</strong> {team.phoneNumber}</p>
              <p><strong>Department:</strong> {team.department}</p>
              <p><strong>Gender:</strong> {team.gender}</p>
                </div>
              {/* Editable Fields for Missing Information */}
              {Object.keys(missingFields).length > 0 ? (
                <div>
                  <h3>Complete Missing Information</h3>
                  {Object.entries(missingFields).map(([key, value]) => (
                    <div key={key}>
                      <label>{key.replace(/([A-Z])/g, ' $1')}:</label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleFieldChange(e, key)}
                      />
                    </div>
                  ))}
                  <button onClick={updateDetails} className='logout'>Save Details</button>
                </div>
              ) : (
                <div>
                  <h3>Team Information</h3>
                  <div className='divisions'>
                  <p><strong>Theme:</strong> {team.theme}</p>
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
<table class="team-members-table">
  <thead>
    <tr>
      <th>Student Name</th>
      <th>Student Number</th>
      <th>Email</th>
      <th>UID</th>
      <th>Gender</th>
    </tr>
  </thead>
  <tbody>
    {team.students.map((student, index) => (
      <tr key={index}>
        <td>{student.name}</td>
        <td>{student.number}</td>
        <td>{student.email}</td>
        <td>{student.uid}</td>
        <td>{student.gender}</td>
      </tr>
    ))}
  </tbody>
</table>
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
                  </div>
                  <div className='divisions'>
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
                  </div>
                  <button onClick={addMember} className='logout'>Add Member</button>
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
