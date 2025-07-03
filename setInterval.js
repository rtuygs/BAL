const user = auth.currentUser;
if (user) {
    getUserData(user.uid).then((doc) => {
        if (doc.exists) {
            const userData = doc.data();
            const maxEnergy = userData.maxEnergy || 100;
            if (userData.energy < maxEnergy) {
                const newEnergy = Math.min(maxEnergy, userData.energy + 1);
                updateUserData(user.uid, { energy: newEnergy });
                document.getElementById('user-energy').textContent = newEnergy;
            }
        }
    });
}
