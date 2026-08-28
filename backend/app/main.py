import os
from dotenv import load_dotenv
dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../.env'))
load_dotenv(dotenv_path=dotenv_path, override=True)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy import select
from .database import init_db, AsyncSessionLocal
from .models import HistoricalOutcome
from .services.seed_service import seed_database
from .rocketride.memory import memory_store
from .api import customers, analyze, interventions, analytics, webhook

app = FastAPI(
    title="SaveFlow AI — Churn Rescue Desk Backend",
    description="RocketRide-powered autonomous SaaS retention system for NovaCloud Inc.",
    version="1.0.0"
)

# Enable CORS for local Vite dev server (http://localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(customers.router)
app.include_router(analyze.router)
app.include_router(interventions.router)
app.include_router(analytics.router)
app.include_router(webhook.router)

@app.on_event("startup")
async def on_startup():
    """
    Initializes DB schema, seeds initial NovaCloud dataset,
    and rehydrates historical outcome memory store from SQLite database on startup.
    """
    await init_db()
    async with AsyncSessionLocal() as session:
        await seed_database(session)

        # Hydrate Historical Memory Store from SQLite DB
        res = await session.execute(select(HistoricalOutcome))
        db_outcomes = res.scalars().all()
        outcome_dicts = [
            {
                "id": o.id,
                "customer_name": o.customer_name,
                "risk_score": o.risk_score,
                "risk_level": o.risk_level,
                "signals": o.signals_json if isinstance(o.signals_json, list) else [],
                "playbook": o.playbook,
                "action": o.action,
                "outcome": o.outcome,
                "saved_arr": o.saved_arr,
                "notes": o.notes
            }
            for o in db_outcomes
        ]
        memory_store.hydrate_from_db(outcome_dicts)
        print(f"Memory store successfully rehydrated with {len(outcome_dicts)} SQLite historical outcome records.")

@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "system": "SaveFlow AI",
        "company": "NovaCloud Inc",
        "rocketride_engine": "online",
        "workspace_capacity": 10000
    }

# Serve static frontend files if built
frontend_dist = os.path.join(os.path.dirname(__file__), "../../frontend/dist")
if os.path.exists(frontend_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        if full_path.startswith("api/"):
            return None
        file_path = os.path.join(frontend_dist, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(frontend_dist, "index.html"))
