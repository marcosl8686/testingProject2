$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var addressInput= $("#address-input");
  var phoneInput = $("#phone-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      address: addressInput.val().trim(),
      phone: phoneInput.val().trim(),
      authorized: false
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.address, userData.phone, userData.authorized);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, address, phone, authorized) {
    $.post("/api/signup", {
      email: email,
      password: password,
      address: address,
      phone: phone,
      authorized: authorized
    }).then(function(data) {
      if (data.duplicateUser) {
        alert("Sorry, that username has been taken");
      } else {
        window.location.replace(data);
      }
    }).catch(function(err) {
      console.log(err);
    });
  }

});
