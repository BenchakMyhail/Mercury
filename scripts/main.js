//=== headerRegion ===
const headerRagion = document.querySelector('#home');
const burger = headerRagion.querySelector('.burger-menu');
const nav = headerRagion.querySelector('.list-nav_items');

burger.addEventListener('click', function (e) {
    if (nav.classList.contains('list-nav_items--show')) {
        nav.classList.remove('list-nav_items--show');
        nav.classList.remove('list-nav_items--bg');
        burger.classList.remove('burger-menu-active');
    } else {
        nav.classList.add('list-nav_items--bg');
        nav.classList.add('list-nav_items--show');
        burger.classList.add('burger-menu-active');
    }
});
//=== /headerRegion ===

//=== portfolioRegion ===
const portfolioRegion = document.querySelector('#portfolio'),
    previousSlide = portfolioRegion.querySelector('.arrow-prev'),
    nextSlide = portfolioRegion.querySelector('.arrow-next'),
    carouselItemsList = portfolioRegion.querySelectorAll('.icon_project');
//--- Slider ---
(function toggleSlideOfPortfolioRegion(buttonPrev, buttonNext, slideList, classNameMainOfList, classNameSwitchable) {

    let currentSlide = 0;

    function toggleSlideNext() {
        slideList[currentSlide].className = classNameMainOfList;
        currentSlide = (++currentSlide) % slideList.length;
        slideList[currentSlide].className = classNameMainOfList + ' ' + classNameSwitchable;
    }

    function toggleSlidePrev() {
        slideList[currentSlide].className = classNameMainOfList;
        if (currentSlide == 0) {
            currentSlide = slideList.length - 1;
        } else {
            currentSlide = (--currentSlide) % slideList.length;
        }
        slideList[currentSlide].className = classNameMainOfList + ' ' + classNameSwitchable;
    }

    buttonPrev.addEventListener('click', toggleSlidePrev);
    buttonNext.addEventListener('click', toggleSlideNext);

}(previousSlide, nextSlide, carouselItemsList, 'icon_project', 'show-project'));
//--- /Slider ---

//--- LightBox ---
const lightBox = document.createElement('div');
const lightBoxButtonClose = document.createElement('div');
const baseListForLightBox = portfolioRegion.querySelector('.carousel-basis');

function activeLightBox(item) {
    lightBox.className = 'lightbox';
    lightBoxButtonClose.className = 'lightbox-button-close';
    lightBoxButtonClose.innerHTML = '<img src="./assets/img/times-solid.svg" alt=""></img>';
    baseListForLightBox.appendChild(lightBox);
    lightBox.appendChild(lightBoxButtonClose);

    item.addEventListener('click', function (e) {
        lightBox.classList.add('lightbox-active');
        const activeItem = document.createElement('img');
        activeItem.src = item.querySelector('img').src;
        lightBox.appendChild(activeItem);
    });
}

lightBoxButtonClose.addEventListener('click', function (e) {
    if (lightBox.lastChild) {
        lightBox.removeChild(lightBox.lastChild);
    }
    lightBox.classList.remove('lightbox-active');
});
carouselItemsList.forEach(activeLightBox);
//--- /LightBox ---

//=== /portfolioRegion ===

//=== Team-region ===
// --- Get data ---
const teamRegion = document.querySelector('#team'),
    wrapperForListOfTeam = teamRegion.querySelector('.team-region-place');

(async function () {
    let response = await fetch('../data/team.json');
    let fileData = await response.json();

    let membersTeam = fileData.Team;

    const showList = membersTeam.map(function (member) {
        return `<div class="avatars-element">
    <div class="avatar-foto">
    <img src="${member.foto}" alt="${member.firstName} ${member.secondName}">
    </div>
    <div class="avatar-title">
        <h4>${member.firstName} ${member.secondName}</h4>
        <p>${member.profession}</p>
    </div>
    <div class="icons-social-network">
        <a href="${member.socialNetworkContacts.facebook}"><img src="./assets/img/facebook-square-brands.svg" alt="facebooks icon"></a>
        <a href="${member.socialNetworkContacts.twitter}"><img src="/assets/img/twitter-square-brands.svg" alt="twitters icon"></a>
        <a href="${member.socialNetworkContacts.google}"><img src="./assets/img/google-plus-square-brands.svg" alt="gmails icon"></a>
        <a href="${member.socialNetworkContacts.linkedin}"><img src="./assets/img/linkedin-brands.svg" alt="linkedins icon"></a>
    </div>
</div>`}).join('');

    wrapperForListOfTeam.innerHTML = showList;

})();
// --- /Get data ---
//=== /Team-region ===

// === Client region ===
const clientRegion = document.querySelector('#clients');
// --- Switch reviews ---
const switchGroup = clientRegion.querySelectorAll('.btn-toggle-group  input');
const wrapperClientReview = clientRegion.querySelector('.client-region-wrapper');

function loadClientReview() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/client.json', true);
    xhr.onload = function () {
        if (this.status == 200) {
            let clientGroup = JSON.parse(this.responseText);
            const markupClientGroup = clientGroup.clients.map(function (client) {
                return `
                <div class="client-region-wrapper_comment">
                    <h4>"${client.comment}"</h4>
                </div>
                <div class="client-region-wrapper_avatar">
                    <div><img src="${client.foto}"></div>
                    <div>
                        <h3>${client.firstName} ${client.secondName}</h3>
                        <p>${client.post}<br />
                            ${client.company}</p>
                    </div>
                </div>
            `
            });

            if (switchGroup[0].checked == true) {
                wrapperClientReview.innerHTML = markupClientGroup[0];
            }

            for (let i = 0; i < switchGroup.length; i++) {
                switchGroup[i].addEventListener('click', function () {
                    switchGroup[i].setAttribute('checked', true);
                    if (switchGroup[i].checked == true) {
                        wrapperClientReview.innerHTML = markupClientGroup[i];
                    }
                });
            }
        }
    }
    xhr.send();
}
document.addEventListener("DOMContentLoaded", loadClientReview);
// --- /Switch reviews ---

// --- Carousel for Client labels ---

const wrapperOfList = clientRegion.querySelector('.list_lables'),
    clientLabelList = clientRegion.querySelectorAll('.list_lables li'),
    wrapperClientLabelList = clientRegion.querySelector('.client-region-carousel_gallery'),
    clientsLabel = Array.prototype.slice.call(clientLabelList, 0),
    prevItemButton = clientRegion.querySelector('.client-region-carousel .arrow-prev'),
    nextItemButton = clientRegion.querySelector('.client-region-carousel .arrow-next');

function changeCarouselWidth() {
    const getWidthWrapper = function (arr, count) {
        arr = arr.slice(0, count).map(function (item) {
            return item.offsetWidth;
        });

        const result = arr.reduce(function (acc, current) {
            return acc + current;
        });
        return result;
    }

    let widthDevice = document.documentElement.clientWidth;
    let countItems;

    if (widthDevice > 0) {
        countItems = 1;
    }
    if (widthDevice > 480) {
        countItems = 2;
    }
    if (widthDevice > 768) {
        countItems = 3;
    }
    if (widthDevice > 993) {
        countItems = 4;
    }
    if (widthDevice > 1200) {
        countItems = 5;
    }

    wrapperClientLabelList.style.width = getWidthWrapper(clientsLabel, countItems) + 'px';

    let positionLeftItem = 0;
    const movementItem = getWidthWrapper(clientsLabel, countItems) / countItems;

    prevItemButton.addEventListener('click', function () {
        positionLeftItem += movementItem;
        positionLeftItem = Math.min(positionLeftItem, 0);
        wrapperOfList.style.marginLeft = positionLeftItem + 'px';
    });

    nextItemButton.addEventListener('click', function () {
        positionLeftItem -= movementItem;
        positionLeftItem = Math.max(positionLeftItem, -movementItem * (clientsLabel.length - countItems));
        wrapperOfList.style.marginLeft = positionLeftItem + 'px';
    });
}
changeCarouselWidth();
// --- /Carousel for Client labels ---
// === /Client region ===

//=== News region ===
const newsRegion = document.querySelector('#news'),
 wrapperNewsRegion = newsRegion.querySelector('.news-region-wrapper'),
 buttonShowMore = newsRegion.querySelector('.news-region-btn_show_more');

window.onload = function () {
    const itemList = wrapperNewsRegion.querySelector('.list_news li');
    const listPlace = wrapperNewsRegion.querySelector('.list_news');

    let buttonTitle = buttonShowMore.querySelector('h4');
    let itemHeight = itemList.offsetHeight;
    listPlace.style.maxHeight = itemHeight + 'px';

    buttonShowMore.addEventListener('click', function () {
        if (listPlace.style.maxHeight == itemHeight + 'px') {
            listPlace.style.maxHeight = 100 + '%';
            buttonTitle.innerHTML = 'Show less...';
        } else {
            listPlace.style.maxHeight = itemHeight + 'px';
            buttonTitle.innerHTML = 'Show more...';
        }
    });
};

//=== /News region ===

//=== Contacts region ===
const contactsRegion = document.querySelector('#contacts'),
    nameOfSender = contactsRegion.querySelector('input[name = "senderName"]'),
    emailOfSender = contactsRegion.querySelector('input[name="mail"]'),
    messageOfSender = contactsRegion.querySelector('textarea[name="messageText"]'),
    buttonSendMessage = contactsRegion.querySelector('button[type="submit"]');
// --- Validation ---



// --- /Validation ---
//=== /Contacts region ===