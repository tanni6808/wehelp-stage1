from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse, HTMLResponse
from typing import Annotated

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

app.mount('/static', StaticFiles(directory='static'), name='static')