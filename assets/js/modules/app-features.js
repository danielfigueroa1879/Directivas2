/**
 * app-features.js
 * Funcionalidades: Firestore, Animaciones SPD, Estados de Oficina y Carruseles.
 */

export function initAppFeatures() {
    // --- BLOQUE 2: Contador Firestore ---
    async function updateCounter() {
        try {
            const response = await fetch('https://os10coquimbo.netlify.app/.netlify/functions/counter');
            if (response.ok) {
                const data = await response.json();
                const counterEl = document.getElementById('visitor-count');
                if (counterEl) counterEl.textContent = data.count.toLocaleString();
            }
        } catch (e) { console.error('Error contador:', e); }
    }
    updateCounter();

    // --- BLOQUE 6 & 7: Animación SPD ---
    const spdBox = document.getElementById('spd-animation-box');
    if (spdBox) {
        const handleSPD = () => {
            spdBox.classList.add('active');
            setTimeout(() => spdBox.classList.remove('active'), 3000);
        };
        spdBox.addEventListener('mouseenter', handleSPD);
        spdBox.addEventListener('click', handleSPD);
    }

    // --- BLOQUE 12: Estado de Oficina ---
    function updateOfficeStatus() {
        const dot = document.getElementById('status-dot');
        const text = document.getElementById('status-text');
        if (!dot || !text) return;
        const now = new Date();
        const day = now.getDay();
        const time = now.getHours() + now.getMinutes() / 60;
        let open = false;
        if (day >= 1 && day <= 4) { if ((time >= 8.5 && time <= 13) || (time >= 14.5 && time <= 17.5)) open = true; } 
        else if (day === 5) { if (time >= 8.5 && time <= 13) open = true; }
        
        dot.className = open ? "w-3 h-3 rounded-full bg-green-500 mr-2" : "w-3 h-3 rounded-full bg-red-500 mr-2";
        text.textContent = open ? "Abierto ahora" : "Cerrado";
        text.className = open ? "text-sm font-medium text-green-600" : "text-sm font-medium text-red-600";
    }
    updateOfficeStatus();
    setInterval(updateOfficeStatus, 60000);

    // --- BLOQUE 13: Ken Burns Carousel ---
    const slides = document.querySelectorAll('.kb-slide');
    if (slides.length > 0) {
        let cur = 0;
        setInterval(() => {
            slides[cur].classList.remove('active');
            cur = (cur + 1) % slides.length;
            slides[cur].classList.add('active');
        }, 8000);
    }
}
