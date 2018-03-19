let allQuestions = [
     {
      question:"Where was Stanley Kubrick from?",
      answers: ["Canada", "NYC", "Vermont", "UK"],
      correctAnswer: 1,
      feedbackSentence: "Kubrick was from NYC."
    },
    {
      question:"What was Stanley Kubrick's last film?",
      answers: ["Eyes Wide Shut", "Full Metal Jacket", "2001: A Space Oddessey", "The Shining"],
      correctAnswer: 0,
      feedbackSentence: "Kubrick's last film was Eyes Wide Shut."
    },
    {
      question:"Which Kubrick film has the longest duration?",
      answers: ["Spartacus", "Eyes Wide Shut", "Barry Lyndon", "2001: A Space Oddessey"],
      correctAnswer: 2,
      feedbackSentence: "The Kubrick film with the longest duration is Barry Lyndon."
      
    },
    {
      question:"Which film of his did Kubrick dislike?",
      answers: ["Fear and Desire", "Barry Lyndon", "Lolita", "A Clockwork Orange"],
      correctAnswer: 0,
      feedbackSentence: "Kubrick disliked Fear and Desire."
    },
    {
      question:"Which film has a myriad of details referencing genocide?",
      answers: ["2001: A Space Oddessey", "Full Metal Jacket", "Sparticus", "The Shining"],
      correctAnswer: 3,
      feedbackSentence: "The Shining has the most references to genocide(s)."
    },
    {
      question:"What was Kubrick's favorite game?",
      answers: ["Checkers", "Poker", "Blackjack", "Chess"],
      correctAnswer: 3,
      feedbackSentence: "Kubrick's favorite game was chess."
    },
    {
      question:"What was one of Kubrick's passions at age 13?",
      answers: ["Cooking", "Jazz-Drumming", "Sewing", "Dog Agility"],
      correctAnswer: 1,
      feedbackSentence: "One of Kubrick's passions, at age 13, was jazz-drumming."
    },
    {
      question:"What genre was Kubrick's first film?",
      answers: ["Horror", "Historical Fiction", "Documentary", "Action"],
      correctAnswer: 2,
      feedbackSentence: "Kubrick's first film was a documentary."
    },
    {
      question:"What was Kubrick's highest grossing film?",
      answers: ["2001: A Space Oddessey", "A Clockwork Orange", "The Shining", "Dr Strangelove"],
      correctAnswer: 0,
      feedbackSentence: "Kubrick's highest grossing film was 2001: A Space Oddessey."
    },
    {
      question:"Who did Kubrick first consider for the lead role in Eyes Wide Shut?",
      answers: ["Jack Nicholson", "Steve Martin", "Bill Murray", "Kirk Douglas"],
      correctAnswer: 1,
      feedbackSentence: "When considering making Eyes Wide Shut a dark comedy, Kubrick considered Steve Martin for the lead."
    }
];

let currentquestion = 0;
let correctAnswers = 0;

function renderProgress() {
  let totalAnswered = currentquestion + 1;
  $('.progress').empty();
    $('.progress').append('<p>' + correctAnswers + ' / '+ totalAnswered + ' Correct! </p>');
}

function renderFeedback(isCorrect) {
  if(isCorrect) {
    $(".feedback-section #feedback-content").text("Correct! " + allQuestions[currentquestion].feedbackSentence);
    $("#answers").hide();
  } else {
    $(".feedback-section #feedback-content").text("Wrong! " + allQuestions[currentquestion].feedbackSentence);
    $("#answers").hide();
  }
}

function renderRestartPage() {
  $(".qAndAForm").hide();
  $("#result").append('<p>You correctly answered ' + correctAnswers + 
          ' out of '+ currentquestion + ' questions! </p>').hide();
  $("#result").fadeIn(1000);
  $('#result').append('<button id="restart">Restart</button>');
}


function renderNextPage() {
  renderQuestion();
  renderOptions();
}

function renderQuestion() {
  $('#question').html(`<legend>${currentquestion + 1}.  ${allQuestions[currentquestion].question}<legend>`);
}

function renderOptions() {
  let options = allQuestions[currentquestion].answers;
  let formHtml = '';
  for (let i = 0; i < options.length; i++) {
    formHtml += `<div><input type="radio" value="${i}" id="option${i}"><label for="option${i}">${options[i]}</label></div><br/>`;
  }
  $('#answers').html(formHtml);
  $("#option0").prop('checked', true);
}

function checkAns() {
  const isCorrect = $("input[name=option]:checked").val() == allQuestions[currentquestion].correctAnswer;
  if (isCorrect) {
    correctAnswers++;
  }
  renderFeedback(isCorrect);
  renderProgress();
}

function bindCheckAnswerButton () {
  $("form").on("click", "#checkAnswer", (event) => {
    $("#checkAnswer").hide();
    $(".feedback-section").hide();
    $(".feedback-section").fadeIn(1000);
    event.preventDefault();
    checkAns();
    $("#next").show();
    $("#next").focus();
  });
}

function restart() {
  currentquestion = 0;
  correctAnswers = 0;
  $(".qAndAForm").hide();
  $(".feedback-section").hide();
  $("#start").show();
  $("#result").empty();
  renderNextPage();
  $('.progress').empty();
  $("#start").focus();
}

function setupNextPage() {
  if (currentquestion < allQuestions.length) {
    renderNextPage();
  } 
  else {
    renderRestartPage();
    $("#restart").focus();
  }  
}

function setupNextQuestion() {
    $("#form").on('click', '#next', function() {
      $('#next').hide();
      $("#answers").show();
      $(".feedback-section").hide();
      $("#checkAnswer").show();
      event.preventDefault();
      currentquestion++;
      setupNextPage();
    $("#form :first-child input").focus();
   });
}

function bindRestartClick() {
  $("div").on("click", "#restart", function() {
    restart();
  });
}

function initializeQuizApp() {
  $(".qAndAForm").hide();
  $('#start').click(function() {
    $(".qAndAForm").fadeIn();
    $(this).hide();
  });   
  $("#next").hide();
  $("#start").focus();
}

$(document).ready(function() {
  initializeQuizApp();
  renderQuestion();
  renderOptions();
  setupNextQuestion();
  bindRestartClick();
  bindCheckAnswerButton();
});