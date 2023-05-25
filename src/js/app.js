/** @format */

import docUtils from "./modules/documentHandler.js";
import gitHubUsers from "./modules/apiContent.js";

const App = (rootElement = document.body) => {
    const data = gitHubUsers;
    console.log("app:", data);
    const repoList = document.querySelector("#repos");
    const repoListHeader = document.createElement("h2");
    repoListHeader.textContent = "Repos";
    repoList.appendChild(repoListHeader);
    data.forEach((user) => {
        let userRepoList = document.createElement("div");
        userRepoList.classList.add("surface");
        userRepoList.setAttribute("id", user.username);
        const userRepoListHeader = document.createElement("h3");
        userRepoListHeader.textContent =
            user?.username === "mowglixx"
                ? "Personal Repos"
                : "Professional Repos";

        userRepoList.appendChild(userRepoListHeader);
        user.addRepos(userRepoList);
        repoList.appendChild(userRepoList);
    });
};

window.addEventListener("load", () => App(document.querySelector("body")));
