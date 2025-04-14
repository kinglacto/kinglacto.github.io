/**
 * Text Analyzer Functionality
 * Calculates counts for letters, words, spaces, newlines, symbols,
 * pronouns, prepositions, and indefinite articles.
 */

document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const analyzeButton = document.getElementById('analyzeButton');
    const outputDiv = document.getElementById('analysisOutput');

    // --- Word Lists (Case Insensitive - Converted to Lowercase) ---
    // Note: These lists are not exhaustive but cover common cases.
    const pronouns = [
        'i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself',
        'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself',
        'we', 'us', 'our', 'ours', 'ourselves', 'they', 'them', 'their', 'theirs', 'themselves',
        'who', 'whom', 'whose', 'which', 'what', 'that', // Relative/Interrogative
        'this', 'these', 'that', 'those' // Demonstrative
        // Add more if needed
    ].map(p => p.toLowerCase());

    const prepositions = [
        'aboard', 'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among',
        'around', 'as', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between',
        'beyond', 'but', 'by', 'concerning', 'considering', 'despite', 'down', 'during',
        'except', 'following', 'for', 'from', 'in', 'inside', 'into', 'like', 'minus',
        'near', 'next', 'of', 'off', 'on', 'onto', 'opposite', 'out', 'outside', 'over',
        'past', 'per', 'plus', 'regarding', 'round', 'save', 'since', 'than', 'through',
        'to', 'toward', 'towards', 'under', 'underneath', 'unlike', 'until', 'unto', 'up',
        'upon', 'versus', 'via', 'with', 'within', 'without'
        // Add more if needed
    ].map(p => p.toLowerCase());

    const indefiniteArticles = ['a', 'an'].map(a => a.toLowerCase());

    // --- Event Listener for Button ---
    analyzeButton.addEventListener('click', () => {
        const text = textInput.value;
        outputDiv.innerHTML = ''; // Clear previous results

        if (!text.trim()) {
            outputDiv.innerHTML = '<p>Please enter some text to analyze.</p>';
            return;
        }

        // 1. Basic Counts
        let letterCount = 0;
        let spaceCount = 0;
        let newlineCount = 0;
        let symbolCount = 0;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (/[a-zA-Z]/.test(char)) {
                letterCount++;
            } else if (/\s/.test(char)) {
                if (char === '\n') {
                    newlineCount++;
                }
                // Count all whitespace chars (space, tab, newline etc.) as spaces for simplicity here
                // or adjust if only ' ' is needed. Let's count only space ' '.
                if (char === ' ') {
                   spaceCount++;
                }
                // Newlines are counted separately above.
            } else {
                // Consider anything else a "special symbol" for this task
                symbolCount++;
            }
        }

        // Word Count (split by whitespace, filter empty strings)
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;

        // 2. Tokenization and Group Counts
        const pronounCounts = {};
        const prepositionCounts = {};
        const articleCounts = {};

        // Basic cleaning: lowercase and remove common punctuation for token analysis
        const cleanedText = text.toLowerCase().replace(/[.,!?;:()"“’]/g, '');
        const tokens = cleanedText.split(/\s+/).filter(token => token.length > 0);

        tokens.forEach(token => {
            if (pronouns.includes(token)) {
                pronounCounts[token] = (pronounCounts[token] || 0) + 1;
            }
            if (prepositions.includes(token)) {
                prepositionCounts[token] = (prepositionCounts[token] || 0) + 1;
            }
            if (indefiniteArticles.includes(token)) {
                articleCounts[token] = (articleCounts[token] || 0) + 1;
            }
        });

        // 3. Display Results
        displayResults(letterCount, wordCount, spaceCount, newlineCount, symbolCount, pronounCounts, prepositionCounts, articleCounts);
    });

    // --- Function to Display Results ---
    function displayResults(letters, words, spaces, newlines, symbols, pronounMap, prepositionMap, articleMap) {
        outputDiv.innerHTML = ''; // Clear again just in case

        let html = '<h3>Basic Counts:</h3>';
        html += `<p><strong>Letters:</strong> ${letters}</p>`;
        html += `<p><strong>Words:</strong> ${words}</p>`;
        html += `<p><strong>Spaces (' '):</strong> ${spaces}</p>`;
        html += `<p><strong>Newlines:</strong> ${newlines}</p>`;
        html += `<p><strong>Special Symbols:</strong> ${symbols}</p>`;

        // --- Pronoun Counts ---
        html += formatGroupCounts("Pronouns", pronounMap);

        // --- Preposition Counts ---
        html += formatGroupCounts("Prepositions", prepositionMap);

        // --- Indefinite Article Counts ---
        html += formatGroupCounts("Indefinite Articles", articleMap);

        outputDiv.innerHTML = html;
    }

     // --- Helper to format grouped counts ---
     function formatGroupCounts(title, counts) {
        let groupHtml = `<h3>${title} (Grouped by Word):</h3>`;
        const sortedKeys = Object.keys(counts).sort(); // Sort alphabetically

        if (sortedKeys.length === 0) {
            groupHtml += `<p>None found.</p>`;
        } else {
            groupHtml += '<ul>';
            sortedKeys.forEach(key => {
                groupHtml += `<li><strong>${key}:</strong> ${counts[key]}</li>`;
            });
            groupHtml += '</ul>';
        }
        return groupHtml;
    }

    console.log("Text Analyzer Initialized."); // Optional confirmation
});