from pulp import *

def Solve(Plist : list, Dlist : list, Alist : list) -> dict:

    #Create the LP

    lp = LpProblem("Process_Scheduling_Problem",LpMinimize)

    #Add parameters

    n = len(Plist)
    M = 100
    params = {}
    for i in range(n):
        params[f"P{i+1}"] = Plist[i]
        params[f"D{i+1}"] = Dlist[i]
        params[f"A{i+1}"] = Alist[i]
        for j in range(n):
            if i != j :
                params[f"z{i+1}{j+1}"] = 1 if Plist[i] == Plist[j] else 0

    #Define variables

    variables = {}
    for i in range(1,n+1):
        for j in range(1,n+1):
            if i != j :
                variables[f"x{i}{j}"] = LpVariable(f"x{i}{j}", cat=LpBinary, lowBound=0)
        variables[f"TD{i}"] = LpVariable(f"TD{i}", lowBound=0)
        variables[f"TF{i}"] = LpVariable(f"TF{i}", lowBound=0)

    #Add the objective function

    lp += lpSum(1/n * (variables[f"TF{i}"] - params[f"A{i}"] - params[f"D{i}"]) for i in range(1, n + 1))

    #Add the constraints

    for i in range(1,n+1):
        lp += variables[f"TF{i}"] == variables[f"TD{i}"] + params[f"D{i}"]
        lp += variables[f"TD{i}"] >= params[f"A{i}"]
        for j in range(1,n+1):
            if i != j :
                lp += variables[f"x{i}{j}"] + variables[f"x{j}{i}"] == 1
                lp += params[f"P{i}"] >= params[f"P{j}"] - M * (1 - variables[f"x{i}{j}"])
                lp += params[f"D{i}"] <= params[f"D{j}"] + M * (2 - (params[f"z{i}{j}"] + variables[f"x{i}{j}"]))
                lp += variables[f"TF{i}"] <= variables[f"TD{j}"] + M * (1 - variables[f"x{i}{j}"])

    #Solve the LP

    status = lp.solve(PULP_CBC_CMD(msg=False))

    #return the solution

    result = {
        "status": status,
    }
    for var in lp.variables():
        result[var.name] = value(var)
    result["OPT"] = value(lp.objective)
    return result