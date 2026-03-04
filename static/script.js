// --- 1. आपका नया Google Apps Script URL (School Master Data वाली शीट का) ---
const scriptURL = 'https://script.google.com/macros/s/AKfycbz8OTDNDTc0gAXXJxZePtU4MVrWl5zC2-91oA8rOIdLv3TgaNht3WL1HrTdhnUf7_by/exec'; 

// --- 2. Staff Data Load करने का फंक्शन ---
async function loadStaff() {
    const container = document.getElementById('staff-list');
    if (!container) return; 

    try {
        // Staff लोड करने के लिए URL के पीछे ?type=StaffData जोड़ना होगा
        const response = await fetch(scriptURL + "?type=StaffData"), {
            method: 'GET',
            redirect: 'follow'
        });
        
        const staffData = await response.json();
        container.innerHTML = ""; 

        if (!staffData || staffData.length === 0) {
            container.innerHTML = "<p>कोई स्टाफ डेटा नहीं मिला।</p>";
            return;
        }

        staffData.forEach(m => {
            const card = document.createElement('div');
            card.className = 'staff-card';
            const finalPhoto = m.photo || 'https://via.placeholder.com/150';
            
            card.onclick = () => showStaffDetails(m, finalPhoto);
            card.innerHTML = `
                <img src="${finalPhoto}" alt="${m.name}" onerror="this.src='https://via.placeholder.com/150'">
                <h4>${m.name || 'Name'}</h4>
                <p>${m.post || 'Teacher'}</p>
            `;
            container.appendChild(card);
        });
    } catch (e) {
        console.error("Error:", e);
        container.innerHTML = `<p>डेटा लोड नहीं हो पाया।</p>`;
    }
}

// --- 3. Students के Marks Load करने का फंक्शन (अगर आपको वेबसाइट पर दिखाना हो) ---
async function loadMarks() {
    // अगर आपने HTML में 'marks-list' नाम की ID बनाई है
    const container = document.getElementById('marks-list');
    if (!container) return;

    try {
        const response = await fetch(scriptURL + '?type=MarksData');
        const marksData = await response.json();
        // यहाँ आप मार्क्स दिखाने का कोड लिख सकते हैं (जैसे टेबल या लिस्ट)
    } catch (e) {
        console.log("Marks loading error");
    }
}

document.addEventListener('DOMContentLoaded', loadStaff);

