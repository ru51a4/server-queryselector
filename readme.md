Library for building dom from html and searching node in it.  
Supported CSS selectors: **tag** **.**(class) **#**(id) **>**(child combinator) **[]**(attr)  
example - "**nav[aria-label=Breadcrumb] ol > .breadcrumb-item-selected**"  
Node property:  
**attr** - attributes  
**tag** - tag  
**innerTEXT** - innerTEXT  
**childrens** - children nodes  
Node methods:  
**innerHTML**(printFormat) - get HTML, printFormat: boolean - print with tabs  
**querySelector**(cssselectors) - search node by css selector into the node  
input:
```js
const axios = require('axios').default;
const documentServer = require('@superwebteam/server-queryselector')

axios.get('https://education.github.com/pack').then((response)=>{
    const documentserver = new documentServer();
    documentserver.build(response.data);
    let breadcrumbSelected = documentserver.querySelector("nav[aria-label=Breadcrumb] ol > .breadcrumb-item-selected")[0];
    console.log(breadcrumbSelected.innerHTML());
});
```
output:
```html
<li class="breadcrumb-item-selected text-gray-light breadcrumb-item text-mono h5-mktg" aria-current="GitHub Student Developer Pack">GitHub Student Developer Pack</li>
```