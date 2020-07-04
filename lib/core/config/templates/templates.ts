export class CacheTpl {
    static builder(){
    let caches = {}; 
    caches['layout/layout.html'] = '<div id="layout">\n  <nav class="navbar navbar-default navbar-fixed-top"></nav>\n  <div id="container">\n      <div class="row">\n          <div class="col-md-3">\n              <div class="sidenav"></div>\n          </div>\n          <div class="col-md-7">\n            <div class="row">\n                <header></header>\n            </div>\n            <div class="row">\n                <div class="ui-view">\n                  Hello, Waza Mobile App demo routing!\n                </div>\n            </div>\n          </div>\n      </div>  \n      <br><br>\n      <div id="footer">@Copyright Steve Mbakop</div>\n  </div>\n</div>';
  return caches;
   }
};