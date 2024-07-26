// content.js

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