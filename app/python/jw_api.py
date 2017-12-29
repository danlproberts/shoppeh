# -*- coding: utf-8 -*-
"""
Created on Fri Dec  1 16:31:29 2017

@author: daniel.roberts
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import jw_search as jw

app = Flask(__name__)
CORS(app)

@app.route('/search_api')
def api_root():
    
    query = request.args.get('query')

    if query == "":
        
        data = [{'name': "Please enter a search term!"}]

    else:
    
        result = jw.searcher(query)
        
        print (result)
        
        if result == []:
            
            data = [{'name': "Sorry, no results!"}]
        
        else:
        
            data = result

    return jsonify(data)

if __name__ == '__main__':
    app.run(port="5000")
    #app.run(host="192.168.1.239", port="8080")