function openModal (modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show'); // Добавляем класс
    modal.classList.remove('hide'); // Удаляем класс
    // modal.classList.toggle('show'); // Используем переключатель классов
    document.body.style.overflow = 'hidden'; // Удаляет прокручивание, когда мод. окно открыто

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId); // Если уже нажали на мод. окно, оно не вылезет при повторно
    }
}

function clouseModal (modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    // modal.classList.toggle('show');
    document.body.style.overflow = ''; // Добавляет прокручивание, когда мод. окно закрыто
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Модальное окно

    const modalTriger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTriger.forEach(btn => {
        btn.addEventListener('click', () =>openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { // Если кликнем за пределы мод. окна оно закроется
            clouseModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) { //Закрытие по нажатию клавиши Esc
            clouseModal(modalSelector);
        }
    });
    
    // Вызов мод. окна после пролистывания окна в низ страницы
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            // высота прокрученного окна + высота видимого окна (клиента) >= полная высота всей странцы -1
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {clouseModal};
export {openModal};