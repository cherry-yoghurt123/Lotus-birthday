const cards = document.querySelectorAll(".card")

const popup = document.getElementById("popup")
const popupTitle = document.getElementById("popupTitle")
const popupText = document.getElementById("popupText")
const popupImages = document.getElementById("popupImages")
const popupLink = document.getElementById("popupLink")
const close = document.getElementById("close")

cards.forEach(card => {

card.addEventListener("click", () => {

popupTitle.textContent = card.dataset.title

popupText.textContent = card.dataset.text

popupImages.innerHTML = ""

const img = document.createElement("img")
img.src = card.dataset.img

popupImages.appendChild(img)

popupLink.href = card.dataset.link

popup.classList.add("active")

})

})

close.onclick = () => {

popup.classList.remove("active")

}

popup.onclick = (e) => {

if(e.target === popup){

popup.classList.remove("active")

}

}


