from flask import Flask, redirect, render_template

app = Flask(__name__,template_folder='templates', static_folder='static')

global SLIDE
SLIDE = 0

# Main Page
@app.route("/")
def index():
    return redirect("/the-programming-dragon/welcome")

@app.route("/the-programming-dragon/welcome", methods=["POST", "GET"])
def welcome():
    return render_template("welcome.html")

@app.route("/the-programming-dragon/tavern")
def tavern():
    return render_template("choose_adventurer.html")

# Adventurer Pages
@app.route("/the-programming-dragon/tavern/<adventurer>")
def adventurer_overview(adventurer):
    return render_template("adventurer_overview.html")

@app.route("/the-programming-dragon/tavern/<adventurer>/past-adventures")
def past_adventures(adventurer):
    return render_template("past_adventures.html")

@app.route("/the-programming-dragon/tavern/<adventurer>/skills-and-powers")
def skills_and_powers(adventurer):
    return render_template("skills_and_powers.html")

@app.route("/the-programming-dragon/tavern/<adventurer>/credentials")
def credentials(adventurer):
    return render_template("credentials.html")

@app.route("/the-programming-dragon/tavern/<adventurer>/spell-scrolls")
def spell_scrolls(adventurer):
    return render_template("spell_scrolls.html")

@app.route("/the-programming-dragon/tavern/<adventurer>/side-quests")
def side_quests(adventurer):
    return render_template("side_quests.html")

# Sending Stone
@app.route("/the-programming-dragon/tavern/cast-sending-stone")
def cast_sending_stone(adventurer):
    return render_template("cast_sending_stone.html")
