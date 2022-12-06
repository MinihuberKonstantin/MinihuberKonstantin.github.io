const imageElementArray = [document.getElementById('img1'), document.getElementById('img2'), document.getElementById('img3'), document.getElementById('img4'), document.getElementById('img5'),];
const imageArray = ['./media/cube0.png', './media/cube1.png', './media/cube2.png', './media/cube3.png', './media/cube4.png', './media/cube5.png', './media/cube6.png', './media/cube7.png', './media/cube8.png', './media/cube9.png', './media/cube-1.png'];
let currentFirstImage = imageArray.length - 1;
let interval = setInterval(() => (slideThroughImages(true)), 5000);
document.getElementById('allOfThatActualSweetSweetJSEnabler').style.display = 'block';

function slideThroughImages(isDirectionRight) {
    if (isDirectionRight) {
        for (let i = 0; i < imageElementArray.length; ++i) imageElementArray[i].setAttribute('src', imageArray[i + currentFirstImage + 1 < imageArray.length ? i + currentFirstImage + 1 : i + currentFirstImage + 1 - imageArray.length]);
        document.getElementById('body').setAttribute('style', 'background-image: url(' + imageArray[currentFirstImage + 3 < imageArray.length ? currentFirstImage + 3 : currentFirstImage + 3 - imageArray.length] + ')');
        ++currentFirstImage;
        clearInterval(interval);
        interval = setInterval(() => (slideThroughImages(true)), 5000);
        if (currentFirstImage >= imageArray.length) currentFirstImage -= imageArray.length;
    } else {
        for (let i = 0; i < imageElementArray.length; ++i) if (i + currentFirstImage - 1 === -1) imageElementArray[i].setAttribute('src', imageArray[imageArray.length - 1]); else imageElementArray[i].setAttribute('src', imageArray[i + currentFirstImage - 1 < imageArray.length ? i + currentFirstImage - 1 : i + currentFirstImage - 1 - imageArray.length]);
        --currentFirstImage;
        document.getElementById('body').setAttribute('style', 'background-image: url(' + imageArray[currentFirstImage + 2 < imageArray.length ? currentFirstImage + 2 : currentFirstImage + 2 - imageArray.length] + ')');
        clearInterval(interval);
        interval = setInterval(() => (slideThroughImages(false)), 5000);
        if (currentFirstImage < 0) currentFirstImage += imageArray.length;
    }
}