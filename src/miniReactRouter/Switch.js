import { useContext, Children, createContext } from 'react';

import { RouterContext } from './Router';

const RouteContext = createContext({
  params: {},
});

// The `Switch` component iterates through its children,
// the `route` components, to find one whose `path` property
// matches the current location and render the matched one.
const Switch = ({ children }) => {
  const { location } = useContext(RouterContext);
  const match = matchRoutes(children, location);

  if (!match) return null;

  const { component, params } = match;
  return (
    <RouteContext.Provider value={{ params }}>
      {component}
    </RouteContext.Provider>
  );
};

function matchRoutes(children, location) {
  const matches = [];

  Children.forEach(children, (route) => {
    const [regex, keys] = compilePath(route.props.path);
    const match = location.match(regex);

    if (match) {
      const params = match.slice(1);
      matches.push({
        component: route.props.children,
        params: keys.reduce((collection, key, index) => {
          collection[key] = params[index];
          return collection;
        }, {}),
      });
    }
  });

  return matches[0];
}

// compilePath('/posts/:id')
// => { regex: /^/posts/([^/]+)/i, keys: [ 'id' ]}
function compilePath(path) {
  const keys = [];

  path = path.replace(/:(\w+)/g, (_, key) => {
    keys.push(key);
    return '([^/]+)';
  });

  const regexSource = `^${path}`;
  const regex = new RegExp(regexSource, 'i');
  return [regex, keys];
}

const withRouter = (Component) => (props) => {
  const { params } = useContext(RouteContext);
  return <Component params={params} {...props} />;
};

export default Switch;
export { withRouter };
