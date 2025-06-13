const themeToggle = document.querySelector('.theme-toggle');
const promptForm = document.querySelector('.prompt-form');
const promptInput = document.querySelector('.prompt-input');
const promptBtn = document.querySelector('.prompt-btn');
const modelSelect = document.getElementById('model-select');
const countSelect = document.getElementById('count-select');
const ratioSelect = document.getElementById('ratio-select');
const gridGallery = document.querySelector('.gallery-grid');

const examplePrompts = [
    "A magic forest with glowing plants and fairy homes among giant mushrooms",
    "An old steampunk airship floating through golden clouds at sunset",
    "A future Mars colony with glass domes and gardens against red mountains",
    "A dragon sleeping on gold coins in a crystal cave",
    "An underwater kingdom with merpeople and glowing coral buildings",
    "A floating island with waterfalls pouring into clouds below",
    "A witch's cottage in fall with magic herbs in the garden",
    "A robot painting in a sunny studio with art supplies around it",
    "A magical library with floating glowing books and spiral staircases",
    "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
    "A cosmic beach with glowing sand and an aurora in the night sky",
    "A medieval marketplace with colorful tents and street performers",
    "A cyberpunk city with neon signs and flying cars at night",
    "A peaceful bamboo forest with a hidden ancient temple",
    "A giant turtle carrying a village on its back in the ocean",
];

// Set theme based on saved preference or system setting
(() => {
    const saveTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const isDarkTheme = saveTheme === 'dark' || (!saveTheme && systemPrefersDark);
    document.body.classList.toggle('dark-theme', isDarkTheme);
    themeToggle.querySelector('i').className = isDarkTheme ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
})();

// Switch between light and dark themes
const themeToggleHandler = () => {
    const isDarkTheme = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    themeToggle.querySelector('i').className = isDarkTheme ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
};

// Switch theme on toggle click
themeToggle.addEventListener('click', themeToggleHandler);

// Fill prompt input with a random example prompt
promptBtn.addEventListener('click', () => {
    const randomPrompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    promptInput.value = randomPrompt;
    promptInput.focus();
});

// Validate aspect ratio and calculate image dimensions
const getImageDimensions = (aspectRatio, baseSize = 512) => {
    const [width, height] = aspectRatio.split('/').map(Number);
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        console.error('Invalid aspect ratio:', aspectRatio);
        return;
    }

    const scaleFactor = baseSize / Math.sqrt(width * height);

    let calculatedWidth = Math.round(width * scaleFactor);
    let calculatedHeight = Math.round(height * scaleFactor);

    // Ensure dimensions are multiples of 16 (AI model requirement)
    calculatedWidth = Math.floor(calculatedWidth / 16) * 16;
    calculatedHeight = Math.floor(calculatedHeight / 16) * 16;

    return { width: calculatedWidth, height: calculatedHeight };
};

// Image generation
const generateImages = async (selectModel, imageCount, aspectRatio, promptText) => {
    const MODEL_URL = `https://api.replicate.com/v1/models/${selectModel}/predictions`;
    const { width, height } = getImageDimensions(aspectRatio);

    // Create an array of promises for image generation
    const imagePromises = Array.from({ length: imageCount }, async (_, i) => {
        // Send request to the model API
        try {
            const response = await fetch(MODEL_URL, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                    "x-use-cache": "false",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: promptText,
                    parameters: { width, height },
                }),
            });

            if (!response.ok) throw new Error((await response.json())?.error);

            const result = await response.blob();
            console.log(result);
        } catch (error) {
            console.error('Error generating images:', error);
        }
    });

    await Promise.all(imagePromises);
};

// Create placeholder image cards in the gallery
const createImageCards = (selectModel, imageCount, aspectRatio, promptText) => {
    gridGallery.innerHTML = '';

    for (let i = 0; i < imageCount; i++) {
        gridGallery.innerHTML += `<div class="img-card loading" id="img-card-${i}" style="aspect-ratio: ${aspectRatio};">
                        <div class="status-container">
                            <div class="spinner"></div>
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            <p class="status-text">Generating...</p>
                        </div>
                        <img src="./JP_clicpart.jpg" class="result-img">
                    </div>`;
    }

    generateImages(selectModel, imageCount, aspectRatio, promptText);
};

// Handle form submission
const handleFormSubmit = (e) => {
    e.preventDefault();

    // Get form input values
    const selectModel = modelSelect.value;
    const imageCount = parseInt(countSelect.value) || 1;
    const aspectRatio = ratioSelect.value || '1/1';
    const promptText = promptInput.value.trim();

    // console.log(selectModel, imageCount, aspectRatio, promptText);
    createImageCards(selectModel, imageCount, aspectRatio, promptText);
}

promptForm.addEventListener('submit', handleFormSubmit);