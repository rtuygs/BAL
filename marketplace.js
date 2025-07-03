// السوق الداخلي
function listItemForSale(itemId, price) {
    const user = auth.currentUser;
    if (!user) return;
    
    const marketItem = {
        itemId: itemId,
        seller: user.uid,
        price: price,
        listedAt: Date.now()
    };
    addToCollection('market', marketItem);
}

function buyMarketItem(marketItemId) {
    const user = auth.currentUser;
    if (!user) return;
    
    db.collection('market').doc(marketItemId).get().then((doc) => {
        if (doc.exists) {
            const marketItem = doc.data();
            getUserData(user.uid).then((buyerDoc) => {
                const buyerData = buyerDoc.data();
                if (buyerData.points >= marketItem.price) {
                    const newPoints = buyerData.points - marketItem.price;
                    updateUserData(user.uid, { points: newPoints });
                    updateUserData(marketItem.seller, { points: marketItem.price });
                    db.collection('market').doc(marketItemId).delete();
                } else {
                    alert('نقاط غير كافية!');
                }
            });
        }
    });
}

document.getElementById('marketplace-btn').addEventListener('click', () => {
    listItemForSale(1, 200); // مثال
});
