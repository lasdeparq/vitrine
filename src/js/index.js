class Item {
    constructor(item) {
        for (let attr in item) {
            this[attr] = item[attr];
        }

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
        this.itemElem.setAttribute("href", this.detailUrl);
        this.itemElem.setAttribute("target", "_blank");
        this.itemElem.appendChild(divItem);

    }

    getItemElement() {
        return this.itemElem;
    }
}

const spinner = document.querySelector(".loading");
spinner.hide = function () {
    spinner.classList.add("hidden");
};
spinner.show = function () {
    spinner.classList.remove("hidden");
};

function X(response) {

    let newItem = new Item(response.data.reference.item);
    document.querySelector(".items__reference").appendChild(newItem.getItemElement());
    console.log(newItem);
    spinner.hide();
}




