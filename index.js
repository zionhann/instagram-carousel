window.onload = carouselListener;

function carouselListener() {
    document.querySelectorAll('.prev')
        .forEach(el =>
            el.addEventListener('click', transition.bind(this, 1, el)));
    document.querySelectorAll('.next')
        .forEach(el =>
            el.addEventListener('click', transition.bind(this, -1, el)));
}

function transition(direction, el, e) {
    const target = e.currentTarget;
    const parent = target.closest('.post-main');
    const container = parent.querySelector('.img-container');
    const arrow = parent.querySelector('.img-arrow');
    const btn = (direction === 1) ? 'prev' : 'next';

    container.style.transitionDuration = '500ms';
    container.style.transform =
        `translateX(${direction * (100)}%)`;
    container.ontransitionend = () => cb(btn, container, arrow);
}

function cb(btn, container, arrow) {
    const prev = arrow.querySelector('.prev');
    const next = arrow.querySelector('.next');
    const length = parseInt(container.dataset.length);

    container.removeAttribute('style');
    if (btn === 'prev') {
        const curr = container.insertBefore(container.lastElementChild, container.firstElementChild);
        const order = parseInt(curr.dataset.order);
        if (order === 0) {
            prev.classList.add('disabled');
            arrow.classList.add('start');
            if (length === 2) supportForTwoImages(btn, prev, next, arrow);
        }
        else {
            next.classList.remove('disabled');
            arrow.classList.remove('end');
        }
    }
    else {
        const end = container.appendChild(container.firstElementChild);
        const order = parseInt(end.dataset.order);
        if (order+1 === length-1) {
            next.classList.add('disabled');
            arrow.classList.add('end');
            if (length === 2) supportForTwoImages(btn, prev, next, arrow);
        }
        else {
            prev.classList.remove('disabled');
            arrow.classList.remove('start');
        }
    }
}

function supportForTwoImages(btn, prev, next, arrow) {
    if (btn === 'prev') {
        next.classList.remove('disabled');
        arrow.classList.remove('end');
    }
    else {
        prev.classList.remove('disabled');
        arrow.classList.remove('start');
    }
}