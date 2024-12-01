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
        // const resultsList = document.getElementById("results");
        // resultsList.innerHTML = ""; // 清空旧结果

        // if (results.length > 0) {
        //     results.forEach((user) => {
        //         const li = document.createElement("li");
        //         li.textContent = `${user.name} (${user.email})`;
        //         resultsList.appendChild(li);
        //     });
        // } else {
        //     resultsList.innerHTML = "<li>No results found</li>";
        // }
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
};
export const postNewEvent = async (newAppointment)=>{
    try {
        // 发送 POST 请求到登录 API
        // const gasts = newAppointment.gasts.map(gast=>{_id:gast._id, userName:gast.userName});
        // console.log("gasts",gasts);
        // const data = {
        //     ...newAppointment,
        //     gasts: [...gasts]
        // };
        // console.log("data",data);

        const response = await fetch('http://localhost:3000/event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAppointment),
        });
        if (response.ok) {
            const data = await response.json();
            // 假设后端返回 { userName: "JohnDoe", token: "jwt-token" }
            console.log("post response",data)
            // 更新全局状态
            // userInfoDispatch({ type: 'SET_LOGIN', payload: data.userName });
            // navigator("/main");
            // console.log("login response returned", data)
            return true;

        } else {
            // 登录失败
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
                // conditions: { status: "active" }
            }),
        });
        console.log("getEvents response", response);
        if (response.ok) {
            const data = await response.json();
            // 假设后端返回 { userName: "JohnDoe", token: "jwt-token" }
            console.log("get event response",data)
            // 更新全局状态
            // userInfoDispatch({ type: 'SET_LOGIN', payload: data.userName });
            // navigator("/main");
            // console.log("login response returned", data)
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
        console.log("updateEventAsGuest id",id)
        console.log("updateEventAsGuest request",request)
        const response = await fetch(`${SERVER_URL}/event/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...request
                // conditions: { status: "active" }
            }),
        });
        // console.log("updateEventAsGuest response", response);
        if (response.ok) {
            const data = await response.json();
            // 假设后端返回 { userName: "JohnDoe", token: "jwt-token" }
            console.log("updateEventAsGuest response",data)
            // 更新全局状态
            // userInfoDispatch({ type: 'SET_LOGIN', payload: data.userName });
            // navigator("/main");
            // console.log("login response returned", data)
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
                // conditions: { status: "active" }
            }),
        });
        // console.log("updateEventAsGuest response", response);
        if (response.ok) {
            const data = await response.json();
            // 假设后端返回 { userName: "JohnDoe", token: "jwt-token" }
            console.log("updateEventAsGuest response",data)
            // 更新全局状态
            // userInfoDispatch({ type: 'SET_LOGIN', payload: data.userName });
            // navigator("/main");
            // console.log("login response returned", data)
            return data;

        } else {
            const error = await response.json();
            console.log("update event fail",error.message)
        }

    } catch (error) {
        console.log("update event, error", error)
    }

}
