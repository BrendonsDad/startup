import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreateGroup({ onCreate }) {
    const [groupName, setGroupName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (groupName.trim() === '') return;
        onCreate(groupName.trim());
        navigate('/discover'); //go back to discover page
    };

    return (
        <main className="constainer-fluid bg-secondary text-center">
            <h1>Create a New Group</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Group Name</label>
                    <input
                        className="form-control"
                        type="text"
                        value={groupName}
                        onChange={e => setGroupName(e.target.value)}
                        placeholder="Enter new group name"
                    />
                </div>
                <button className="btn-secondary redbutton" type="submit" disabled={!groupName.trim()}>
                    Create Group
                </button>
            </form>
        </main>
    );
}