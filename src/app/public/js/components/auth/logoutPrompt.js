document.addEventListener('DOMContentLoaded', () => {
    const logoutPrompt = document.getElementById("logoutPrompt");
    const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
    const logoutCancelBtn = document.getElementById("logoutCancelBtn");
    const loginLogoutTrigger = document.getElementById("loginLogoutTrigger");

    const toggleLogoutPrompt = (show) => {
        logoutPrompt.classList.toggle("show", show);
    };

    loginLogoutTrigger.onclick = () => {
        if (loginLogoutTrigger.classList.contains('logged-in')) {
            toggleLogoutPrompt(true);
        } else {
            document.getElementById("authModal").classList.add("show");
        }
    };

    confirmLogoutBtn.onclick = async () => {
        try {
            await fetch("/api/users/logout", { method: "POST" });
            window.location.reload();
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    logoutCancelBtn.onclick = (e) => {
        e.preventDefault();
        toggleLogoutPrompt(false);
    };

    window.onclick = (event) => {
        if (event.target === logoutPrompt) {
            toggleLogoutPrompt(false);
        }
    };
});