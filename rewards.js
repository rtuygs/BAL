// الجوائز اليومية
function checkDailyLogin(userData) {
    const lastLogin = userData.lastLogin || 0;
    const now = Date.now();
    if (now - lastLogin > 24 * 60 * 60 * 1000) {
        const reward = 50;
        const newPoints = (userData.points || 0) + reward;
        updateUserData(auth.currentUser.uid, { points: newPoints, lastLogin: now });
    }
}

auth.onAuthStateChanged((user) => {
    if (user) {
        getUserData(user.uid).then((doc) => {
            if (doc.exists) {
                checkDailyLogin(doc.data());
            }
        });
    }
});
