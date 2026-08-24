// ===== ЛОГИН/ПАРОЛЬ =====
const LOGIN = 'ooo';
const PASSWORD = '1234';

// Проверяем, был ли уже выполнен вход в этой сессии
function checkSession() {
    if (sessionStorage.getItem('loggedIn') === 'true') {
        showGame();
    }
}

// Обработка входа
document.getElementById('loginBtn').addEventListener('click', handleLogin);

// Вход по Enter
document.getElementById('passwordInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
});

function handleLogin() {
    const login = document.getElementById('loginInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('errorMsg');
    
    if (login === LOGIN && password === PASSWORD) {
        sessionStorage.setItem('loggedIn', 'true');
        showGame();
    } else {
        errorMsg.textContent = 'Неверный логин или пароль!';
        document.getElementById('loginInput').value = '';
        document.getElementById('passwordInput').value = '';
    }
}

function showGame() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('gameContent').style.display = 'block';
    loadConfig();
}

// ===== ИГРОВАЯ ЛОГИКА =====
let gameConfig = null;

async function loadConfig() {
    try {
        const response = await fetch('config.json');
        gameConfig = await response.json();
        initializeGame();
    } catch (error) {
        console.error('Ошибка загрузки config.json:', error);
        useDefaultConfig();
    }
}

function useDefaultConfig() {
    gameConfig = {
        images: {
            background: 'assets/images/background.jpg',
            moneyButton: 'assets/ui/деньги.png',
            energyButton: 'assets/ui/энергия.png',
            bottomPanel: 'assets/ui/нижняя-панель.png'
        }
    };
    initializeGame();
}

function initializeGame() {
    // Фон
    if (gameConfig.images.background) {
        document.getElementById('background').style.backgroundImage = 
            `url(${gameConfig.images.background})`;
    }
    
    // Кнопки ресурсов
    const moneyImg = document.getElementById('moneyImg');
    const energyImg = document.getElementById('energyImg');
    const bottomPanelImg = document.getElementById('bottomPanelImg');
    
    if (gameConfig.images.moneyButton) {
        moneyImg.src = gameConfig.images.moneyButton;
    }
    
    if (gameConfig.images.energyButton) {
        energyImg.src = gameConfig.images.energyButton;
    }
    
    if (gameConfig.images.bottomPanel) {
        bottomPanelImg.src = gameConfig.images.bottomPanel;
    }
    
    // Обработчики кнопок
    document.getElementById('moneyBtn').addEventListener('click', () => {
        console.log('Деньги нажаты');
    });
    
    document.getElementById('energyBtn').addEventListener('click', () => {
        console.log('Энергия нажата');
    });
}

// Запуск при загрузке
window.addEventListener('DOMContentLoaded', checkSession);
