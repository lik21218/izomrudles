const buttonNames = [
    "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", 
    "ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", 
];

const animals = [
    { 
        video: "1.mp4", title: "Цветик Семицвктик", description: "Цветик Семисветик." },
    {  video: "2.mp4", title: "Рыжик и крысёнок", description: "Они понимают друг друга." },
    {  video: "3.mp4", title: "Изумрудные лягушата" , description: "Мои драгоценные лягушата."},
    {  video: "4.mp4", title: "Рыжик и бабочка" , description: "на лугу."},
    { video: "5.mp4", title: "Сверчки артисты", description: "Послушай, мы споём тебе песню." },
    { video: "14.mp4", title: "Цветик Семицвктик", description: "Бабочка, давай с нами дружить." },
    { video: "15.mp4", title: "Рыжик  и его секретные тропы", description: "Бабочка, давай с нами дружить" },
  
    { video: "17.mp4", title: "Изумрудные лягушата", description: "Друзья всегда провожали на закате уходящее солнце." },
    { video: "18.mp4", title: "Рыжик  и его секретные тропы", description: "Друзья всегда провожали на закате уходящее солнце." },
    { video: "19.mp4", title: "Рыжик  и его секретные тропы", description: "Друзья всегда провожали на закате уходящее солнце." },
    { video: "20.mp4", title: "Рыжик  и его секретные тропы", description: "Друзья всегда провожали на закате уходящее солнце." },
    { video: "21.mp4", title: "Рыжик  и его секретные тропы", description: "Друзья всегда провожали на закате уходящее солнце." },
    { video: "22.mp4", title: "Фея изумрудного  леса", description: "Друзья всегда провожали на закате уходящее солнце." },
    { video: "23.mp4", title: "Фея изумрудного  леса", description: "Друзья всегда ." },
  
   
  
    
    
];

   

let currentOpenModal = null; // Храним ссылку на открытый элемент <dialog>

// ===================================
// 1. СОЗДАЁМ КНОПКИ В САЙДБАРЕ
// ===================================
const sidebar = document.getElementById("sidebar");
sidebar.innerHTML = "";

for (let i = 0; i < animals.length; i++) {
    sidebar.innerHTML += `
        <button onclick="openModal(${i})">
            ${buttonNames[i] || `Слайд ${i + 1}`}
        </button>
    `;
}

// ===================================
// 2. СОЗДАЁМ МОДАЛЬНЫЕ ОКНА
// ===================================
const modals = document.getElementById("modals");
modals.innerHTML = "";

for (let i = 0; i < animals.length; i++) {
    const item = animals[i];

    // Проверяем: видео или картинка
    let mediaHTML = "";
    if (item.video) {
        mediaHTML = `<video class="modal-video" src="video/${item.video}" controls playsinline preload="metadata"></video>`;
    } else {
        mediaHTML = `<img src="images/${item.image}" alt="${item.title}">`;
    }

    modals.innerHTML += `
        <dialog id="modal-${i}" class="modal" onclick="backdropClose(event, ${i})">
            <div class="modal-content">
                ${mediaHTML}
                <h2>${item.title}</h2>
          

                <button class="close-btn" onclick="closeModal(${i})">
                    Закрыть
                </button>
            </div>
        </dialog>
    `;
}

// ===================================
// 3. ОТКРЫТЬ МОДАЛКУ
// ===================================
function openModal(id) {
    // Если какая-то модалка уже открыта, закрываем её сразу без анимации, чтобы не накладывались
    if (currentOpenModal && currentOpenModal !== document.getElementById(`modal-${id}`)) {
        closeModalInstant(currentOpenModal);
    }

    const modal = document.getElementById(`modal-${id}`);
    if (modal) {
        modal.showModal();
        currentOpenModal = modal;
    }
}

// ===================================
// 4. ЗАКРЫТЬ МОДАЛКУ (С АНИМАЦИЕЙ)
// ===================================
function closeModal(id) {
    const modal = document.getElementById(`modal-${id}`);
    if (!modal) return;

    // Останавливаем видео, если оно играло
    const video = modal.querySelector('video');
    if (video) video.pause();

    // Запускаем вашу CSS-анимацию закрытия
    modal.style.transform = "scale(0.2)";
    modal.style.opacity = "0";
    modal.style.visibility = "hidden";

    setTimeout(() => {
        modal.close();
        // Возвращаем стили в исходное положение для следующего открытия
        modal.style.transform = "";
        modal.style.opacity = "";
        modal.style.visibility = "";
        if (currentOpenModal === modal) {
            currentOpenModal = null;
        }
    }, 300); // Тайм-аут подберите под вашу анимацию (у вас в стилях transition: all 1s, но 1 секунда — это долго для закрытия, можете изменить в CSS или поставить тут 300-500мс)
}

// Мгновенное закрытие при переключении между кнопками сайдбара
function closeModalInstant(modal) {
    const video = modal.querySelector('video');
    if (video) video.pause();
    modal.close();
}

// ===================================
// 5. КЛИК ПО ФОНУ (BACKDROP)
// ===================================
function backdropClose(event, id) {
    const modal = document.getElementById(`modal-${id}`);
    // Если кликнули именно по самому тегу dialog (по его фону), а не по контенту внутри
    if (event.target === modal) {
        closeModal(id);
    }
}
