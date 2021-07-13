import pako from 'pako';

class DrawIO{
    constructor(){
        this.drawUrl =  'https://embed.diagrams.net/?embed=1&ui=min&spin=1&proto=json&configure=1';
        this.gXml = '';
        this.img = new Image();
        this.img.src = '/draw_io.png';
        this.img.addEventListener('dblclick',(evt)=>{
            this.iframe = document.createElement('iframe');
			this.iframe.setAttribute('frameborder', '0');
            this.iframe.style.zIndex = 9999;
            this.iframe.setAttribute('src', this.drawUrl);
			document.body.appendChild(this.iframe);
        });
        window.addEventListener("message", this.postMessage);
        
    }

    postMessage(evt) {
        if (evt.data.length < 1) return;
        let msg = JSON.parse(evt.data);
        let xmlDoc = '';
        let encryptedModel = ''
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
                this.iframe.contentWindow.postMessage(
                    JSON.stringify({ action: "load", autosave: 1, xml: '' }),
                    "*"
                );
                this.iframe.contentWindow.postMessage(
                    JSON.stringify({ action: "status", modified: true }),
                    "*"
                );
                break;
            case "autosave":
                this.gXml = msg.xml;
                xmlDoc = this.parseXml(xml);
                encryptedModel = xmlDoc.querySelector("diagram").textContent;
                this.gXml = this.decode(encryptedModel);
                break;
            case "save":
                this.iframe.contentWindow.postMessage(
                    JSON.stringify({
                        action: "export",
                        format: "png",
                        //format: "xmlsvg",
                        xml: msg.xml,
                        spin: "Updating page",
                    }),
                    "*"
                );
                break;
            case "export":
                let img = msg.data;
                window.removeEventListener("message", this.postMessage);
                document.body.removeChild(this.iframe);
                xmlDoc = this.parseXml(msg.xml);
                encryptedModel = xmlDoc.querySelector("diagram").textContent;
                let decryptedModel = this.decode(encryptedModel);
                this.img.setAttribute('data-img',img);
                this.img.setAttribute('data-model',decryptedModel);
                this.close();
                break;
            case "exit":
                this.close();
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
            title: 'Image',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 1858 2499.6" viewBox="0 0 1858 2499.6"><path d="m1858 1778.7c0 44.8-36.8 79.3-79.3 79.3h-1699.4c-44.8 0-79.3-36.8-79.3-79.3v-1699.4c0-44.8 36.8-79.3 79.3-79.3h1699.3c44.8 0 79.3 36.8 79.3 79.3v1699.4z" fill="#f08705"/><path d="m1858 1778.7c0 44.8-36.8 79.3-79.3 79.3h-1142.9l-370.2-376 230-376 683-848.5 677.2 697.9z" fill="#df6c0c"/><path d="m1525.7 1038.2h-195.5l-207-351.8c46-9.2 80.5-50.6 80.5-98.9v-265.6c0-56.3-44.8-101.2-101.2-101.2h-344.8c-56.3 0-101.2 44.8-101.2 101.2v265.6c0 49.4 34.5 89.7 79.3 98.9l-207 353h-195.4c-56.3 0-101.2 44.8-101.2 101.2v265.6c0 56.3 44.8 101.2 101.2 101.2h344.9c56.3 0 101.2-44.8 101.2-101.2v-265.6c0-56.3-44.8-101.2-101.2-101.2h-33.3l204.7-349.5h159.8l205.8 349.5h-34.5c-56.3 0-101.2 44.8-101.2 101.2v265.6c0 56.3 44.8 101.2 101.2 101.2h344.9c56.3 0 101.2-44.8 101.2-101.2v-265.6c0-56.4-44.8-102.4-101.2-102.4z" fill="#fff"/></svg>>'
        };
    }

    render() {
        
        return this.img;
    }

    save(blockContent) {
        return {
            url: blockContent.value
        }
    }

    parseXml(xml)
	{
		let parser = new DOMParser();
		return parser.parseFromString(xml, 'text/xml');
	}
}
