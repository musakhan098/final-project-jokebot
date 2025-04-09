const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');

const jokesApiUrl = 'https://official-joke-api.appspot.com/random_joke';
const funnyResponses = [
    "I'm doing great! Just out here living the dream... literally.",
    "I’m as good as a robot can be... which is to say, fantastic!",
    "Well, I’ve had a few bugs today, but I’m still chugging along!",
    "Better than a toaster, but not as good as a coffee machine.",
    "Just hanging out in the cloud... you know, cloud computing and all that.",
    "I'm living my best byte-sized life!",
    "I feel like a million bucks... but in digital form.",
    "I’m full of energy... except for the 0s and 1s that just aren’t cooperating.",
    "I’m on cloud nine! Wait, I *am* the cloud.",
    "I’ve been debugging all day... so pretty awesome, actually."
];

const thinkingLines = [
    "Processing hilarity request…",
    "Stand by while I fetch a joke from the vault.",
    "One moment… scanning for humor.",
    "Preparing something mildly funny…",
    "Warming up my circuits for laughter!",
    "Give me a sec… comedy incoming.",
    "Crunching numbers… but for jokes.",
    "Analyzing optimal joke pattern...",
    "Searching my joke database…",
    "Checking the funny meter…",
    "Connecting to the joke universe…",
    "Authenticating with comedy servers…",
    "Consulting my inner clown…",
    "Looking for something witty…",
    "Calculating chuckles per second...",
    "Just a tick… comedy takes time.",
    "Downloading joke... almost there!",
    "Charging joke batteries…",
    "Generating artificial laughter…",
    "Installing humor update… please wait."
];

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getJoke() {
    try {
        const response = await fetch(jokesApiUrl);
        if (!response.ok) throw new Error('API error');
        const joke = await response.json();
        return `${joke.setup} - ${joke.punchline}`;
    } catch (error) {
        console.error(error);
        return "Oops! I tried to fetch a joke, but something went wrong. Here's a funny one instead: Why did the AI break up with its algorithm? Because it couldn't compute the relationship!";
    }
}

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    appendMessage(userMessage, 'user');
    userInput.value = '';
    userInput.style.height = '30px';

    if (userMessage.toLowerCase() === 'how are you') {
        const randomResponse = funnyResponses[Math.floor(Math.random() * funnyResponses.length)];
        appendMessage(randomResponse, 'bot');
    } else {
        const randomThinking = thinkingLines[Math.floor(Math.random() * thinkingLines.length)];
        appendMessage(randomThinking, 'bot');
        await delay(1500);
        const joke = await getJoke();
        appendMessage(joke, 'bot');
    }

    scrollToBottom();
}

function appendMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', `${sender}-message`);

    const messageBubble = document.createElement('div');
    messageBubble.classList.add('message-bubble');
    messageBubble.innerText = message;

    messageDiv.appendChild(messageBubble);
    chatContainer.appendChild(messageDiv);
}

function handleEnterKey(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

userInput.addEventListener('keydown', handleEnterKey);

userInput.addEventListener('input', () => {
    userInput.style.height = '30px';
    userInput.style.height = (userInput.scrollHeight) + 'px';
});
