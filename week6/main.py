from fastapi import FastAPI, Request, Form, status
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse, HTMLResponse
from starlette.middleware.sessions import SessionMiddleware
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

app.add_middleware(SessionMiddleware, secret_key='some-random-string')

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse(request=request, name='pages/index.html')

@app.get('/member')
async def member(request: Request):
    if request.session['user']==[]:
        return RedirectResponse(url='/', status_code=status.HTTP_302_FOUND)
    mycursor=mydb.cursor()
    mycursor.execute('SELECT member.name, message.content FROM message LEFT JOIN member ON message.member_id = member.id;')
    myresult=mycursor.fetchall()
    messages=[]
    for m in myresult:
        messages.insert(0, {'name':m[0], 'content':m[1]})
    return templates.TemplateResponse(request=request, name='pages/member.html', context={"name": request.session['user']['name'], "messages": messages})

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
        mydb.commit()
        return RedirectResponse(url='/', status_code=status.HTTP_302_FOUND)
    return RedirectResponse(url='/error?message=帳號已被使用', status_code=status.HTTP_302_FOUND)

@app.post('/signin')
async def signin(username: Annotated[str, Form()], password: Annotated[str, Form()], request: Request):
    mycursor=mydb.cursor()
    mycursor.execute('SELECT * FROM member WHERE username = %s', (username, ))
    myresult=mycursor.fetchall()
    if myresult==[] or myresult[0][3]!=password:
        return RedirectResponse(url=f'/error?message=帳號或密碼輸入錯誤', status_code=status.HTTP_302_FOUND)
    user_data=myresult[0]
    request.session['user']={'id': user_data[0], 'username': user_data[2], 'name': user_data[1]}  
    return RedirectResponse(url='/member', status_code=status.HTTP_302_FOUND)

@app.get('/signout')
async def signout(request: Request):
    request.session['user']=[]
    return RedirectResponse(url='/', status_code=status.HTTP_302_FOUND)

@app.post('/createMessage')
async def create_message(message: Annotated[str, Form()], request: Request):
    mycursor=mydb.cursor()
    mycursor.execute('INSERT INTO message(member_id, content) VALUE (%s, %s)', (request.session['user']['id'], message))
    mydb.commit()
    return RedirectResponse(url='/member', status_code=status.HTTP_302_FOUND)

@app.get('/test')
async def test():
    mycursor=mydb.cursor()
    mycursor.execute('SELECT*FROM member WHERE username="123456"')
    myresult=mycursor.fetchall()
    print(myresult)
    return {'return': 'OK'}

app.mount('/static', StaticFiles(directory='static'), name='static')