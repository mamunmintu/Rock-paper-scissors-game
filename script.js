"use strict";

// -------- DOM Element Selection----------->
const inputText = document.querySelector(".input_text");
const inputName = document.querySelector(".input_name");
const inputValue = document.querySelector(".input_name").value;
const form = document.querySelector("form");
const playerScore = document.querySelector(".player_score");
const chance = document.querySelector(".chance");
const computerScore = document.querySelector(".computer_score");
const resultEl = document.querySelector(".result");
const playerName = document.querySelector(".user");
const icons = document.querySelector(".icon");
const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissor = document.querySelector(".scissors");
const picEl = document.querySelector(".pic_user");
const picComEl = document.querySelector(".pic_computer");
const overlay = document.querySelector(".overlay");
const gameOverMessageClose = document.querySelector("span");
const winText = document.querySelector(".win_text");

let playerPoint = 0;
let chancePoint = 5;
let computerPoint = 0;

const messageDelayTime = 1000;

const game = function () {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputValue = document
      .querySelector(".input_name")
      .value.toUpperCase();

    if (!inputValue)
      return (
        (inputText.textContent = "HEY! ❌ Enter your name, then you can play"),
        (inputText.style.color = "yellow")
      );
    inputText.textContent = `Okay now you can play`;
    inputText.style.color = "#fff";
    inputName.value = "";

    playerName.textContent = `${inputValue}`;

    const render = function () {
      icons.addEventListener("click", function (e) {
        const btn = e.target.closest(".click_icon");
        picEl.src = `${btn.src}`;

        const choice = ["rock", "paper", "scissors"];
        const randomNum = Math.floor(Math.random() * 3);
        const computerChoice = choice[randomNum];
        picComEl.src = `./img/${computerChoice}.png `;

        const player = btn.alt;
        buttonClickSound();

        gameLogic(computerChoice, player);
        gameOver(playerPoint, computerPoint, chancePoint);
      });
    };
    render();

    const gameLogic = function (computerChoice, player) {
      if (computerChoice === player) {
        resultEl.textContent = "Drow";
      } else if (computerChoice === "rock") {
        if (player === "paper") {
          resultEl.textContent = "You win";
          playerPoint++;
          playerScore.textContent = `Score : ${playerPoint}`;
        } else if (player === "scissors") {
          resultEl.textContent = "You lose";
          loseSound();
          computerPoint++;
          computerScore.textContent = `Score : ${computerPoint}`;
          chancePoint--;
          chance.textContent = `chance ${chancePoint} time`;
        }
      } else if (computerChoice === "paper") {
        if (player === "rock") {
          resultEl.textContent = "You lose";
          loseSound();
          computerPoint++;
          computerScore.textContent = `Score : ${computerPoint}`;
          chancePoint--;
          chance.textContent = `chance ${chancePoint} time`;
        } else if (player === "scissors") {
          resultEl.textContent = "You win";
          playerPoint++;
          playerScore.textContent = `Score : ${playerPoint}`;
        }
      } else if (computerChoice === "scissors") {
        if (player === "rock") {
          resultEl.textContent = "You win";
          playerPoint++;
          playerScore.textContent = `Score : ${playerPoint}`;
        } else if (player === "paper") {
          resultEl.textContent = "You lose";
          loseSound();
          computerPoint++;
          computerScore.textContent = `Score : ${computerPoint}`;
          chancePoint--;
          chance.textContent = `chance ${chancePoint} time`;
        }
      }
    };

    const gameOver = function (playerPoint, computerPoint, chancePoint) {
      if (chancePoint === 0 || playerPoint >= 5 || computerPoint >= 5) {
        let newPlayerPoint = 0;
        let newChancePoint = 5;
        let newComputerPoint = 0;
        playerScore.textContent = `Score : ${newPlayerPoint}`;
        computerScore.textContent = `Score : ${newComputerPoint}`;
        chance.textContent = `Chance ${newChancePoint} time`;

        setTimeout(() => {
          if (playerPoint === 5) {
            winText.textContent = `🏆The winner is ${inputValue} 🏆`;
            const speech = new SpeechSynthesisUtterance();
            const winnerVoice = () => {
              speech.text = `The winner is ${inputValue}`;
              window.speechSynthesis.speak(speech);
            };
            winnerVoice();
          } else if (computerPoint === 5) {
            winText.textContent = `🏆 The winner is COMPUTER 🏆`;
          }
          overlay.classList.toggle("hidden");
          gameOverSound();
        }, messageDelayTime);
      }
    };
  });
};
game();

const loseSound = function () {
  let audio = new Audio("audio/lose_sound.mp3");
  audio.play();
};
const buttonClickSound = function () {
  let audio = new Audio("audio/click.mp3");
  audio.play();
};
const gameOverSound = function () {
  let audio = new Audio("audio/gameOverVoice.mp3");
  audio.play();
};
