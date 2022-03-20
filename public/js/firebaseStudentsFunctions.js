import { getDatabase , onValue,child, push,set,get, ref ,orderByChild,equalTo,query} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js';

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

const dbRef = ref(getDatabase());
get(child(dbRef, `Students`)).then((snapshot) => {

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
    var cell6 = row.insertCell(5);




    // // Add some text to the new cells:
    cell1.innerHTML = student.ID;
    cell2.innerHTML = student.Name;
    cell3.innerHTML = student.Route;
    cell4.innerHTML = student.Register;
    cell5.innerHTML = student.Phone;

    cell6.innerHTML =`<a onclick=deleteStudent(${student.ID},${row.rowIndex})><i style="color:red" class="fas fa-trash-alt "></i></a> `;



    });
   
});




async function deleteStudent(id,rowIndex){

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
            const db = getDatabase();

            const dbRef = ref(db, "/Students");

            const queryConstraints = [orderByChild("ID"), equalTo(id)];

            const student = await get(query(dbRef, ...queryConstraints));

            if (student.exists()) {
                console.log("found by name", student.val());
                for ( var property in student.val() ) {
                    set(ref(db, 'Students/' + property), null);
                    
                }
                document.getElementById("studentsTable").deleteRow(rowIndex);

                

            } else {
                student.log("No data available");
            return null;
            }


          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

        }
      })
      


   
    
    
    



}

window.deleteStudent = deleteStudent; // make function accessible

var addStudent= document.querySelector('#add-student');
addStudent&& addStudent.addEventListener('click', function(e) {
  e.preventDefault();
  var studentId = document.getElementById("student-id").value;
  var studentName = document.getElementById("student-name").value;
  var studentPhone = document.getElementById("student-phone").value;
  var studentRegister = document.getElementById("student-register").value;
  var studentRoute = document.getElementById("student-route").value;

  if(!studentId || !studentName || !studentPhone || !studentRegister || !studentRoute){
    
    Swal.fire(
      'Error',
      'Please make sure to fill all the fields',
      'error'
    )
  }
  else{


  var student ={
    ID:studentId,
    Name:studentName,
    Phone:studentPhone,
    Register:studentRegister,
    Route:studentRoute
  }



  const database = getDatabase();

  push(ref(database, '/Students/' ),student);
  console.log(student)
  $('#studentModal').modal('hide');
  
  Swal.fire(
    'Success',
    'Student added successfully',
    'success'
  )
  var table = document.getElementById("studentsTable");
  var row = table.insertRow();
  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);




  // // Add some text to the new cells:
  cell1.innerHTML = studentId;
  cell2.innerHTML = studentName;
  cell3.innerHTML = studentRoute;
  cell4.innerHTML = studentRegister;
  cell5.innerHTML = studentPhone;

  cell6.innerHTML =`<a onclick=deleteStudent(${student.ID},${row.rowIndex})><i style="color:red" class="fas fa-trash-alt "></i></a> `;


  }

});
