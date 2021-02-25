const inpFields = document.querySelectorAll("#inp");
const pesquisaBtn = document.getElementById("pesquisaBtn");
const section = document.querySelector(".section");
const pagesDinamic = document.querySelector(".pagesDinamic");
const pagination = document.querySelector(".pagination");
const paginationDiv = document.querySelector(".paginationDiv");
const imageOpenedBox = document.querySelector(".imageOpened");
const imageOpened = document.querySelector(".imageOpened img");
const dropdown_item = document.querySelectorAll(".dropdown-item");
const socialMedia = document.querySelector(".socialMedia");
const inpNav = document.querySelector(".inpNav");

const search =
    "https://api.unsplash.com/search/photos/?client_id=2fsRjIcQFWA3JroaQqglOY34ArcGZ2Jv3rOxlOXtsJo&page=1&query=";

const imgInicial = document.getElementById("imgInicial");
const textInicial = document.getElementById("textInicial");

inpFields.forEach((inp) => {
    dropdown_item.forEach((categoria) => {
        const getReqCategory = () => {
            const thisCategory = categoria.textContent;
            inp.value = thisCategory;
            requestAPI();
        };
        categoria.addEventListener("click", getReqCategory, false);
    });

    const requestAPI = () => {
        const mainURL = search + inp.value;

        let newImgVerify = document.querySelectorAll(".imgBox");

        if (newImgVerify.length > 1) {
            newImgVerify.forEach((item) => {
                item.remove();
            });
        }

        axios
            .get(mainURL)
            .then(function (response) {
                let pageItem = document.querySelectorAll(".page-item");
                if (pageItem.length > 1) {
                    pageItem.forEach((item) => {
                        item.remove();
                    });
                }

                if (response.data.total_pages) {
                    for (
                        let i = 1;
                        i < Math.min(response.data.total_pages, 34);
                        i++
                    ) {
                        const newPage = document.createElement("li");
                        newPage.className = "page-item";
                        newPage.innerHTML = `<a class="page-link bg-transparent text-white">${i}</a>`;

                        pagination.appendChild(newPage);

                        const requestPage = () => {
                            let newImgVerify = document.querySelectorAll(
                                ".imgBox"
                            );

                            if (newImgVerify.length > 1) {
                                newImgVerify.forEach((item) => {
                                    item.remove();
                                });
                            }

                            axios
                                .get(
                                    `https://api.unsplash.com/search/photos/?client_id=2fsRjIcQFWA3JroaQqglOY34ArcGZ2Jv3rOxlOXtsJo&page=${i}&query=${inp.value}`
                                )
                                .then(function (response) {
                                    let imgs = response.data.results;
                                    console.log(imgs);
                                    imgs.forEach((img) => {
                                        let newImgBox = document.createElement(
                                            "div"
                                        );
                                        newImgBox.classList = "imgBox";

                                        newImgBox.innerHTML = `
                                        <img
                                            src="${img.urls.small}"
                                        />
                                        <div class="info">
                                            <p>
                                                by ${img.user.first_name} ${img.user.last_name}
                                            </p>
                                            <p>
                                                Likes: ${img.likes}
                                            </p>
                                            <p>
                                                <a href="${img.urls.full} download="fromUnsplash.jpg">Download Here</a>
                                            </p>
                                            <p>
                                                <button id="openBtn" type="button" class="btn btn-outline-dark">Preview image</button>
                                            </p>
                                            <p style="opacity: 0.6">Images from <strong>Unsplash</strong></p>
                                        </div>
                                        `;

                                        section.appendChild(newImgBox);
                                    });
                                })
                                .catch(function (error) {
                                    console.log(error);
                                })
                                .then(function () {});
                        };

                        newPage.addEventListener("click", requestPage, false);
                    }
                }

                const imgs = response.data.results;
                console.log(imgs);
                imgs.forEach((img, index) => {
                    let newImgBox = document.createElement("div");
                    newImgBox.classList = "imgBox";

                    newImgBox.innerHTML = `
                    <img
                        src="${img.urls.small}"
                    />
                    <div class="info">
                        <p>
                            by ${img.user.first_name} ${img.user.last_name}
                        </p>
                        <p>
                            Likes: ${img.likes}
                        </p>
                        <p>
                            <a href="${img.urls.full}" download="fromUnsplash.jpg">Download Here</a>
                        </p>
                        <p>
                            <button id="openBtn" type="button" class="btn btn-outline-dark">Preview image</button>
                        </p>
                        <p style="opacity: 0.6">Images from <strong>Unsplash</strong></p>
                    </div>
                `;

                    section.appendChild(newImgBox);
                });
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {});
    };

    inp.addEventListener("change", requestAPI, false);
});
// pesquisaBtn.addEventListener("click", requestAPI, false);

// hover animation fodase css é horrivel toma no cu

const updatedDOM = () => {
    let domImg = document.querySelectorAll(".imgBox img");
    let domDiv = document.querySelectorAll(".imgBox div");

    textInicial.style.display = "none";
    socialMedia.style.display = "none";

    inpNav.style.opacity = 1;
    inpNav.style.transform = "translateY(0)";
    inpNav.id = "inp";

    section.style.overflowY = "visible";

    const teste = (img, index) => {
        const teste2 = () => {
            domDiv[index].style.opacity = 1;
            domDiv[index].style.transform = "translateY(0)";
            domDiv[index].style.pointerEvents = "all";
            img.style.filter = "blur(5px)";

            const clear = () => {
                domDiv[index].style.opacity = 0;
                domDiv[index].style.transform = "translateY(-100px)";
                domDiv[index].style.pointerEvents = "none";
                img.style.filter = "blur(0)";
            };

            setTimeout(clear, 2000);
        };

        img.addEventListener("mousemove", teste2, false);
    };
    domImg.forEach(teste);

    //abrir img
    let openBtn = document.querySelectorAll("#openBtn");

    openBtn.forEach((btn, indice) => {
        const openImageNow = () => {
            console.log(btn, indice);
            imageOpened.src = domImg[indice].src;

            imageOpenedBox.style.opacity = 1;
            imageOpenedBox.style.pointerEvents = "all";
            imageOpenedBox.style.transform = "translateY(0)";
        };

        btn.addEventListener("click", openImageNow, false);
    });
};

section.addEventListener("DOMNodeInserted", updatedDOM, false);

imageOpenedBox.addEventListener(
    "click",
    () => {
        imageOpenedBox.style.opacity = 0;
        imageOpenedBox.style.pointerEvents = "none";
        imageOpenedBox.transform = "translateY(-200)";
    },
    false
);

const testando = document.querySelector(".testando");
//some animation
const makeAnimation = () => {
    if (section.style.transform == "translateX(-100%)") {
        section.style.transform = "translateX(0)";
        testando.style.transform = "translateX(150%)";
        paginationDiv.style.opacity = 1;
        paginationDiv.style.transform = "translateY(0)";
        return;
    }

    paginationDiv.style.transform = "translateY(100px)";
    paginationDiv.style.opacity = 0;
    section.style.transform = "translateX(-100%)";
    testando.style.transform = "translateX(25%)";
};

pesquisaBtn.addEventListener("click", makeAnimation, false);

testando.style.background = "url(https://source.unsplash.com/random)";
