// Firebase Counter Module - Optimizado
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, doc, runTransaction } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBB2AegLOQ-b6ZGI_cuPycSFJFuRsUlu5U",
    authDomain: "cuenta-946e2.firebaseapp.com",
    projectId: "cuenta-946e2",
    storageBucket: "cuenta-946e2.firebasestorage.app",
    messagingSenderId: "816979648502",
    appId: "1:816979648502:web:809beffeea8ba7968031d7",
    measurementId: "G-RX9KZSC0F4"
};

async function runCounter() {
    const counterSpan = document.getElementById('visit-counter');
    try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const auth = getAuth(app);
        await signInAnonymously(auth);
        const counterRef = doc(db, `page-visits/${firebaseConfig.projectId}/visits/counter`);
        const newCount = await runTransaction(db, async (transaction) => {
            const counterDoc = await transaction.get(counterRef);
            let count = 1;
            if (counterDoc.exists()) {
                count = counterDoc.data().count + 1;
                transaction.update(counterRef, { count: count });
            } else {
                transaction.set(counterRef, { count: count });
            }
            return count;
        });
        if (counterSpan) counterSpan.textContent = newCount.toLocaleString('es-CL');
    } catch (error) {
        console.error("ERROR: Counter process failed.", error);
        if (counterSpan) counterSpan.textContent = "Error";
    }
}

runCounter();
