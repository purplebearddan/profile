/** @format */

const APIAuth = {
    method: "get",
    headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
    }),
};

function repoCard(
    { name, full_name, html_url, description, language },
    username,
) {
    // Wrapper
    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("repoCardWrapper", "surface");
    cardWrapper.setAttribute("title", `${full_name} github repo info`);

    // link for title
    const cardHeaderAnchor = document.createElement("a");
    cardHeaderAnchor.title = full_name;
    cardHeaderAnchor.textContent = `Repo: ${name}`;
    cardHeaderAnchor.setAttribute("target", "_blank");
    cardHeaderAnchor.href = html_url;

    // title
    const cardHeader = document.createElement("h4");
    cardHeader.classList.add("repoCardHeader");
    cardHeader.appendChild(cardHeaderAnchor);
    cardWrapper.appendChild(cardHeader);

    const repoDescription = document.createElement("p");
    repoDescription.classList.add("repoCardDescription");
    repoDescription.title = `Repo description for ${name}`;
    repoDescription.textContent = !!description ? description : "";

    const repoOwner = document.createElement("span");
    repoOwner.classList.add("repoCardOwner");
    repoOwner.textContent = username;

    // not all repos have a language
    // if (!!language) {
    const repoLanguage = document.createElement("span");
    repoLanguage.classList.add("repoCardLanguage");
    repoLanguage.title = `${language}, Language that ${name} was mostly written in`;
    repoLanguage.textContent = !!language ? language : "No Lang specified";
    cardWrapper.appendChild(repoLanguage);
    // }

    // append items in order
    cardWrapper.appendChild(repoOwner);
    cardWrapper.appendChild(repoDescription);

    return cardWrapper;
}

class GithubUser {
    constructor(username) {
        this.username = username;
        this.api = `https://api.github.com`;
        this.paths = {
            user: `/users/${username}`,
            orgs: `/users/${username}/orgs`,
            repos: `/users/${username}/repos`,
        };
        this.info = {};

        this.update();
    }

    update() {
        for (let path in this.paths) {
            fetch(`${this.api}${this.paths[path]}`, APIAuth)
                .then((data) => data.json())
                .then((json) => {
                    this.info[path] = json;
                    console.log(json);
                });
        }
    }

    addRepos(element) {
        fetch(`${this.api}${this.paths["repos"]}`, APIAuth)
            .then((d) => d.json())
            .then((repos) => {
                for (let repo of repos) {
                    const card = repoCard(repo, this.username);
                    element.appendChild(card);
                }
                const viewMoreReposFooter = document.createElement("div");
                const viewMoreReposFooterLink = document.createElement("a");
                viewMoreReposFooterLink.href = `https://github.com/${this.username}?tab=repositories`;
                viewMoreReposFooterLink.textContent = "View More";
                viewMoreReposFooterLink.target = "_blank";
                viewMoreReposFooter.appendChild(viewMoreReposFooterLink);
                element.appendChild(viewMoreReposFooter);
            });
    }
}

const gitHubUsernames = [`mowglixx`, `purplebearddan`];

const gitHubUsers = gitHubUsernames.map((user) => {
    return new GithubUser(user);
});

export default gitHubUsers;
