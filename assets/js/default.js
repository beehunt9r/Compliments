Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

const compliments = ['Ты так же прекрасна, как и в первый раз.', 'Без тебя, я - не я.', 'Твоя улыбка делает мое утро особенным.', 'Твоя красота сверкает, как солнечный луч.', 'Твои глаза – словно звезды, освещающие ночь.', 'Твой смех – музыка для моих ушей.', 'Ты умеешь делать мир вокруг ярче и веселее.', 'С тобой я чувствую себя по-настоящему счастливым.', 'Твоя доброта делает этот мир лучше.', 'Твоя красота пленяет даже без слов.', 'Ты – воплощение красоты.', 'Каждый момент с тобой – это настоящая магия.', 'Твоя энергия заряжает и вдохновляет.', 'Ты всегда знаешь, как поднять настроение.', 'Твоя элегантность и утонченность поражают меня.', 'Ты умеешь дарить счастье всем вокруг.'];
const typingSpeed = 75;
const flushingSpeed = 35;

const refreshButtonElement = document.getElementById('refresh-button');
const disableRefreshButton = () => refreshButtonElement.disabled = true;
const enableRefreshButton = () => refreshButtonElement.disabled = false;
const isRefreshButtonEnabled = () => refreshButtonElement.disabled === false;

const complimentElement = document.getElementById('compliment');

const getComplimentText = () => complimentElement.innerText;
const setComplimentText = text => complimentElement.innerText = text;
const typeCompliment = text => new Promise(resolve => {
    const complimentLength = text.length;

    for (let index = 0; index <= complimentLength; ++index) {
        setTimeout(() => {
            setComplimentText(text.substring(0, index));
            if (index === complimentLength) {
                resolve();
            }
        }, typingSpeed * index);
    }
});

const flushCompliment = () => new Promise(resolve => {
    const compliment = getComplimentText();
    const complimentIndexesLength = compliment.length - 1;

    for (let index = complimentIndexesLength; index >= 0; --index) {
        setTimeout(() => {
            setComplimentText(compliment.substring(0, index));
            if (index === 0) {
                resolve();
            }
        }, flushingSpeed * (complimentIndexesLength - index));
    }
});

const preloaderElement = document.getElementById('preloader');
const contentElement = document.getElementById('content');

const hidePreloader = () => preloaderElement.style.display = 'none';
const showContent = () => contentElement.style.display = 'block';

document.addEventListener('DOMContentLoaded', () => {
    const backgroundVideoElement = document.getElementById('background-video');
    backgroundVideoElement.addEventListener('loadeddata', async () => {
        hidePreloader();
        showContent();

        const currentDay = Math.floor(Date.now() / 1000 / 86400);
        const currentDayComplimentIndex = currentDay % (compliments.length - 1);

        disableRefreshButton();
        await typeCompliment(compliments[currentDayComplimentIndex]);
        enableRefreshButton();

        refreshButtonElement.addEventListener('click', async () => {
            if (isRefreshButtonEnabled()) {
                disableRefreshButton();
                await flushCompliment();
                await typeCompliment(compliments.random());
                enableRefreshButton();
            }
        });
    });
});
