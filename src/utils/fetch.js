const RESULT_LIST_LIMIT = 10;
const SERVER_URL = "http://localhost:3000";
export const fetchSearch = async (keywords)=>{
    try {
        const url = `${SERVER_URL}/search?keywords=${encodeURIComponent(keywords.join(","))}&limit=${RESULT_LIST_LIMIT}`;
        const response = await fetch(url);
        const results = await response.json();
        console.log("response for search", results)
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

