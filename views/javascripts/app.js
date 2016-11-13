var getScore = function(){

    'use strict';

    $("#scoreDisplayId").show();
    var url = "score";
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/" + url,
        crossDomain: true,
        dataType: "json"
    }).done(function(msg) {
        if (msg.answer === false) {
            msg.answer = "false";
        }
        console.log(msg);
        $("#rightId").val(msg.right);
        $("#wrongId").val(msg.wrong);
    });
};

var postQuestion = function(){

    'use strict';

    var url = "question";
    var question = $("#questionId").val();
    var answer = $("#answerId").val();
    var data = {
        "question": question,
        "answer": answer
    };
    var dataJSON = JSON.stringify(data);
    console.log(dataJSON);
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/" + url,
        crossDomain: true,
        dataType: "json",
        data: data
    }).done(function(msg) {
        if (msg.answer === false) {
            msg.answer = "false";
        }
        $("#displayQueId").show();
        $("#addQueBtnId").show();
        $("#addQueDivId").hide();
        $("#userNameId").hide();
        var displayQuestions = function(element, index, array) {
            var len = array.length;
            console.log(len);
            if (index == array.length - 1) {
                var $item = $('<div id="allQueId" class="btn">' + '<div class="ui label" style="margin-top:60px">Question </div><textarea class="ui label" style="height:50px; width:300px;" id="queId' + index + '"></textarea><br>' + '<div class="ui label">Answer </div><textarea class="ui label" style="height:50px; width:300px;" id="queId' + index + '"></textarea><br>' + '<input class="ui label" type="button" value="Send" id="sendBtnId' + index + '"><br></div>');
                $("#displayQueId").append($item);
                $("#queId" + index).val(array[index].question);
            }
        };
        msg.forEach(displayQuestions);
    });
};

var playGame = function(){

    'use strict';

    var url = "question";
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/" + url,
        crossDomain: true,
        dataType: "json",
    }).done(function(msg) {
        if (msg.answer === false) {
            msg.answer = "false";
        }
        $("#allQueId").show();
        $("#scoreBtnId").show();
        $("#addQueBtnId").show();
        $("#addQueDivId").hide();
        $("#playBtnId").hide();
        $("#imgId").hide();
        $('#userNameId').hide();
       // $("div .scoreButton").show();
        var displayQuestions = function(element, index, array) {
            if(index == randomQue){
                var $item = $('<div id="allQueId" class="btn">' + '<div class="ui label" style="margin-top:60px">Question </div><textarea class="ui label" style="height:50px; width:300px;" id="queId' + index + '"></textarea><br>' + '<div class="ui label">Answer </div><textarea class="ui label" style="height:50px; width:300px;" id="ansId' + index + '"></textarea><br>' + '<input class="ui label" type="button" value="Send" id="sendBtnId' + index + '"><br></div>');
            $("#displayQueId").append($item);
            $("#queId" + index).val(array[index].question);
            }
        };
        //var msgArr = new Array(msg);
        console.log(msg.length);
        var randomQue = Math.floor(Math.random() * msg.length);
        console.log(randomQue);
        msg.forEach(displayQuestions);
        var getAnswers = function(element, index, array) {
            $("#sendBtnId" + index).click(function() {
                var ans = $("#ansId" + index).val();
                $("#ansId" + index).val('');
                var ansId = array[index]._id;
                var actualAns = array[index].answer;
                var url = "answer";
                var data = {
                    "answerId": ansId,
                    "possibleAns": ans,
                    "answer": actualAns
                };
                var dataJSON = JSON.stringify(data);
                $.ajax({
                    method: "POST",
                    url: "http://localhost:3000/" + url,
                    crossDomain: true,
                    dataType: "json",
                    data: data
                }).done(function(msg) {
                    if (msg.answer === false) {
                        msg.answer = "false";
                    }
                });
            });
        };
        msg.forEach(getAnswers);
    });
};

var main = function(){
    'use strict';

    console.log("At client side");
    $('#scoreDivId').hide();

    $("#playBtnId").on('click', function(){
        console.log("Playing game...");
        $('#scoreDivId').show();
        playGame();
    });

    $("#addQueBtnId").on('click', function() {
        $("#addQueDivId").show();
        $("#displayQueId").hide();
        $("#addQueBtnId").hide();
        $("#playBtnId").hide();
        $("#userNameId").hide();
    });

    $("#scoreBtnId").on('click' ,function(){
        getScore();
    });

    $("#submitBtnId").on('click' ,function(){
        postQuestion();
    });
};

$(document).ready(main);