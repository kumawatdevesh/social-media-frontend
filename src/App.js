import React, {Suspense} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

const Auth  = React.lazy(() => import('./Auth/Auth'));
const MainHeader = React.lazy(() => import('./Header/MainHeader'));
const Post = React.lazy(() => import('./Posts/Post'));
const Posts = React.lazy(() => import('./Posts/Posts'));
const Error = React.lazy(() => import('./404-Error.js/Error'));
const Friends = React.lazy(() => import('./Friends/Friends'));
const People = React.lazy(() => import('./Friends/People'));
const UserProfile = React.lazy(() => import('./Profile/UserProfile'));
const AddPost = React.lazy(() => import('./Posts/AddPost'));
const PostProfile = React.lazy(() => import('./Profile/PostProfile'));
const Request = React.lazy(() => import('./Friends/Request'));
const UpdateProfile = React.lazy(() => import('./Profile/UpdateProfile'));
const AddChannel = React.lazy(() => import('./Channels/AddChannel'));
const Channels = React.lazy(() => import('./Channels/Channels'));
const Questions = React.lazy(() => import('./Channels/Questions'));
const UserQuestion = React.lazy(() => import('./Channels/UserQuestion'));
const Answers = React.lazy(() => import('./Channels/Answers'));

function App(props) {

  const storedData = JSON.parse(localStorage.getItem('userData'));
  let routes;
  
  if(storedData && storedData.userToken) {
    routes = (
      <Switch>
        <Route exact path="/" component={Posts}/>
        <Route path="/add-post" component={AddPost}/>
        <Route path="/friends/:userId" component={Friends}/>
        <Route path="/people" component={People}/>
        <Route path="/user/:userId" component={PostProfile}/>
        <Route path="/profile/:userId" component={UserProfile}/>
        <Route path="/post/:id" component={Post} />
        <Route path="/request/list" component={Request} />
        <Route path="/update-profile/:id" component={UpdateProfile} />
        <Route path="/create-channel" component={AddChannel}/>
        <Route path="/channels/:cid" component={Questions}/>
        <Route path="/question/:quesId" component={Answers}/>
        <Route path="/channels" component={Channels}/>
        <Route path="/:qid/ask-question" component={UserQuestion}/>
        <Route path="*" component={Error}/>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Posts}/>
        <Route path="/auth" component={Auth}/>
        <Route path="*" component={Error}/>
      </Switch>
    );
  }
  return (
    <div>
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
        <MainHeader />
          {routes}
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.userId,
    userToken: state.userToken
  }
};

export default connect(mapStateToProps)(App);
