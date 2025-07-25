

// Flash card data organized by categories
const flashCards = {
    basics: [
        {
            question: "What is Artificial Intelligence?",
            answer: "AI is the simulation of human intelligence in machines that are programmed to think and learn like humans, including abilities like reasoning, learning, problem-solving, and decision-making."
        },
        {
            question: "What are the main types of AI?",
            answer: "There are three main types: Narrow AI (designed for specific tasks), General AI (human-level intelligence across all domains), and Super AI (surpasses human intelligence in all aspects)."
        },
        {
            question: "What is the difference between AI and Machine Learning?",
            answer: "AI is the broader concept of machines performing intelligent tasks, while Machine Learning is a subset of AI that focuses on algorithms learning from data without explicit programming."
        },
        {
            question: "What is a neural network?",
            answer: "A neural network is a computing system inspired by biological neural networks, consisting of interconnected nodes (neurons) that process information in layers to recognize patterns and make decisions."
        },
        {
            question: "What is training data?",
            answer: "Training data is the dataset used to teach AI models patterns and relationships. The quality and quantity of training data directly impacts the model's performance and accuracy."
        }
    ],
    ml: [
        {
            question: "What is supervised learning?",
            answer: "Supervised learning uses labeled training data where both input and desired output are provided. The algorithm learns to map inputs to outputs by finding patterns in the labeled examples."
        },
        {
            question: "What is unsupervised learning?",
            answer: "Unsupervised learning works with unlabeled data to discover hidden patterns, structures, or groupings without predefined categories or outcomes."
        },
        {
            question: "What is overfitting?",
            answer: "Overfitting occurs when a model learns the training data too well, including noise and outliers, resulting in poor performance on new, unseen data."
        },
        {
            question: "What is cross-validation?",
            answer: "Cross-validation is a technique to assess model performance by dividing data into multiple subsets, training on some and testing on others to ensure the model generalizes well."
        },
        {
            question: "What is feature engineering?",
            answer: "Feature engineering is the process of selecting, transforming, and creating relevant input variables (features) from raw data to improve machine learning model performance."
        }
    ],
    dl: [
        {
            question: "What is Deep Learning?",
            answer: "Deep Learning is a subset of machine learning that uses neural networks with multiple layers (deep neural networks) to progressively extract higher-level features from raw input."
        },
        {
            question: "What is a CNN?",
            answer: "Convolutional Neural Network (CNN) is a deep learning architecture designed for processing grid-like data such as images, using convolution operations to detect local features."
        },
        {
            question: "What is an RNN?",
            answer: "Recurrent Neural Network (RNN) is designed for sequential data processing, maintaining a 'memory' of previous inputs through loops that allow information to persist."
        },
        {
            question: "What is backpropagation?",
            answer: "Backpropagation is the fundamental algorithm for training neural networks, calculating gradients of the loss function with respect to weights and adjusting them to minimize error."
        },
        {
            question: "What is transfer learning?",
            answer: "Transfer learning leverages pre-trained models on new, related tasks by fine-tuning the learned features, reducing training time and data requirements."
        }
    ],
    nlp: [
        {
            question: "What is Natural Language Processing?",
            answer: "NLP is a branch of AI that enables computers to understand, interpret, and generate human language in a valuable way, bridging human communication and machine understanding."
        },
        {
            question: "What is tokenization?",
            answer: "Tokenization is the process of breaking text into smaller units (tokens) such as words, phrases, or sentences, serving as the first step in most NLP tasks."
        },
        {
            question: "What is word embedding?",
            answer: "Word embeddings are dense vector representations of words that capture semantic relationships, where similar words have similar vectors in high-dimensional space."
        },
        {
            question: "What is BERT?",
            answer: "BERT (Bidirectional Encoder Representations from Transformers) is a pre-trained language model that understands context bidirectionally, revolutionizing NLP tasks."
        },
        {
            question: "What is sentiment analysis?",
            answer: "Sentiment analysis uses NLP to determine the emotional tone behind text data, classifying opinions as positive, negative, or neutral for business insights."
        }
    ]
};

// Application state
let currentCategory = 'basics';
let currentCardIndex = 0;
let isFlipped = false;

// DOM elements
const flashcard = document.getElementById('flashcard');
const cardQuestion = document.getElementById('card-question');
const cardAnswer = document.getElementById('card-answer');
const currentCardSpan = document.getElementById('currentCard');
const totalCardsSpan = document.getElementById('totalCards');
const progressFill = document.getElementById('progressFill');
const categorySelect = document.getElementById('categorySelect');

// Initialize the app
function initApp() {
    updateCardDisplay();
    updateProgress();
}

// Update card display
function updateCardDisplay() {
    const cards = flashCards[currentCategory];
    const card = cards[currentCardIndex];
    
    cardQuestion.textContent = card.question;
    cardAnswer.textContent = card.answer;
    currentCardSpan.textContent = currentCardIndex + 1;
    totalCardsSpan.textContent = cards.length;
    
    // Reset flip state
    flashcard.classList.remove('flipped');
    isFlipped = false;
}

// Update progress bar
function updateProgress() {
    const cards = flashCards[currentCategory];
    const progress = ((currentCardIndex + 1) / cards.length) * 100;
    progressFill.style.width = `${progress}%`;
}

// Flip the card
function flipCard() {
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
}

// Next card
function nextCard() {
    const cards = flashCards[currentCategory];
    if (currentCardIndex < cards.length - 1) {
        currentCardIndex++;
        updateCardDisplay();
        updateProgress();
    } else {
        // Loop back to first card
        currentCardIndex = 0;
        updateCardDisplay();
        updateProgress();
    }
}

// Previous card
function previousCard() {
    const cards = flashCards[currentCategory];
    if (currentCardIndex > 0) {
        currentCardIndex--;
        updateCardDisplay();
        updateProgress();
    } else {
        // Loop to last card
        currentCardIndex = cards.length - 1;
        updateCardDisplay();
        updateProgress();
    }
}

// Change category
function changeCategory() {
    currentCategory = categorySelect.value;
    currentCardIndex = 0;
    updateCardDisplay();
    updateProgress();
}

// Start learning (scroll to cards)
function startLearning() {
    document.getElementById('cards').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            previousCard();
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextCard();
            break;
        case ' ':
            e.preventDefault();
            flipCard();
            break;
    }
});

// Click on card to flip
flashcard.addEventListener('click', flipCard);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

