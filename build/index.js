document.addEventListener('DOMContentLoaded', () => {
    
	if(window.location.pathname !== '/') {
		window.location.assign(window.location.href);
	}
	
	
    if(window.location.href.includes('login') || window.location.href.includes('register')) {
        document.getElementsByTagName('nav')[1].className = 'sidebar';
        document.getElementsByTagName('nav')[1].style.display = 'none';
        document.getElementById('navbar-menu').style.display = 'none'
    }
  
    window.URL = window.URL || window.webkitURL;

   
  
});

window.onpopstate = function(event) {
  window.location.reload();
};

