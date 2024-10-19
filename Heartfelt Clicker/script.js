let clickCount = 0;
const maxClicks = 25; // Максимальное количество кликов

document.getElementById('avatar').addEventListener('click', function(e) {
    const heartsContainer = document.getElementById('heartsContainer');
    const logo = document.getElementById('avatar');
    
    // Проверка поддержки вибрации и вызов вибрации на мобильных устройствах
    if (navigator.vibrate) {
        navigator.vibrate(100); // Вибрация на 100 миллисекунд
    }
    
    // Создаем новое сердечко
    const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    heart.setAttribute("viewBox", "0 0 24 24");
    heart.classList.add('heart');
    
    // Создаем форму сердца
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z");
    path.setAttribute("fill", "#FF6347"); // Цвет сердечка

    heart.appendChild(path);

    // Позиционируем сердечко случайным образом в пределах аватарки
    const xPos = Math.random() * 150; // Размер аватарки
    const yPos = Math.random() * 150;
    heart.style.left = `${xPos}px`;
    heart.style.top = `${yPos}px`;

    // Добавляем сердечко в контейнер
    heartsContainer.appendChild(heart);
    
    // Удаляем сердечко после завершения анимации
    heart.addEventListener('animationend', function() {
        heart.remove();
    });

    // Обновляем цвет логотипа
    clickCount++;
    const newColor = getGradientColor(clickCount, maxClicks);
    logo.style.backgroundColor = newColor; // Применяем новый цвет

    // Проверяем, достигли ли максимального количества кликов
    if (clickCount >= maxClicks) {
        showThankYouMessage();
    }

    // Запускаем анимацию строк кода
    createCodeSplash();
});

// Функция для вычисления цвета градиента
function getGradientColor(step, totalSteps) {
    const startColor = [125, 125, 125]; // RGB для серого
    const endColor = [255, 99, 71]; // RGB для ярко-красного

    const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * (step / totalSteps));
    const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * (step / totalSteps));
    const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * (step / totalSteps));

    return `rgb(${r}, ${g}, ${b})`;
}

// Функция для показа благодарственного сообщения
function showThankYouMessage() {
    const thankYouMessage = document.getElementById('thankYouMessage');
    thankYouHeartfelt.classList.add('show');

    // Сообщение остаётся на экране 5 секунд, затем плавно исчезает
    setTimeout(() => {
        thankYouHeartfelt.classList.remove('show');
    }, 5000); // Сообщение исчезает через 5 секунд
}



// Функция для создания эффекта выплескивания строк кода
function createCodeSplash() {
    const codeSplashContainer = document.getElementById('codeSplashContainer');
    const codeSplash = document.createElement('div');
    codeSplash.classList.add('code-splash');
    
    // Генерируем случайную строку кода
    const codeLines = [
        'let x = 10;',
        'const arr = [1, 2, 3];',
        'function foo() { return bar; }',
        'document.getElementById("test");',
        'console.log("Hello, World!");',
        'let result = x + y;'
    ];
    const randomCode = codeLines[Math.floor(Math.random() * codeLines.length)];
    codeSplash.textContent = randomCode;

    // Позиционируем строку кода случайным образом
    const xPos = Math.random() * window.innerWidth;
    const yPos = -50; // Начинаем за пределами экрана
    codeSplash.style.left = `${xPos}px`;
    codeSplash.style.top = `${yPos}px`;

    // Добавляем строку в контейнер
    codeSplashContainer.appendChild(codeSplash);

    // Удаляем строку после завершения анимации
    codeSplash.addEventListener('animationend', function() {
        codeSplash.remove();
    });
}

