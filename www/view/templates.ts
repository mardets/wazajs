export class CacheTpl {
    static builder(){
    let caches = {}; 
    caches['home\home.html'] = '<div id="home">\n  <h1>Home</h1>\n</div>\n';
    caches['layout\layout.html'] = '<div id="layout">\n  <nav class="navbar navbar-default navbar-fixed-top"></nav>\n  <div id="container">\n      <div class="row">\n          <div class="col-md-3">\n              <div class="sidenav"></div>\n          </div>\n          <div class="col-md-7">\n            <div class="row">\n                <header></header>\n            </div>\n            <div class="row">\n                <div class="ui-view">\n                  Hello world, Wazajs demo routing! <a href="#/home">home</a>&nbsp;<a href="#/pack/list">list packs</a>&nbsp;				  &nbsp;                </div>\n            </div>\n          </div>\n      </div>  \n      <br><br>\n      <div id="footer">@Copyright Mardets : company behind Wazajs</div>\n  </div>\n</div>';
    caches['pack\list.html'] = '<div id="list">\n  <h1>Pack List</h1>\n</div>';
   }
};
