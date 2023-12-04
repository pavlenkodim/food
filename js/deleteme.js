'use strict';

// filter

const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemar']

const shortNames = names.filter(name => {
    return name.length < 5;
});

console.log(shortNames);

// map

const answers = ['IvAn', 'AnnA', 'Hello'];
const result = answers.map(item => item.toLowerCase());
console.log(result);

// every/some

const some = [4, 'qwq', 'sometext'];
console.log(some.some(item => typeof(item) === 'number'));
console.log(some.every(item => typeof(item) === 'number'));

// reduse

const arr = [4, 3, 1, 5, 2, 6];

const res = arr.reduce((sum, current) => sum + current, 3);
console.log(res);

const array = ['apple', 'pear', 'plum'];

const resAr = array.reduce((sum, current) => `${sum}, ${current}`);
console.log(resAr);

const obj = {
    ivan: 'persone',
    ann: 'persone',
    dog: 'animal',
    cat: 'animal'
};

const newArr = Object.entries(obj)
.filter(item => item[1] === 'persone')
.map(item => item[0]);

console.log(newArr);


/* First option for the slider
    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');

        slides[slideIndex -1].style.display = 'block';

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1)
    })

    next.addEventListener('click', () => {
        plusSlides(1)
    })
     */

/* my functions for slider

function hideSlideContent() {
    slides.forEach (item => {
        item.classList.add('hide');
        item.classList.remove('show');
    });
}

function showSlideContent(i) {
    slides[i].classList.add('show');
    slides[i].classList.remove('hide');
}

function slider() {
    let i = 0;
    current.innerHTML = getZero(i + 1);
    total.innerHTML = getZero(slides.length)

    next.addEventListener('click', () => {
        if (i < slides.length - 1) {
            hideSlideContent();
            showSlideContent(++i);
            current.innerHTML = getZero(i + 1);
        } else {
            i = 0;
            current.innerHTML = getZero(i + 1);
            hideSlideContent();
            showSlideContent(i);
        }
    });

    prev.addEventListener('click', () => {
        if (i > 0) {
            hideSlideContent();
            showSlideContent(--i);
            current.innerHTML = getZero(i + 1);
        } else {
            i = slides.length - 1;
            current.innerHTML = getZero(i + 1);
            hideSlideContent();
            showSlideContent(i);
        }
    });

    setInterval(() => {
        if (i < slides.length - 1) {
            hideSlideContent();
            showSlideContent(++i);
            current.innerHTML = getZero(i + 1);
        } else {
            i = 0;
            current.innerHTML = getZero(i + 1);
            hideSlideContent();
            showSlideContent(i);
        }
    }, 5000);
}

hideSlideContent();
showSlideContent(0);
slider();
 */