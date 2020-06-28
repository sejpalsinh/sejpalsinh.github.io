var id; 
$(function() {
  id = location.hash.substring(1,7);
  console.log(id);
  console.log( "ready!" );
  document.getElementById("remoteVideo").muted = true;
  checkSetDatabase();
});

//==================================== firebase functions =================================================

var firebaseConfig = {
  apiKey: "AIzaSyA3KOd6r7UboAp0fvtnvJSU9umfOXXgNDQ",
  authDomain: "apricotdata.firebaseapp.com",
  databaseURL: "https://apricotdata.firebaseio.com",
  projectId: "apricotdata",
  storageBucket: "apricotdata.appspot.com",
  messagingSenderId: "894906563277",
  appId: "1:894906563277:web:78cfcf05cfe971b2ca0784",
  measurementId: "G-WV774BB6JJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


//==== if rock is on make rock highlight 
function checkSetDatabase(){
  var path = "User/"+id;
	var dbRef = firebase.database().ref(path);
  var startListening = function() {
     dbRef.on('value', function(snapshot) {
        var warehouse = snapshot.val();
        if(warehouse.noty == 4)
        {
          document.getElementById("remoteVideo").muted = false;
          console.log( "unmuted unmuted" );
        }
        else
        {
          document.getElementById("remoteVideo").muted = true;
          console.log( "muted muted" );
        }
		align(warehouse);
	  });
 }
startListening();
}

//====== write flags to firebase
function UpdateDbData(fild_name,fild_value)
{
   var updates = {};
   updates['/User/'+id+'/'+fild_name] =fild_value;
   firebase.database().ref().update(updates);
}