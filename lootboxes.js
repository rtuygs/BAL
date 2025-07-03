// صناديق الحظ
function openLootBox() {
    const user = auth.currentUser;
    if (!user) return;
    
    getUserData(user.uid).then((doc) => {
        if (doc.exists) {
            const userData = doc.data();
            const lootBoxPrice = 100;
            if (userData.points >= lootBoxPrice) {
                const newPoints = userData.points - lootBoxPrice;
                const randomItem = storeItems[Math.floor(Math.random() * storeItems.length)];
                updateUserData(user.uid, { points: newPoints, inventory: firebase.firestore.FieldValue.arrayUnion(randomItem.id) });
                alert(`لقد حصلت على: ${randomItem.name}`);
            } else {
                alert('نقاط غير كافية!');
            }
        }
    });
}

document.getElementById('lootboxes-btn').addEventListener('click', () => {
    openLootBox();
});
