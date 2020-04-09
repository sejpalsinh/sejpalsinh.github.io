var id; // geting id from link
var flag_d1 = true; // flag for onlick for left side menu bar
var flag_d2 = true; // flag for onlick for left side menu bar
var flag_noti_n = true; // flag for radio button notify when noicy
var flag_noti_m = true; // flag for radio button notify when motion
var flag_mute = true;
var flag_talk = true;
var flag_rock = true;
$(function() {

  if(location.hash.length == 8)
  {
    console.log( "this util is Pi !" );
    console.log(location.hash);
    id = location.hash.substring(2);
    console.log(roomHash);
    isthispi = true;


    //=========== f_mute fuction ...
    flag_mute = false;
    $("#f_mute").removeClass("fa-volume-up");
    $("#f_mute").addClass("fa-volume-off");
    document.getElementById("remoteVideo").muted = true;
    //===============================
  }
  else {
    console.log( "this util is not Pi !" );
    console.log(location.hash);
    id = location.hash.substring(1);
    isthispi = false;
    console.log(roomHash);

  }
    console.log( "ready!" );
    checkSetDatabase();
    hideAllButtons();
    flag_d1 = true;
    flag_d2 = true;
    flag_noti_m = true;
    flag_noti_n = true;
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

function checkSetDatabase(){
  var path = "User/"+id;
  alert(path)
	var dbRef = firebase.database().ref(path);
  var startListening = function() {
     dbRef.on('value', function(snapshot) {
        var warehouse = snapshot.val();    // child id
        alert(warehouse.flag_n);
        if(isthispi == true)
        {
          if(warehouse.flag_t == 1)
          {
              //=========== f_talk fuction ... mute
              flag_talk = false;
              $("#f_talk").css("color", "green");
              //=========== f_mute fuction ... unmute
              flag_mute = true;
              $("#f_mute").removeClass("fa-volume-off");
              $("#f_mute").addClass("fa-volume-up");
              document.getElementById("remoteVideo").muted = false;
              //===============================
          }
          else {
              //=========== f_talk fuction ... unmute
              flag_talk = true;
              $("#f_talk").css("color", "#ffffff");
              //=========== f_mute fuction ... mute
              flag_mute = false;
              $("#f_mute").removeClass("fa-volume-up");
              $("#f_mute").addClass("fa-volume-off");
              document.getElementById("remoteVideo").muted = true;
              //===============================
          }
        }
        if(warehouse.flag_r == 1)
        {
          flag_rock = false;
          $("#f_rock").css("color", "blue");
        }
        else {
          flag_rock = true;
          $("#f_rock").css("color", "#ffffff");
        }
        if(warehouse.flag_n == 1)
        {

        }
        else if(warehouse.flag_n == 2)
        {

        }
        else if(warehouse.flag_n == 3)
        {

        }
        else {

        }
		align(warehouse);
	  });
 }
startListening();
}

function UpdateDbData(fild_name,fild_value)
{
   var updates = {};
   updates['/User/'+id+'/'+fild_name] =fild_value;
   firebase.database().ref().update(updates);
}

//=================================================================================================

// function for right hand side menu
function drop1() {
  if(flag_d2 == false)
  {
    return;
  }
  if(flag_d1==true)
  {
    flag_d1 = false;
    $("#drop1").removeClass("fa-chevron-up");
    $("#drop1").addClass("fa-chevron-down");
    $("#f_mute").show();
    $("#f_talk").show();
    $("#f_rock").show();
    $(".tag1").show();
    $(".tag2").show();
    $(".tag3").show();
  }
  else {
    flag_d1 = true;
    $("#drop1").removeClass("fa-chevron-down");
    $("#drop1").addClass("fa-chevron-up");
    $("#f_mute").hide();
    $("#f_talk").hide();
    $("#f_rock").hide();
    $(".tag1").hide();
    $(".tag2").hide();
    $(".tag3").hide();
  }
}


// function for left hand side menu
function drop2() {
  if(flag_d2==true)
  {
    //disable left side menu
    flag_d1 = false;
    drop1();
    flag_d2 = false;
    $("#drop2").removeClass("fa-navicon");
    $("#drop2").addClass("fa-close");
    $("#motion_n").closest("tr").show();
    $("#noice_n").closest("tr").show();
    $("#abount_us").closest("tr").show();
    $("#remoteVideo").css({"filter": "blur(15px)"});
    $("#leftbar").css({"filter": "blur(5px)"});
  }
  else {
    flag_d2 = true;
    $("#drop2").removeClass("fa-close");
    $("#drop2").addClass("fa-navicon");
    $("#motion_n").closest("tr").hide();
    $("#noice_n").closest("tr").hide();
    $("#abount_us").closest("tr").hide();
    $("#remoteVideo").css({"filter": "blur(0px)"});
    $("#leftbar").css({"filter": "blur(0px)"});
  }
}


// function for left hand side menu notify when motion detect
function motion_n() {
  if(flag_noti_m==true)
  {
    flag_noti_m = false;
    $("#motion_n").removeClass("fa-circle-o");
    $("#motion_n").addClass("fa-dot-circle-o");
    if(flag_noti_n == false)
    {
      //3  flag_n
      UpdateDbData("flag_n","3");
    }
    else {
      UpdateDbData("flag_n","1");
      //1   flag_n
    }
  }
  else {
    flag_noti_m = true;
    $("#motion_n").removeClass("fa-dot-circle-o");
    $("#motion_n").addClass("fa-circle-o");
    if(flag_noti_n == false)
    {
      UpdateDbData("flag_n","2");
    //  2   flag_n
    }
    else {
      UpdateDbData("flag_n","4");
    //  4   flag_n
    }
  }
}


// function for left hand side menu notify when noicy
function noice_n() {
  if(flag_noti_n==true)
  {
    flag_noti_n = false;
    $("#noice_n").removeClass("fa-circle-o");
    $("#noice_n").addClass("fa-dot-circle-o");
    if(flag_noti_m == false)
    {
      UpdateDbData("flag_n","3");
    //  3   flag_n
    }
    else {
      UpdateDbData("flag_n","2");
    //  2   flag_n
    }
  }
  else {
    flag_noti_n = true;
    $("#noice_n").removeClass("fa-dot-circle-o");
    $("#noice_n").addClass("fa-circle-o");
    if(flag_noti_m == false)
    {
      UpdateDbData("flag_n","1");
    //  1   flag_n
    }
    else {
      UpdateDbData("flag_n","4");
      //4   flag_n
    }
  }
}

function hideAllButtons() {
  // to hide left side icons in on load
  $("#drop1").hide();
  $("#f_mute").hide();
  $("#f_talk").hide();
  $("#f_rock").hide();
  $(".tag1").hide();
  $(".tag2").hide();
  $(".tag3").hide();

  // to hide right side icons in on load
  $("#drop2").hide();
  $("#motion_n").closest("tr").hide();
  $("#noice_n").closest("tr").hide();
  $("#abount_us").closest("tr").hide();

}

function f_mute() {
  if(flag_mute==true)
  {
    flag_mute = false;
    $("#f_mute").removeClass("fa-volume-up");
    $("#f_mute").addClass("fa-volume-off");
    document.getElementById("remoteVideo").muted = true;
  }
  else {
    flag_mute = true;
    $("#f_mute").removeClass("fa-volume-off");
    $("#f_mute").addClass("fa-volume-up");
    document.getElementById("remoteVideo").muted = false;
  }
}

function f_talk() {
  if(flag_talk==true)
  {
    flag_talk = false;
    $("#f_talk").css("color", "green");
    UpdateDbData("flag_t","1");
    //1   flag_t
  }
  else {
    flag_talk = true;
    $("#f_talk").css("color", "#ffffff");
    UpdateDbData("flag_t","0");
    //0   flag_t
  }
}

function f_rock() {
  if(flag_rock==true)
  {
    flag_rock = false;
    $("#f_rock").css("color", "blue");
    UpdateDbData("flag_r","1");
    //1   flag_r
  }
  else {
    flag_rock = true;
    $("#f_rock").css("color", "#ffffff");
    UpdateDbData("flag_r","0");
    //0   flag_r
  }
}
