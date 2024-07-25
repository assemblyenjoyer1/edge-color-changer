// content.js

function addHoverEffect(element) {
    element.addEventListener('mouseenter', () => {
        element.classList.add('hover-effect');
    });

    element.addEventListener('mouseleave', () => {
        element.classList.remove('hover-effect');
    });
}

function applyHoverEffects() {
    const elements = document.querySelectorAll('.kbnTypeahead__item.active');
    elements.forEach(element => {
        addHoverEffect(element);
    });
}

function throttle(fn, wait) {
    let time = Date.now();
    return function() {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

const throttledApplyHoverEffects = throttle(applyHoverEffects, 500);

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            throttledApplyHoverEffects();
        }
    });
});

const config = { attributes: true, childList: true, subtree: true };

const targetNodes = document.querySelectorAll('body, .dynamic-content');
targetNodes.forEach(node => observer.observe(node, config));

applyHoverEffects();

const style = document.createElement('style');
style.textContent = `
    .hover-effect {
        background-color: #9db0cd !important;
        color: #000 !important;
    }
    ::selection {
        background: #00bfb3;
        color: #000;
    }
`;
document.head.appendChild(style);