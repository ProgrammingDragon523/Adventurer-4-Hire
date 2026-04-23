from flask import Flask, redirect, render_template

app = Flask(__name__,template_folder='templates', static_folder='static')

@app.route("/")
def index():
    return redirect("/the-programming-dragon")

@app.route("/the-programming-dragon")
def programming_dragon():
    return render_template("welcome.html")