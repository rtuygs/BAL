// لوحة تحكم الأدمن
const adminUIDs = ['YOUR_ADMIN_UID']; // استبدل بـ UID الخاص بك

function isAdmin(user) {
    return user && adminUIDs.includes(user.uid);
}

auth.onAuthStateChanged((user) => {
    if (isAdmin(user)) {
        document.getElementById('dashboard').innerHTML += `
            <h2>لوحة الأدمن</h2>
            <button onclick="selectAirdropWinners()">إطلاق أيردروب</button>
        `;
    }
});
