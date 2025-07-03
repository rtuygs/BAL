// نظام التحالفات
function createGuild(name) {
    const user = auth.currentUser;
    if (!user) return;
    
    const guildId = db.collection('guilds').doc().id;
    const guildData = {
        id: guildId,
        name: name,
        members: [user.uid],
        score: 0
    };
    updateCollectionItem('guilds', guildId, guildData);
}

function joinGuild(guildId) {
    const user = auth.currentUser;
    if (!user) return;
    
    db.collection('guilds').doc(guildId).update({
        members: firebase.firestore.FieldValue.arrayUnion(user.uid)
    });
}

document.getElementById('guilds-btn').addEventListener('click', () => {
    createGuild('تحالفي الأول'); // مثال
});
