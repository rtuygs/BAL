---

### 8. ملف `referral.js`
```javascript
// نظام الإحالات
function generateReferralLink(uid) {
    return `https://yourgithubusername.github.io/super-crypto-game/?ref=${uid}`;
}

auth.onAuthStateChanged((user) => {
    if (user) {
        const referralLink = generateReferralLink(user.uid);
        console.log('رابط الإحالة الخاص بك: ', referralLink);
        // يمكن عرض الرابط للمستخدم في الواجهة
    }
});

const urlParams = new URLSearchParams(window.location.search);
const refUid = urlParams.get('ref');
if (refUid && auth.currentUser) {
    getUserData(auth.currentUser.uid).then((doc) => {
        if (!doc.exists) {
            getUserData(refUid).then((refDoc) => {
                if (refDoc.exists) {
                    const referrerData = refDoc.data();
                    const newPoints = (referrerData.points || 0) + 100;
                    updateUserData(refUid, { points: newPoints, referrals: (referrerData.referrals || 0) + 1 });
                    updateUserData(auth.currentUser.uid, { points: 50, energy: 100 }); // صندوق ترحيبي
                }
            });
        }
    });
  }
