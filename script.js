// DEFAULT ACCESS PASSWORD
const DEFAULT_GATE_PASSWORD = "milkshopadmin";

// On page load, synchronize the dynamic variables across both index and admin files
window.addEventListener('DOMContentLoaded', () => {
    // 1. Password check
    if (!localStorage.getItem('adminGatePass')) {
        localStorage.setItem('adminGatePass', DEFAULT_GATE_PASSWORD);
    }

    // 2. Load stored dynamic images
    const savedImg1 = localStorage.getItem('storeImgData1');
    const savedImg2 = localStorage.getItem('storeImgData2');

    // Run this block if on storefront (index.html)
    if (document.getElementById('shopImg1') && savedImg1) {
        document.getElementById('shopImg1').src = savedImg1;
    }
    if (document.getElementById('shopImg2') && savedImg2) {
        document.getElementById('shopImg2').src = savedImg2;
    }
});

/* ==============================================
   GATEWAY WALL FUNCTIONS (Run on admin.html)
   ============================================== */

function verifyGatePassword() {
    const inputPass = document.getElementById('gatePassword').value;
    const actualPass = localStorage.getItem('adminGatePass');

    if (inputPass === actualPass) {
        // Unlock main control panel view
        document.getElementById('loginGate').classList.add('hidden');
        document.getElementById('adminDashboard').classList.remove('hidden');
    } else {
        alert("Ghalat password! Access Denied.");
    }
}

function lockDashboard() {
    // Return view to protected login wall
    document.getElementById('adminDashboard').classList.add('hidden');
    document.getElementById('loginGate').classList.remove('hidden');
    document.getElementById('gatePassword').value = '';
}

/* ==============================================
   ADMIN CUSTOMIZER OPTIONS (Run inside adminDashboard)
   ============================================== */

// 1. Change password logic
function saveNewPassword() {
    const newPass = document.getElementById('adminNewPass').value;
    
    if (newPass.trim() === "") {
        alert("Password khali nahi ho sakta!");
        return;
    }

    localStorage.setItem('adminGatePass', newPass);
    alert("Kamyabi! Admin gateway ka password tabdeel ho chuka hai.");
    document.getElementById('adminNewPass').value = '';
}

// 2. Dark/Light Theme Customizer for Admin Page
function toggleAdminTheme() {
    const isChecked = document.getElementById('themeCheckbox').checked;
    const dashboard = document.getElementById('adminDashboard');
    const label = document.getElementById('themeLabel');

    if (isChecked) {
        dashboard.classList.add('admin-dark-theme');
        label.textContent = "Light Mode";
    } else {
        dashboard.classList.remove('admin-dark-theme');
        label.textContent = "Dark Mode";
    }
}

// 3. Dynamic Image Reader & Publisher
function publishImages() {
    const file1 = document.getElementById('fileUpload1').files[0];
    const file2 = document.getElementById('fileUpload2').files[0];

    let check1 = new Promise((resolve) => {
        if (file1) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('storeImgData1', e.target.result);
                resolve();
            }
            reader.readAsDataURL(file1);
        } else {
            resolve();
        }
    });

    let check2 = new Promise((resolve) => {
        if (file2) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('storeImgData2', e.target.result);
                resolve();
            }
            reader.readAsDataURL(file2);
        } else {
            resolve();
        }
    });

    Promise.all([check1, check2]).then(() => {
        alert("Perfect! Aapki photos upload ho chuki hain aur index.html par live lag gayi hain.");
    });
}
