/**
 * Simple Analytics Logger for Clicks and Page Views
 * Logs events to the browser's developer console.
 */

function logEvent(type, targetElement) {
    const timestamp = new Date().toISOString();
    let objectDescription = 'Unknown'; 

    if (type === 'view') {
        objectDescription = 'PageView'; 
    } else if (targetElement) {
        objectDescription = targetElement.tagName.toUpperCase(); 

        if (targetElement.id) {
            objectDescription += `#${targetElement.id}`;
        }

        if (targetElement.classList && targetElement.classList.length > 0) {
            objectDescription += `.${Array.from(targetElement.classList).join('.')}`;
        }

        if (targetElement.tagName.toUpperCase() === 'A' && targetElement.href) {
            objectDescription += ` (href: ${targetElement.getAttribute('href')})`; 
        } else if (targetElement.tagName.toUpperCase() === 'IMG' && targetElement.alt) {
            objectDescription += ` (alt: ${targetElement.alt})`;
        } else if (targetElement.tagName.toUpperCase() === 'BUTTON' || targetElement.classList.contains('button')) {
             if (targetElement.textContent.trim()) {
                 objectDescription += ` (text: ${targetElement.textContent.trim()})`;
             }
        } else if (['P', 'H1', 'H2', 'H3', 'LI', 'SPAN'].includes(targetElement.tagName.toUpperCase())) {
            const textSnippet = targetElement.textContent.trim().substring(0, 30); // First 30 chars
            if (textSnippet) {
                 objectDescription += ` (text: ${textSnippet}...)`;
            }
        }
    }

    console.log(`${timestamp}, ${type}, ${objectDescription}`);
}


logEvent('view', null); 
document.addEventListener('click', function(event) {
    logEvent('click', event.target);
}, true); 

console.log("Simple Analytics Logger Initialized.");