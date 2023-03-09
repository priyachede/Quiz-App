const questions = [
    {
      questionText: "Commonly used data types DO NOT include:",
      options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
      answer: "3. alerts",
    },
    {
      questionText: "Arrays in JavaScript can be used to store ______.",
      options: [
        "1. numbers and strings",
        "2. other arrays",
        "3. booleans",
        "4. all of the above",
      ],
      answer: "4. all of the above",
    },
    {
      questionText:
        "String values must be enclosed within _____ when being assigned to variables.",
      options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
      answer: "3. quotes",
    },
    {
      questionText:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      options: [
        "1. JavaScript",
        "2. terminal/bash",
        "3. for loops",
        "4. console.log",
      ],
      answer: "4. console.log",
    },
    {
      questionText:
        "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
      options: ["1. break", "2. stop", "3. halt", "4. exit"],
      answer: "1. break",
    },
  ];
  
  const app = document.getElementById("app");
  
  function showMain() {
      app.innerHTML = `
          <h1 id="app-title">Coding Quiz Challenge</h1>
          <p>Try to answer to following code-related questions within the time limit.</p>
          <p>Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p>
          <button onclick="startQuiz()">Start Quiz</button>`
  }
  
  function showLeaderboard() {
      let scores = JSON.parse(localStorage.getItem('leaderboard')) || [];
      let sortedScores = [...scores].sort((a, b) => parseInt(b.score) - parseInt(a.score));
      app.innerHTML = `
          <h1>Leaderboard</h1>
          <ul>
              ${sortedScores ?
                  sortedScores.map(({name, score}) => 
                      `<li>${name} - ${score}</li>`)
                  .join('')
              : `<p>Empty :(</p>`}
          </ul>
          <button onclick="showMain()">Go Back</button>
          <button onclick="localStorage.clear(); showLeaderboard()">Clear Highscores</button>`;
  }
  
  function submitScore() {
      localStorage.setItem("leaderboard", JSON.stringify([
          ...JSON.parse(localStorage.getItem("leaderboard")) || [],
          {name: document.getElementById("initials").value, score: currentScore, date: Date()}
      ]));
      showLeaderboard()
  }
  
  function endQuiz() {
      app.innerHTML = `
          <h1>All done!</h1>
          <p>Your final score is ${currentScore}</p>
          Enter intials: <input id='initials' />
          <button onclick="submitScore()">Submit</button>`
      currentScore = 0
      currentQuestion = 0
      timeLeft = 50
  }
  
  function checkAnswer(id) {
      let lastAnswer = document.createElement("p");
      lastAnswer.classList.add("lastAnswer");
      if (questions[currentQuestion]['answer'] == questions[currentQuestion]['options'][id]) {
          lastAnswer.textContent = "Correct!"
          currentScore++;
          currentQuestion++;
      } else {
          lastAnswer.textContent = "Incorrect!";
          timeLeft -= 10;
      }
      renderQuestion()
      document.querySelector("#app").appendChild(lastAnswer);
  }
  
  function renderQuestion() {
      let {questionText, options} = questions[currentQuestion];
      console.log(options);
      app.innerHTML = `
          <h1>${questionText}</h1>
          ${options.map((it, id) => `<div class="answer" onclick="checkAnswer(${id})">${it}</div>`).join('')}`;
  }
  
  function startQuiz() {
      let timer = document.createElement("p");
      const timeInterval = setInterval(() => {
          timer.textContent = `Time ${timeLeft--}`;
          if (timeLeft < 0) {
              timer.remove();
              endQuiz()
              clearInterval(timeInterval)
          }
      }, 1000)
      document.querySelector("header").appendChild(timer);
      renderQuestion();
  }
  
  let currentQuestion = 0;
  let currentScore = 0;
  let timeLeft = 50;
  
  const leaderboardButton = document.getElementById("leaderboard");
  
  leaderboardButton.addEventListener("click", showLeaderboard);
  
  showMain()
  
  
  