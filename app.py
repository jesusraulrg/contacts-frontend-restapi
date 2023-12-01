from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/search", methods=["GET"])
def search_contact():
    return render_template('search.html')

@app.route("/create", methods=["GET", "POST"])
def create_contact():
    return render_template('create.html')

@app.route("/details", methods=["GET"])
def details():
    return render_template('details.html')

@app.route("/delete", methods=["GET", "POST"])
def delete_contact():
    return render_template('delete.html')

@app.route("/update", methods=["GET", "POST"])
def update_contact():
    return render_template('update.html')

if __name__ == '__main__':
    app.run(debug=True)
