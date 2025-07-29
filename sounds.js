// --- Sound Objects ---
// Убедитесь, что файлы click.mp3 и notification.mp3 находятся в той же папке, что и HTML-файлы.
const clickSound = new Audio('click.mp3');
clickSound.preload = 'auto';
const notificationSound = new Audio('notification.mp3');
notificationSound.preload = 'auto';

let soundEnabled = true; // В будущем этим можно будет управлять через настройки

/**
 * Воспроизводит звук клика.
 * Отключает звук после первой ошибки воспроизведения, чтобы избежать спама в консоли.
 */
function playClickSound() {
    if (!soundEnabled) return;
    clickSound.currentTime = 0;
    clickSound.play().catch(error => {
        soundEnabled = false;
        console.warn("Звук клика отключен из-за ошибки воспроизведения. Убедитесь, что файл click.mp3 доступен.", error);
    });
}

/**
 * Воспроизводит звук уведомления.
 */
function playNotificationSound() {
    if (!soundEnabled) return;
    notificationSound.currentTime = 0;
    notificationSound.play().catch(error => {
        console.warn("Звук уведомления не может быть воспроизведен. Убедитесь, что файл notification.mp3 доступен.", error);
    });
}

/**
 * Добавляет обработчики событий для звука клика к элементам с классом 'clickable-sound'.
 */
function attachSoundListeners() {
    document.querySelectorAll('.clickable-sound:not([data-sound-attached])').forEach(element => {
        element.addEventListener('click', playClickSound);
        element.setAttribute('data-sound-attached', 'true');
    });
}

// Инициализируем звуки после загрузки DOM.
document.addEventListener('DOMContentLoaded', attachSoundListeners);