// نظام المصادقة باستخدام Google
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

document.getElementById('login-btn').addEventListener('click', () => {
    auth.signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            console.log('تم تسجيل الدخول: ', user);
            document.getElementById('user-info').style.display = 'block';
            document.getElementById('login-btn').style.display = 'none';
            document.getElementById('user-name').textContent = user.displayName;
        })
        .catch((error) => {
            console.error('خطأ في تسجيل الدخول: ', error);
            alert('فشل تسجيل الدخول، حاول مرة أخرى');
        });
});

auth.onAuthStateChanged((user) => {
    if (user) {
        document.getElementById('user-info').style.display = 'block';
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('user-name').textContent = user.displayName;
        // تحديث بيانات المستخدم في قاعدة البيانات
        updateUserData(user.uid, { lastLogin: Date.now(), device: navigator.userAgent });
    } else {
        document.getElementById('user-info').style.display = 'none';
        document.getElementById('login-btn').style.display = 'block';
    }
});
