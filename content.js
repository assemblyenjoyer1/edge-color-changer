function replaceColors() {
    const elements = document.querySelectorAll('*');

    elements.forEach(element => {
        const styles = getComputedStyle(element);
        const originalBackgroundColor = styles.backgroundColor;
        const originalColor = styles.color;

        //rgb(245, 247, 250)
        // Initial replacement of colors if they match the target color
        if (originalBackgroundColor === 'rgb(157, 176, 205);') {
            element.style.backgroundColor = '#9db0cd';
        }
        if (originalColor === 'rgb(157, 176, 205)') {
            element.style.color = '#9db0cd';
        }

        // Set up hover event to change colors
        element.addEventListener('mouseover', () => {
            const hoverStyles = getComputedStyle(element);

            if (hoverStyles.backgroundColor === 'rgb(157, 176, 205)' || hoverStyles.backgroundColor === '#9db0cd') {
                if (!element.dataset.originalBackgroundColor) {
                    element.dataset.originalBackgroundColor = originalBackgroundColor;
                }
                element.style.backgroundColor = '#9db0cd';
            }
            if (hoverStyles.color === 'rgb(245, 247, 250)' || hoverStyles.color === '#9db0cd') {
                if (!element.dataset.originalColor) {
                    element.dataset.originalColor = originalColor;
                }
                element.style.color = '#9db0cd';
            }
        });

        // Set up mouseout event to revert colors
        element.addEventListener('mouseout', () => {
            if (element.dataset.originalBackgroundColor) {
                element.style.backgroundColor = element.dataset.originalBackgroundColor;
                delete element.dataset.originalBackgroundColor;
            }
            if (element.dataset.originalColor) {
                element.style.color = element.dataset.originalColor;
                delete element.dataset.originalColor;
            }
        });
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

const throttledReplaceColors = throttle(replaceColors, 500);

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            throttledReplaceColors();
        }
    });
});

const config = { attributes: true, childList: true, subtree: true };

const targetNodes = document.querySelectorAll('body, .dynamic-content');
targetNodes.forEach(node => observer.observe(node, config));

replaceColors();
