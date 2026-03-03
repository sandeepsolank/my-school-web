from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import sqlite3

app = Flask(__name__)

# सेशन (लॉगिन) को सुरक्षित रखने के लिए एक सीक्रेट की (Secret Key) की आवश्यकता होती है
app.secret_key = "school_admin_secret_key" 

# डेटाबेस सेटअप
def init_sqlite_db():
    conn = sqlite3.connect('school_data.db')
    cursor = conn.cursor()
    
    # 1. Admission Table (वही पुरानी वाली)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS admissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_name TEXT NOT NULL,
            class_name TEXT NOT NULL,
            mobile_number TEXT NOT NULL
        )
    ''')
    
    # 2. Result Table (रिजल्ट स्टोर करने के लिए नई टेबल)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS results (
            roll_no TEXT PRIMARY KEY,
            student_name TEXT,
            class_name TEXT,
            total_marks INTEGER,
            percentage REAL
        )
    ''')
    
    # 3. Teachers Table (टीचर्स की जानकारी के लिए)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS teachers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            subject TEXT,
            qualification TEXT,
            experience TEXT
        )
    ''')
    
    conn.commit()
    conn.close()

# 1. होमपेज
@app.route('/')
def home():
    return render_template('index.html')

# 2. फॉर्म का डेटा सेव करना
@app.route('/submit_admission', methods=['POST'])
def submit_admission():
    data = request.json
    name = data.get('studentName')
    class_name = data.get('className')
    mobile = data.get('mobileNumber')

    try:
        conn = sqlite3.connect('school_data.db')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO admissions (student_name, class_name, mobile_number) 
            VALUES (?, ?, ?)
        ''', (name, class_name, mobile))
        conn.commit()
        conn.close()
        
        return jsonify({"status": "success", "message": "Data saved successfully!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

# 3. नया: लॉगिन पेज और पासवर्ड चेकिंग
@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        password = request.form.get('password')
        
        # यहाँ आपका पासवर्ड 'admin123' सेट किया गया है (आप इसे बदल सकते हैं)
        if password == 'admin123':
            session['logged_in'] = True
            return redirect(url_for('admin'))
        else:
            error = 'Invalid Password! (गलत पासवर्ड)'
            
    return render_template('login.html', error=error)

# 4. अपडेटेड: एडमिन पैनल (अब यह पासवर्ड मांगेगा)
@app.route('/admin')
def admin():
    # चेक करें कि क्या यूजर ने लॉगिन किया है?
    if not session.get('logged_in'):
        # अगर लॉगिन नहीं किया है, तो वापस लॉगिन पेज पर भेज दें
        return redirect(url_for('login'))
        
    # अगर पासवर्ड सही है, तो डेटा दिखाएं
    try:
        conn = sqlite3.connect('school_data.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM admissions')
        students_data = cursor.fetchall()
        conn.close()
        return render_template('admin.html', students=students_data)
    except Exception as e:
        return f"Error connecting to database: {e}"

# 5. नया: लॉगआउट (Logout)
@app.route('/logout')
def logout():
    session.pop('logged_in', None) # सेशन डिलीट करें
    return redirect(url_for('home')) # होमपेज पर भेजें

@app.route('/admission')
def admission():
    return render_template('admission.html')

@app.route('/payment-gate')
def payment_gate():
    return render_template('fees.html')

if __name__ == '__main__':
    app.run(debug=True)
