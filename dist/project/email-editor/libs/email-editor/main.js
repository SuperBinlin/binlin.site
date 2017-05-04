/**
 * @author Binlin
 * @date 2015-06-01
 * @email zhangbin@patsnap.com
 */
define(function(require) {
  var $ = jQuery = require('jquery');
  window.$ = $;
  var addDom = require('./addDom');
  var animate = require('./animate');
  var sortable = require('./draggable');
  var addDoing = new addDom();
  addDoing.render();
});
