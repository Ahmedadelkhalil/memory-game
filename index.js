let startBtn = document.querySelector(".btn");

startBtn.onclick = function () {
  let yourName = prompt("What Is Your Name ?");
  let name = document.querySelector(".name span");
  if (yourName === null || yourName === "") {
    name.innerHTML = "Unknown";
  } else {
    name.innerHTML = yourName;
  }
  document.querySelector(".start-screen").remove();
};

let duration = 1000;
let blocksContainer = document.querySelector(".blocks-container");
let cardsArr = Array.from(blocksContainer.children);
let blocksOrder = [...Array(cardsArr.length).keys()];
console.log(blocksOrder);
shuffle(blocksOrder);
console.log(blocksOrder);

cardsArr.forEach((block, index) => {
  block.style.order = blocksOrder[index];

  block.addEventListener("click", () => {
    flipping(block);
  });
});

function stopClicking() {
  blocksContainer.classList.add("stop-click");

  setTimeout(() => {
    blocksContainer.classList.remove("stop-click");
  }, duration);
}
function flipping(e) {
  e.classList.add("flipping");

  let hasflipped = cardsArr.filter((block) =>
    block.classList.contains("flipping")
  );

  if (hasflipped.length === 2) {
    stopClicking();
    matched(hasflipped[0], hasflipped[1]);
  }
}

function matched(cardOne, cardTwo) {
  let score = document.querySelector(".score span");
  if (cardOne.dataset.tech == cardTwo.dataset.tech) {
    cardOne.classList.remove("flipping");
    cardTwo.classList.remove("flipping");
    cardOne.classList.add("matching");
    cardTwo.classList.add("matching");
  } else {
    score.textContent = parseInt(score.textContent) + 1;
    setTimeout(() => {
      cardOne.classList.remove("flipping");
      cardTwo.classList.remove("flipping");
    }, duration);
  }
}

function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }

  return array;
}
