/**
 * Text Analyzer Functionality
 * Calculates counts for letters, words, spaces, newlines, symbols,
 * pronouns, prepositions, and indefinite articles.
 */

document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const analyzeButton = document.getElementById('analyzeButton');
    const outputDiv = document.getElementById('analysisOutput');

    const pronouns = [
        "all", "another", "any", "anybody", "anyone", "anything", "as", "aught", "both", "each", "each other", 
        "either", "enough", "everybody", "everyone", "everything", "few", "he", "her", "hers", "herself", 
        "him", "himself", "his", "i", "idem", "it", "its", "itself", "many", "me", "mine", "most", "my", 
        "myself", "naught", "neither", "no one", "nobody", "none", "nothing", "nought", "one", "one another", 
        "other", "others", "ought", "our", "ours", "ourself", "ourselves", "several", "she", "some", "somebody", 
        "someone", "something", "somewhat", "such", "suchlike", "that", "thee", "their", "theirs", "theirself", 
        "theirselves", "them", "themself", "themselves", "there", "these", "they", "thine", "this", "those", 
        "thou", "thy", "thyself", "us", "we", "what", "whatever", "whatnot", "whatsoever", "whence", "where", 
        "whereby", "wherefrom", "wherein", "whereinto", "whereof", "whereon", "wherever", "wheresoever", 
        "whereto", "whereunto", "wherewith", "wherewithal", "whether", "which", "whichever", "whichsoever", 
        "who", "whoever", "whom", "whomever", "whomso", "whomsoever", "whose", "whosever", "whosesoever", 
        "whoso", "whosoever", "ye", "yon", "yonder", "you", "your", "yours", "yourself", "yourselves"
    ].map(p => p.toLowerCase());

    const prepositions = [
        "about", "above", "across", "after", "against", "along", "amid", "amidst", "among", "amongst",
        "anti", "around", "as", "at", "before", "behind", "below", "beneath", "beside", "besides",
        "between", "beyond", "but", "by", "concerning", "considering", "despite", "down", "during",
        "except", "excluding", "failing", "following", "for", "from", "in", "inside", "into", "like",
        "minus", "near", "of", "off", "on", "onto", "opposite", "outside", "over", "past", "per",
        "plus", "regarding", "round", "save", "since", "than", "through", "throughout", "to",
        "toward", "towards", "under", "underneath", "unlike", "until", "up", "upon", "versus", "via",
        "with", "within", "without", "alongside", "atop", "barring", "excepting", "given", "pending"
    ].map(p => p.toLowerCase());

    const indefiniteArticles = ['a', 'an'].map(a => a.toLowerCase());

    analyzeButton.addEventListener('click', () => {
        const text = textInput.value;
        outputDiv.innerHTML = ''; // Clear previous results

        if (!text.trim()) {
            outputDiv.innerHTML = '<p>Please enter some text to analyze.</p>';
            return;
        }

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
                if (char === ' ') {
                   spaceCount++;
                }
            } else {
                symbolCount++;
            }
        }

        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;

        const pronounCounts = {};
        const prepositionCounts = {};
        const articleCounts = {};

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

        displayResults(letterCount, wordCount, spaceCount, newlineCount, symbolCount, pronounCounts, prepositionCounts, articleCounts);
    });

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