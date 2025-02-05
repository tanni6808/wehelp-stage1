from fastapi import FastAPI, Request, Form, status
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware
from typing_extensions import Annotated

app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key='some-random-string')

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/signin")
async def signin(username: Annotated[str, Form()], password: Annotated[str, Form()], request: Request):
    if username=='test' and password=='test': 
        request.session['SIGNED_IN'] = True
        return RedirectResponse(url='/member', status_code=status.HTTP_302_FOUND)
    elif username=='' or password=='': return RedirectResponse(url='/error?message=請輸入帳號及密碼', status_code=status.HTTP_302_FOUND)
    return RedirectResponse(url='/error?message=帳號或密碼輸入錯誤', status_code=status.HTTP_302_FOUND)

@app.get("/member")
async def member(request: Request):
    if request.session['SIGNED_IN'] == False:
        return RedirectResponse(url='/', status_code=status.HTTP_302_FOUND)
    return templates.TemplateResponse("member.html", {"request": request})

@app.get("/error")
async def error(request: Request, message: str):
    return templates.TemplateResponse("error.html", {"request": request, "message": message})

@app.get("/signout")
async def signout(request: Request):
    request.session["SIGNED_IN"]=False
    return RedirectResponse(url='/', status_code=status.HTTP_302_FOUND)

@app.get('/square/{num}')
async def square(num: int, request: Request):
    return templates.TemplateResponse('square.html', {'request': request, 'result': num**2})