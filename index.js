$(document).ready(function () {


    if (localStorage.getItem('loginStatus') == "true") {
  
      location.assign("./orders.html")
    }
  
  
    let UserName = document.getElementById("username");
    let Password = document.getElementById("password")
  
  
  
//   btn-submit
    $("#SubmitBtn").click((e) => {
      e.preventDefault();
  
      if ((UserName.value != "" && Password.value != "") && (UserName.value === Password.value)) {
  
        $.ajax({
          type: "POST",
          url: "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login",
          data: {
            username: UserName.value, password: Password.value
          },
          success: function (response) {
            if (response) {
              localStorage.setItem('loginStatus', true);
              alert("Login successful");
              location.assign("./orders.html")
            }
  
          }
  
        })
      }
      else {
  
        alert("Invalid Username and Password")
        UserName.value = ""
        Password.value = ""
      }
  
  
    })
  
  
  
  
  
  
  
  });
