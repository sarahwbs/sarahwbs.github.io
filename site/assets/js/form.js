window.addEventListener("load", function () {
  // Checks validation of the form
  const forms = document.querySelectorAll("form");

  if (forms && forms.length) {
    function toggleErrorState(element, errorState) {
      if (errorState) {
        element
          .closest(".form__input")
          .querySelector(".form__error")
          .classList.remove("d-none");
        element.classList.add("form__error-border");
      } else {
        element
          .closest(".form__input")
          .querySelector(".form__error")
          .classList.add("d-none");
        element.classList.remove("form__error-border");
      }

      return errorState;
    }

    function validateFields(e) {
      e.preventDefault();

      let errors = false;

      // Email Validation
      const emailInput = e.srcElement.querySelector('input[type="email"]');
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailInput && !emailRegex.test(emailInput.value.toLowerCase())) {
        errors = toggleErrorState(emailInput, true);
      } else if (emailInput) {
        toggleErrorState(emailInput, false);
      }

      // Password Validation (Mock)
      const passwordInput = e.srcElement.querySelector(
        'input[id="confirmPassword"]'
      );
      if (passwordInput && passwordInput.value !== "test") {
        errors = toggleErrorState(passwordInput, true);
      } else if (passwordInput) {
        toggleErrorState(passwordInput, false);
      }

      // New Password Strength Validation
      const newPasswordInput = e.srcElement.querySelector(
        'input[id="newPassword"]'
      );
      const passwordRegex = /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/g;
      if (newPasswordInput && !passwordRegex.test(newPasswordInput.value)) {
        errors = toggleErrorState(newPasswordInput, true);
      } else if (newPasswordInput) {
        toggleErrorState(newPasswordInput, false);
      }

      // New Password & Confirm Password Validation
      const confirmNewPasswordInput = e.srcElement.querySelector(
        'input[id="confirmNewPassword"]'
      );

      if (
        newPasswordInput &&
        confirmNewPasswordInput &&
        newPasswordInput.value !== confirmNewPasswordInput.value
      ) {
        errors = toggleErrorState(confirmNewPasswordInput, true);
      } else if (newPasswordInput && confirmNewPasswordInput) {
        toggleErrorState(confirmNewPasswordInput, false);
      }

      // Submit the form if there are no errors
      if (!errors) {
        e.target.submit();
      }
    }

    forms.forEach((form) => {
      form.addEventListener("submit", validateFields);
    });
  }

  // Show/hide toggle for password fields
  const passwordToggleInputs = document.querySelectorAll(
    '.form__input input[data-password-toggle="true"]'
  );

  if (passwordToggleInputs && passwordToggleInputs.length) {
    passwordToggleInputs.forEach((passwordInput) => {
      const toggleButton = passwordInput.parentNode.querySelector(
        ".form__input-password-toggle"
      );

      function togglePasswordVisibility() {
        if (passwordInput.getAttribute("type") === "text") {
          passwordInput.setAttribute("type", "password");
          toggleButton.innerText = "Show";
        } else {
          passwordInput.setAttribute("type", "text");
          toggleButton.innerText = "Hide";
        }
      }

      toggleButton.addEventListener("click", togglePasswordVisibility);
    });
  }

  // New Password Strength Validation
  const newPasswordInput = document.querySelector('input[id="newPassword"]');
  const passwordStrengthElement = document.querySelector(
    ".form__password-strength"
  );
  if (newPasswordInput && passwordStrengthElement) {
    // Removes all of the password strength visuals
    function resetPasswordLevels() {
      passwordStrengthElement.classList.remove(
        "level-1",
        "level-2",
        "level-3",
        "level-4"
      );
    }

    // Update the password strength visual element based on checks
    // (Min: 8 Chars, 1 lowercase, 1 uppercase, 1 number | Medium: min + 12 chars | Strong: min + 14 chars & symbols)
    function updatePasswordStrength(e) {
      const minStrengthRegex = /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/g;
      const mediumStrengthRegex = /^(?=.{12,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/g;
      const strongStrengthRegex = /^(?=.{14,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$/g;

      if (strongStrengthRegex.test(e.target.value)) {
        resetPasswordLevels();
        passwordStrengthElement.classList.add("level-4");
        passwordStrengthElement.querySelector(".body-copy").innerText =
          "Password Strength: Strong";
      } else if (mediumStrengthRegex.test(e.target.value)) {
        resetPasswordLevels();
        passwordStrengthElement.classList.add("level-3");
        passwordStrengthElement.querySelector(".body-copy").innerText =
          "Password Strength: Medium";
      } else if (minStrengthRegex.test(e.target.value)) {
        resetPasswordLevels();
        passwordStrengthElement.classList.add("level-2");
        passwordStrengthElement.querySelector(".body-copy").innerText =
          "Password Strength: Satisfactory";
      } else {
        resetPasswordLevels();
        passwordStrengthElement.classList.add("level-1");
        passwordStrengthElement.querySelector(".body-copy").innerText =
          "Password Strength: Weak";
      }
    }

    newPasswordInput.addEventListener("input", updatePasswordStrength);
  }
});
