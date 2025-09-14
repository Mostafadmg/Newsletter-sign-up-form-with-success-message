// Get DOM elements
const signupForm = document.getElementById("signup-form");
const btn = document.getElementById("btn");
const emailInput = document.getElementById("email");
const form = document.getElementById("form");
const thanksCard = document.querySelector(".thanks-card");
const thanksContent = document.querySelector(".thanks-content");
const invalidEmailMsg = document.querySelector(".invalid-email");
const dismissBtn = document.querySelector(".dismiss-btn");
const successDiv = document.querySelector(".success-div");
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Function to validate email
const isInvalidEmail = (email) => {
  return emailRegex.test(email.trim());
};

/* Has all the error stylings */
function showError() {
  /* will focus on the input if nothing entered */
  /* emailInput.focus(); */
  emailInput.classList.add("error-input");
  invalidEmailMsg.classList.remove("hidden");
  invalidEmailMsg.style.animation = "shake 0.5s ease-in-out";
  emailInput.style.animation = "shake 0.5s ease-in-out";
  setTimeout(() => {
    emailInput.style.animation = "";
    invalidEmailMsg.style.animation = "";
  }, 500);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  // Validate email is not empty
  if (email === "") {
    showError();
    emailInput.focus();
    return;
  }

  // Validate email format
  if (!isInvalidEmail(email)) {
    showError();
    emailInput.focus();
    return;
  }

  // Hide any existing errors when we entered the correct email, so before it closes the form, all errors disappear
  hideError();
  //button becomes disabled so cannot be clicked
  btn.disabled = true;
  // the button text changes to subscribing
  btn.textContent = "Subscribing...";
  //button will become dimmer
  btn.style.opacity = "0.7";

  // Simulate processing time - give it a delay, this code runs after one second. so subscribing and dimm button last only 1 seconds
  setTimeout(() => {
    // Reset button (though it will be hidden)
    btn.disabled = false;
    btn.textContent = "Subscribe to monthly newsletter";
    btn.style.opacity = "1";

    // Show success screen
    showSuccess(email);
  }, 1000);
});

function hideError() {
  emailInput.classList.remove("error-input");
  invalidEmailMsg.style.display = "none";
}
// Function to show success screen
function showSuccess(email) {
  /* the form disappears */
  signupForm.style.display = "none";
  /* we need to make the sucess div appear here */
  confetti({
    particleCount: 150,
    spread: 140,
    origin: { y: 0.6 },
  });
  successDiv.innerHTML += `
  <div class="thanks-card">
    <div class="thanks-content">
    <img src="./assets/images/icon-success.svg" alt="" class="success-icon" />
        <h1 class="success-title">Thanks for subscribing!</h1>
        <p class="success-message">A confirmation email has been sent to <strong>${email}</strong>. Please open it and click the button inside to confirm your subscription.</p>
        <button class="dismiss-btn">Dismiss message</button>
        </div>
        </div>
    `;

  const dismissBtn = document.querySelector(".dismiss-btn");
  dismissBtn.addEventListener("click", () => {
    successDiv.innerHTML = "";
    signupForm.style.display = "flex"; // show form again if you want
  });
}
