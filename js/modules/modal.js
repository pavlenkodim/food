function modal() {
    // Модальное окно

    const modalTriger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    // modalTriger.forEach(btn => { // Самостоятельно сделал
    //     btn.addEventListener('click', () => {
    //         modal.style.display = 'block';
    //     });
    // });
    // modalClouse.addEventListener('click', () => {
    //     modal.style.display = 'none';
    // });

    function openModal () {
        modal.classList.add('show'); // Добавляем класс
        modal.classList.remove('hide'); // Удаляем класс
        // modal.classList.toggle('show'); // Используем переключатель классов
        document.body.style.overflow = 'hidden'; // Удаляет прокручивание, когда мод. окно открыто
        clearInterval(modalTimerId); // Если уже нажали на мод. окно, оно не вылезет при повторно
    }

    modalTriger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function clouseModal () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = ''; // Добавляет прокручивание, когда мод. окно закрыто
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { // Если кликнем за пределы мод. окна оно закроется
            clouseModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) { //Закрытие по нажатию клавиши Esc
            clouseModal();
        }
    });

    // Вызов модального окна через промежуток времени
    const modalTimerId = setTimeout(openModal, 50000);


    // Вызов мод. окна после пролистывания окна в низ страницы
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            // высота прокрученного окна + высота видимого окна (клиента) >= полная высота всей странцы -1
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;