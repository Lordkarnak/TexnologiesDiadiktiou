document.addEventListener("DOMContentLoaded", () => {
  let openBtns = document.getElementsByClassName("auth-button-modal");
  const closeBtn = document.querySelector(".modal .close");
  const rememberMeButton = document.getElementById('remember-me');
  const submitButton = document.getElementsByName('auth-button-submit')[0];
  let isSubmitting = false;
  let modal;
  let buttonType;

  Array.prototype.forEach.call(openBtns, function(button) {
    button.addEventListener("click", () => {
      buttonType = button.getAttribute('data-type');
      if (buttonType == 'login') {
        modal = document.getElementById('loginModal');
      } else if (buttonType == 'signup') {
        modal = document.getElementById('signupModal');
      }
      modal.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  if (rememberMeButton !== undefined) {
    rememberMeButton.addEventListener('click', function() {
      if (this.checked) {
        this.value = 1;
      } else {
        this.value = 0;
      }
    });
  }

  if (submitButton !== undefined) {
    submitButton.addEventListener('click', function(event) {
      event.preventDefault();
      isSubmitting = true;
      postData('/index.php', buttonType);
    });
  }

  function postData(url, buttonType)
  {
    let inputs = document.getElementsByTagName('input');
    let inputObj = [{action: buttonType}];
    Array.prototype.forEach.call(inputs, function(element) {
      inputObj.push({
        key: element.getAttribute('name'),
        value: element.value
      });
    })
    const postBody = JSON.stringify(inputObj);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            this.responseText;
       }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(postBody);
  }
});
