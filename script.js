function copyIP() {
    navigator.clipboard.writeText("212.22.93.162:2302");

    // 🔊 звук клика
    const sound = document.getElementById("clickSound");
    sound.currentTime = 0;
    sound.volume = 0.4; // тихо и приятно
    sound.play();

    const toast = document.getElementById("toast");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

const connectBtn = document.getElementById("connectBtn");
const modal = document.getElementById("connectModal");

connectBtn.addEventListener("click", () => {
    modal.classList.add("show");
});

modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("show");
});


/* ===== ОНЛАЙН СЕРВЕРА ===== */

const SERVER_ID = "37612819";

async function updateOnline() {
    const onlineEl = document.getElementById("onlineCount");
    const statusEl = document.querySelector(".status");
    const statusText = document.getElementById("serverStatus");

    try {
        const res = await fetch(
            `https://api.battlemetrics.com/servers/${SERVER_ID}`
        );
        const data = await res.json();

        const players = data.data.attributes.players;
        const maxPlayers = data.data.attributes.maxPlayers;

        onlineEl.textContent = `${players} / ${maxPlayers}`;

      statusEl.classList.remove("online", "offline");

// сервер считается онлайн, если API ответил
statusEl.classList.add("online");

if (players > 0) {
    statusText.textContent = "Сервер онлайн";
} else {
    statusText.textContent = "Сервер онлайн (0 игроков)";
}


    } catch (e) {
        onlineEl.textContent = "—";
        statusEl.classList.add("offline");
        statusText.textContent = "Сервер оффлайн";
    }
}

updateOnline();
setInterval(updateOnline, 60000);

/* ===== ЧАСТИЦЫ (БЕЗ ИЗМЕНЕНИЙ) ===== */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const particles = [];
for (let i = 0; i < 120; i++) {
    particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        s: Math.random() * 0.3 + 0.1
    });
}

function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255,255,255,0.15)";

    for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.s;
        if (p.y > h) {
            p.y = -5;
            p.x = Math.random() * w;
        }
    }

    requestAnimationFrame(draw);
}

draw();
