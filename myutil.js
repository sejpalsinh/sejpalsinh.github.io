var id = location.hash.substring(1); // geting id from link
var flag_d1 = true; // flag for onlick for left side menu bar
var flag_d2 = true; // flag for onlick for left side menu bar
var flag_noti_n = true; // flag for radio button notify when noicy
var flag_noti_m = true; // flag for radio button notify when motion
$(function() {
    console.log( "ready!" );
    hideAllButtons();
    flag_d1 = true;
    flag_d2 = true;
    flag_noti_m = true;
    flag_noti_n = true;
});



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
  }
  else {
    flag_noti_m = true;
    $("#motion_n").removeClass("fa-dot-circle-o");
    $("#motion_n").addClass("fa-circle-o");
  }
}


// function for left hand side menu notify when noicy
function noice_n() {
  if(flag_noti_n==true)
  {
    flag_noti_n = false;
    $("#noice_n").removeClass("fa-circle-o");
    $("#noice_n").addClass("fa-dot-circle-o");
  }
  else {
    flag_noti_n = true;
    $("#noice_n").removeClass("fa-dot-circle-o");
    $("#noice_n").addClass("fa-circle-o");
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
  alert("mute");
}

function f_talk() {
  alert("talk");
}

function f_rock() {
  alert("rock");
}
