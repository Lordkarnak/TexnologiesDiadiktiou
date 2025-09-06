document.addEventListener("DOMContentLoaded", () => {
  const authBtns = document.querySelectorAll(".auth-button-modal");
  const closeBtns = document.querySelectorAll(".modal .close");
  const rememberMeButton = document.getElementById('remember-me');
  const submitButtons = document.querySelectorAll(".modal .auth-button");
  let isSubmitting = false;
  let modal;
  let buttonType;

  Array.prototype.forEach.call(authBtns, function(button) {
    button.addEventListener("click", () => {
      buttonType = button.getAttribute('data-type');
      if (buttonType == 'login') {
        modal = document.getElementById('loginModal');
      } else if (buttonType == 'register') {
        modal = document.getElementById('registerModal');
      }
      modal.style.display = "flex";
    });
  });

  closeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
          btn.closest(".modal").style.display = "none";
      });
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

  if (submitButtons !== undefined) {
    Array.prototype.forEach.call(submitButtons, function(button) {
      button.addEventListener('click', async () => {
        isSubmitting = true;
        let form = document.getElementById(buttonType + 'Form');
        let data = new FormData(form);
        data.append("action", buttonType);
        await fetch("index.php", {
          method: "POST",
          body: data,
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Κάτι πήγε στραβά!');
          }
          return response.json();
        })
        .then(function(data) {
            if (data != '') {
              console.log(data);
              // window.location.href = data;
            }
        })
        .catch(function(error) {
          let messageBox = form.querySelector('.error-messagebox');
            if (messageBox !== undefined) {
              messageBox.innerHTML = error;
            }
        })
        
        // .then((response) => {
        //   data = response.json();
        //   if (response.status == 200 && response.statusText == "OK"){
        //     // if (response.text != '') {
        //     //   window.location.href = response.text;
        //     // }
        //   } else {
        //     
        //   }
        //   console.log(data);
        // });

      });
    });
  }
});
