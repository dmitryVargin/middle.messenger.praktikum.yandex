const register = require('@babel/register').default;
const WebSocket = require('ws');
require('jsdom-global')('<html><body id="root"></body></html>', { url: 'http://localhost' });

register({ extensions: ['.ts', '.tsx', '.js', '.jsx'] });

global.DOMParser = window.DOMParser;
global.WebSocket = WebSocket;
