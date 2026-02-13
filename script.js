// Valentine's Day Interactive Chocolate Script

// State management
let unwrappedCount = 0;
const totalSegments = 5;
let isRevealed = false;

// DOM elements
const chocolateWrapper = document.getElementById('chocolateWrapper');
const revealContainer = document.getElementById('revealContainer');
const progressContainer = document.getElementById('progressContainer');
const progressFill = document.getElementById('progressFill');
const remainingSpan = document.getElementById('remaining');
const heartsContainer = document.getElementById('heartsContainer');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeWrapperSegments();
    createFloatingHearts();
    startHeartAnimation();

    // Hide title initially
    const title = document.querySelector('.title');
    title.classList.add('hidden');
});

// Initialize wrapper segment click handlers
function initializeWrapperSegments() {
    const segments = document.querySelectorAll('.wrapper-segment');

    segments.forEach(segment => {
        segment.addEventListener('click', () => {
            if (!segment.classList.contains('unwrapped') && !isRevealed) {
                unwrapSegment(segment);
            }
        });
    });
}

// Unwrap a segment
function unwrapSegment(segment) {
    // Add unwrapped class for animation
    segment.classList.add('unwrapped');
    unwrappedCount++;

    // Update progress
    updateProgress();

    // Play unwrap sound (optional - can add audio element)
    playUnwrapSound();

    // Check if all segments are unwrapped
    if (unwrappedCount >= totalSegments) {
        setTimeout(() => {
            revealSurprise();
        }, 600);
    }
}

// Update progress indicator
function updateProgress() {
    const remaining = totalSegments - unwrappedCount;
    remainingSpan.textContent = remaining;

    const progressPercentage = (unwrappedCount / totalSegments) * 100;
    progressFill.style.width = `${progressPercentage}%`;

    // Add a little celebration effect on progress bar
    if (unwrappedCount > 0) {
        progressFill.style.boxShadow = `0 0 ${20 + unwrappedCount * 5}px var(--color-accent)`;
    }
}

// Reveal the flowers and message
function revealSurprise() {
    isRevealed = true;

    // Hide chocolate wrapper
    chocolateWrapper.classList.add('hidden');

    // Hide progress container
    progressContainer.classList.add('hidden');

    // Show title
    const title = document.querySelector('.title');
    title.classList.remove('hidden');

    // Show reveal container with flowers and message
    setTimeout(() => {
        revealContainer.classList.add('visible');
        createCelebrationHearts();
    }, 800);
}

// Create floating hearts background
function createFloatingHearts() {
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝'];

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 8}s`;
        heart.style.fontSize = `${15 + Math.random() * 20}px`;
        heartsContainer.appendChild(heart);
    }
}

// Start heart animation loop
function startHeartAnimation() {
    setInterval(() => {
        const hearts = heartsContainer.querySelectorAll('.heart');
        hearts.forEach(heart => {
            if (Math.random() > 0.7) {
                heart.style.left = `${Math.random() * 100}%`;
            }
        });
    }, 8000);
}

// Create celebration hearts when revealed
function createCelebrationHearts() {
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '🌹'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = `${20 + Math.random() * 60}%`;
            heart.style.top = '50%';
            heart.style.fontSize = `${20 + Math.random() * 30}px`;
            heart.style.animationDuration = `${2 + Math.random() * 2}s`;
            heart.style.opacity = '1';

            // Custom animation for celebration
            heart.style.animation = 'celebrationBurst 3s ease-out forwards';

            heartsContainer.appendChild(heart);

            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 50);
    }
}

// Add celebration burst animation
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrationBurst {
        0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 0;
        }
        20% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) 
                       scale(1.5) rotate(${Math.random() * 720}deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Play unwrap sound (optional - requires audio files)
function playUnwrapSound() {
    // You can add audio elements and play sounds here
    // Example:
    // const audio = new Audio('unwrap.mp3');
    // audio.play();

    // For now, we'll add a visual feedback
    const segment = event.target;
    segment.style.transition = 'all 0.3s ease';
}

// Add sparkle effect when hovering over segments
document.querySelectorAll('.wrapper-segment').forEach(segment => {
    segment.addEventListener('mouseenter', (e) => {
        if (!segment.classList.contains('unwrapped')) {
            createSparkle(e.pageX, e.pageY);
        }
    });
});

// Create sparkle effect
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '20px';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translateY(-50px) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Add gentle sway animation to roses
function addRoseSway() {
    const roses = document.querySelectorAll('.rose');

    roses.forEach((rose, index) => {
        const swayAnimation = `
            @keyframes sway${index} {
                0%, 100% {
                    transform: rotate(0deg) scale(1);
                }
                25% {
                    transform: rotate(${1 + Math.random() * 2}deg) scale(1.02);
                }
                75% {
                    transform: rotate(-${1 + Math.random() * 2}deg) scale(0.98);
                }
            }
        `;

        const style = document.createElement('style');
        style.textContent = swayAnimation;
        document.head.appendChild(style);

        rose.style.animation = `roseGrow 0.8s ease-out forwards, sway${index} 4s ease-in-out infinite`;
        rose.style.animationDelay = `${0.15 * (index + 1)}s, ${0.15 * (index + 1) + 0.8}s`;
    });
}

// Call rose sway when revealed
const originalReveal = revealSurprise;
revealSurprise = function () {
    originalReveal();
    setTimeout(() => {
        addRoseSway();
    }, 1800);
};

// Add click counter display
let clickCount = 0;
document.addEventListener('click', () => {
    clickCount++;
});

// Easter egg: if user clicks on the title 3 times, show special message
let titleClickCount = 0;
const title = document.querySelector('.title');
title.addEventListener('click', () => {
    titleClickCount++;
    if (titleClickCount === 3) {
        title.textContent = 'I Love You! 💝💖💕';
        title.style.animation = 'titleGlow 0.5s ease-in-out infinite alternate';
        setTimeout(() => {
            title.textContent = 'Chúc Mừng Ngày Valentine 💖';
        }, 3000);
    }
});

// Prevent right-click context menu for a cleaner experience (optional)
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
