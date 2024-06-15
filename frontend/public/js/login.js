//selecting inputs
const inputEmailSignup = document.getElementById("email_signup");
const inputEmailLogin = document.getElementById("email_login");

const inputPasswordSignup = document.getElementById("password_signup");
const inputPasswordLogin = document.getElementById("password_login");

const inputConfirmSignup = document.getElementById("confirm_signup");

//declaring authentication functions

function verifyEmail(event, type) {
  const input = event.target;
  const inputValue = input.value.trim();
  const errMsg = document.getElementById("err_email_" + type);

  if (!inputValue.includes("@")) {
    errMsg.classList.remove("err__hidden");
    input.classList.add("input__err");
    return;
  }

  if (!errMsg.classList.contains("err__hidden")) {
    errMsg.classList.add("err__hidden");
    input.classList.remove("input__err");
  }
}

function verifyPassword(event, type) {
  const input = event.target;
  const confirmInput = document.getElementById("confirm_" + type);
  const inputValue = input.value.trim();
  const errMsg = document.getElementById("err_password_" + type);

  if (inputValue.length < 6) {
    input.classList.add("input__err");
    errMsg.classList.remove("err__hidden");
    errMsg.innerText = "Password must be at least 6 digits";
    return;
  }

  if (type == "signup") {
    if (confirmInput.value.length && confirmInput.value.trim() !== inputValue) {
      input.classList.add("input__err");
      errMsg.classList.remove("err__hidden");
      errMsg.innerText = "Passwords must match";
      return;
    }

    if (confirmInput.value.length && confirmInput.value.trim() == inputValue) {
      const errMsgConfirm = document.getElementById("err_confirm_" + type);
      if (!errMsgConfirm.classList.contains("err__hidden")) {
        errMsgConfirm.classList.add("err__hidden");
        confirmInput.classList.remove("input__err");
      }
    }
  }

  if (!errMsg.classList.contains("err__hidden")) {
    errMsg.classList.add("err__hidden");
    input.classList.remove("input__err");
  }
}

function verifyConfirm(event, type) {
  const input = event.target;
  const passwordInput = document.getElementById("password_" + type);
  const inputValue = input.value.trim();
  const errMsg = document.getElementById("err_confirm_" + type);

  if (inputValue !== passwordInput.value.trim()) {
    input.classList.add("input__err");
    errMsg.classList.remove("err__hidden");
    errMsg.innerText = "Passwords must match.";
    return;
  }

  if (inputValue.length < 6) {
    input.classList.add("input__err");
    errMsg.classList.remove("err__hidden");
    errMsg.innerText = "Password must be at least 6 digits";
    return;
  }

  if (passwordInput.value.length && passwordInput.value.trim() == inputValue) {
    const errMsgConfirm = document.getElementById("err_password_" + type);
    if (!errMsgConfirm.classList.contains("err__hidden")) {
      errMsgConfirm.classList.add("err__hidden");
      passwordInput.classList.remove("input__err");
    }
  }

  if (!errMsg.classList.contains("err__hidden")) {
    errMsg.classList.add("err__hidden");
    input.classList.remove("input__err");
  }
}

//binding to the blur event
inputEmailSignup.addEventListener("blur", (event) =>
  verifyEmail(event, "signup")
);
inputEmailLogin.addEventListener("blur", (event) =>
  verifyEmail(event, "login")
);

inputPasswordSignup.addEventListener("blur", (event) =>
  verifyPassword(event, "signup")
);
inputPasswordLogin.addEventListener("blur", (event) =>
  verifyPassword(event, "login")
);

inputConfirmSignup.addEventListener("blur", (event) =>
  verifyConfirm(event, "signup")
);
