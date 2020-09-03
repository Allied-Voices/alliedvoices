import React from 'react'
import { MapComponent } from 'react-leaflet'
import { PropTypes } from 'prop-types'
import './leaflet-sidebar.min.css'

const Eradius = 3958.8;

class Tab extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    anchor: PropTypes.oneOf(['top', 'bottom']),
    disabled: PropTypes.bool,
    // Provided by the Sidebar; don't mark as required (user doesn't need to include them):
    onClose: PropTypes.func,
    position: PropTypes.oneOf(['left', 'right']),
    active: PropTypes.bool,
  }

  state = {
    iframeOpen: null
  }

  expandTab = (index) => {
    if (this.state.iframeOpen === index) {
      this.setState({
        iframeOpen: null
      })
    } else {
      this.setState({
        iframeOpen: index
      })
    }
  }

  renderTabSection(voice, index) {
    // Determine message for the date
    const diff = Date.now() - Date.parse(voice.Date)
    var dateMsg;
    if (diff < 60000) dateMsg = `${diff / 1000} seconds ago`;
    else if (diff < 3600000) dateMsg = `${diff / 1000 / 60} minutes ago`;
    else if (diff < 86400000) dateMsg = `${diff / 1000 / 60 / 25} hours ago`;
    else dateMsg = new Date(Date.parse(voice.Date)).toLocaleDateString();

    // Determine distance
    const rad1 = this.props.lat * Math.PI / 180;
    const rad2 = voice.lat * Math.PI / 180;
    const diffLat = (voice.lat - this.props.lat) * Math.PI / 180;
    const diffLng = (voice.lng - this.props.lng) * Math.PI / 180;
    const a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) + Math.cos(rad1) * Math.cos(rad2) * Math.sin(diffLng / 2) * Math.sin(diffLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = Math.floor(Eradius * c);

    return (
      <div key={voice.Name} className="tab-section-container">
        <h2 className="tab-section-header">{voice["Incident type copy"]}</h2>
        <p className="tab-section-details">{dateMsg} · {`${d} mi away`} · {voice.Publisher}</p>
        <p className="tab-section-snippet">{voice.Snippet}</p>
        <p className="tab-section-readmore" onClick={() => { this.expandTab(index) }}>Read More at {voice.Publisher}</p>
        <iframe
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          className="tab-section-iframe"
          title={`Article from ${voice.Publisher}`}
          width="100%"
          height={this.state.iframeOpen === index ? "500px" : "0"}
          src={this.state.iframeOpen === index ? voice.URL : ""}>
        </iframe>
      </div>
    )
  }

  render() {
    const active = this.props.active ? ' active' : '';
    var closeIcon;
    if (typeof (this.props.closeIcon) === 'string')
      closeIcon = <i className={this.props.closeIcon} />;
    else if (typeof (this.props.closeIcon) === 'object')
      closeIcon = this.props.closeIcon;
    else {
      const closecls = this.props.position === 'right' ? "fa fa-caret-right" : "fa fa-caret-left";
      closeIcon = <i className={closecls} />
    }

    var tabSections;
    if (typeof (this.props.children) === 'object' && this.props.children[0]) {
      tabSections = this.props.children.map((voice, index) => this.renderTabSection(voice, index))
    }

    return (
      <div id={this.props.id} className={"sidebar-pane" + active}>
        <h1 className="sidebar-header">
          {this.props.header}
          <div className="sidebar-close" onClick={this.props.onClose}>
            {closeIcon}
          </div>
        </h1>
        {tabSections}
      </div>
    );
  }
}

// https://github.com/facebook/react/issues/2979#issuecomment-222379916
const TabType = PropTypes.shape({
  type: PropTypes.oneOf([Tab])
});

class Sidebar extends MapComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    collapsed: PropTypes.bool,
    position: PropTypes.oneOf(['left', 'right']),
    selected: PropTypes.string,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(TabType),
      TabType
    ]).isRequired,
  }

  onClose(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClose && this.props.onClose();
  }

  onOpen(e, tabid) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onOpen && this.props.onOpen(tabid);
  }

  renderTab(tab) {
    var icon;
    if (typeof (tab.props.icon) === 'string')
      icon = <i className={tab.props.icon} />;
    else if (typeof (tab.props.icon) === 'object')
      icon = tab.props.icon;
    const active = tab.props.id === this.props.selected ? ' active' : '';
    const disabled = tab.props.disabled ? ' disabled' : '';
    return (
      <li className={active + disabled} key={tab.props.id}>
        <a href={'#' + tab.props.id} role="tab" onClick={e => tab.props.disabled || (tab.props.id === this.props.selected) ? this.onClose(e) : this.onOpen(e, tab.props.id)}>
          {icon}
        </a>
      </li>
    );
  }

  renderPanes(children) {
    return React.Children.map(children,
      p => React.cloneElement(p, {
        onClose: this.onClose.bind(this),
        closeIcon: this.props.closeIcon,
        active: p.props.id === this.props.selected,
        position: this.props.position || 'left'
      }));
  }

  // Override render() so the <Map> element contains a div we can render to
  render() {
    const position = ' sidebar-' + (this.props.position || 'left');
    const collapsed = this.props.collapsed ? ' collapsed' : '';

    const tabs = React.Children.toArray(this.props.children).filter(c => !!c);
    const bottomtabs = tabs.filter(t => t.props.anchor === 'bottom');
    const toptabs = tabs.filter(t => t.props.anchor !== 'bottom');
    return (
      <div id={this.props.id} className={"sidebar leaflet-touch" + position + collapsed}
        ref={el => this.rootElement = el}>
        <div className="sidebar-tabs">
          <ul role="tablist">   {/* Top-aligned */}
            {toptabs.map(t => this.renderTab(t))}
          </ul>
          <ul role="tablist">   {/* Bottom-aligned */}
            {bottomtabs.map(t => this.renderTab(t))}
          </ul>
        </div>
        <div className="sidebar-content">
          {this.renderPanes(tabs)}
        </div>
      </div>
    );
  }
}

export { Sidebar, Tab }
