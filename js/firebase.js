console.log("js/firebase.js : Remember to replace the instructor's firebase keys with yours!")

// TODO: Replace the following with your app's Firebase project configuration
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAkC_OtCRnTaD0Q4wOXCHa9lrE7FaxxpLo",
    authDomain: "new-noteapp.firebaseapp.com",
    databaseURL: "https://new-noteapp-default-rtdb.firebaseio.com",
    projectId: "new-noteapp",
    storageBucket: "new-noteapp.appspot.com",
    messagingSenderId: "232960000805",
    appId: "1:232960000805:web:e99fd62dbbc98586ef50cc"
  };
// END TODO

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
