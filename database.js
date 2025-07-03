// التعامل مع قاعدة البيانات
const db = firebase.firestore();

function getUserData(uid) {
    return db.collection('users').doc(uid).get();
}

function updateUserData(uid, data) {
    return db.collection('users').doc(uid).set(data, { merge: true });
}

function getCollection(collectionName) {
    return db.collection(collectionName).get();
}

function addToCollection(collectionName, data) {
    return db.collection(collectionName).add(data);
}

function updateCollectionItem(collectionName, docId, data) {
    return db.collection(collectionName).doc(docId).set(data, { merge: true });
}
