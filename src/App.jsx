import { useRef, useState } from 'react';
import data from '../data.json';
import Stars from './components/Stars';
import { SVG } from './components/SVG';
import './App.css';

function App() {
  const [menu, setMenu] = useState(false);
  const [view_more, set_view_more] = useState(false);
  const refs = useRef({});

  return (<div id="App">
    <Stars count={200} />
    <div className="top">
      <h2>{data.contacts.name}</h2>
      <div className="button"> <SVG name={menu ? 'x' : 'menu'} /> </div>
    </div>
    <div className="head">
      <h1>{data.contacts.intro}.</h1>
      <p>{data.contacts.bio.replace('<name>', data.contacts.name.split(' ')[1])}</p>
      <button className='main' onClick={() => window.scrollTo({ x: refs.projects })}>View Projects</button>
      <button className='other'>Contact Me</button>
      <span>
        <div onClick={() => window.location.href = data.contacts.github} className="button"><SVG name='github' /></div>
        <div onClick={() => window.location.href = data.contacts.linkedin} className="button"><SVG name='linkedin' /></div>
        <div onClick={() => window.location.href = data.contacts.x} className="button"><SVG name='twitter' /></div>
        <div onClick={() => window.location.href = data.contacts.email} className="button"><SVG name='email' /></div>
      </span>
    </div>
    <div className="body">
      <h1 ref={(e) => ({ ...refs, projects: e })}>Projects</h1>
      <h4>A curated selection of recent projects showcasing web apps, media & AI APIs, android apps and WhatsApp bots.</h4>
      <div className="list">
        {data.projects.map(project => <div className='project' key={Math.random()}><div className="frameworks">{project.frameworks.map(f => <img src={`/svgs/${data.framework_map[f]}.svg`} />)}</div><img src={`/images/${project.name.toLowerCase().replace(' ', '_')}.jpg`} alt={project.name} /><b>{project.name}</b><p>{project.description}.</p><div className="tags">{project.tags.map(t => <div className='tag'>{t}</div>)}</div></div>)}
      </div>
    </div>
    <div className="tail">Made with <img src='/svgs/jsx.svg' /></div>
  </div>)
}

export default App
