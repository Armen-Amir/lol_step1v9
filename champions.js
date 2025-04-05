// Function to parse CSV data
function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const result = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const obj = {};
        let currentValue = '';
        let isInQuotes = false;
        let currentIndex = 0;
        
        for (let char of lines[i]) {
            if (char === '"') {
                isInQuotes = !isInQuotes;
            } else if (char === ',' && !isInQuotes) {
                obj[headers[currentIndex].trim()] = currentValue.trim();
                currentValue = '';
                currentIndex++;
            } else {
                currentValue += char;
            }
        }
        obj[headers[currentIndex].trim()] = currentValue.trim();
        result.push(obj);
    }
    
    return result;
}

// Function to fetch and load matchup data
async function loadMatchupData() {
    try {
        const response = await fetch('matchups.csv');
        const csvData = await response.text();
        return parseCSV(csvData);
    } catch (error) {
        console.error('Error loading matchup data:', error);
        return [];
    }
}

function populateTable(matchups) {
    const tbody = document.querySelector('.matchup-table tbody');
    tbody.innerHTML = ''; // Clear existing rows

    matchups.forEach(matchup => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="champion-icon">
                    <img src="${matchup.icon_url}" 
                         alt="${matchup.champion}"
                         onerror="this.src='assets/champions/default.png'">
                    <span>${matchup.champion}</span>
                </div>
            </td>
            <td>
                <div class="threat-level">
                    <span class="threat-${matchup.threat_level}">${matchup.threat_level.charAt(0).toUpperCase() + matchup.threat_level.slice(1)}</span>
                </div>
            </td>
            <td>${matchup.notes}</td>
        `;
        tbody.appendChild(row);
    });
}

// Initialize the table when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const matchups = await loadMatchupData();
    populateTable(matchups);
}); 