const pako = require('pako');
 
 class DrawIO{
    constructor({ data, config, api, readOnly }){
        this.api = api;
        this.readOnly = readOnly;
        this.drawUrl =  'https://embed.diagrams.net/?embed=1&ui=min&spin=1&proto=json&configure=1';
        this.gXml = '';
        this.div = document.createElement('div');
        this.div.id = 'diagram';
        this.div.innerHTML = data.svgxml||require('../assets/defaultContents.svg').default;
        this.div.addEventListener('dblclick',(evt)=>{
            this.iframe = document.createElement('iframe');
			this.iframe.setAttribute('frameborder', '0');
            this.iframe.style.zIndex = 9999;
            this.iframe.style.width="100%";
            this.iframe.style.height="100%";
            this.iframe.style.position="absolute";
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
               // svg = atob(msg.data.substring(msg.data.indexOf(',') + 1));
                this.div.innerHTML = svg;  
                
                xmlDoc = this.parseXml(msg.xml);
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
                xmlDoc = this.parseXml(msg.xml);
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
            icon: require('../assets/icon.svg').default,
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

    parseXml(xml)
	{
		let parser = new DOMParser();
		return parser.parseFromString(xml, 'text/xml');
	}
}

module.exports = DrawIO;
