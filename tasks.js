// نظام المهام
const tasks = [
    { id: 1, description: 'تعدين 10 مرات', reward: 50, type: 'daily' },
    { id: 2, description: 'دعوة صديق', reward: 100, type: 'weekly' }
];

function checkTaskCompletion(userData, task) {
    if (task.id === 1 && (userData.totalMines || 0) >= 10) return true;
    if (task.id === 2 && (userData.referrals || 0) >= 1) return true;
    return false;
}

auth.onAuthStateChanged((user) => {
    if (user) {
        getUserData(user.uid).then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                tasks.forEach((task) => {
                    if (checkTaskCompletion(userData, task) && !userData.completedTasks?.includes(task.id)) {
                        const newPoints = (userData.points || 0) + task.reward;
                        const completedTasks = userData.completedTasks || [];
                        completedTasks.push(task.id);
                        updateUserData(user.uid, { points: newPoints, completedTasks });
                    }
                });
            }
        });
    }
});
