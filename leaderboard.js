// الترتيب العالمي
function getTopUsers(limit = 10) {
    return db.collection('users').orderBy('points', 'desc').limit(limit).get();
}

document.getElementById('leaderboard-btn').addEventListener('click', () => {
    getTopUsers().then((snapshot) => {
        let leaderboardHTML = '<h2>أفضل 10 لاعبين</h2><ul>';
        snapshot.forEach((doc) => {
            const userData = doc.data();
            leaderboardHTML += `<li>${userData.name || 'مجهول'}: ${userData.points || 0}</li>`;
        });
        leaderboardHTML += '</ul>';
        document.getElementById('dashboard').innerHTML = leaderboardHTML;
    });
});
