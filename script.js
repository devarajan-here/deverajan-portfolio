// script.js
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");
let w, h;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let speed = 2;
const baseSpeed = 2;
const numStars = 800;
const stars = [];

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * w - w / 2,
        y: Math.random() * h - h / 2,
        z: Math.random() * w,
        size: Math.random() * 3 + 0.5,
        type: Math.random() > 0.9 ? 2 : (Math.random() > 0.7 ? 1 : 0)
    });
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.z -= speed * (star.type === 2 ? 1.5 : 1);

        if (star.z <= 0) {
            star.x = Math.random() * w - w / 2;
            star.y = Math.random() * h - h / 2;
            star.z = w;
            star.size = Math.random() * 3 + 0.5;
            star.type = Math.random() > 0.9 ? 2 : (Math.random() > 0.7 ? 1 : 0);
        }

        const sx = (star.x / star.z) * w / 2 + w / 2;
        const sy = (star.y / star.z) * h / 2 + h / 2;
        const radius = (1 - star.z / w) * star.size;
        const opacity = Math.min(1, (1 - star.z / w) * 2);

        if (star.type === 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.arc(sx, sy, radius, 0, Math.PI * 2);
            ctx.fill();
        } else if (star.type === 1) {
            const prevZ = star.z + speed;
            const prevX = (star.x / prevZ) * w / 2 + w / 2;
            const prevY = (star.y / prevZ) * h / 2 + h / 2;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = radius * 0.7;
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(sx, sy);
            ctx.stroke();
        } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
            ctx.beginPath();
            ctx.arc(sx, sy, radius * 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.arc(sx, sy, radius * 0.7, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    requestAnimationFrame(draw);
}

draw();

const speedDisplay = document.getElementById("speedDisplay");
const speedUp = document.getElementById("speedUp");
const speedDown = document.getElementById("speedDown");
let speedLevel = 1;
const maxSpeed = 10;

function updateSpeed() {
    speed = baseSpeed * speedLevel;
    speedDisplay.textContent = `WARP ${speedLevel}`;

    speedDisplay.classList.remove("text-white", "text-yellow-400", "text-red-400");
    if (speedLevel >= 7) speedDisplay.classList.add("text-red-400");
    else if (speedLevel >= 4) speedDisplay.classList.add("text-yellow-400");
    else speedDisplay.classList.add("text-white");

    document.querySelector(".tunnel-effect").style.background =
        `radial-gradient(circle at center, transparent 0%, rgba(0,0,0,${0.7 + speedLevel * 0.03}) 70%)`;
}

speedUp.addEventListener("click", () => {
    if (speedLevel < maxSpeed) {
        speedLevel++;
        updateSpeed();
    }
});

speedDown.addEventListener("click", () => {
    if (speedLevel > 1) {
        speedLevel--;
        updateSpeed();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === "+") speedUp.click();
    else if (e.key === "ArrowDown" || e.key === "-") speedDown.click();
});

updateSpeed();


document.addEventListener("DOMContentLoaded", () => {
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        letter.style.animationDelay = `${index * 0.4}s`; // Delay each letter's animation
        letter.classList.add('pop-up'); // Trigger the animation
    });
});