class DrawIO{
    constructor(){
        this.drawUrl =  'https://embed.diagrams.net/?embed=1&ui=min&spin=1&proto=json&configure=1';
        this.gXml = '';
        this.div = document.createElement('div');
        this.div.id = 'diagram';
        this.div.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="203px" height="64px" viewBox="-0.5 -0.5 203 64" content="<mxfile host=&quot;embed.diagrams.net&quot; modified=&quot;2021-07-05T08:36:45.497Z&quot; agent=&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36&quot; etag=&quot;rclCly5K2UzYR21JBbYb&quot; version=&quot;14.8.4&quot; type=&quot;embed&quot;>
            <diagram id=&quot;14058d99-db58-e9f5-3aba-399879c13e25&quot; name=&quot;Page-1&quot;>jZM9c4MwDIZ/DTvgK03WkK+lU4bOjlGwLwZxxgTSX1+D5QCX610ZwHokWfYrEbG8Gk6GN/ILC9BRGhdDxPZRmm62mXuP4BlA7EFpVOFRMoOL+gGCIaxTBbSrQIuorWrWUGBdg7Arxo3Bfh12Q72u2vAS3sBFcP1Ov1VhJd0izWZ+BlXKUDnJtt5z5eJeGuxqqhel7DY93l3xsBddtJW8wH6B2CFiuUG0flUNOehR2iCbzzv+4X2d20Bt/5PA4k+f8uC6o8vvsbs6IZy6Wom7+0owQMe1zyBRL5WFS8PFaPduCiK2k7bSzkrc8oa1PfJK6XECzqAfYJXg5KCGJ5tg07Zj4iQeFGRxIyj4I6bgHDWa6Qwsnh7H0fB67Oiu1LxtKfddC5LnAcbCsECkzQmwAmueLoS8roRPoTkOY9zPQ5HGxORiIDJinOawfO0898ItqB3BnNs++Ra/Fjv8Ag==</diagram>
        </mxfile>" style="background-color: rgb(255, 255, 255);">
        <defs>
            <linearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="mx-gradient-ffcd28-1-ffa500-1-s-0">
                <stop offset="0%" style="stop-color:#FFCD28"></stop>
                <stop offset="100%" style="stop-color:#FFA500"></stop>
            </linearGradient>
            <linearGradient x1="0%" y1="0%" x2="0%" y2="100%" id="mx-gradient-ffffff-0.9-ffffff-0.1-s-0">
                <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.9"></stop>
                <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0.1"></stop>
            </linearGradient>
        </defs>
        <g>
            <rect x="0" y="0" width="200" height="60" rx="30" ry="30" fill="#000000" stroke="#000000" pointer-events="all" transform="translate(2,3)" opacity="0.25"></rect>
            <rect x="0" y="0" width="200" height="60" rx="30" ry="30" fill="url(#mx-gradient-ffcd28-1-ffa500-1-s-0)" stroke="#d79b00" pointer-events="all"></rect>
            <path d="M 31.5 -1 Q -1 -1 -1 31.5 L -1 24 Q 100 42 201 24 L 201 31.5 Q 201 -1 168.5 -1 Z" fill="url(#mx-gradient-ffffff-0.9-ffffff-0.1-s-0)" stroke="none" pointer-events="all"></path>
            <g transform="translate(-0.5 -0.5)">
                <switch>
                    <foreignObject style="overflow: visible; text-align: left;" pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility">
                        <div
                            xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 198px; height: 1px; padding-top: 30px; margin-left: 1px;">
                            <div style="box-sizing: border-box; font-size: 0; text-align: center; ">
                                <div style="display: inline-block; font-size: 18px; font-family: Helvetica; color: #000000; line-height: 1.2; pointer-events: all; font-weight: bold; white-space: normal; word-wrap: normal; ">Double click here</div>
                            </div>
                        </div>
                    </foreignObject>
                    <text x="100" y="35" fill="#000000" font-family="Helvetica" font-size="18px" text-anchor="middle" font-weight="bold">Double click here</text>
                </switch>
            </g>
        </g>
        <switch>
            <g requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"></g>
            <a transform="translate(0,-5)" xlink:href="https://www.diagrams.net/doc/faq/svg-export-text-problems" target="_blank">
                <text text-anchor="middle" font-size="10px" x="50%" y="100%">Viewer does not support full SVG 1.1</text>
            </a>
        </switch>
    </svg>`;
        this.div.addEventListener('dblclick',(evt)=>{
            this.iframe = document.createElement('iframe');
			this.iframe.setAttribute('frameborder', '0');
            this.iframe.style.zIndex = 9999;
            this.binded = this.postMessage.bind(this);
            window.addEventListener("message",this.binded ,false);
            this.iframe.setAttribute('src', this.drawUrl);
			document.body.appendChild(this.iframe);
        });
        
        
    }

    postMessage(evt) {
        if (evt.data.length < 1) return;
        let msg = JSON.parse(evt.data);
        let xmlDoc = '';
        let encryptedModel = ''
        let svg = '';
        switch (msg.event) {
            case "configure":
                this.iframe.contentWindow.postMessage(
                    JSON.stringify({
                        action: "configure",
                        config: {
                            defaultFonts: ["Humor Sans", "Helvetica", "Times New Roman"],
                        },
                    }),
                    "*"
                );
                break;
            case "init":
                svg = new XMLSerializer().serializeToString(this.div.firstChild);
                this.iframe.contentWindow.postMessage(
                    JSON.stringify({ action: "load", autosave: 1, xml: svg }),
                    "*"
                );
                
                break;
            case "autosave":
                svg = atob(msg.data.substring(msg.data.indexOf(',') + 1));
                this.div.innerHTML = svg;  
                
                xmlDoc = mxUtils.parseXml(msg.xml);
                encryptedModel = xmlDoc.querySelector("diagram").textContent;
                this.gXml = this.decode(encryptedModel);
                break;
            case "save":
                this.iframe.contentWindow.postMessage(
                    JSON.stringify({
                        action: "export",
                        format: "xmlsvg",
                        xml: msg.xml,
                        spin: "Updating page",
                    }),
                    "*"
                );
                break;
            case "export":
                svg = atob(msg.data.substring(msg.data.indexOf(',') + 1));
                this.div.innerHTML = svg;  
    
                window.removeEventListener("message", this.binded);
                document.body.removeChild(this.iframe);
                xmlDoc = mxUtils.parseXml(msg.xml);
                encryptedModel = xmlDoc.querySelector("diagram").textContent;
                let decryptedModel = this.decode(encryptedModel);
                this.div.setAttribute('mxgraph',decryptedModel);
                break;
            case "exit":
                window.removeEventListener("message", this.binded);
                document.body.removeChild(this.iframe);
                break;
        }
    }

    decode(data) {
        data = atob(data);
        data = pako.inflateRaw(
            Uint8Array.from(data, (c) => c.charCodeAt(0)),
            { to: "string" }
        );
        data = decodeURIComponent(data);
        return data;
    }


    static get toolbox() {
        return {
            title: 'Draw.IO',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 1858 2499.6" viewBox="0 0 1858 2499.6"><path d="m1858 1778.7c0 44.8-36.8 79.3-79.3 79.3h-1699.4c-44.8 0-79.3-36.8-79.3-79.3v-1699.4c0-44.8 36.8-79.3 79.3-79.3h1699.3c44.8 0 79.3 36.8 79.3 79.3v1699.4z" fill="#f08705"/><path d="m1858 1778.7c0 44.8-36.8 79.3-79.3 79.3h-1142.9l-370.2-376 230-376 683-848.5 677.2 697.9z" fill="#df6c0c"/><path d="m1525.7 1038.2h-195.5l-207-351.8c46-9.2 80.5-50.6 80.5-98.9v-265.6c0-56.3-44.8-101.2-101.2-101.2h-344.8c-56.3 0-101.2 44.8-101.2 101.2v265.6c0 49.4 34.5 89.7 79.3 98.9l-207 353h-195.4c-56.3 0-101.2 44.8-101.2 101.2v265.6c0 56.3 44.8 101.2 101.2 101.2h344.9c56.3 0 101.2-44.8 101.2-101.2v-265.6c0-56.3-44.8-101.2-101.2-101.2h-33.3l204.7-349.5h159.8l205.8 349.5h-34.5c-56.3 0-101.2 44.8-101.2 101.2v265.6c0 56.3 44.8 101.2 101.2 101.2h344.9c56.3 0 101.2-44.8 101.2-101.2v-265.6c0-56.4-44.8-102.4-101.2-102.4z" fill="#fff"/></svg>>'
        };
    }

    render() {
        
        return this.div;
    }

    save(blockContent) {
        return {
            svgxml: blockContent.innerHTML,
            mxgraph:blockContent.getAttribute('mxgraph'),
        }
    }
}



