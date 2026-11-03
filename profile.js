// 只需编辑这里即可替换个人资料。留空的简介、作品会显示待补充状态。
const profile = {
  name: 'liming06',
  github: 'https://liming06.github.io/',
  intro: '欢迎来到我的个人空间。在这里，了解我，也看看我的作品。',
  bio: '',
  tags: [],
  // 例如：{ title: '项目名称', description: '项目简介', url: 'https://github.com/你的账号/项目' }
  projects: []
};

const setText = (id, value) => { document.getElementById(id).textContent = value; };
setText('display-name', profile.name);
setText('footer-name', profile.name);
setText('intro', profile.intro);
setText('year', new Date().getFullYear());
document.title = `${profile.name} · 个人主页`;
function safeUrl(value) {
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; }
  catch { return null; }
}
const github = safeUrl(profile.github);
if (github) document.querySelectorAll('.github-link').forEach(link => { link.href = github; });
if (profile.bio) { setText('bio', profile.bio); document.getElementById('bio-note').hidden = true; }
if (profile.tags.length) {
  document.getElementById('tags').replaceChildren(...profile.tags.map(tag => {
    const item = document.createElement('span'); item.textContent = tag; return item;
  }));
}
if (profile.projects.length) {
  document.getElementById('projects').replaceChildren(...profile.projects.map((project, i) => {
    const url = safeUrl(project.url);
    const card = document.createElement(url ? 'a' : 'article'); card.className = 'project-card';
    if (url) { card.href = url; card.target = '_blank'; card.rel = 'noopener noreferrer'; }
    const number = document.createElement('span'); number.className = 'project-index'; number.textContent = `PROJECT / ${String(i + 1).padStart(2, '0')}`;
    const title = document.createElement('h3'); title.textContent = project.title;
    const description = document.createElement('p'); description.textContent = project.description;
    card.append(number, title, description); return card;
  }));
}
