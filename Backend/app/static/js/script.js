// start: Sidebar
document.querySelector('.chat-sidebar-profile-toggle').addEventListener('click', function(e) {
    e.preventDefault()
    this.parentElement.classList.toggle('active')
})

document.addEventListener('click', function(e) {
    if(!e.target.matches('.chat-sidebar-profile, .chat-sidebar-profile *')) {
        document.querySelector('.chat-sidebar-profile').classList.remove('active')
    }
})
// // tabs của navbar
const tabs = {
  Subtitle: document.getElementById('subtitle-tab'),
  Record: document.getElementById('record-tab'),
  Settings: document.getElementById('settings-tab')
};

const navItems = {
  Subtitle: document.querySelector('.Subtitle'),
  Record: document.querySelector('.Record'),
  Settings: document.querySelector('.Settings')
};

function switchTab(activeTab) {
  Object.values(tabs).forEach(tab => {
      tab.style.display = 'none';
  });

  Object.values(navItems).forEach(navItem => {
      navItem.classList.remove('active');
  });

  tabs[activeTab].style.display = 'block';
  navItems[activeTab].classList.add('active');
}

Object.keys(navItems).forEach(navItem => {
  navItems[navItem].addEventListener('click', () => switchTab(navItem));
});

switchTab('Subtitle');
