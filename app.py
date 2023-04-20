#import numpy as np
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc
from flask import Flask, jsonify
import datetime as dt
import pandas as pd 
from sqlalchemy.dialects.postgresql import psycopg2
from flask_cors import CORS

engine = create_engine('postgresql://postgres:postgres@localhost:5432/database')
#query = "select * from bronx"
#df = pd.read_sql_query(query, engine)
#print(df)
# Reflect an existing database into a new model.
Base = automap_base()
# Reflect the tables.
Base.prepare(autoload_with=engine)
Base.classes.keys()



# Create our session from Python to the DB.


app = Flask(__name__)

CORS(app)
@app.route("/Manhattan1")
def manhattan1(): 
    query = "select * from avg_response_after_covid"
    df = pd.read_sql_query(query, engine)
    json_df = df.to_json()
    
    return json_df

@app.route("/Manhattan2")
def manhattan2():
    query2 = "select * from avg_response_before_covid"
    df2 = pd.read_sql_query(query2, engine)
    json_df2 = df2.to_json()

    return json_df2

@app.route("/Manhattan3")
def manhattan3():
    query3 = "select * from initial_severity_m"
    df3 = pd.read_sql_query(query3, engine)
    json_df3 = df3.to_json()

    return json_df3
@app.route("/Staten Island1")
def staten_island1(): 
    query = "select * from avg_response_after_covid"
    df = pd.read_sql_query(query, engine)
    json_df = df.to_json()
    
    return json_df

@app.route("/Staten Island2")
def staten_island2():
    query2 = "select * from avg_response_before_covid"
    df2 = pd.read_sql_query(query2, engine)
    json_df2 = df2.to_json()

    return json_df2

@app.route("/Staten Island3")
def staten_island3():
    query3 = "select * from initial_severity_si"
    df3 = pd.read_sql_query(query3, engine)
    json_df3 = df3.to_json()

    return json_df3

@app.route("/Bronx1")
def bronx1(): 
    query = "select * from avg_response_after_covid"
    df = pd.read_sql_query(query, engine)
    json_df = df.to_json()
    
    return json_df

@app.route("/Bronx2")
def bronx2():
    query2 = "select * from avg_response_before_covid"
    df2 = pd.read_sql_query(query2, engine)
    json_df2 = df2.to_json()

    return json_df2

@app.route("/Bronx3")
def bronx3():
    query3 = "select * from initial_severity_bx"
    df3 = pd.read_sql_query(query3, engine)
    json_df3 = df3.to_json()

    return json_df3

@app.route("/Queens1")
def queens1(): 
    query = "select * from avg_response_after_covid"
    df = pd.read_sql_query(query, engine)
    json_df = df.to_json()
    
    return json_df

@app.route("/Queens2")
def queens2():
    query2 = "select * from avg_response_before_covid"
    df2 = pd.read_sql_query(query2, engine)
    json_df2 = df2.to_json()

    return json_df2

@app.route("/Queens3")
def queens3():
    query3 = "select * from initial_severity_q"
    df3 = pd.read_sql_query(query3, engine)
    json_df3 = df3.to_json()

    return json_df3

@app.route("/Brooklyn1")
def brooklyn1(): 
    query = "select * from avg_response_after_covid"
    df = pd.read_sql_query(query, engine)
    json_df = df.to_json()
    
    return json_df

@app.route("/Brooklyn2")
def brooklyn2():
    query2 = "select * from avg_response_before_covid"
    df2 = pd.read_sql_query(query2, engine)
    json_df2 = df2.to_json()

    return json_df2

@app.route("/Brooklyn3")
def brooklyn3():
    query3 = "select * from initial_severity_br"
    df3 = pd.read_sql_query(query3, engine)
    json_df3 = df3.to_json()

    return json_df3

@app.route("/NYC1")
def nyc1():
    query1 = "select * from avg_response_after_covid"
    df1 = pd.read_sql_query(query1, engine)
    json_df1 = df1.to_json()

    return json_df1

@app.route("/NYC2")
def nyc2():
    query2 = "select * from avg_response_before_covid"
    df2 = pd.read_sql_query(query2, engine)
    json_df2 = df2.to_json()

    return json_df2

if __name__ == "__main__":
    app.run(debug=True)