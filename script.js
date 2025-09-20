// ========================== LOGIN =========================== //

const login = document.getElementById("loginForm");
if(login) {login.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({username, password})
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
        window.location.href = "lobby.html";
        }
    });
}


// =========================== REGISTER ========================== // 

const registerForm = document.getElementById("registerForm");
if(registerForm) {
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({username, phone, password})
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
        window.location.href = "index.html";
    }
    });
}