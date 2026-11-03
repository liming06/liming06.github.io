// Edit this object to update your personal information.
const profile = {
  name: 'Lucas',
  handle: 'liming06',
  github: 'https://github.com/liming06',
  intro:
    "Master's student researching low-altitude airspace planning and intelligent airspace scheduling.",
  bio:
    "I'm Lucas, a master's student. My research focuses on low-altitude airspace planning and intelligent airspace scheduling.",
  tags: [
    "Master's Student",
    'Low-Altitude Airspace Planning',
    'Intelligent Airspace Scheduling'
  ],
  // Add projects here:
  // {
  //   title: 'Project name',
  //   description: 'A short description of the project.',
  //   url: 'https://github.com/liming06/repository-name'
  // }
  projects: []
};

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol)
      ? url.href
      : null;
  } catch {
    return null;
  }
}

setText('display-name', profile.name);
setText('footer-name', profile.name);
setText('handle', `@${profile.handle}`);
setText('intro', profile.intro);
setText('year', new Date().getFullYear());

document.title = `${profile.name} · Personal Website`;

const github = safeUrl(profile.github);

if (github) {
  document.querySelectorAll('.github-link').forEach(link => {
    link.href = github;
  });
}

if (profile.bio) {
  setText('bio', profile.bio);

  const note = document.getElementById('bio-note');
  if (note) {
    note.hidden = true;
  }
}

const tags = document.getElementById('tags');

if (tags && profile.tags.length) {
  tags.replaceChildren(
    ...profile.tags.map(tag => {
      const item = document.createElement('span');
      item.textContent = tag;
      return item;
    })
  );
}

const projects = document.getElementById('projects');

if (projects && profile.projects.length) {
  projects.replaceChildren(
    ...profile.projects.map((project, index) => {
      const url = safeUrl(project.url);
      const card = document.createElement(url ? 'a' : 'article');
      card.className = 'project-card';

      if (url) {
        card.href = url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
      }

      const number = document.createElement('span');
      number.className = 'project-index';
      number.textContent =
        `PROJECT / ${String(index + 1).padStart(2, '0')}`;

      const title = document.createElement('h3');
      title.textContent = project.title;

      const description = document.createElement('p');
      description.textContent = project.description;

      card.append(number, title, description);
      return card;
    })
  );
}
