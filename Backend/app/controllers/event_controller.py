from datetime import datetime, timedelta
from bson.regex import Regex
from app.core.database import db 

from app.core.security import is_authorized_user_to_event, is_event_exist

async def create_event(event_data, organizer_email):

    event_dict = event_data.dict()

    event_dict["organizer"] = organizer_email
    event_dict["attendees"] = []  
    event_dict["invited_attendees"] = []
    event_dict["collaborators"] = []
    event_dict["invited_collaborators"] = []

    result = await db.events.insert_one(event_dict)
    event_dict["_id"] = str(result.inserted_id)


    return {
        "message": "Event created successfully",
        "event": event_dict
    }


async def get_my_events(user_email: str, keyword: str | None = None, date: str | None = None, role: str | None = None):
    events = []

    organizer_cursor = db.events.find({"organizer": user_email})
    async for event in organizer_cursor:
        event["_id"] = str(event["_id"])
        events.append(event)

    attendee_cursor = db.events.find({"attendees.email": user_email})
    async for event in attendee_cursor:
        event["_id"] = str(event["_id"])
        if event["_id"] not in [e["_id"] for e in events]:
            events.append(event)

    collaborator_cursor = db.events.find({"collaborators.email": user_email})
    async for event in collaborator_cursor:
        event["_id"] = str(event["_id"])
        if event["_id"] not in [e["_id"] for e in events]:
            events.append(event)


    def matches(event):
        
        if role:
            if role == "organizer" and event["organizer"] != user_email:
                return False
            if role == "attendee" and not any(a["email"] == user_email for a in event.get("attendees", [])):
                return False
            if role == "collaborator" and not any(c["email"] == user_email for c in event.get("collaborators", [])):
                return False

        
        if keyword:
            if keyword.lower() not in event.get("title", "").lower() and keyword.lower() not in event.get("description", "").lower():
                return False

       
        if date:
            if date not in event.get("date", ""):
                return False

        return True

    filtered_events = [e for e in events if matches(e)]

    if not filtered_events:
        return {"message": "You do not have any events yet. Create one now!"}

    return filtered_events


async def invite_user_to_event(event_title, organizer_email, invited_email, role: str):

    """
    role: "attendee" or "collaborator"
    """
    if not await is_event_exist(event_title):
        return {"message": "Event does not exist."}
    
     
    if await is_authorized_user_to_event(event_title, organizer_email) is False:
        return {"message": "you are not authorized to invite users to this event"}
    
    if(role not in ["attendee", "collaborator"]):
        return {"message": "Invalid role specified. Must be 'attendee' or 'collaborator'."}
    

    invited_field = f"invited_{role}s"

    
    result = await db.events.update_one(
        {
            "title": event_title,
            "organizer": organizer_email,
            f"{invited_field}.email": {"$ne": invited_email}
        },
        {
            "$push": {invited_field: {"email": invited_email, "status": "Not Going"}}
        }
    )

    if result.matched_count == 0:
        return {"message": "this user already invited"}

    return {"message": f"User invited successfully as {role}"}




async def delete_event(event_title, organizer_email):
    if(is_event_exist(event_title) is False):
        return {"message": "Event does not exist."}

    if await is_authorized_user_to_event(event_title, organizer_email) is False:
        return {"message": "you are not authorized to delete this event"}

    result = await db.events.delete_one(
        {"title": event_title, "organizer": organizer_email}
    )

    if result.deleted_count == 0:
        return {"message": "Event could not be deleted."}
    
    return {"message": "Event deleted successfully"}



async def update_invitation_status(event_title, user_email, role, new_status):

    if not await is_event_exist(event_title):
        return {"message": "Event does not exist."}

    if role not in ["attendee", "collaborator"]:
        return {"message": "Invalid role specified. Must be 'attendee' or 'collaborator'."}

    if new_status not in ["Going", "Maybe", "Not Going"]:
        return {"message": "Invalid status."}
    

    invited_field = f"invited_{role}s"
    main_field = f"{role}s"

    if new_status == "Going":
        result = await db.events.update_one(
            {
                "title": event_title,
                f"{invited_field}.email": user_email
            },
            {
                "$pull": {invited_field: {"email": user_email}},
                "$addToSet": {main_field: {"email":user_email, "status": new_status} }
            }
        )

    else:
        result = await db.events.update_one(
            {
                "title": event_title,
                f"{invited_field}.email": user_email
            },
            {
                "$set": {f"{invited_field}.$.status": new_status}
            }
        )

    if result.matched_count == 0:
        return {"message": "No invitation found for this user in this event."}

    return {"message": f"Status updated to {new_status}"}



async def get_user_invitations(user_email: str, role: str):
    """
    Returns all invitations for the user for a specific role
    """
    if role not in ["attendee", "collaborator"]:
        return {"message": "Invalid role specified. Must be 'attendee' or 'collaborator'."}

    invited_field = f"invited_{role}s"
    main_field = f"{role}s"
    invitations = []

    events_cursor_1 = db.events.find({f"{invited_field}.email": user_email})
    events_cursor_2 = db.events.find({f"{main_field}.email": user_email})

    async for event in events_cursor_1:
        for invite in event.get(invited_field, []):
            if invite["email"] == user_email:
                invitations.append({
                    "event_title": event["title"],
                    "role": role,
                    "status": invite["status"]
                })

    async for event in events_cursor_2:
        for invite in event.get(invited_field, []):
            if invite["email"] == user_email:
                invitations.append({
                    "event_title": event["title"],
                    "role": role,
                    "status": invite["status"]
                })
    return invitations


async def get_event_invitation_status(event_title, organizer_email):
    """
    Organizer can view all invited users with their status
    """

    if(not await is_event_exist(event_title)):
        return {"message": "Event does not exist."}
    
    if await is_authorized_user_to_event(event_title, organizer_email) is False:
        return {"message": "you are not authorized to view invitations for this event"}
    

    event = await db.events.find_one({"title": event_title, "organizer": organizer_email})
   
    if not event:
        return {"message": "Event not found."}

    invited_attendees = event.get("invited_attendees", [])
    invited_collaborators = event.get("invited_collaborators", [])
    actual_attendees = event.get("attendees", [])
    actual_collaborators = event.get("collaborators", [])

    return {
        "event_title": event_title,
        "invited_attendees": invited_attendees,
        "invited_collaborators": invited_collaborators,
        "actual_attendees": actual_attendees,
        "actual_collaborators": actual_collaborators
    }
