#!/usr/bin/env python3

from flask import Flask, request
from flask_mysqldb import MySQL
from flask_api import status

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'toDo'
mysql = MySQL(app)

cursor = mysql.connection.cursor()

sql_command = """ CREATE TABLE IF NOT EXISTS toDoItems (
id INTEGER PRIMARY KEY,
text VARCHAR(255),
done BOOLEAN);"""

cursor.execute(sql_command)

@app.route('/api/item/add', methods = ['POST'])
def add():
    id = request.get_json()['id']
    text = request.get_json()['text']
    done = request.get_json()['done']
    sql_command = """ INSERT INTO toDoItems(id, text, done)
    VALUES(?,?,?);"""
    cursor.execute(sql_command, id, text, done)
    mysql.connection.commit()
    mysql.connection.close()
    return status.HTTP_201_CREATED

@app.route('/api/item/get', methods = ['GET'])
def get():
    id = request.get_json()['id']
    sql_command = """SELECT * FROM toDoItems WHERE id = ?;"""
    toDo = cursor.execute(sql_command, id)
    mysql.connection.commit()
    mysql.connection.close()
    return {'id':toDo[0], 'text':toDo[1], 'done':toDo[2]}, status.HTTP_200_OK

@app.route('/api/item/delete', methods = ['DELETE'])
def delete():
    id = request.get_json()['id']
    sql_command = """DELETE FROM toDoItems WHERE id = ?;"""
    cursor.execute(sql_command, id)
    mysql.connection.commit()
    mysql.connection.close()
    return status.HTTP_200_OK

@app.route('/api/item/edit', methods = ['PUT'])
def edit():
    id = request.get_json()['id']
    text = request.get_json()['text']
    done = request.get_json()['done']
    sql_command = """UPDATE toDoItems SET text = ?, done = ? WHERE id = ?;"""
    cursor.execute(sql_command, text, done, id)
    mysql.connection.commit()
    mysql.connection.close()
    return status.HTTP_200_OK

if __name__ == '__main__':
    app.run(host='0.0.0.0')