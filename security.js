// نظام الأمان
function detectCheating(userData) {
    const now = Date.now();
    if ((userData.totalMines || 0) > 1000 && (now - userData.lastLogin) < 24 * 60 * 60 * 1000) {
        alert('تم اكتشاف نشاط مشبوه، سيتم مراجعة حسابك');
        // يمكن إرسال تقرير إلى الأدمن
    }
}

auth.onAuthStateChanged((user) => {
    if (user) {
        getUserData(user.uid).then((doc) => {
            if (doc.exists) detectCheating(doc.data());
        });
    }
});
