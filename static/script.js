// Footer Year
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Form Submit Handling
document
  .getElementById("admissionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("studentName").value;
    let className = document.getElementById("className").value;
    let mobile = document.getElementById("mobileNumber").value;

    let formData = {
      studentName: name,
      className: className,
      mobileNumber: mobile,
    };

    fetch("/submit_admission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert(
            "Thank you, " +
              name +
              "! Your admission inquiry for Class " +
              className +
              " has been saved.",
          );
          document.getElementById("admissionForm").reset();
        } else {
          alert("Error saving data!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong!");
      });
  });

 // --- 1. रिजल्ट चेक करने का फंक्शन ---
function checkResult() {
    let roll = document.getElementById('rollInput').value;
    let display = document.getElementById('resultDisplay');
    let content = document.getElementById('resultContent');
    
    if(roll === "101") {
        display.style.display = "block";
        // यहाँ हमने सिर्फ एक 'Download/Print' बटन रखा है ताकि कंफ्यूजन न हो
        content.innerHTML = `
            <div id="printableMarksheet" style="padding:20px; border:2px solid #003366; background:white; font-family: Arial, sans-serif;">
                <div style="text-align:center; border-bottom:2px solid #003366; padding-bottom:10px; margin-bottom:15px;">
                    <h2 style="margin:0; color:#003366;">GOVT. H.S.S. ALOT JAGEER</h2>
                    <p style="margin:5px 0; font-size:14px;">Annual Examination Marksheet (2025-26)</p>
                </div>
                
                <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:14px;">
                    <div>
                        <p><strong>Student Name:</strong> Rahul Patidar</p>
                        <p><strong>Roll Number:</strong> 101</p>
                    </div>
                    <div style="text-align:right;">
                        <p><strong>Class:</strong> 12th (Science)</p>
                        <p><strong>Status:</strong> <span style="color:green; font-weight:bold;">PASSED</span></p>
                    </div>
                </div>

                <table style="width:100%; border-collapse: collapse; margin-top:10px; font-size:14px; border:1px solid #ddd;">
                    <tr style="background:#003366; color:white;">
                        <th style="border:1px solid #ddd; padding:8px; text-align:left;">Subject</th>
                        <th style="border:1px solid #ddd; padding:8px; text-align:center;">Marks</th>
                    </tr>
                    <tr><td style="border:1px solid #ddd; padding:8px;">Physics</td><td style="border:1px solid #ddd; padding:8px; text-align:center;">85</td></tr>
                    <tr><td style="border:1px solid #ddd; padding:8px;">Chemistry</td><td style="border:1px solid #ddd; padding:8px; text-align:center;">78</td></tr>
                    <tr><td style="border:1px solid #ddd; padding:8px;">Mathematics</td><td style="border:1px solid #ddd; padding:8px; text-align:center;">92</td></tr>
                    <tr style="font-weight:bold; background:#f9f9f9;">
                        <td style="border:1px solid #ddd; padding:8px;">Grand Total / Percentage</td>
                        <td style="border:1px solid #ddd; padding:8px; text-align:center;">85%</td>
                    </tr>
                </table>

                <div style="margin-top:30px; display:flex; justify-content:space-between; align-items:flex-end;">
                    <div style="font-size:10px; color:gray;">Date: ${new Date().toLocaleDateString()}</div>
                    <div style="text-align:center; width:150px; border-top:1px solid #333; font-size:12px; font-weight:bold; padding-top:5px;">
                        Principal Signature
                    </div>
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

// --- 2. सिर्फ मार्कशीट प्रिंट करने का फंक्शन ---
function printMarksheet() {
    let content = document.getElementById('printableMarksheet').innerHTML;
    let win = window.open('', '', 'height=800,width=800');
    win.document.write('<html><head><title>Student Marksheet</title></head><body>');
    win.document.write(content);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
}

// --- 3. आईडी कार्ड वाला फंक्शन (जैसा पहले था) ---
function generateIDCard(name, className) {
    let modal = document.getElementById('idCardModal');
    let cardContent = document.getElementById('idCardContent');
    modal.style.display = "block";
    
    cardContent.innerHTML = `
        <div id="printableCard" style="border: 2px solid #003366; padding: 15px; border-radius: 10px; background: white; font-family: Arial, sans-serif; text-align:center;">
             <h4 style="margin:0; background:#003366; color:white; padding:5px;">ADMIT CARD</h4>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Class:</strong> ${className}</p>
             <p><strong>Roll No:</strong> 101</p>
             <hr>
             <p style="font-size:10px;">Govt. H.S.S. Alot Jageer</p>
        </div>
    `;
}

// --- Updated ID Card Generator Function ---
function generateIDCard(name, className) {
    let modal = document.getElementById('idCardModal');
    let cardContent = document.getElementById('idCardContent');
    
    modal.style.display = "block"; // पॉप-अप दिखाएं
    
    // कार्ड का पूरा डिजाइन और जानकारी
    cardContent.innerHTML = `
        <div id="printableCard" style="border: 2px solid #003366; padding: 15px; border-radius: 10px; background: white; font-family: Arial, sans-serif; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <div style="background:#003366; color:white; padding:10px; border-radius:5px; text-align:center;">
                <h4 style="margin:0; font-size:16px;">GOVT. H.S.S. ALOT JAGEER</h4>
                <p style="margin:2px 0; font-size:11px;">STUDENT ADMIT / IDENTITY CARD</p>
            </div>
            
            <div style="margin:15px 0; text-align:center;">
                <img src="https://via.placeholder.com/100" alt="Student Photo" 
                     style="width:90px; height:90px; border-radius:5px; border:1px solid #003366;">
            </div>
            
            <div style="text-align:left; font-size:14px; line-height:1.8;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Class:</strong> ${className}</p>
                <p><strong>Roll No:</strong> 101</p>
                <p><strong>Session:</strong> 2025-26</p>
                <p><strong>School:</strong> Alot Jageer, Ujjain</p>
            </div>

            <div style="margin-top:20px; border-top: 1px solid #eee; padding-top:10px; display:flex; justify-content:space-between;">
                <span style="font-size:9px; color:gray;">*Computer Generated</span>
                <div style="text-align:center;">
                    <p style="font-size:10px; margin:0; font-weight:bold; border-bottom:1px solid #333;">Principal Signature</p>
                </div>
            </div>
        </div>

        <div style="margin-top: 20px; text-align: center; display: flex; gap: 10px; justify-content: center;">
            <button onclick="printIDCard()" class="submit-btn" style="background:#28a745; border:none; padding:10px 15px; cursor:pointer; color:white; border-radius:5px;">📥 Download PDF / Print</button>
            <button onclick="document.getElementById('idCardModal').style.display='none'" class="submit-btn" style="background:#d32f2f; border:none; padding:10px 15px; cursor:pointer; color:white; border-radius:5px;">Close</button>
        </div>
    `;
}

// --- प्रिंट करने के लिए स्पेशल फंक्शन (इसे generateIDCard के बाहर रखें) ---
function printIDCard() {
    let cardHTML = document.getElementById('printableCard').outerHTML;
    let win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head><title>Print Admit Card</title></head>');
    win.document.write('<body style="display:flex; justify-content:center; align-items:center; height:100vh;">');
    win.document.write(cardHTML);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
}
function showQR() {
    document.getElementById('qrModal').style.display = "block";
}

