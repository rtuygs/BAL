// لوحة المستخدم
auth.onAuthStateChanged((user) => {
    if (user) {
        getUserData(user.uid).then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                document.getElementById('user-points').textContent = userData.points || 0;
                document.getElementById('user-energy').textContent = userData.energy || 100;
                document.getElementById('dashboard').innerHTML = `
                    <p>المستوى: ${userData.level || 1}</p>
                    <p>إجمالي التعدين: ${userData.totalMines || 0}</p>
                    <p>الإحالات: ${userData.referrals || 0}</p>
                `;
            }
        });
    }
});
