// نظام الأحداث
const events = [
    { id: 1, name: 'حدث رمضان', startDate: '2025-03-01', endDate: '2025-03-30', reward: 300 }
];

function checkCurrentEvents() {
    const now = new Date();
    events.forEach((event) => {
        if (now >= new Date(event.startDate) && now <= new Date(event.endDate)) {
            getUserData(auth.currentUser.uid).then((doc) => {
                if (doc.exists && !doc.data().events?.includes(event.id)) {
                    const userData = doc.data();
                    const newPoints = (userData.points || 0) + event.reward;
                    const participatedEvents = userData.events || [];
                    participatedEvents.push(event.id);
                    updateUserData(auth.currentUser.uid, { points: newPoints, events: participatedEvents });
                }
            });
        }
    });
}

document.getElementById('events-btn').addEventListener('click', () => {
    checkCurrentEvents();
});
