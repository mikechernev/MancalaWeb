var showLoading = function () {

};

var hideLoading = function () {
};

var createPlayer = function () {
    showLoading();
    $.ajax({
        type: "post",
        url: "/api/players",
        dataType: "json",
        success: function (player) {
            var date = new Date();
            date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000)
            document.cookie = "playerhash=" + player.id +
                ";expires=" + date.toGMTString() + ";path=/";

            //reload after user is created
            window.location = window.location;
        }
    }).always(hideLoading);
};


var newGame = function () {
    showLoading();

    $.ajax({
        type: "post",
        url: "/api/games",
        dataType: "json",
        success: function (game) {
            window.location = window.location + game.id;
        }
    }).always(hideLoading());
};

var getReverseBoardState = function (state) {
    var halfStateLength = state.length / 2;

    return state.splice(halfStateLength).concat(state.splice(0, halfStateLength));
};

var updateBoard = function (state) {
    var numberOfPits = state.length / 2;
    var id = "";
    for (var i = 0; i < state.length; i++) {
        id = i < numberOfPits ? "#own-pit-" : "#opp-pit-";
        $(id + (i % numberOfPits)).text(state[i]);
    }
};

var updateMoveInfo = function (msg) {
    $("#move-info").text(msg);
};

var checkStatus = function () {
    $.ajax({
        type: "put",
        url: "/api/games/" + window.gameId + "/addPlayer/" + window.playerHash,
        dataType: "json",
        success: function (game) {
            if (game.currentPlayer == game.playerInTurn || game.isGameOver == true) {
                updateGame(game);
            } else {
                setTimeout(checkStatus, 2000);
            }
        }
    });
};

var makeMove = function(pit) {
    showLoading();

    if (window.playerStatus == "guest") {
        pit += 7;
    }

    $.ajax({
        type: "post",
        url: "/api/games/" + window.gameId + "/move/" + pit,
        data: {playerId: window.playerHash},
        dataType: "json",
        success: function (game) {
            updateGame(game);
        }
    }).always(hideLoading);
};

var endGame = function (game) {
    if (game.winner == null) {
        updateMoveInfo("Game over! It's a tie :|")

        return;
    }

    if (game.winner == game.currentPlayer) {
        updateMoveInfo("Game over! You win :)")

        return;
    }

    updateMoveInfo("Game over! You lose :(")
};

var updateGame = function (game) {
    window.game = game;
    window.playerStatus = game.currentPlayer;
    // TODO change to the string from the settings
    if (window.playerStatus == "guest") {
        game.board.state = getReverseBoardState(game.board.state);
    }

    updateBoard(game.board.state);

    if (game.isGameOver == true) {
        endGame(game);
        return;
    }

    if (game.currentPlayer == game.playerInTurn) {
        updateMoveInfo("It's your turn!");
        window.yourMove = true;
        return;
    }

    updateMoveInfo("Waiting for opponent!");
    checkStatus();
};

var joinGame = function () {
    showLoading();

    $.ajax({
        type: "put",
        url: "/api/games/" + window.gameId + "/addPlayer/" + window.playerHash,
        dataType: "json",
        success: function (game) {
            if (game == null) {
                window.location = "/";
            }
            updateGame(game);
        }
    }).always(hideLoading());
}

$(function () {
    if (window.playerHash === "") {
        createPlayer();
        return;
    }

    if (typeof window.gameId !== "undefined" && window.gameId !== "") {
        joinGame();
    }

    $("#new-game").click(function () {
        newGame();
        return false;
    });

    $(".own-pit").not("#own-pit-6").click(function () {
        if (!window.yourMove || $(this).text() == 0) {
            return false;
        }

        makeMove($(this).index());
    });
});

window.yourMove = false;

