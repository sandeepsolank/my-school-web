from flask import Flask, render_template, request
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/admission')
def admission():
    return render_template('admission.html')

@app.route('/payment-gate', methods=['POST'])
def payment_gate():
    # 1. फॉर्म से डेटा लेना
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

    # 🛑 यहाँ अपना Google Web App URL डालें (जो आपने कॉपी किया था) 🛑
    google_url = "https://script.google.com/macros/s/AKfycbwUqGQaTUKQAXZY0kAPp3PadELe-dbGZI7FbxmwZHZyIjcbU6J8bKoVsHq2Ceqxl1-P/exec"

    try:
        # 2. डेटा को Google Sheet पर भेजना
        response = requests.post(google_url, data=form_data)
        
        if "Success" in response.text:
            return "<h1>Success! डेटा Google Sheet में सेव हो गया है।</h1>"
        else:
            return f"Error: {response.text}"
    except Exception as e:
        return f"System Error: {str(e)}"

if __name__ == '__main__':
    app.run(debug=True)
