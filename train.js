
console.log("loaded my javascript")
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDfRPRNALlEj-JJ3N4cBIXfruM-rk7p0II",
    authDomain: "denzels-uniquer-train-homework.firebaseapp.com",
    databaseURL: "https://denzels-uniquer-train-homework.firebaseio.com",
    projectId: "denzels-uniquer-train-homework",
    storageBucket: "denzels-uniquer-train-homework.appspot.com",
    messagingSenderId: "632166084520",
    appId: "1:632166084520:web:9b63f4c370593d33"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.database();

// submit button
$("#submitbutton").on("click", function(event){
    event.preventDefault()

    var trainName =$("#trainNameinput").val().trim()
    var trainDestination =$("#trainDestination").val().trim()
    var trainTime =$("#trainTime").val().trim()
    var trainFrequency =$("#trainFrequency").val().trim()

    console.log(trainName, trainDestination, trainTime, trainFrequency)
    // crreate an obejcto with all the info

    var newTrain = {
        trainName: trainName,
        trainDestination: trainDestination,
        trainTime: trainTime,
        trainFrequency: trainFrequency
    }
    
    console.log(newTrain)
    db.ref().push(newTrain)

    $('#trainNameinput').val('')
    $('#trainDestination').val('')
    $('#trainTime').val('')
    $('#trainFrequency').val('')
})  

// delete button
$("#deletebutton").on("click", function(){
    reference = db.ref('/')
    reference.once('value', function(data){
        console.log(data)    
    })
})



// kit says t’s db.ref().once()



// read the db / calculate next train and mininutes way / build the table with jquery


db.ref().on("child_added", function(snap){
    var trainName = snap.val().trainName
    var trainDestination = snap.val().trainDestination
    var trainTime = snap.val().trainTime
    var trainFrequency = snap.val().trainFrequency

   // name / destination / frequency / next train / minutes away ohhhhhhh
    var timeArray = trainTime.split(":")
    var firstTrain = moment().hours(timeArray[0]).minutes(timeArray[1])
    var max = moment.max(moment(), firstTrain)

    var timeandminutes 
    var timeArrival 
    if(max === firstTrain){
        timeArrival = firstTrain.format("hh:mm A")
        timeandminutes = firstTrain.diff(moment(), "minutes")
    } else {
        var timeDifference = moment().diff(firstTrain, "minutes")
        var timeRemaining = timeDifference % trainFrequency

        timeandminutes = trainFrequency - timeRemaining
        timeArrival = moment().add(timeandminutes, "m").format('hh:mm A')
    }


   // current time - first time minutes / frequence y remaing 

    var trainFrequency = snap.val().trainFrequency
    $("#outputTable > tbody").append(`<tr><td scope="col">${trainName}</td><td scope="col">${trainDestination}</td><td scope="col">${trainTime}</><td scope="col">${trainFrequency}</td><td scope="col">${timeArrival}</td><td scope="col">${timeandminutes}</td></tr>`) 
       // send me a screen shot of what the data structure in firebase looks like
       //sent
})