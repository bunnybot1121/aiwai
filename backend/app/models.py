from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .database import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(String, primary_key=True, default="NOVACLOUD")
    name = Column(String, default="NovaCloud Inc")
    total_customers = Column(Integer, default=10000)
    arr_currency = Column(String, default="INR")
    created_at = Column(DateTime, default=datetime.utcnow)

class Customer(Base):
    __tablename__ = "customers"

    id = Column(String, primary_key=True) # e.g. CUST-001
    company_name = Column(String, nullable=False)
    arr = Column(Float, nullable=False)
    plan = Column(String, default="Enterprise")
    renewal_date = Column(String, nullable=False)
    
    # Telemetry health signals
    active_users = Column(Integer, default=12)
    usage_change_pct = Column(Float, default=-5.0)
    support_tickets_open = Column(Integer, default=0)
    support_sentiment = Column(String, default="neutral")
    invoice_status = Column(String, default="paid")
    key_contact_status = Column(String, default="stable")
    
    # Processed states
    last_analyzed_at = Column(DateTime, nullable=True)
    current_risk_score = Column(Integer, default=15)
    current_risk_level = Column(String, default="LOW")
    current_confidence = Column(Float, default=0.95)
    status = Column(String, default="active") # active, saved, churned

    risk_scores = relationship("RiskScore", back_populates="customer", cascade="all, delete-orphan")
    interventions = relationship("Intervention", back_populates="customer", cascade="all, delete-orphan")

class RiskScore(Base):
    __tablename__ = "risk_scores"

    id = Column(Integer, primary_key=True, autoincrement=True)
    customer_id = Column(String, ForeignKey("customers.id"), nullable=False)
    risk_score = Column(Integer, nullable=False)
    risk_level = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    reasons_json = Column(JSON, nullable=False)
    specialists_json = Column(JSON, nullable=True)
    dag_nodes_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    customer = relationship("Customer", back_populates="risk_scores")

class Intervention(Base):
    __tablename__ = "interventions"

    id = Column(String, primary_key=True) # e.g. INT-1001
    customer_id = Column(String, ForeignKey("customers.id"), nullable=False)
    company_name = Column(String, nullable=False)
    arr = Column(Float, nullable=False)
    risk_score = Column(Integer, nullable=False)
    risk_level = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    
    recommended_playbook = Column(String, nullable=False)
    proposed_actions_json = Column(JSON, nullable=False)
    financial_impact = Column(String, default="medium")
    
    human_approval_required = Column(Boolean, default=False)
    approval_status = Column(String, default="pending") # pending, approved, rejected, escalated, auto_executed
    execution_status = Column(String, default="scheduled") # scheduled, executed, cancelled
    outcome_status = Column(String, default="pending_outcome") # pending_outcome, saved, churned
    
    reviewer_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    customer = relationship("Customer", back_populates="interventions")
    human_reviews = relationship("HumanReview", back_populates="intervention", cascade="all, delete-orphan")

class HumanReview(Base):
    __tablename__ = "human_reviews"

    id = Column(Integer, primary_key=True, autoincrement=True)
    intervention_id = Column(String, ForeignKey("interventions.id"), nullable=False)
    customer_id = Column(String, nullable=False)
    action = Column(String, nullable=False) # APPROVED, REJECTED, ESCALATED
    reviewer = Column(String, default="Customer Success Lead")
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    intervention = relationship("Intervention", back_populates="human_reviews")

class HistoricalOutcome(Base):
    __tablename__ = "historical_outcomes"

    id = Column(String, primary_key=True)
    customer_name = Column(String, nullable=False)
    risk_score = Column(Integer, nullable=False)
    risk_level = Column(String, nullable=False)
    signals_json = Column(JSON, nullable=False)
    playbook = Column(String, nullable=False)
    action = Column(String, nullable=False)
    outcome = Column(String, nullable=False) # Saved, Churned
    saved_arr = Column(Float, default=0.0)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
