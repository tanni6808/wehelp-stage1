from fastapi import FastAPI, Request, Form, status
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse, HTMLResponse
from typing import Annotated
import mysql.connector

mydb=mysql.connector.connect(
    host='localhost',
    user='root',
    password='123456',
    database='website'
)

app=FastAPI()
templates=Jinja2Templates(directory='templates')

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse(request=request, name='pages/index.html')

@app.get('/member')
async def member(request: Request):
    return templates.TemplateResponse(request=request, name='pages/member.html')

@app.get('/error')
async def error(request: Request, message: Annotated[str, None]):
    return templates.TemplateResponse(request=request, name='pages/error.html', context={"message": message})

@app.post('/signup')
async def signup(name: Annotated[str, Form()], username: Annotated[str, Form()], password: Annotated[str, Form()]):
    mycursor=mydb.cursor()
    mycursor.execute('SELECT*FROM member WHERE username = %s', (username, ))
    myresult=mycursor.fetchall()
    if myresult==[]:
        mycursor.execute('INSERT INTO member(name, username, password) VALUE (%s, %s, %s)', (name, username, password))
        return RedirectResponse(url='/', status_code=status.HTTP_302_FOUND)
    return RedirectResponse(url=f'/error?message=Repeated username', status_code=status.HTTP_302_FOUND)

@app.post('/signin')
async def signin(username: Annotated[str, Form()], password: Annotated[str, Form()]):
    mycursor=mydb.cursor()
    mycursor.execute('SELECT password FROM member WHERE username = %s', (username, ))
    myresult=mycursor.fetchall()
    if myresult==[] or myresult[0]!=password:
        return {'reuslt': myresult}
    print(myresult)
    return {'pw': myresult[0]}

@app.get('/test')
async def test():
    mycursor=mydb.cursor()
    mycursor.execute('SELECT*FROM member WHERE username="123456"')
    myresult=mycursor.fetchall()
    print(myresult)
    return {'return': 'OK'}

app.mount('/static', StaticFiles(directory='static'), name='static')