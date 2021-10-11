import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FormFile from './components/FormFile';
import Files from './components/Files';
import Layout from '../shared/components/layout';


const Routes = () => {

    return (

        <Layout>
            <Switch>
                <Route exact path="/" component={Files} />
                <Route exact path="/add" component={FormFile} />
                <Route exact path="/add/:fileid" component={FormFile} />
            </Switch>
        </Layout>

    )
}

export default Routes;