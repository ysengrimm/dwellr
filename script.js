
class Game {

  constructor() {
    this.leftButton = document.querySelector("#left");
    this.rightButton = document.querySelector("#right");

    this.ownerScoreText = document.querySelector("#owner").querySelector(".score");
    this.natureScoreText = document.querySelector("#nature").querySelector(".score");
    this.userScoreText = document.querySelector("#user").querySelector(".score");
    this.publicScoreText = document.querySelector("#public").querySelector(".score");

    this.questionText = document.querySelector("#question"); 
    
    this.leftActionText = document.querySelector("#left").querySelector(".action"); 
    this.rightActionText = document.querySelector("#right").querySelector(".action");

    this.authorText = document.querySelector("#author");
    this.profileText = document.querySelector("#profile");

    // general game state
    this.questIdx = 0;

    // player state
    this.ownerScore = 0.5;
    this.natureScore = 0.5;
    this.userScore = 0.5;
    this.publicScore = 0.5;
    this.life = 100;

    this.leftButton.addEventListener("click", () => {
      this.leftClicked();
    });

    this.rightButton.addEventListener("click", () => {
      this.rightClicked();
    });

    this.fillQuests();
  }

  fillQuests() {
    if (this.questIdx >= quests.length) {
      return;
    }

    const text = quests[this.questIdx]["text"];
    const npc = quests[this.questIdx]["npc"];
    const choices = quests[this.questIdx]["choices"];
    const [ leftChoice, rightChoice ] = choices;
    
    this.questionText.textContent = text;
    this.authorText.textContent = npc;

    this.leftActionText.textContent = leftChoice["text"];
    this.rightActionText.textContent = rightChoice === undefined ? leftChoice["text"] : rightChoice["text"];

    this.ownerScoreText.textContent = this.ownerScore;
    this.natureScoreText.textContent = this.natureScore;
    this.userScoreText.textContent = this.userScore;
    this.publicScoreText.textContent = this.publicScore;
  }

  leftClicked() {
    console.log("left");

    const choices = quests[this.questIdx]["choices"];
    const [ leftChoice, rightChoice ] = choices;
    const impacts = leftChoice["impact"];

    this.ownerScore += impacts["owner"];
    this.natureScore += impacts["nature"];
    this.userScore += impacts["user"];
    this.publicScore += impacts["public"];
    this.life += impacts["life"];

    this.questIdx++;
    this.fillQuests();
  }

  rightClicked() {
    console.log("right");

    const choices = quests[this.questIdx]["choices"];
    const [ leftChoice, rightChoice ] = choices;

    let impacts = null;
    if (rightChoice === undefined) {
      impacts = leftChoice["impact"];
    } else {
      impacts = rightChoice["impact"];
    }
    
    this.ownerScore += impacts["owner"];
    this.natureScore += impacts["nature"];
    this.userScore += impacts["user"];
    this.publicScore += impacts["public"];
    this.life += impacts["life"];

    this.questIdx++;
    this.fillQuests();
  }

}


new Game();