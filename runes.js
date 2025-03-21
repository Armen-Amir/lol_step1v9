const runeProfiles = [
    {
        name: "Standard",
        primary: {
            path: "Precision",
            runes: ["Lethal Tempo", "Triumph", "Legend: Alacrity", "Last Stand"]
        },
        secondary: {
            path: "Resolve",
            runes: ["Second Wind", "Unflinching"]
        },
        statShards: ["Attack Speed", "Adaptive Force", "Health"]
    },
    {
        name: "Alternative",
        primary: {
            path: "Precision",
            runes: ["Conqueror", "Triumph", "Legend: Tenacity", "Last Stand"]
        },
        secondary: {
            path: "Resolve",
            runes: ["Second Wind", "Unflinching"]
        },
        statShards: ["Attack Speed", "Adaptive Force", "Health"]
    }
];

const runeIcons = {
    paths: {
        "Precision": "assets/runes/precision.png",
        "Domination": "assets/runes/domination.png",
        "Sorcery": "assets/runes/sorcery.png",
        "Resolve": "assets/runes/resolve.png",
        "Inspiration": "assets/runes/inspiration.png"
    },
    runes: {
        "Lethal Tempo": "assets/runes/lethal-tempo.png",
        "Conqueror": "assets/runes/conqueror.png",
        "Triumph": "assets/runes/triumph.png",
        "Legend: Alacrity": "assets/runes/legend-alacrity.png",
        "Legend: Tenacity": "assets/runes/legend-tenacity.png",
        "Last Stand": "assets/runes/last-stand.png",
        "Second Wind": "assets/runes/second-wind.png",
        "Unflinching": "assets/runes/unflinching.png"
    },
    statShards: {
        "Attack Speed": "assets/runes/attack-speed.png",
        "Adaptive Force": "assets/runes/adaptive-force.png",
        "Health": "assets/runes/health.png"
    }
};

function handleImageError(img) {
    img.onerror = null; // Prevent infinite loop
    img.src = 'assets/runes/default.png'; // Fallback image
}

function createRuneTree() {
    const runeContainer = document.createElement('div');
    runeContainer.className = 'rune-container';
    
    // Profile selector
    const profileSelector = document.createElement('div');
    profileSelector.className = 'profile-selector';
    profileSelector.innerHTML = `
        <h2>Rune Profiles</h2>
        <div class="profile-buttons">
            ${runeProfiles.map((profile, index) => `
                <button class="profile-btn ${index === 0 ? 'active' : ''}" data-profile="${index}">
                    ${profile.name}
                </button>
            `).join('')}
        </div>
    `;
    runeContainer.appendChild(profileSelector);

    // Rune tree display
    const runeTree = document.createElement('div');
    runeTree.className = 'rune-tree';
    runeTree.innerHTML = `
        <div class="primary-path">
            <div class="path-icon">
                <img src="${runeIcons.paths[runeProfiles[0].primary.path]}" alt="${runeProfiles[0].primary.path}" onerror="handleImageError(this)">
            </div>
            <div class="rune-slots">
                ${runeProfiles[0].primary.runes.map(rune => `
                    <div class="rune-slot">
                        <img src="${runeIcons.runes[rune]}" alt="${rune}" onerror="handleImageError(this)">
                        <span>${rune}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="secondary-path">
            <div class="path-icon">
                <img src="${runeIcons.paths[runeProfiles[0].secondary.path]}" alt="${runeProfiles[0].secondary.path}" onerror="handleImageError(this)">
            </div>
            <div class="rune-slots">
                ${runeProfiles[0].secondary.runes.map(rune => `
                    <div class="rune-slot">
                        <img src="${runeIcons.runes[rune]}" alt="${rune}" onerror="handleImageError(this)">
                        <span>${rune}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="stat-shards">
            ${runeProfiles[0].statShards.map(shard => `
                <div class="shard-slot">
                    <img src="${runeIcons.statShards[shard]}" alt="${shard}" onerror="handleImageError(this)">
                    <span>${shard}</span>
                </div>
            `).join('')}
        </div>
    `;
    runeContainer.appendChild(runeTree);

    // Add event listeners for profile switching
    const profileButtons = profileSelector.querySelectorAll('.profile-btn');
    profileButtons.forEach(button => {
        button.addEventListener('click', () => {
            const profileIndex = parseInt(button.dataset.profile);
            updateRuneTree(profileIndex);
            
            // Update active button
            profileButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    return runeContainer;
}

function updateRuneTree(profileIndex) {
    const profile = runeProfiles[profileIndex];
    const runeTree = document.querySelector('.rune-tree');
    
    // Update primary path
    const primaryPath = runeTree.querySelector('.primary-path');
    const primaryPathIcon = primaryPath.querySelector('.path-icon img');
    primaryPathIcon.src = runeIcons.paths[profile.primary.path];
    primaryPathIcon.alt = profile.primary.path;
    
    // Update primary runes
    const primarySlots = primaryPath.querySelectorAll('.rune-slot');
    profile.primary.runes.forEach((rune, index) => {
        const runeImg = primarySlots[index].querySelector('img');
        runeImg.src = runeIcons.runes[rune];
        runeImg.alt = rune;
        primarySlots[index].querySelector('span').textContent = rune;
    });

    // Update secondary path
    const secondaryPath = runeTree.querySelector('.secondary-path');
    const secondaryPathIcon = secondaryPath.querySelector('.path-icon img');
    secondaryPathIcon.src = runeIcons.paths[profile.secondary.path];
    secondaryPathIcon.alt = profile.secondary.path;
    
    // Update secondary runes
    const secondarySlots = secondaryPath.querySelectorAll('.rune-slot');
    profile.secondary.runes.forEach((rune, index) => {
        const runeImg = secondarySlots[index].querySelector('img');
        runeImg.src = runeIcons.runes[rune];
        runeImg.alt = rune;
        secondarySlots[index].querySelector('span').textContent = rune;
    });

    // Update stat shards
    const shardSlots = runeTree.querySelectorAll('.shard-slot');
    profile.statShards.forEach((shard, index) => {
        const shardImg = shardSlots[index].querySelector('img');
        shardImg.src = runeIcons.statShards[shard];
        shardImg.alt = shard;
        shardSlots[index].querySelector('span').textContent = shard;
    });
}

// Initialize rune tree when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const guidesContainer = document.querySelector('.guides-container');
    const title = guidesContainer.querySelector('h1');
    guidesContainer.insertBefore(createRuneTree(), title);
}); 