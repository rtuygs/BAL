// نظام العالم الافتراضي
const lands = [
    { id: 1, name: 'الأرض الأولى', level: 1, income: 10, requiredPoints: 0 },
    { id: 2, name: 'الأرض الثانية', level: 1, income: 20, requiredPoints: 1000 }
];

function unlockLand(landId) {
    const user = auth.currentUser;
    if (!user) return;
    
    getUserData(user.uid).then((doc) => {
        if (doc.exists) {
            const userData = doc.data();
            const land = lands.find(l => l.id === landId);
            if (userData.points >= land.requiredPoints) {
                const ownedLands = userData.ownedLands || [];
                if (!ownedLands.includes(landId)) {
                    ownedLands.push(landId);
                    updateUserData(user.uid, { ownedLands });
                }
            } else {
                alert('نقاط غير كافية لفتح الأرض!');
            }
        }
    });
}

document.getElementById('world-btn').addEventListener('click', () => {
    unlockLand(1); // مثال
});
