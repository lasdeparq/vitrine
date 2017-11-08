class Item {
    constructor(item) {
        for (let attr in item) {
            this[attr] = item[attr];
        }

        //TODO Extract to methods
        /**image */
        let img = document.createElement("img");
        img.setAttribute("src", this.imageName);
        img.setAttribute("alt", 'Imagem produto');
        let divImg = document.createElement("div");
        divImg.classList.add("item__image");
        divImg.appendChild(img);

        /**title/name */
        let divTitle = document.createElement("div");
        divTitle.classList.add("item__title");
        divTitle.innerHTML = this.name;

        /**oldPrice */
        let divOldPrice = document.createElement("div");
        divOldPrice.classList.add("item__oldPrice");
        let spanOldPrice = document.createElement("span");
        spanOldPrice.innerHTML = this.oldPrice;
        divOldPrice.innerHTML = "De: ";
        divOldPrice.appendChild(spanOldPrice);

        /**price and conditions */
        let divPrice = document.createElement("div");
        divPrice.classList.add("item__price");
        let spanPrice = document.createElement("span");
        spanPrice.innerHTML = this.price;
        let divPriceConditions = document.createElement("div");
        divPriceConditions.classList.add("item__price__conditions");
        divPriceConditions.innerHTML = this.productInfo.paymentConditions;
        divPrice.innerHTML = "Por: ";
        divPrice.appendChild(spanPrice);
        divPrice.appendChild(divPriceConditions);

        /**div .item */
        let divItem = document.createElement("div");
        divItem.classList.add("item");
        divItem.appendChild(divImg);
        divItem.appendChild(divTitle);
        divItem.appendChild(divOldPrice);
        divItem.appendChild(divPrice);

        /**item url and container element */
        this.itemElem = document.createElement("a");
        this.itemElem.classList.add("hidden");
        this.itemElem.setAttribute("href", this.detailUrl);
        this.itemElem.setAttribute("target", "_blank");
        this.itemElem.appendChild(divItem);

    }

    show() {
        this.itemElem.classList.remove("hidden");
    }

    hide() {
        this.itemElem.classList.add("hidden");
    }

}

function X(response) {
    let referenceItem = new Item(response.data.reference.item);
    let recommended = response.data.recommendation;
    init(referenceItem, recommended);
}

//TODO Create a namespace
let pages;
let pageSelected = 0;
let pageSize = 3;
const items = [];

const disable = function () {
    this.querySelector("i").classList.add("disabled");
};
const enable = function () {
    this.querySelector("i").classList.remove("disabled");
};

const prev = document.querySelector(".items__recommended__previous");
prev.onclick = function () {
    if (pageSelected !== 0) {
        for (let i = 0; i < items.length; i++) {
            items[i].hide();
        }

        pageSelected--;
        items.show(pageSelected);
        enableDisableNextPrevious();
    }
};
prev.disable = disable;
prev.enable = enable;

const next = document.querySelector(".items__recommended__next");
next.onclick = function () {
    if (pageSelected !== pages - 1) {
        for (let i = 0; i < items.length; i++) {
            items[i].hide();
        }

        pageSelected++;
        items.show(pageSelected);
        enableDisableNextPrevious();
    }
};
next.disable = disable;
next.enable = enable;

function init(referenceItem, recommendedItems) {
    document.querySelector(".items__reference").appendChild(referenceItem.itemElem);

    pages = Math.ceil(recommendedItems.length / pageSize);
    for (let i = 0; i < recommendedItems.length; i++) {
        let newItem = new Item(recommendedItems[i]);
        items.push(newItem);
        document.querySelector(".items__recommended").appendChild(newItem.itemElem);

    }

    referenceItem.show();
    items.show(0);

    spinner.hide();
    enableDisableNextPrevious();
}


items.show = function (index) {
    for (let i = 0; i < pageSize; i++) {
        if (typeof items[i + index * pageSize] !== "undefined") {
            items[i + index * pageSize].show();
        }
    }
};

const spinner = document.querySelector(".loading");
spinner.hide = function () {
    spinner.classList.add("hidden");
};
spinner.show = function () {
    spinner.classList.remove("hidden");
};

function enableDisableNextPrevious() {
    if (pages > 1) {
        if (pageSelected === 0) {
            prev.disable();
        } else {
            prev.enable();
            if (pageSelected === pages - 1) {
                next.disable();
            } else {
                next.enable();
            }
        }
    } else {
        prev.disable();
        next.disable();
    }

}




