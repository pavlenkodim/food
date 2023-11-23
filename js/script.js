"use ctrict";

window.addEventListener('DOMContentLoaded', () => {
    
    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Slider

    const offerSlide = document.querySelectorAll('.offer__slide'),
          slideNext = document.querySelector('.offer__slider-next'),
          slidePrev = document.querySelector('.offer__slider-prev'),
          slideCurrent = document.querySelector('#current'),
          slideTotal = document.querySelector('#total');

    function hideSlideContent() {
        offerSlide.forEach (item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
    }

    function showSlideContent(i) {
        offerSlide[i].classList.add('show');
        offerSlide[i].classList.remove('hide');
    }

    function slider() {
        let i = 0;
        slideCurrent.innerHTML = getZero(i + 1);
        slideTotal.innerHTML = getZero(offerSlide.length)

        slideNext.addEventListener('click', () => {
            if (i < offerSlide.length - 1) {
                hideSlideContent();
                showSlideContent(++i);
                slideCurrent.innerHTML = getZero(i + 1);
            } else {
                i = 0;
                slideCurrent.innerHTML = getZero(i + 1);
                hideSlideContent();
                showSlideContent(i);
            }
        });

        slidePrev.addEventListener('click', () => {
            if (i > 0) {
                hideSlideContent();
                showSlideContent(--i);
                slideCurrent.innerHTML = getZero(i + 1);
            } else {
                i = offerSlide.length - 1;
                slideCurrent.innerHTML = getZero(i + 1);
                hideSlideContent();
                showSlideContent(i);
            }
        });

        setInterval(() => {
            if (i < offerSlide.length - 1) {
                hideSlideContent();
                showSlideContent(++i);
                slideCurrent.innerHTML = getZero(i + 1);
            } else {
                i = 0;
                slideCurrent.innerHTML = getZero(i + 1);
                hideSlideContent();
                showSlideContent(i);
            }
        }, 5000);
    }

    hideSlideContent();
    showSlideContent(0);
    slider();

    // Timer

    const deadline = '2023-09-26';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds');
        timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock () {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

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

    // Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                form.reset();
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal (message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            clouseModal();
        }, 4000);
    }
});
