from flask import Flask, request, render_template, send_from_directory, redirect, url_for
import os
import json

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
DESCRIPTION_FILE = 'descriptions.json'

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load existing descriptions from the JSON file if it exists
if os.path.exists(DESCRIPTION_FILE):
    with open(DESCRIPTION_FILE, 'r') as f:
        file_descriptions = json.load(f)
else:
    file_descriptions = {}

@app.route('/')
def index():
    # List files and their descriptions
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    descriptions = {file: file_descriptions.get(file, "") for file in files}
    return render_template('index.html', files=descriptions)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(url_for('index'))
    
    uploaded_files = request.files.getlist('file')  # Handle multiple files
    description = request.form.get('description', '')[:50]  # Limit description to 50 characters

    for file in uploaded_files:
        if file.filename != '':
            # Save file
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
            
            # Save description
            file_descriptions[file.filename] = description

    # Write all descriptions to JSON file
    with open(DESCRIPTION_FILE, 'w') as f:
        json.dump(file_descriptions, f)

    return redirect(url_for('index'))

@app.route('/uploads/<filename>')
def download_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/uploads/<filename>', methods=['POST'])
def delete_file(filename):
    # Delete the file from the filesystem
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.isfile(file_path):
        os.remove(file_path)  # Remove the file

    # Remove the description from the dictionary and update JSON file
    if filename in file_descriptions:
        del file_descriptions[filename]
        with open(DESCRIPTION_FILE, 'w') as f:
            json.dump(file_descriptions, f)  # Update JSON file

    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
