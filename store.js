// نظام المتجر
const storeItems = [
    { id: 1, name: 'بطارية', type: 'energy', price: 100, effect: { energy: 10 } },
    { id: 2, name: 'شخصية نادرة', type: 'character', price: 500, effect: { miningRate: 1.5 } }
];

document.getElementById('store-btn').addEventListener('click', () => {
    const user = auth.currentUser;
    if (!user) return alert('يرجى تسجيل الدخول');
    
    storeItems.forEach((item) => {
        console.log(`${item.name} - السعر: ${item.price}`);
    });
});

function buyItem(itemId) {
    const user = auth.currentUser;
    if (!user) return;
    
    getUserData(user.uid).then((doc) => {
        if (doc.exists) {
            const userData = doc.data();
            const item = storeItems.find(i => i.id === itemId);
            if (userData.points >= item.price) {
                const newPoints = userData.points - item.price;
                if (item.type === 'energy') {
                    const newEnergy = (userData.energy || 0) + item.effect.energy;
                    updateUserData(user.uid, { points: newPoints, energy: newEnergy });
                } else if (item.type === 'character') {
                    updateUserData(user.uid, { points: newPoints, miningRate: item.effect.miningRate });
                }
            } else {
                alert('نقاط غير كافية!');
            }
        }
    });
    }
