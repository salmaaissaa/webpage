import { getDatabase ,ref, onValue} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

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

const db = getDatabase();

var table = document.getElementById("studentsTable");


const studentsRef = ref(db, 'Students/' );
onValue(studentsRef, (snapshot) => {
  const data = snapshot.val();
  snapshot.forEach(function (childSnapshot) {//loop in all retrived data 

    var student = childSnapshot.val(); //retirved data
    console.log(student)
    var row = table.insertRow();

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);


    // // Add some text to the new cells:
    cell1.innerHTML = student.ID;
    cell2.innerHTML = student.Name;
    cell3.innerHTML = student.Router;
    cell4.innerHTML = student.Register;
    cell5.innerHTML = student.Phone;

    // $('#studentsTable').dataTable().fnAddData( [student.ID ] );
    // $('#studentsTable').dataTable().fnAddData( [student.Name]);
    // $('#studentsTable').dataTable().fnAddData( [student.Router]);
    // $('#studentsTable').dataTable().fnAddData( [student.Register]);
    // $('#studentsTable').dataTable().fnAddData( [student.Phone]);



    });
});



