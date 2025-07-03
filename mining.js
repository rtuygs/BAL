// نظام التعدين الوهمي
let lastMineTime = 0;

document.getElementById('mine-btn').addEventListener('click', () => {
    const user = auth.currentUser;
    if (!user) return alert('يرجى تسجيل الدخول أولاً');
    
    const now = Date.now();
    if (now - lastMineTime < 1000) return alert('انتظر قليلاً قبل التعدين مرة أخرى'); // Cooldown 1 ثانية
    
    getUserData(user.uid).then((doc) => {
        if (doc.exists) {
            const userData = doc.data();
            if (userData.energy > 0) {
                const miningRate = userData.miningRate || 1;
                const pointsToAdd = 10 * miningRate;
                const newPoints = (userData.points || 0) + pointsToAdd;
                const newEnergy = userData.energy - 1;
                updateUserData(user.uid, { 
                    points: newPoints, 
                    energy: newEnergy, 
                    totalMines: (userData.totalMines || 0) + 1 
                });
                document.getElementById('user-points').textContent = newPoints;
                document.getElementById('user-energy').textContent = newEnergy;
                lastMineTime = now;
            } else {
                alert('لا توجد طاقة كافية!');
            }
        } else {
            updateUserData(user.uid, { points: 0, energy: 100, miningRate: 1, totalMines: 0 });
        }
    });
});
