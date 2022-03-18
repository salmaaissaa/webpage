import { getAuth,signInWithEmailAndPassword,onAuthStateChanged,createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';
import { getDatabase ,ref, set,push} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js';


const firebaseConfig = {
    apiKey: "AIzaSyCv3eJS4mGYxNOb3hyF6tqvAQe2RNbhOTA",
    authDomain: "dbp1-efaac.firebaseapp.com",
    databaseURL: "https://dbp1-efaac-default-rtdb.firebaseio.com",
    projectId: "dbp1-efaac",
    storageBucket: "dbp1-efaac.appspot.com",
    messagingSenderId: "951758113037",
    appId: "1:951758113037:web:842e2660e124558a7a8844"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

var signIn = document.querySelector('#sign-in');
signIn && signIn.addEventListener('click', function(e) {
    e.preventDefault();
    var userEmail = document.getElementById("userSIEmail").value;
    var userPassword = document.getElementById("userSIPassword").value;
   
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        

        Swal.fire({
          title: 'Sign in completed',
          text: "Thank you for using our system",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Great'
        }).then((result) => {
          if (result.isConfirmed) {
            document.location.href = '/pages/home.html'
          }
        })


      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
            title: 'Error',
            text:  error.code,
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Great'
          })
      });
      
  
  });



var signUp = document.querySelector('#sign-up');
signUp && signUp.addEventListener('click', function(e) {
    e.preventDefault();
    var userFullName = document.getElementById("userFullName").value;
    var userSurname = document.getElementById("userSurname").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    createUserWithEmailAndPassword(auth,userEmail, userPassword).then((userCredential) => {
        // var user = firebase.auth().currentUser;
        const user = userCredential.user;

        var uid;
        if (user != null) {
            uid = user.uid;
        }
        var userData = {
            userFullName: userFullName,
            userSurname: userSurname,
            userEmail: userEmail,
            
        }

        const database = getDatabase();

        push(ref(database, '/Users/' ),userData);
       

        Swal.fire({
            title: 'Sign Up completed',
            text: "Thank you for using our system",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Great'
          }).then((result) => {
            if (result.isConfirmed) {
              document.location.href = '/pages/home.html'
            }
          })


       
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("er "+errorMessage)
       
        Swal.fire({
            title: 'Error',
            text:  error.code,
            icon: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Great'
          })
          
    });
  



});;

//document.querySelector('#sign-up').addEventListener