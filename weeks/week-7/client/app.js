const error = (e) => console.log(e.target.responseText);

function teacherCreated() {
  alert('Teacher created');
}

/**
 * Function that calls the API function to store a new teacher
 */
function saveTeacher() {
  const ajaxRequest = new XMLHttpRequest();
  token = sessionStorage.getItem('token');
  ajaxRequest.addEventListener("load", teacherCreated);
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("POST", "http://localhost:3001/api/teachers");
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.setRequestHeader("Authorization", `Bearer ${token}`);

  const data = {
    'first_name': document.getElementById('first_name').value,
    'last_name' : document.getElementById('last_name').value,
    'cedula': document.getElementById('cedula').value,
    'age': document.getElementById('age').value,
  };
  ajaxRequest.send(JSON.stringify(data));
}


/**
 * Executes the authentication API
 */
function login() {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", function(response){
    //
    const responseData = JSON.parse(response.target.responseText)
    sessionStorage.setItem('token', responseData.session.token);
    document.location.href = 'add_teacher.html';
  });
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("POST", "http://localhost:3001/api/session");
  ajaxRequest.setRequestHeader("Content-Type", "application/json");

  const data = {
    'username': document.getElementById('username').value,
    'password': document.getElementById('password').value
  };
  ajaxRequest.send(JSON.stringify(data));
}