import React, { useEffect, useState } from 'react';
import { auth, firestore } from './firebase'; // Import your Firebase configuration

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = firestore.collection('users').doc(user.uid);
                const doc = await userRef.get();
                if (doc.exists) {
                    setUserProfile(doc.data());
                }
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div>
            {userProfile ? (
                <div>
                    <h2>{userProfile.displayName}'s Profile</h2>
                    <p>Email: {userProfile.email}</p>
                    <p>Disposal History: {userProfile.disposalHistory}</p>
                    <p>Earned Tokens: {userProfile.tokens}</p>
                    {/* Display other relevant user information */}
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
};

export default UserProfile;
