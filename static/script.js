// --- 1. Footer Year ---
document.getElementById("currentYear").textContent = new Date().getFullYear();

// --- 2. Google Apps Script URL (अपना नया URL यहाँ डालें) ---
const scriptURL = 'आपका_नया_DEPLOY_URL_यहाँ_डालें';

// --- 3. Admission Form Submit Handling ---
if (document.getElementById("admissionForm")) {
    document.getElementById("admissionForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let name = document.getElementById("studentName").value;
        let className = document.getElementById("className").value;
        let mobile = document.getElementById("mobileNumber").value;

        let formData = new FormData();
        formData.append('sheet_type', 'Sheet1'); // Admission Sheet
        formData.append('fname', name);
        formData.append('class', className);
        formData.append('mobile', mobile);

        fetch(scriptURL, { method: "POST", body: formData })
            .then(() => {
                alert("Thank you, " + name + "! Your inquiry has been saved.");
                document.getElementById("admissionForm").reset();
            })
            .catch((error) => console.error("Error:", error));
    });
}

// --- 4. Staff Admin Form (अगर Admin Page पर हैं) ---
if (document.getElementById("staffForm")) {
    document.getElementById("staffForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.innerText = "Saving Data...";
        btn.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(this) })
            .then(response => {
                alert("Staff data saved successfully!");
                this.reset();
                btn.innerText = "Save Staff Data";
                btn.disabled = false;
            })
            .catch(error => {
                alert("Error saving staff data!");
                btn.disabled = false;
            });
    });
}

// --- 5. Staff Display Logic (Home Page पर स्टाफ लोड करने के लिए) ---
async function loadStaff() {
    const container = document.getElementById('staff-list');
    if (!container) return; // अगर पेज पर स्टाफ लिस्ट नहीं है तो रुक जाएं

    try {
        const response = await fetch(scriptURL);
        const staffData = await response.json();
        container.innerHTML = ""; 

        staffData.forEach(m => {
            const card = document.createElement('div');
            card.className = 'staff-card';
            card.onclick = () => showStaffDetails(m.name, m.post, m.exp, m.qual, m.sub, m.mobile, m.email, m.bio);
            card.innerHTML = `
                <img src="${m.photo || 'https://via.placeholder.com/150'}" alt="${m.name}">
                <h4>${m.name}</h4>
                <p>${m.post}</p>
            `;
            container.appendChild(card);
        });
    } catch (e) {
        container.innerHTML = "Staff data coming soon...";
    }
}

function showStaffDetails(name, post, exp, qual, sub, mobile, email, bio) {
    const modal = document.getElementById('staffModal');
    if(!modal) return;
    
    document.getElementById('mName').innerText = name;
    document.getElementById('mPost').innerText = post;
    document.getElementById('mExp').innerText = exp;
    document.getElementById('mQual').innerText = qual;
    document.getElementById('mSub').innerText = sub;
    document.getElementById('mMobile').innerText = mobile || "N/A";
    document.getElementById('mEmail').innerText = email || "N/A";
    document.getElementById('mBio').innerText = bio || "Teaching is the art of assisting discovery.";
    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('staffModal').style.display = "none";
}

// --- 6. रिजल्ट चेक करने का फंक्शन (आपका पुराना कोड) ---
function checkResult() {
    let roll = document.getElementById('rollInput').value;
    let display = document.getElementById('resultDisplay');
    let content = document.getElementById('resultContent');
    
    if(roll === "101") {
        display.style.display = "block";
        content.innerHTML = `
            <div id="printableMarksheet" style="padding:20px; border:2px solid #003366; background:white; font-family: Arial, sans-serif;">
                <div style="text-align:center; border-bottom:2px solid #003366; padding-bottom:10px; margin-bottom:15px;">
                    <h2 style="margin:0; color:#003366;">GOVT. H.S.S. ALOT JAGEER</h2>
                    <p style="margin:5px 0; font-size:14px;">Annual Examination Marksheet (2025-26)</p>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:14px;">
                    <div><p><strong>Student Name:</strong> Rahul Patidar</p><p><strong>Roll Number:</strong> 101</p></div>
                    <div style="text-align:right;"><p><strong>Class:</strong> 12th (Science)</p><p><strong>Status:</strong> <span style="color:green; font-weight:bold;">PASSED</span></p></div>
                </div>
                <table style="width:100%; border-collapse: collapse; margin-top:10px; font-size:14px; border:1px solid #ddd;">
                    <tr style="background:#003366; color:white;"><th style="padding:8px; text-align:left;">Subject</th><th style="padding:8px; text-align:center;">Marks</th></tr>
                    <tr><td style="padding:8px; border:1px solid #ddd;">Physics</td><td style="padding:8px; border:1px solid #ddd; text-align:center;">85</td></tr>
                    <tr><td style="padding:8px; border:1px solid #ddd;">Chemistry</td><td style="padding:8px; border:1px solid #ddd; text-align:center;">78</td></tr>
                    <tr><td style="padding:8px; border:1px solid #ddd;">Mathematics</td><td style="padding:8px; border:1px solid #ddd; text-align:center;">92</td></tr>
                    <tr style="font-weight:bold; background:#f9f9f9;"><td style="padding:8px; border:1px solid #ddd;">Grand Total / Percentage</td><td style="padding:8px; border:1px solid #ddd; text-align:center;">85%</td></tr>
                </table>
                <div style="margin-top:30px; display:flex; justify-content:space-between; align-items:flex-end;">
                    <div style="font-size:10px; color:gray;">Date: ${new Date().toLocaleDateString()}</div>
                    <div style="text-align:center; width:150px; border-top:1px solid #333; font-size:12px; font-weight:bold; padding-top:5px;">Principal Signature</div>
                </div>
            </div>
            <div style="margin-top:20px; display:flex; gap:10px;">
                <button onclick="printMarksheet()" class="submit-btn" style="background:#28a745;">📥 Download Marksheet (PDF)</button>
                <button onclick="generateIDCard('Rahul Patidar', '12th')" class="submit-btn" style="background:#ffcc00; color:#003366;">🪪 Generate ID Card</button>
            </div>
        `;
    } else {
        alert("Roll Number not found! Try 101.");
        display.style.display = "none";
    }
}

function printMarksheet() {
    let content = document.getElementById('printableMarksheet').innerHTML;
    let win = window.open('', '', 'height=800,width=800');
    win.document.write('<html><head><title>Student Marksheet</title></head><body>' + content + '</body></html>');
    win.document.close();
    win.print();
}

function generateIDCard(name, className) {
    let modal = document.getElementById('idCardModal');
    let cardContent = document.getElementById('idCardContent');
    modal.style.display = "block"; 
    cardContent.innerHTML = `
        <div id="printableCard" style="border: 2px solid #003366; padding: 15px; border-radius: 10px; background: white; font-family: Arial, sans-serif;">
            <div style="background:#003366; color:white; padding:10px; border-radius:5px; text-align:center;">
                <h4 style="margin:0; font-size:16px;">GOVT. H.S.S. ALOT JAGEER</h4>
                <p style="margin:2px 0; font-size:11px;">STUDENT IDENTITY CARD</p>
            </div>
            <div style="margin:15px 0; text-align:center;">
                <img src="https://via.placeholder.com/100" style="width:90px; height:90px; border-radius:5px; border:1px solid #003366;">
            </div>
            <div style="text-align:left; font-size:14px; line-height:1.8;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Class:</strong> ${className}</p>
                <p><strong>Roll No:</strong> 101</p>
            </div>
            <div style="margin-top:20px; text-align:right;"><p style="font-size:10px; font-weight:bold; border-top:1px solid #333; display:inline-block; padding-top:5px;">Principal Signature</p></div>
        </div>
        <div style="margin-top: 20px; text-align: center; display: flex; gap: 10px; justify-content: center;">
            <button onclick="printIDCard()" class="submit-btn" style="background:#28a745;">📥 Print</button>
            <button onclick="document.getElementById('idCardModal').style.display='none'" class="submit-btn" style="background:#d32f2f;">Close</button>
        </div>
    `;
}

function printIDCard() {
    let cardHTML = document.getElementById('printableCard').outerHTML;
    let win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><body><center>' + cardHTML + '</center></body></html>');
    win.document.close();
    win.print();
}

function showQR() {
    document.getElementById('qrModal').style.display = "block";
}

// --- पेज लोड होते ही स्टाफ लोड करें ---
window.onload = loadStaff;
