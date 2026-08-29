import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite+aiosqlite:///./saveflow.db")

# Fix PostgreSQL postgres:// URL format if passed
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
elif DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

connect_args = {"check_same_thread": False} if "sqlite" in DATABASE_URL else {}

engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    connect_args=connect_args
)

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

Base = declarative_base()

async def get_db():
    """Dependency for obtaining async DB sessions."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

async def init_db():
    """Initializes database tables and ensures new columns exist."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
        # SQLite schema migration check for Customer table
        if "sqlite" in DATABASE_URL:
            from sqlalchemy import text
            res = await conn.execute(text("PRAGMA table_info(customers)"))
            cols = [row[1] for row in res.fetchall()]
            
            new_cols = [
                ("ai_risk_score", "INTEGER DEFAULT 0"),
                ("baseline_risk_score", "INTEGER DEFAULT 0"),
                ("risk_disagreement", "BOOLEAN DEFAULT 0"),
                ("evidence_confidence", "FLOAT DEFAULT 0.95"),
                ("risk_drivers", "TEXT"),
                ("protective_signals", "TEXT"),
                ("reasoning", "TEXT"),
                ("specialist_evidence", "TEXT"),
                ("rocketride_execution_id", "VARCHAR"),
                ("rocketride_pipeline", "VARCHAR"),
                ("llm_provider", "VARCHAR"),
                ("llm_model", "VARCHAR"),
                ("fallback_used", "BOOLEAN DEFAULT 0")
            ]
            
            for col_name, col_type in new_cols:
                if col_name not in cols:
                    try:
                        await conn.execute(text(f"ALTER TABLE customers ADD COLUMN {col_name} {col_type}"))
                    except Exception as e:
                        print(f"[DB MIGRATION] Skipping customers.{col_name}: {e}")

            # SQLite schema migration check for risk_scores table
            res_rs = await conn.execute(text("PRAGMA table_info(risk_scores)"))
            cols_rs = [row[1] for row in res_rs.fetchall()]
            for col_name, col_type in new_cols:
                if col_name not in cols_rs:
                    try:
                        await conn.execute(text(f"ALTER TABLE risk_scores ADD COLUMN {col_name} {col_type}"))
                    except Exception as e:
                        print(f"[DB MIGRATION] Skipping risk_scores.{col_name}: {e}")
