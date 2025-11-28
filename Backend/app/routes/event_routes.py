from fastapi import APIRouter, Depends, Query
from app.controllers import event_controller
from app.schemas.event_schema import EventCreate, EventInvite
from app.core.security import authentication
router = APIRouter(prefix="/events", tags=["Events"])

@router.post("/create")
async def create_event(
    event_details: EventCreate,
    authenticated_user: dict = Depends(authentication)
):
    print("Authenticated user:", authenticated_user)
    return await event_controller.create_event(event_details, authenticated_user["email"])


@router.get("/view")
async def view_your_events(
    authenticated_user: dict = Depends(authentication),
    keyword: str | None = Query(None),
    date: str | None = Query(None),
    role: str | None = Query(None)
):
    return await event_controller.get_my_events(
        authenticated_user["email"],
        keyword,
        date,
        role
    )


@router.post("/invite/{role}")
async def invite_user(
    role:str,
    invite_data: EventInvite,
    authenticated_user: dict = Depends(authentication), #organizer email
):
    return await event_controller.invite_user_to_event(
        invite_data.event_title,
        authenticated_user["email"],
        invite_data.invited_email,
        role
    )


@router.put("/invitation/{event_title}/{role}/{new_status}")
async def update_status(
    role: str,
    event_title: str,
    new_status: str,
    authenticated_user: dict = Depends(authentication) #user email
):
    return await event_controller.update_invitation_status(
        event_title,
        authenticated_user["email"],
        role,
        new_status
    )


@router.get("/invitations/{role}")
async def get_invitations(role: str, authenticated_user: dict = Depends(authentication)): #user email
    return await event_controller.get_user_invitations(authenticated_user["email"], role)


@router.get("/invited/{event_title}")
async def organizer_view_status(
    event_title: str,
    authenticated_user: dict = Depends(authentication) #organizer email
):
    return await event_controller.get_event_invitation_status(
        event_title,
        authenticated_user["email"]
    )