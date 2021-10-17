(function () {

PageSize = 1;
configs = [];

const OPEN_STATE = 'open';

const getConfig = () => {
    fetch('https://api.github.com/repos/52FeidianStudio/52FeidianStudio.github.io/issues')
    .then((res) => (res.json()))
    .then((res) => { 
        configs = (res || [])
        .filter((item) => (item.state === OPEN_STATE))
        .map((item) => ({
            title: item.title,
            url: item.html_url,
            date: item.updated_at,
            tag: (item.labels && item.labels.length !== 0) ? item.labels : ['默认']
        }));
        addPost();
     });
}

const createNode = (config) => {
    const { title, tag, date, url } = config;
    const container = document.createElement('div');
    container.className = 'article-container';
    const tpl = `
    <a href="${url}" target="_blank">
        <div class="article-header">
            <div>
                ${title}
            </div>
            <div class="article-tag-list">
                ${
                    tag.map((t) => {
                        return `
                        <div class="article-tag">
                            #${t}
                        </div>
                        `;
                    }).join('')
                }
            </div>
        </div>
        <div class="article-date">
            ${date}
        </div>
    </a>       
    `;
    container.innerHTML = tpl;
    return container;
}

const addPost = () => {
    const main = document.querySelector('#main');
    (configs.slice(10*(PageSize-1), 10*PageSize) || []).forEach((config) => {
        main.appendChild(createNode(config));
    });
};

window.onload = () => {
    getConfig();
}

document.querySelector('#btn').addEventListener('click', () => {
    window.PageSize++;
    addPost();
})
})()