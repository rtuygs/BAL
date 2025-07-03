// الألعاب المصغرة
function playMiniGame() {
    const user = auth.currentUser;
    if (!user) return;
    
    getUserData(user.uid).then((doc) => {
        if (doc.exists) {
            const userData = doc.data();
            const randomReward = Math.floor(Math.random() * 50) + 10;
            const newPoints = (userData.points || 0) + randomReward;
            updateUserData(user.uid, { points: newPoints });
            alert(`لقد فزت بـ ${randomReward} نقطة!`);
        }
    });
}

document.getElementById('minigames-btn').addEventListener('click', () => {
    playMiniGame();
});
