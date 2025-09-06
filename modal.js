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
        let form = document.getElementsByTagName('form')[0];
        let data = new FormData(form);
        data.append("action", buttonType);
        await fetch("index.php", {
          method: "POST",
          body: data,
        }).then((response) => {
          if (response.status == 200 && response.statusText == "OK"){
            document.body.innerHTML = response.body;
          }
        });
      });
    });
  }
});
