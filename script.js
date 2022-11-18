const AimLabBall = document.getElementById("AimLab-ball");
let highestScoreO = document.getElementById("top-score");
const ScoreOutput = document.getElementById("score");
const timerCounter = document.getElementById("timer");
const endScreen = document.getElementById("end-time");
const saveScore = localStorage.getItem("highestKey");
const HSOutput = document.getElementById("high-records");
const defaultEmpty = "- - - - - - - - - - - - - - - - - -";
let score = 0;
let endTimer = 30;
let timer = 30;
// localStorage.clear();
if (localStorage.getItem("backUpScoresKey")) {
    highestScoreO.innerHTML = localStorage.getItem("backUpScoresKey");
    localStorage.setItem("highestKey", localStorage.getItem("backUpScoresKey"));
}
let isGameRunning = true;
function resetLocalSaves() {
    AimLabHScores = [
        {
            score: 0,
            saveName: "",
            date: "- - -",
        },
        {
            score: 0,
            saveName: "",
            date: "- - -",
        },
        {
            score: 0,
            saveName: "",
            date: "- - -",
        },
        {
            score: 0,
            saveName: "",
            date: "- - -",
        },
        {
            score: 0,
            saveName: "",
            date: "- - -",
        },
        {
            score: 0,
            saveName: "",
            date: "- - -",
        },
    ];
}
AimLabBall.addEventListener("mouseover", function () {
    if (timer <= 0) {
        endScreen.style.opacity = 1;
        endScreen.style.zIndex = 3;
        if (isGameRunning) addToHS();
        isGameRunning = false;
        return;
    }
    score++;
    AimLabBall.style.top = String(Math.floor(Math.random() * 73) + 10) + "%";
    AimLabBall.style.left = String(Math.floor(Math.random() * 90) + 5) + "%";
    ScoreOutput.innerHTML = score;
    let startTimer = Date.parse(Date()) / 1000;
    if (endTimer == 30) endTimer = startTimer + 10;
    timer = endTimer - startTimer;
    timerCounter.style.width = timer * 10 + "%";
    localStorage.setItem(
        "highestKey",
        Math.max(score, highestScoreO.innerHTML)
    );
    const saveScore = localStorage.getItem("highestKey");
    if (localStorage.getItem("highestKey")) {
        highestScoreO.innerHTML = Number(localStorage.getItem("highestKey"));
    }
    if (
        Number(localStorage.getItem("backUpScoresKey")) <
        Number(localStorage.getItem("highestKey"))
    ) {
        localStorage.setItem(
            "backUpScoresKey",
            localStorage.getItem("highestKey")
        );
    }
});
let rewrite = true;
document
    .querySelector("#AimLab-btns button:nth-child(1)")
    .addEventListener("dblclick", function () {
        score = 0;
        localStorage.setItem("highestKey", 0);
        highestScoreO.innerHTML = "0";
        ScoreOutput.innerHTML = "0";
        endTimer = 30;
        timer = 30;
        timerCounter.style.width = "100%";
        AimLabBall.style.top = "50%";
        AimLabBall.style.left = "50%";
        endScreen.style.opacity = 0;
        endScreen.style.zIndex = 1;
        isGameRunning = true;
        resetLocalSaves();
        rewrite = false;
        addToHS();
    });
document
    .querySelector("#AimLab-btns button:nth-child(2)")
    .addEventListener("click", function () {
        score = 0;
        endTimer = 30;
        timer = 30;
        ScoreOutput.innerHTML = "0";
        timerCounter.style.width = "100%";
        AimLabBall.style.top = "50%";
        AimLabBall.style.left = "50%";
        endScreen.style.opacity = 0;
        endScreen.style.zIndex = 1;
        isGameRunning = true;
    });
if (localStorage.getItem("showHS") == "true") {
    HSOutput.style.display = "grid";
    document.querySelector("#AimLab-btns button:nth-child(3)").textContent =
        "Hide high scores";
} else {
    HSOutput.style.display = "none";
    document.querySelector("#AimLab-btns button:nth-child(3)").textContent =
        "Show high scores";
}
document
    .querySelector("#AimLab-btns button:nth-child(3)")
    .addEventListener("click", function () {
        if (HSOutput.style.display != "grid") {
            HSOutput.style.display = "grid";
            localStorage.setItem("showHS", true);
            document.querySelector(
                "#AimLab-btns button:nth-child(3)"
            ).textContent = "Hide high scores";
        } else {
            HSOutput.style.display = "none";
            localStorage.setItem("showHS", false);
            document.querySelector(
                "#AimLab-btns button:nth-child(3)"
            ).textContent = "Show high scores";
        }
    });
let AimLabHScores = [];
if (!localStorage.getItem("HSAimLabBackup")) {
    resetLocalSaves();
} else {
    localStorage.setItem("HSAimLab", localStorage.getItem("HSAimLabBackup"));
}
if (localStorage.getItem("HSAimLab"))
    AimLabHScores = JSON.parse(localStorage.getItem("HSAimLab"));
addToHS();
function makeSaveDate(time) {
    return String(time).padStart(2, "0");
}
function addToHS() {
    for (i in AimLabHScores) {
        if (!AimLabHScores[i].saveName)
            AimLabHScores[i].saveName = defaultEmpty;
    }
    const SAVEDATE = new Date();
    let saveDate = `${SAVEDATE.getFullYear()}/${makeSaveDate(
        SAVEDATE.getMonth()
    )}/${makeSaveDate(SAVEDATE.getDate())} ${makeSaveDate(
        SAVEDATE.getHours()
    )}:${makeSaveDate(SAVEDATE.getMinutes())}:${makeSaveDate(
        SAVEDATE.getSeconds()
    )}`;
    AimLabHScores[5].score = score;
    AimLabHScores[5].date = saveDate;
    AimLabHScores.sort(function (a, b) {
        return b.score - a.score;
    });
    HSOutput.innerHTML = "";
    HSOtempOutput = "";
    for (i in AimLabHScores) {
        if (i == 5) break;

        HSOtempOutput += `
        <div>${Number(i) + 1}</div>
        <div>${AimLabHScores[i].score}</div>
        <div id="middle-div${i}">
            <input type="text" id="save-input${i}" onfocus="this.value=''">
            <div id="name-saver${i}">save</div>
        </div>
        <div>${AimLabHScores[i].date}</div>`;
    }
    HSOutput.innerHTML = HSOtempOutput;
    try {
        for (i in AimLabHScores) {
            document.getElementById(`save-input${i}`).value =
                AimLabHScores[i].saveName;
        }
    } catch (err) {}
    localStorage.setItem("HSAimLab", JSON.stringify(AimLabHScores));
    if (rewrite)
        localStorage.setItem("HSAimLabBackup", JSON.stringify(AimLabHScores));
    changeName();
}
changeName();
function changeName() {
    try {
        for (let i = 0; i < AimLabHScores.length; i++) {
            document
                .getElementById(`save-input${i}`)
                .addEventListener("focus", function () {
                    document.getElementById(`name-saver${i}`).style.opacity =
                        "1";
                    document.getElementById(`name-saver${i}`).style.zIndex =
                        "1";
                    document.getElementById(`name-saver${i}`).style.transition =
                        "0.3s";
                });
            document
                .getElementById(`save-input${i}`)
                .addEventListener("focusout", function () {
                    document.getElementById(`name-saver${i}`).style.opacity =
                        "0";
                    document.getElementById(`name-saver${i}`).style.transition =
                        "0.28s -50ms";
                    setTimeout(function () {
                        document.getElementById(`name-saver${i}`).style.zIndex =
                            "-1";
                    }, 150);
                    if (document.getElementById(`save-input${i}`).value == "") {
                        if (AimLabHScores[i].saveName != defaultEmpty) {
                            document.getElementById(`save-input${i}`).value =
                                AimLabHScores[i].saveName;
                        } else
                            document.getElementById(`save-input${i}`).value =
                                defaultEmpty;
                    }
                });
            document
                .getElementById(`name-saver${i}`)
                .addEventListener("click", function () {
                    AimLabHScores[i].saveName = document.getElementById(
                        `save-input${i}`
                    ).value;
                    localStorage.setItem(
                        "HSAimLab",
                        JSON.stringify(AimLabHScores)
                    );
                    if (rewrite)
                        localStorage.setItem(
                            "HSAimLabBackup",
                            JSON.stringify(AimLabHScores)
                        );
                });
            document
                .getElementById(`name-saver${i}`)
                .addEventListener("focusout", function () {
                    console.log("out");
                });
        }
    } catch (err) {}
}
