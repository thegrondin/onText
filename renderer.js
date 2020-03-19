const showdown  = require('showdown');
const autosize = require('autosize');

let converter = new showdown.Converter();

const Editor = () => {

    const makeEditable = (from, to = null) => {

        /*const edit = (element) => {

            const wrap = document.createElement('div');
           
            wrap.appendChild(element.cloneNode(true));

            const inputElement = document.createElement("input");
            inputElement.style.height = `${element.offsetHeight}px`;
            inputElement.style.width = "100%";
            inputElement.style.marginBottom = `${window.getComputedStyle(element).marginBottom}`;
            inputElement.value = converter.makeMarkdown(wrap.innerHTML);

            editor.insertBefore(inputElement, element);

            element.remove();
        }*/

        const edit = (from, to) => {
            
            if (!from || !to) return;

            let next = from;
            let html = "";

            let elements = [];

            while(next != to && next && next.type != 'textarea' ) {
    
                elements.push(next);

                console.log("Next", next);
                const wrap = document.createElement('div');
                wrap.appendChild(next.cloneNode(true));

                html += wrap.innerHTML;
                next = next.nextSibling.nextElementSibling;
                
                wrap.remove();
                
            }

            const wrap = document.createElement('div');
            wrap.appendChild(to.cloneNode(true));

            html += wrap.innerHTML;

            let editSection = document.createElement('textarea');
            editSection.value = converter.makeMarkdown(html);
            editSection.style.width = "100%"
            

            editor.insertBefore(editSection, to);

            autosize(document.querySelectorAll('textarea'));

            elements.push(to);
            console.log("To", to);

            for (let element of elements) {
                element.remove();
            }
        }

        if (!to) {
            edit(from, from);
            return;
        }
        
        edit(from, to);
        
    }

    let addEvent = (element) => {
        element.addEventListener('click', (e) => {
            makeEditable(element);
        })
    }

    const editor = document.querySelector('.editor');
    
    window.addEventListener('keypress', (e) => {

        if (e.key == "Enter" && e.shiftKey) {
            console.log('test');
            for (let element of Array.from(editor.childNodes)) {

                if (element instanceof HTMLTextAreaElement) {
                    const html = converter.makeHtml(element.value);
                    const nodes = new DOMParser().parseFromString(html, 'text/html').body.childNodes;
                   // console.log(htmlElement);

                 
                    for (let node of nodes) {

                        
                         
                            editor.insertBefore(node, element);
                            addEvent(node);

                        
                    }

                    //editor.insertBefore(htmlElement, element);
                    

                    element.remove();
    
                }
    
            }
        }
    });

    window.addEventListener('mouseup', () => {
        const selection = window.getSelection();

        if (selection.type == "Range") {
            const baseNode = selection.baseNode.parentNode;
            const extendNode = selection.extentNode.parentNode;

            const next = extendNode.nextSibling.nextElementSibling
           
            console.log(baseNode, extendNode, next, selection);

            if (Array.from(editor.childNodes).indexOf(baseNode) > Array.from(editor.childNodes).indexOf(extendNode)) {
                makeEditable(extendNode, baseNode);
            }
            else {
                makeEditable(baseNode, extendNode);
            }

        }
    });

    const editorElements = editor.childNodes;

    for (let element of Array.from(editorElements)) {
        addEvent(element);
    }
}

Editor();