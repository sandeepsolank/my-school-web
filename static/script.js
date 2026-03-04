// --- 1. Footer Year Fix ---
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById("currentYear");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// --- 2. आपका Google Apps Script URL ---
const scriptURL = 'https://script.google.com/macros/s/AKfycbx_3Q2q70bDl2XyGS-b15-bmAbNepCcjqHBZ-gfXAUje5NpJx2Uf3FHUeNH7BD-CEKk/exec';

// --- 3. Staff Data Load करने का फंक्शन ---
async function loadStaff() {
    const container = document.getElementById('staff-list');
    if (!container) return; 

    try {
        // --- CORS FIX वाला नया FETCH कोड यहाँ है ---
        const response = await fetch(scriptURL, {
            method: 'GET',
            mode: 'cors', 
            redirect: 'follow'
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const staffData = await response.json();
        
        container.innerHTML = ""; // 'Loading' मैसेज हटाएँ

        if (!staffData || staffData.length === 0) {
            container.innerHTML = "<p>अभी कोई स्टाफ डेटा उपलब्ध नहीं है।</p>";
            return;
        }

        staffData.forEach(m => {
            const card = document.createElement('div');
            card.className = 'staff-card';
            
            // फोटो चेक करना
            const finalPhoto = m.photo || m.photo_url || 'https://via.placeholder.com/150';
            
            card.onclick = () => showStaffDetails(m, finalPhoto);
            
            card.innerHTML = `
                <img src="${finalPhoto}" alt="${m.name}" onerror="this.src='https://via.placeholder.com/150'">
                <h4>${m.name || 'Staff Name'}</h4>
                <p>${m.post || 'Teacher'}</p>
            `;
            container.appendChild(card);
        });
    } catch (e) {
        console.error("Staff loading error:", e);
        container.innerHTML = `<p>डेटा लोड नहीं हो पाया। <br> 
        <button onclick="loadStaff()" style="margin-top:10px; padding:5px 10px; cursor:pointer;">दोबारा कोशिश करें</button></p>`;
    }
}

// --- 4. Staff Modal (पॉप-अप) में जानकारी भरना ---
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
