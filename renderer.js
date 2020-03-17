var showdown  = require('showdown'),
converter = new showdown.Converter();

const Editor = () => {
    let addEvent = (element) => {
        element.addEventListener('click', (e) => {

            const wrap = document.createElement('div');
           
            wrap.appendChild(element.cloneNode(true));

            const inputElement = document.createElement("input");
            inputElement.style.height = `${element.offsetHeight}px`;
            inputElement.style.width = "100%";
            inputElement.style.marginBottom = `${window.getComputedStyle(element).marginBottom}`;
            inputElement.value = converter.makeMarkdown(wrap.innerHTML);

            editor.insertBefore(inputElement, element);

            element.remove();

        })
    }

    const editor = document.querySelector('.editor');
    

    window.addEventListener('keypress', (e) => {

        if (e.key == "Enter" && e.shiftKey) {
            for (let element of Array.from(editor.childNodes)) {

                if (element instanceof HTMLInputElement) {
                    const html = converter.makeHtml(element.value);
                    const htmlElement = new DOMParser().parseFromString(html, 'text/html').body.childNodes[0];

                    editor.insertBefore(htmlElement, element);
                    addEvent(htmlElement);

                    element.remove();
    
                }
    
            }
        }

        

    });

    const editorElements = editor.childNodes;

    for (let element of Array.from(editorElements)) {
        addEvent(element);
    }


}

Editor();