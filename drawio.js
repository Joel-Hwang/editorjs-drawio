import pako from 'pako';

class DrawIO{
    constructor(){
        this.drawUrl =  'https://embed.diagrams.net/?embed=1&ui=min&spin=1&proto=json&configure=1';
        this.gXml = '';
        this.div = document.createElement('div');
        this.div.id = 'diagram';
        this.div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="51px" height="51px" viewBox="-0.5 -0.5 51 51" content="<mxfile host=&quot;embed.diagrams.net&quot; modified=&quot;2021-07-07T08:49:29.277Z&quot; agent=&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36&quot; etag=&quot;vZ6_GTTTdljhxFeNx6hg&quot; version=&quot;14.8.4&quot; type=&quot;embed&quot;><diagram id=&quot;14058d99-db58-e9f5-3aba-399879c13e25&quot; name=&quot;Page-1&quot;>jVNdb5swFP01PBYRTNPkEchHpyRttU6L1pfIgGOsGS41ppD9+tlgh6Bo0nhA9rnf5x47KC66rcBVfoCMcMf3ss5BK8f3F8u5+mvgYgFvAKhg2QDNRuCd/SEGtG4Ny0g9cZQAXLJqCqZQliSVEwwLAe3U7Qx8WrXClNwB7ynm9+iRZTI3U/jzEX8mjOa28my+HCwJTn9TAU1p6jk+OvffYC6wzWUGrXOcQXsDobWDYgEgh1PRxYRrai1tQ9zmH9Zr34KU8n8CkLcYQr4wb4jtue9MXiwbqslKH1nR0xZ9ESGZImuPE8LfoGaSQansCUgJhXLg2hBdqYiBg+hTWTLGHCFnVMdKqBSK62pY55l1RLUY9SVDi3oWUedcSi2GUM/mb3w3qdyEA60rkG6quvA3DwWsPrqX15fdj1/qepTBDjct7F6/qVtovw9tw9+LZXDcn2bR4fPchWSXnA5inUncwM/1ih7CeJ9G27BWrvVs7ilON5nA7YmBW5VUdXXPu1mFnpN0N5DZw5ZAQaS4KBdjDRZGE+bNoGDhIiOrdhTho/HKb/QXLN0nq36jfHrNP25fHYwA7HUUWm+7ecxo/Rc=</diagram></mxfile>" style="background-color: rgb(255, 255, 255);"><defs></defs><g><image x="-0.5" y="-0.10999999999999999" width="50" height="49.71" xlink:href="data:image/png;base64,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" preserveAspectRatio="none"></image></g></svg>`;
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

    parseXml(xml)
	{
		let parser = new DOMParser();
		return parser.parseFromString(xml, 'text/xml');
	}
}
