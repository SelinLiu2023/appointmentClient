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
        const gasts = newAppointment.gasts.map(gast=>gast._id);
        console.log("gasts",gasts);
        const data = {
            ...newAppointment,
            gasts: [...gasts]
        };
        console.log("data",data);

        const response = await fetch('http://localhost:3000/event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const data = await response.json();
            // 假设后端返回 { userName: "JohnDoe", token: "jwt-token" }
            console.log("post response",data)
            // 更新全局状态
            // userInfoDispatch({ type: 'SET_LOGIN', payload: data.userName });
            // navigator("/main");
            // console.log("login response returned", data)
            return data;

        } else {
            // 登录失败
            const error = await response.json();
            console.log("post fail",error.message)
        }

    } catch (error) {
        
    }

}

