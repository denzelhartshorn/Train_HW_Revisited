
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

    var trainName =$("#trainNameinput").val()
    var trainDestination =$("#trainDestination").val()
    var trainTime =$("#trainTime").val()
    var trainFrequency =$("#trainFrequency").val()

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

    var trainName =snap.val().trainName
    var trainDestination =snap.val().trainDestination
    var trainTime = snap.val().trainTime
    var trainFrequency = snap.val().trainFrequency

   // name / destination / frequency / next train / minutes away ohhhhhhh


   // current time - first time minutes / frequence y remaing 

    var trainFrequency = snap.val().trainFrequency
    $("#outputTable > tbody").append(`<tr><td scope="col">${trainName}</td><td scope="col">${trainDestination}</td><td scope="col">${trainTime}</><td scope="col">${trainFrequency}</td></tr>`) 
       // send me a screen shot of what the data structure in firebase looks like
       //sent
})