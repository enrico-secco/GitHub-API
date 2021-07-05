import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from './pages/Main'
import Repositorio from './pages/Repositorio'

const Routes = () => {
    return(
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/repositorio/:repositorio" component={Repositorio}/> {/*:repositorio = :id, para entender que é um parâmetro*/}
        </Switch>
        </BrowserRouter>
    )
}


export default Routes;