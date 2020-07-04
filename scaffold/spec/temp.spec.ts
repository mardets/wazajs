import { <%= upCaseName %>Controller } from './<%= name %>.controller';
import { Layout } from '../layout/layout';
import { PageProvider } from '../provider/page';
import { RouterProvider } from '../provider/router';
require('chai').should();

export default describe('<%= upCaseName %> List', () => {
    var <%= upName %>Controller: <%= upCaseName %>Controller;
    var layout = new Layout(new PageProvider(new RouterProvider()));
    beforeEach(function () {
        <%= upName %>Controller = new <%= upCaseName %>Controller(layout);
    });

    describe('#<%= name %>', () => {
        it('should return the number of existing <%= name %>', () => {
            var result = <%= upName %>Controller.findAll();
            result.should.have.lengthOf(0);
        });
    });
})