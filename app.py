from flask import Flask, render_template, request, redirect
import requests  # यह डेटा भेजने के लिए जरूरी है

app = Flask(__name__)

# 1. होम पेज (Home Page)
@app.route('/')
def index():
    return render_template('index.html')

# 2. एडमिशन फॉर्म पेज (Admission Form Page)
@app.route('/admission')
def admission():
    return render_template('admission.html')

# 3. डेटा को Google Sheet में भेजने वाला रूट
@app.route('/payment-gate', methods=['POST'])
def payment_gate():
    if request.method == 'POST':
        # फॉर्म से सारा डेटा लेना
        form_data = {
            "fname": request.form.get('fname'),
            "lname": request.form.get('lname'),
            "father": request.form.get('father'),
            "mother": request.form.get('mother'),
            "dob": request.form.get('dob'),
            "class": request.form.get('class'),
            "sssm": request.form.get('sssm'),
            "aadhar": request.form.get('aadhar'),
            "mobile": request.form.get('mobile'),
            "address": request.form.get('address')
        }

        # 🛑 यहाँ अपना Google Web App URL ' ' के बीच में डालें 🛑
        google_script_url = "https://script.google.com/macros/s/AKfycbwUqGQaTUKQAXZY0kAPp3PadELe-dbGZI7FbxmwZHZyIjcbU6J8bKoVsHq2Ceqxl1-P/exec"

        try:
            # डेटा को गूगल शीट (Apps Script) पर भेजना
            response = requests.post(google_script_url, data=form_data)
            
            if response.text == "Success":
                # अगर डेटा सेव हो गया, तो सक्सेस मैसेज दिखाएँ
                return "<h1>Success! आपका फॉर्म जमा हो गया है। डेटा Google Sheet में सेव हो गया है।</h1>"
            else:
                return f"Error from Google: {response.text}"
        except Exception as e:
            return f"Error: {str(e)}"

    return "Invalid Request"

if __name__ == '__main__':
    app.run(debug=True)
