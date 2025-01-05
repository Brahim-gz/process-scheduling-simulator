from flask import Flask,request,jsonify
from Solver import Solve
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Allow all origins by default

@app.route('/api')
def api():

    #Retrieve the parameters of the LP
    Plist = [ int(x) for x in request.args.getlist("Plist")]
    Dlist = [ float(x) for x in request.args.getlist("Dlist")]
    Alist = [ float(x) for x in request.args.getlist("Alist")]

    #Solve the LP
    res = Solve(Plist,Dlist,Alist)

    #return the optimal solution
    return jsonify(res), 200

@app.route('/')
def home():
    return "Hello There"

if __name__ == '__main__':
    app.run(Debug=True)