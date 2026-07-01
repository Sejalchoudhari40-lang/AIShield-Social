from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routes.upload import router as upload_router
from routes.analysis import router as analysis_router
from routes.nlp import router as nlp_router
from routes.history import router as history_router
from routes.analyze_complete import router as analyze_complete_router
from routes.auth import router as auth_router
from routes.dashboard import router as dashboard_router
from routes.recent_activity import router as recent_activity_router
from routes.chart import router as chart_router

from database.database import Base, engine
from database.analysis_model import Analysis
from database.user_model import User


app = FastAPI(
    title="AIShield Social API"
)

Base.metadata.create_all(bind=engine)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(analysis_router)
app.include_router(nlp_router)
app.include_router(history_router)
app.include_router(analyze_complete_router)
app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(recent_activity_router)
app.include_router(chart_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to AIShield Social Backend 🚀"
    }