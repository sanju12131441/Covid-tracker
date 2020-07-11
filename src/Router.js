import React from 'react'
import { Redirect, Route, Switch ,withRouter } from 'react-router-dom'
import  OverView from './pages/overview/overview';
import  WolrdDataInTable from './pages/worldDataInTable/worlddataintable';
import  WolrdDataInGraphs from './pages/worldDataInGraphichalView/worldDataInGraphichalView';

const MainRouter = () => {
  return (
          <Switch>
              <Route path={ '/' } component={withRouter(OverView)} exact render={() => <Redirect to="/overview"/>}/>
              <Route path={ '/overview' } component={ withRouter(OverView) }/>
              <Route path={ '/worldDataInTable' } component={ withRouter(WolrdDataInTable) }/>
              <Route path={ '/worldDataInGraph' } component={ withRouter(WolrdDataInGraphs) }/>
          </Switch>
  )
}

export default MainRouter