// نظام الأيردروب
function selectAirdropWinners() {
    getCollection('users').then((snapshot) => {
        const users = [];
        snapshot.forEach((doc) => users.push(doc.data()));
        const winner = users[Math.floor(Math.random() * users.length)];
        updateUserData(winner.uid, { points: (winner.points || 0) + 1000 });
        alert(`الفائز بالأيردروب: ${winner.name || 'مجهول'}`);
    });
}

document.getElementById('airdrop-btn').addEventListener('click', () => {
    if (isAdmin(auth.currentUser)) selectAirdropWinners();
});
