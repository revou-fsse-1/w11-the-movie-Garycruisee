//Login Function
async function login() {
  const username = document.getElementById("username").value;
  console.log(username);
  const userPassword = document.getElementById("password").value;
  console.log(userPassword);

  if (!username) {
    alert("Please input your username");
  } else if (!userPassword) {
    alert("Please input your password");
  } else {
    try {
      const response = await fetch(
        `http://localhost:3000/users?username=${username}`
      );
      const user = await response.json();
      if (user[0].password == userPassword) {
        alert("success!");
        window.location.href = "homepage.html";
      } else {
        alert("Invalid username or password!");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid username or password!");
    }
  }
}
