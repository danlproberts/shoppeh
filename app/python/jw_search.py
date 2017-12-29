# -*- coding: utf-8 -*-
"""
Created on Sat Dec 23 20:33:39 2017

@author: Daniel
"""

from bs4 import BeautifulSoup
import requests
import time
from datetime import datetime

def query(ipt):
    
    ipt.replace(" ", "+")
    
    return str(ipt)

def presentable(txt):
    
    result = txt.lower().title().strip()
    
    return result


def searcher(search_term):
    
    result_list = []
    
    if search_term == "":
        
        return "Sorry!"
    
    else:
    
        website = 'http://www.jackwills.com'
        
        search_web = website + '/search?q='
        
        url = search_web + query(search_term)
        
        data = requests.get(url)
        
        #print (url)
        
        soup = BeautifulSoup(data.content, 'html.parser')
        
        html_list = soup.find_all('li', class_="grid-tile")
        
        for item in html_list:
        
            html_product = item.find('a', class_="name-link").text
            
            html_product_href = item.find('a', class_="name-link").get('href')
            
            html_product_img = item.find('img').get('src')
            
            html_product_des = item.find('div', class_="visually-hidden gifthits-description").p.get_text()
            
            item_dict = {}
            item_dict["name"] = presentable(html_product)
            item_dict["link"] = website + str(html_product_href)
            item_dict["img"] = html_product_img
            item_dict["des"] = html_product_des
            
            result_list.append(item_dict)
    
   # for products in html_list:
        
        
    
    #print ("Update! " + str(datetime.fromtimestamp(time.mktime(time.gmtime()))))
    
    return result_list