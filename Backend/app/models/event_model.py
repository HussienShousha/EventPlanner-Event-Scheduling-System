from pydantic import BaseModel, EmailStr
from typing import List, Optional

class Invitation(BaseModel):
    email: EmailStr
    status: str = "Not Going"

class EventModel(BaseModel):
   id: Optional[str]
   title: str
   date: str
   time: str
   location: str
   description: str

   organizer: EmailStr   #email of the organizer as email unique and i can use it from token
   invited_attendees: List[Invitation] = []
   attendees: List[Invitation] = []
   invited_collaborators: List[Invitation] = []
   collaborators: List[Invitation] = []



