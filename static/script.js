// --- 1. Footer Year Fix ---
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById("currentYear");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

const scriptURL = 'आपका_नया_URL_यहाँ_पेस्ट_करें'; // Manage Deployment वाला लिंक

async function loadStaff() {
    const container = document.getElementById('staff-list');
    try {
        const response = await fetch(scriptURL);
        const staffData = await response.json();
        
        console.log("Data from Google:", staffData); // यह F12 दबाने पर दिखेगा

        container.innerHTML = ""; 
        if (!staffData || staffData.length === 0) {
            container.innerHTML = "<p>शीट में कोई डेटा नहीं मिला।</p>";
            return;
        }

        // ... बाकी कोड वही रहेगा
    } catch (e) {
        console.error("Error:", e);
        container.innerHTML = "<p>डेटा लोड करने में समस्या आई।</p>";
    }
}// --- 4. Staff Modal (पॉप-अप) में जानकारी भरना ---
function showStaffDetails(m, photo) {
    const modal = document.getElementById('staffModal');
    if(!modal) return;
    
    document.getElementById('mImg').src = photo;
    document.getElementById('mName').innerText = m.name || "N/A";
    document.getElementById('mPost').innerText = m.post || "N/A";
    document.getElementById('mExp').innerText = m.exp || "जानकारी उपलब्ध नहीं";
    document.getElementById('mQual').innerText = m.qual || "जानकारी उपलब्ध नहीं";
    document.getElementById('mSub').innerText = m.sub || "जानकारी उपलब्ध नहीं";
    document.getElementById('mMobile').innerText = m.mobile || "N/A";
    
    // अगर HTML में mEmail और mBio वाली id हैं तो ये काम करेंगी
    if(document.getElementById('mEmail')) document.getElementById('mEmail').innerText = m.email || "N/A";
    if(document.getElementById('mBio')) document.getElementById('mBio').innerText = m.bio || "विद्यालय परिवार के सम्मानित सदस्य।";
    
    modal.style.display = "block";
}

// --- 5. पॉप-अप बंद करने का फंक्शन ---
function closeModal() {
    const modal = document.getElementById('staffModal');
    if(modal) modal.style.display = "none";
}

// खिड़की (Modal) के बाहर क्लिक करने पर बंद हो जाए
window.onclick = function(event) {
    const modal = document.getElementById('staffModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// --- 6. पेज लोड होते ही लोड शुरू करें ---
document.addEventListener('DOMContentLoaded', loadStaff);



