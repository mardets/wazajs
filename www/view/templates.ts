export class CacheTpl {
    static builder(){
    let caches = {}; 
    caches['layout\layout.html'] = '<div id="layout">\n  <nav class="navbar navbar-default navbar-fixed-top"></nav>\n  <div id="container">\n      <div class="row">\n          <div class="col-md-3">\n              <div class="sidenav"></div>\n          </div>\n          <div class="col-md-7">\n            <div class="row">\n                <header></header>\n            </div>\n            <div class="row">\n                <div class="ui-view">\n                  Hello World, Wazajs demo routing! <a href="#/home">home</a>\n                </div>\n            </div>\n          </div>\n      </div>  \n      <br><br>\n      <div id="footer">@Copyright Mard : company behind Wazajs</div>\n  </div>\n</div>';
    caches['home\home.html'] = '<div id="home">\n  <h1>Home</h1>\n</div>\n';
  return caches;
   }
};