// نظام الإنجازات
const achievements = [
    { id: 1, name: 'أكملت 100 عملية تعدين', condition: (user) => (user.totalMines || 0) >= 100, reward: 200 }
];

function checkAchievements(userData) {
    achievements.forEach((achievement) => {
        if (achievement.condition(userData) && !userData.achievements?.includes(achievement.id)) {
            const newPoints = (userData.points || 0) + achievement.reward;
            const achieved = userData.achievements || [];
            achieved.push(achievement.id);
            updateUserData(auth.currentUser.uid, { points: newPoints, achievements: achieved });
            alert(`لقد حصلت على إنجاز: ${achievement.name}`);
        }
    });
}

auth.onAuthStateChanged((user) => {
    if (user) {
        getUserData(user.uid).then((doc) => {
            if (doc.exists) checkAchievements(doc.data());
        });
    }
});
