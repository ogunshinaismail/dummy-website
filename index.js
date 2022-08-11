let apiBaseUrl = "http://localhost:5000"; // change this to local sever url

//sets the api url in input field
document.querySelector("#api-url").value = apiBaseUrl;

const apiUrlInput = document.querySelector("#api-url");
apiUrlInput.addEventListener("input", (e) => {
  e.preventDefault();
  apiBaseUrl = document.querySelector("#api-url").value;
});

const signupButton = document.querySelector(`#signup-btn`);
signupButton && signupButton.addEventListener("click", (e) => signup(e));

// handles signup
function signup(e) {
  e.preventDefault();
  signupButton.innerHTML = "...loading";
  const first_name = document.querySelector("#first_name").value;
  const surname = document.querySelector("#surname").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (!email || !password || !first_name || !surname) {
    signupButton.innerHTML = "Signup";
    return setError("fill all fields");
  }
  const body = { first_name, surname, email, password };
  const path = `${apiBaseUrl}/auth/register`;
  fetch(path, {
    method: "POST",
    body,
  })
    .then((res) => res.json())
    .then((res) => {
      alert(JSON.stringify(res));
      signupButton.innerHTML = "Signup";
    })
    .catch((err) => {
      console.log(err.message);
      setError(err.message ? err.message : JSON.stringify(error.details));
      signupButton.innerHTML = "Signup";
    });
}

const loginButton = document.querySelector(`#login-btn`);
loginButton && loginButton.addEventListener("click", (e) => login(e));

//handles login
function login(e) {
  e.preventDefault();
  loginButton.innerHTML = "...loading";

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const body = { email, password };

  if (!email || !password) {
    loginButton.innerHTML = "Login";
    return setError("fill all fields");
  }
  const path = `${apiBaseUrl}/auth/login`;
  fetch(path, {
    method: "POST",
    body,
  })
    .then((res) => res.json())
    .then((res) => {
      alert(JSON.stringify(res));
      loginButton.innerHTML = "Login";
    })
    .catch((err) => {
      console.log(err.message);
      setError(err.message ? err.message : JSON.stringify(error.details));
      loginButton.innerHTML = "Login";
    });
}

function setError(message) {
  const errorContainer = document.querySelector("#error-container");

  let errorDiv = `
    <div class="" id="error-message">
        ${
          typeof message !== "string"
            ? JSON.stringify(message, undefined, 2)
            : message
        }
    </div>
`;

  errorContainer.innerHTML = errorDiv;
}
