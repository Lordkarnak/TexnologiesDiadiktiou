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
      let form = modal.querySelector('form');
      let messageBox = form.querySelector('.error-messagebox');
      if (messageBox) messageBox.innerHTML = "&nbsp;";
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
        let messageBox = form.querySelector('.error-messagebox');
        if (messageBox) {
        messageBox.innerHTML = "&nbsp;";
        }
        let data = new FormData(form);
        data.append("action", buttonType);
        await fetch("index.php", {
          method: "POST",
          body: data,
        })
        .then(async response => {
          let result = await response.json();
          if (!response.ok) {
            throw new Error(result.error || "Κάτι πήγε στραβά!");
          }
          return result;
        })
        .then(function(data) {
            if (data.redirect) {
              window.location.href = data.redirect;
            } else if (data.closeModal) {
              form.reset();
              form.closest(".modal").style.display = "none";
            }
        })
        .catch(function(error) {
          let messageBox = form.querySelector('.error-messagebox');
          if (messageBox) {
            messageBox.innerHTML = error.message; // now shows "username is mandatory."
          }
        });


      });
    });
  }
});
