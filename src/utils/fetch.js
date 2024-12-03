import { useContext } from "react";
import { UserContext } from "./UserContext";

const RESULT_LIST_LIMIT = 10;
const SERVER_URL = "http://localhost:3000";
export const fetchSearch = async (keywords)=>{
    try {
        const url = `${SERVER_URL}/search?keywords=${encodeURIComponent(keywords.join(","))}&limit=${RESULT_LIST_LIMIT}`;
        const response = await fetch(url);
        const results = await response.json();
        return results;
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
};
export const postNewEvent = async (newAppointment)=>{
    try {
        const response = await fetch('http://localhost:3000/event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAppointment),
        });
        if (response.ok) {
            const data = await response.json();
            return true;
        } else {
            const error = await response.json();
            console.log("post fail",error.message)
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getEvent = async (id, userId)=>{
    try {
        if(!userId) return;
        console.log("getEvents id",id)
        console.log("getEvents userId",userId)
        const response = await fetch(`${SERVER_URL}/api/files/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                userId: userId,
            }),
        });
        console.log("getEvents response", response);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const error = await response.json();
            console.log("get event fail",error.message)
        }

    } catch (error) {
        console.log("getEvents, error", error)
    }
}

export const updateEventAsGuest = async (id, request)=>{
    try {
        const response = await fetch(`${SERVER_URL}/event/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...request
            }),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const error = await response.json();
            console.log("update event fail",error.message)
        }

    } catch (error) {
        console.log("update event, error", error)
    }
}
export const updateEventAsCreator = async (id, event)=>{
    try {
        console.log("updateEventAsCreator id",id)
        console.log("updateEventAsCreator event",event)
        const response = await fetch(`${SERVER_URL}/event/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...event
            }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log("updateEventAsGuest response",data)
            return true;
        } else {
            const error = await response.json();
            console.log("update event fail",error.message)
            return false;
        }
    } catch (error) {
        console.log("update event, error", error)
    }
}
export const getUser= async (userId)=>{
    try {
        const response = await fetch(`${SERVER_URL}/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log("fetchUser response",data)
            return data;
        } else {
            const error = await response.json();
            console.log("fetchUser fail",error.message)
            return null;
        }
    } catch (error) {
        console.log(error)
    }
}