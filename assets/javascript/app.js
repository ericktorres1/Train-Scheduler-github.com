var database = firebase.database();

$('#addTrain').on('click', function() {


    var trainName = $('#trainName').val().trim();
    var destination = $('#destination').val().trim();
    var firstTrain = $('#firstTrain').val().trim();
    var frequency = $('#frequency').val().trim();

    var newTrain = {
        name: trainName,
        trainDestination: destination,
        firstOne: firstTrain,
        frequencyTrain: frequency
    }

    database.ref().push(newTrain);

    $('#trainName').val("");
    $('#destination').val("");
    $('#firstTrain').val("");
    $('#frequency').val("");

    return false;
});

database.ref().on('child_added', function(childSnap) {

    var trainName = childSnap.val().name;
    var destination = childSnap.val().trainDestination;
    var firstTrain = childSnap.val().firstOne;
    var frequency = childSnap.val().frequencyTrain;

    var timeConverted = moment(firstTrain, "HH:mm");

    var timeDiff = moment().diff(moment(timeConverted), "minutes");

    var timeRemainder = timeDiff % frequency;

    var minToTrain = frequency - timeRemainder;

    var nextTrain = moment().add(minToTrain, "minutes").format("HH:mm");
    $('#trainTable>tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td></td>" + nextTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});
