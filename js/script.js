document.getElementById('inputMessages').addEventListener('input', function (e) {

    // Messages
    let messages = e.target.value;

    // levels
    let levels = document.getElementById('levels');

    // tiers
    let tiers = levels.querySelectorAll('#tiers');
    console.log(tiers);

    let h = levels.querySelector('#higherBound6')
    let infinityHtmlEncoded = h.childNodes[0].textContent;

    infinityHtmlEncoded = infinityHtmlEncoded.toHtmlEntities();

    let blockAll = blocks = messages / 10000;
    let priceAll = 0;
    let blockDiff = 0;

    let costs = document.getElementById('message__costs');

    for (i = 0; i < tiers.length; i++) {
        let upperBlock = tiers[i].children[2].textContent;
        let lowerBlock = tiers[i].children[1].textContent;
        let monthlyPrice = tiers[i].children[5].textContent;

        // First Tier (Tier 1)
        if (upperBlock <= blocks) {
            // To find the difference
            blockDiff = blockAll - upperBlock;

            // To calculate the price
            priceAll = priceAll + (monthlyPrice * (upperBlock - lowerBlock + 1));
            costs.innerHTML = `${priceAll} &euro;`;
            // To change the DOM
            tiers[i].style.display = '';
        } else {
            // As long as blocks are between lower and upper block
            if (blocks >= lowerBlock && blocks < upperBlock) {
                // As long as blockDiff is empty
                if (blockDiff === 0) {
                    blockDiff = Math.round(blockAll);
                }
                // To calculate the price
                priceAll = priceAll + (monthlyPrice * blockDiff);
                costs.innerHTML = `${priceAll} &euro;`;
                // To change the DOM
                tiers[i].style.display = '';
            } else {
                if (i == 5 && blocks >= lowerBlock) {
                    tiers[i].style.display = '';
                    priceAll = priceAll + (monthlyPrice * blockDiff);
                    costs.innerHTML = `${priceAll} &euro;`;
                }
                else {
                    // To change the DOM
                    tiers[i].style.display = 'none';
                }
            }
        }

        // In case blocks are less than 1 clear the costs
        if(blocks < 1) {
            costs.innerHTML = `0 &euro;`;
        }
    }
});

String.prototype.toHtmlEntities = function () {
    return this.replace(/./gm, function (s) {
        // return "&#" + s.charCodeAt(0) + ";";
        return (s.match(/[a-z0-9\s]+/i)) ? s : "&#" + s.charCodeAt(0) + ";";
    });
};
