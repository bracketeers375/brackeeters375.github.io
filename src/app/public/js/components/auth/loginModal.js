document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("authModal");
    const cancelBtn = document.getElementById("authCancelBtn");
    const loginTab = document.getElementById("loginTab");
    const registerTab = document.getElementById("registerTab");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    const toggleModal = (show) => {
        modal.classList.toggle("show", show);
    };

    const switchTab = (activateTab, deactivateTab, activateForm, deactivateForm) => {
        activateTab.classList.add("active");
        deactivateTab.classList.remove("active");
        activateForm.classList.add("active");
        deactivateForm.classList.remove("active");
    };

    document.getElementById("loginLogoutTrigger").onclick = () => toggleModal(true);
    cancelBtn.onclick = (e) => {
        e.preventDefault();
        toggleModal(false);
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            toggleModal(false);
        }
    };

    registerTab.onclick = () => switchTab(registerTab, loginTab, registerForm, loginForm);
    loginTab.onclick = () => switchTab(loginTab, registerTab, loginForm, registerForm);
});