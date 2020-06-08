import React from 'react';
import logo from './logo.svg'
import './styles.css';


const message = "This is my first React App - isn't it marvellous?!";
const handleClick = () => {
  alert('Hurray! Your first React Project'); 
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      darkMode: this.getInitialMode()
    }
    this.toggleDarkMode= this.toggleDarkMode.bind(this);
    this.getInitialMode= this.getInitialMode.bind(this);
    this.getPrefColorScheme= this.getPrefColorScheme.bind(this);
  }

  componentWillMount() {
    fetch('https://randomuser.me/api/?results=15')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({
        contacts: data.results
      });
    });
    
  }

  toggleDarkMode() {
    this.setState ({
      darkMode: !this.state.darkMode
    });
  }

  componentDidUpdate() {
    localStorage.setItem('dark', JSON.stringify(this.state.darkMode));
  }

  getInitialMode() {
    const isReturningUser = 'dark' in localStorage;
    const savedMode = JSON.parse(localStorage.getItem('dark'));
    const userPrefersDark = this.getPrefColorScheme;
    //if preferred color scheme was saved -> dark / light
    if (isReturningUser) {
      return savedMode;
    }
    //if preferred color scheme is dark -> dark
    else if (userPrefersDark) {
      return true;
    } 
    //else -> light
    else {
      return false;
    }

    return savedMode; 
  }


  getPrefColorScheme() {
    if (!window.matchMedia) return;

    else {
      return window.matchMedia('(prefers-color-scheme: dark)');
    }
  }

  render() {

    const renderContacts = this.state.contacts.map((contact) => <ContactCard 
          avatar= {contact.picture.large} 
          name= {contact.name.first + ' ' + contact.name.last}
          location= {contact.location.state}
          email= {contact.email}
          age= {contact.dob.age}
          darkMode= {this.state.darkMode}
        />);

    return (
      <div className= {this.state.darkMode ? 'App-dark' : 'App-light'} >
        <div className="App-header">
          <header>Contact List Made with <i class="fab fa-react"></i>React</header> 
          <nav>
            <div className="toggle-container">
              <span style={{ color: this.state.darkMode ? "grey" : "yellow" }}>☀</span>
              <span className="toggle">
                <input
                  checked={this.state.darkMode}
                  onChange={this.toggleDarkMode}
                  id="checkbox"
                  className="checkbox"
                  type="checkbox"
                />
                <label htmlFor="checkbox" />
              </span>
              <span style={{ color: this.state.darkMode ? "slateblue" : "grey" }}>☾</span>
            </div>
          </nav>
        </div> 
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello People!</h1>
        <h2 onClick={handleClick}>{message}</h2>
        <h3>Contact cards created out of user data gotten from the Random User API</h3>
        {renderContacts}

      </div>

    );
  }
};

class ContactCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAge: true
    }
    this.toggleAge= this.toggleAge.bind(this);
  }

  toggleAge() {
    this.setState({
      displayAge: !this.state.displayAge
    });
  }
  render() {

    return (
      <div className= {this.props.darkMode ? 'contact-card-dark' : 'contact-card-light'} >
        <img src={this.props.avatar} alt="avatar"/>
        <div className="user-details">
          <p>Name: {this.props.name}</p>
          {/*<p>Location: {this.props.location}</p>*/}
          <p>Email: {this.props.email}</p>
          <button onClick= {this.toggleAge} className={this.props.darkMode ? 'button-dark' : 'button-light'} >Reveal Age</button>
          {!this.state.displayAge && <p>Age: {this.props.age}</p>}

        </div>
      </div>

    );
  }
};


export default App;
