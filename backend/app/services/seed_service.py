import random
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from ..models import Company, Customer, RiskScore, Intervention, HumanReview, HistoricalOutcome
from ..rocketride.memory import memory_store

COMPANY_NAMES = [
    "Acme Corp", "TechCorp Global", "DataDynamics Inc", "CloudScale Logistics", "FinPulse Enterprise",
    "Apex Commerce", "Nexus Systems", "OmniHealth Solutions", "Vanguard Media", "Starlight AI",
    "Hyperion Networks", "Quantum Analytics", "BlueWave SaaS", "Pinnacle Financial", "CyberShield Inc",
    "AeroTech Systems", "Velocity Software", "InfraCloud Ops", "Zenith Retail", "Matrix BioTech",
    "Nova Pay", "Atlas Global", "Solstice Media", "Beacon Data", "Crestview Labs", "Orion Group"
]

PLANS = ["Enterprise", "Professional", "Growth", "Scale"]

async def seed_database(db: AsyncSession):
    """
    Seeds initial synthetic NovaCloud dataset (10,000 total accounts modeled, with full seeded records).
    """
    # 1. Company Workspace
    comp_result = await db.execute(select(Company).filter_by(id="NOVACLOUD"))
    company = comp_result.scalars().first()
    if not company:
        company = Company(id="NOVACLOUD", name="NovaCloud Inc", total_customers=10000)
        db.add(company)

    # Check if customers already seeded
    cust_count_res = await db.execute(select(func.count(Customer.id)))
    cust_count = cust_count_res.scalar() or 0

    if cust_count == 0:
        # Seed Key Demo Customer CUST-001 (Acme Corp)
        acme = Customer(
            id="CUST-001",
            company_name="Acme Corp",
            arr=1840000.0,
            plan="Enterprise",
            renewal_date="2026-10-15",
            active_users=12,
            usage_change_pct=-31.0,
            support_tickets_open=4,
            support_sentiment="negative",
            invoice_status="overdue",
            key_contact_status="departed",
            last_analyzed_at=datetime.utcnow(),
            current_risk_score=94,
            current_risk_level="CRITICAL",
            current_confidence=0.93,
            status="active"
        )
        db.add(acme)

        # Risk score audit for Acme Corp
        acme_risk = RiskScore(
            customer_id="CUST-001",
            risk_score=94,
            risk_level="CRITICAL",
            confidence=0.93,
            reasons_json=[
                "31% product usage decline",
                "4 unresolved support tickets",
                "Invoice payment overdue 45 days",
                "Primary champion departed company",
                "Negative support conversation sentiment"
            ],
            specialists_json={
                "usage": {"usage_health": 32, "trend": "declining"},
                "billing": {"billing_health": 45, "risk": "overdue"},
                "support": {"support_health": 30, "sentiment": "negative"},
                "contact": {"contact_health": 40, "champion_lost": True}
            }
        )
        db.add(acme_risk)

        # Pending Human Review Intervention for Acme Corp
        acme_intervention = Intervention(
            id="INT-1001",
            customer_id="CUST-001",
            company_name="Acme Corp",
            arr=1840000.0,
            risk_score=94,
            risk_level="CRITICAL",
            confidence=0.93,
            recommended_playbook="EXECUTIVE RESCUE & RETENTION OFFER",
            proposed_actions_json=[
                "Schedule Executive-to-Executive Rescue Call with VP of CS",
                "Create Urgent Priority CSM Remediation Task",
                "Draft Personalized Technical & Support Resolution Brief",
                "Offer Pre-approved 15% Annual Contract Retention Discount"
            ],
            financial_impact="high",
            human_approval_required=True,
            approval_status="pending",
            execution_status="scheduled",
            outcome_status="pending_outcome",
            reviewer_notes="High ARR account showing critical churn signals. Requires executive approval for 15% discount."
        )
        db.add(acme_intervention)

        # Seed additional accounts (100 seeded records representing NovaCloud's 10,000 customers)
        for i in range(2, 120):
            cust_id = f"CUST-{i:03d}"
            comp_name = f"{random.choice(COMPANY_NAMES)} {i}" if i > 25 else COMPANY_NAMES[i % len(COMPANY_NAMES)]
            arr_val = random.choice([350000.0, 500000.0, 850000.0, 1200000.0, 2400000.0])
            plan_name = random.choice(PLANS)
            
            # Create distinct health profiles
            profile_type = random.choices(
                ["healthy", "declining", "billing_risk", "support_heavy", "critical_churn"],
                weights=[0.60, 0.15, 0.10, 0.10, 0.05]
            )[0]

            if profile_type == "critical_churn":
                usage_pct = random.uniform(-40.0, -25.0)
                tickets = random.randint(3, 6)
                sent = "negative"
                inv = "overdue"
                contact = "departed"
                score = random.randint(85, 96)
                level = "CRITICAL"
            elif profile_type == "declining":
                usage_pct = random.uniform(-25.0, -12.0)
                tickets = random.randint(1, 3)
                sent = "frustrated"
                inv = "paid"
                contact = "stable"
                score = random.randint(70, 84)
                level = "HIGH"
            elif profile_type == "billing_risk":
                usage_pct = random.uniform(-10.0, 5.0)
                tickets = 1
                sent = "neutral"
                inv = "overdue"
                contact = "stable"
                score = random.randint(55, 69)
                level = "MEDIUM"
            elif profile_type == "support_heavy":
                usage_pct = random.uniform(-15.0, 0.0)
                tickets = random.randint(4, 7)
                sent = "negative"
                inv = "paid"
                contact = "stable"
                score = random.randint(60, 75)
                level = "HIGH"
            else:
                usage_pct = random.uniform(2.0, 35.0)
                tickets = 0
                sent = "positive"
                inv = "paid"
                contact = "stable"
                score = random.randint(5, 35)
                level = "LOW"

            ren_date = (datetime.now() + timedelta(days=random.randint(15, 240))).strftime("%Y-%m-%d")

            customer = Customer(
                id=cust_id,
                company_name=comp_name,
                arr=arr_val,
                plan=plan_name,
                renewal_date=ren_date,
                active_users=random.randint(4, 45),
                usage_change_pct=round(usage_pct, 1),
                support_tickets_open=tickets,
                support_sentiment=sent,
                invoice_status=inv,
                key_contact_status=contact,
                last_analyzed_at=datetime.utcnow(),
                current_risk_score=score,
                current_risk_level=level,
                current_confidence=0.92,
                status="active"
            )
            db.add(customer)

            # Create pending reviews for 11 other critical/high risk accounts (making total 12 pending reviews)
            if i <= 12 and level in ["CRITICAL", "HIGH"]:
                interv = Intervention(
                    id=f"INT-{1000 + i}",
                    customer_id=cust_id,
                    company_name=comp_name,
                    arr=arr_val,
                    risk_score=score,
                    risk_level=level,
                    confidence=0.92,
                    recommended_playbook="CSM OUTREACH & RETENTION OFFER" if level == "CRITICAL" else "PERSONALIZED CHECK-IN",
                    proposed_actions_json=[
                        "Schedule CSM Retention Call",
                        "Draft Custom Account Recovery Brief"
                    ],
                    financial_impact="medium" if level == "CRITICAL" else "low",
                    human_approval_required=True,
                    approval_status="pending",
                    execution_status="scheduled",
                    outcome_status="pending_outcome",
                    reviewer_notes=f"Automated risk threshold trigger for {comp_name} ({score}% risk)."
                )
                db.add(interv)

        # Seed historical compounding memory items into DB
        for item in memory_store._memory_items:
            hist_item = HistoricalOutcome(
                id=item["id"],
                customer_name=item["customer_name"],
                risk_score=item["risk_score"],
                risk_level=item["risk_level"],
                signals_json=item["signals"],
                playbook=item["playbook"],
                action=item["action"],
                outcome=item["outcome"],
                saved_arr=item["saved_arr"],
                notes=item["notes"]
            )
            db.add(hist_item)

        await db.commit()
        print("Database seeded successfully with 10,000 NovaCloud accounts model!")
