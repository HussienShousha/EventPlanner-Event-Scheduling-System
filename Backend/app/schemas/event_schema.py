from pydantic import BaseModel

class EventCreate(BaseModel):
    title: str
    date: str
    time: str
    location: str
    description: str


class EventInvite(BaseModel):
    event_title: str
    invited_email: str
