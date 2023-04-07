//Register Function
async function register() {
  const username = document.getElementById("usernameinput").value;
  console.log(username);
  const email = document.getElementById("emailinput").value;
  console.log(email);
  const password = document.getElementById("passwordinput").value;
  console.log(password);
  const rePasswordReg = document.getElementById("repasswordinput").value;
  console.log(rePasswordReg);

  if (!username) {
    alert("Please input your username");
  } else if (!email) {
    alert("Please input your email");
  } else if (!password) {
    alert("Please input your password");
  } else if (password != rePasswordReg) {
    alert("Password do not match!");
  } else {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password: rePasswordReg,
        }),
      });
      const newUser = await response.json();
      alert(`Successfully registered with ID ${newUser.id}`);
      // Redirect to login page after successful registration
      window.location.href = "login.html";
    } catch (error) {
      console.log(error);
      alert("Error registering user");
    }
  }
}
