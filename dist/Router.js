'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Route = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactors = require('reactors');

var _reactors2 = _interopRequireDefault(_reactors);

var _reactNative = require('react-native');

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
            this.state.routes[title] = { name: title, scene: scene };
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
      this.setState({ route: this.state.routes[route] });
    }
  }, {
    key: 'render',
    value: function render() {
      return this.renderScenery();
    }
  }, {
    key: 'renderScenery',
    value: function renderScenery() {
      switch (_reactors2.default.platform) {
        case 'mobile':
          return this.renderMobileScenery();
        case 'web':
        case 'desktop':
          return this.renderWebScenery();
      }
    }
  }, {
    key: 'renderMobileScenery',
    value: function renderMobileScenery() {
      var routes = [];
      for (var name in this.state.routes) {
        var _Route = this.state.routes[name].scene;

        var _Dimensions$get = _reactNative.Dimensions.get('window');

        var width = _Dimensions$get.width;
        var height = _Dimensions$get.height;

        var style = {
          height: height,
          width: width,
          marginLeft: name === this.state.route.name ? 0 : width
        };
        if (name !== this.state.route.name) {
          style.marginTop = -style.height;
        } else {
          style.marginTop = 0;
        }
        routes.push(_react2.default.createElement(
          _reactors.View,
          { style: style, key: name },
          _react2.default.createElement(_Route, { router: this })
        ));
      }
      return _react2.default.createElement(
        _reactors.View,
        null,
        routes
      );
    }
  }, {
    key: 'renderWebScenery',
    value: function renderWebScenery() {
      var routes = [];
      for (var name in this.state.routes) {
        var _Route2 = this.state.routes[name].scene;
        var style = {
          height: window.innerHeight,
          width: window.innerWidth,
          marginLeft: name === this.state.route.name ? 0 : window.innerWidth
        };
        if (name !== this.state.route.name) {
          style.marginTop = -style.height;
        } else {
          style.marginTop = 0;
        }
        routes.push(_react2.default.createElement(
          _reactors.View,
          { style: style, key: name },
          _react2.default.createElement(_Route2, { router: this })
        ));
      }
      return _react2.default.createElement(
        _reactors.View,
        null,
        routes
      );
    }
  }]);

  return Router;
}(_react.Component);

exports.default = Router;
var Route = exports.Route = function Route(props) {
  return _react2.default.createElement(_reactors.View, props);
};