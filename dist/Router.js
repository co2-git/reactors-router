'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Route = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactors = require('reactors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = function (_Component) {
  _inherits(Router, _Component);

  function Router(props) {
    _classCallCheck(this, Router);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Router).call(this, props));

    _this.state = { route: null, routes: {} };
    return _this;
  }

  _createClass(Router, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;

          if (child.type === Route) {
            var _child$props = child.props;
            var scene = _child$props.scene;
            var name = _child$props.name;

            var title = name ? name : scene.name;
            this.state.routes[title] = scene;
            console.log({ title: title, scene: scene, child: child });
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.state.route = this.state.routes[this.props.initial];
    }
  }, {
    key: 'go',
    value: function go(route) {
      console.log('go', route);
      this.setState({ route: this.state.routes[route] });
    }
  }, {
    key: 'render',
    value: function render() {
      console.log({ state: this.state });
      var Route = this.state.route;
      return _react2.default.createElement(Route, { router: this });
    }
  }, {
    key: 'renderScene',
    value: function renderScene() {
      // const routes
    }
  }]);

  return Router;
}(_react.Component);

exports.default = Router;
var Route = exports.Route = function Route(props) {
  return _react2.default.createElement(_reactors.View, props);
};