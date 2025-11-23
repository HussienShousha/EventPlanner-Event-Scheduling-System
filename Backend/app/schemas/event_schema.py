from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class EventCreate(BaseModel):
    title: str
    date: datetime
    time: str
    location: str
    description: str


class EventInvite(BaseModel):
    event_title: str
    invited_email: str
