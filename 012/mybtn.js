import { insTemplate } from "./insert.js"
await insTemplate("mybtn.html","tpl")

customElements.define("my-btn",
    class extends HTMLElement {
        constructor() {
            super()
            const tpl = document.getElementById("mybtn")
            const shadowRoot = this.attachShadow({ mode: "open" })
            shadowRoot.append(tpl.content.cloneNode(true))
        }
    }
)

function myBtnHandler() {
    const b = document.querySelector("my-btn")
    const btn = b.shadowRoot.querySelector("button")
    btn.addEventListener("click", () => console.log("MyBtn clicked"))
}
myBtnHandler()
