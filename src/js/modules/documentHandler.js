const Doc = document;
const qS = (selector, parentNode = Doc) => {
    return parentNode.querySelector(selector);
};
const cE = (
    element = "div",
    attributes = {},
    eventListener = {
        type: "none",
        cb: function () {},
    }
) => {
    const newElement = document.createElement(element);

    if (attributes.length) {
        for (const prop in attributes) {
            if (attributes[prop].constructor === Array)
                newElement.setAttribute(prop, attributes[prop]);
        }
    }

    if (
        eventListener.hasOwnProperty("type") &&
        typeof eventListener.type == "string" &&
        eventListener.hasOwnProperty("cb") &&
        typeof eventListener.cb == "function"
    ) {
        newElement.addEventListener(eventListener.type, eventListener.cb);
    } else {
        console.error(newElement);
        console.error(
            `The above element can't use the "${eventListener.type}" event type`
        );
    }

    return newElement;
};

const docUtils = {
    Doc,
    qS,
    cE,
};

export default docUtils;
