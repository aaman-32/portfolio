import { useRef, useState } from 'react';
import data from '../data.json';
import Stars from './components/Stars';
import { SVG } from './components/SVG';
import './App.css';

function App() {
  const [menu, setMenu] = useState(false);
  const [view_more, set_view_more] = useState(false);
  const [filters, setFilters] = useState({});
  const refs = useRef({});

  return (<div id="App">
    <Stars count={200} />
    <div className="top"> <h2>{data.contacts.name}</h2> <div onClick={() => setMenu(!menu)} className="button"> <SVG name={menu ? 'cancel' : 'menu'} /> </div> </div>
    <div className="menu" style={{ height: menu ? '' : '0', padding: menu ? '' : '0' }}>Menu</div>
    <div className="head">
      <h1>{data.contacts.intro}.</h1>
      <p>{data.contacts.bio.replace('<name>', data.contacts.name.split(' ')[1])}</p>
      <button className='main' onClick={() => window.scrollTo({ top: refs.projects?.offsetTop, behavior: 'smooth' })}>View Projects</button>
      <button className='other' onClick={() => window.scrollTo({ top: refs.contact?.offsetTop, behavior: 'smooth' })}>Contact Me</button>
      <span>
        <div onClick={() => window.location.href = data.contacts.github} className="button"><SVG name='github' /></div>
        <div onClick={() => window.location.href = data.contacts.linkedin} className="button"><SVG name='linkedin' /></div>
        <div onClick={() => window.location.href = data.contacts.x} className="button"><SVG name='twitter' /></div>
        <div onClick={() => window.location.href = data.contacts.email} className="button"><SVG name='email' /></div>
      </span>
    </div>
    <div className="body">
      <h1 ref={e => refs['projects'] = e}>Projects</h1>
      <h4>A curated selection of recent projects showcasing web apps, media & AI APIs, android apps and WhatsApp bots.</h4>
      <div className="list">
        {data.projects.map(project => <div className='project' key={Math.random()}><div className="frameworks">{project.frameworks.map(f => <img src={`/svgs/${data.framework_map[f]?.toLowerCase()}.svg`} />)}</div><img src={`/images/${project.name.toLowerCase().replace(' ', '_').replace('!', '')}.gif`} alt={project.name} /><b>{project.name}</b><p>{project.description}.</p><div className="tags">{project.tags.map(t => <div className='tag'>{data.tag_map[t]}</div>)}</div><div className="urls">{project.repo && <a href={project.repo}>Repository <SVG name='github' /></a>}{project.url && <a href={project.url}>Website <SVG name='website' /></a>}</div></div>)}
      </div>
      <h1 ref={e => refs['skills'] = e}>Skills</h1>
      <h4>We'll work on this...</h4>
      <div className="list">
        {data.framework_types.map(itm => <div className='skill'><b>{itm.name}</b><div className="frames">{itm.frames.map(f => <div className='frame'>{data.framework_map[f]}</div>)}</div></div>)}
      </div>
      <h1 ref={e => refs['contact'] = e}>Contacts</h1>
      <h4>Got a project idea? Get in touch with me on:</h4>
      <div className="list">
        {Object.keys(data.contacts.values).map(c => <div className='contact' onClick={() => /https?:\/\/[^\s]+/.test(data.contacts.values[c]) ? window.location = data.contacts.values[c] : navigator.clipboard.writeText(data.contacts.values[c])}><b>{c.charAt(0).toUpperCase() + c.slice(1)}</b><SVG name={c} /></div>)}
      </div>
    </div>
    <div className="tail">
      <a href={data.contacts.portfolio_repo}>Portfolio Repository <SVG name='github' /></a>
      <a href='/resume.pdf'>Download Resume <SVG name='pdf' /></a>
      <p>Powered by <a href={data.contacts.values.website}>Halo Studios</a></p>
      <p>© {new Date().getFullYear()} {data.contacts.name}</p>
      <p>Made with <img src='/svgs/react.svg' /></p>
    </div>
  </div>)
}

export default App
