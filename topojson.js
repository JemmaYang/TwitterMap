topojson=function(){function t(t,e){function n(e){var n=t.arcs[e],r=n[0],o=[0,0];return n.forEach(function(t){o[0]+=t[0],o[1]+=t[1]}),[r,o]}var r={},o={},a={};e.forEach(function(t){var e=n(t);(r[e[0]]||(r[e[0]]=[])).push(t),(r[e[1]]||(r[e[1]]=[])).push(~t)}),e.forEach(function(t){var e,r,i=n(t),u=i[0],c=i[1];if(e=a[u])if(delete a[e.end],e.push(t),e.end=c,r=o[c]){delete o[r.start];var s=r===e?e:e.concat(r);o[s.start=e.start]=a[s.end=r.end]=s}else if(r=a[c]){delete o[r.start],delete a[r.end];var s=e.concat(r.map(function(t){return~t}).reverse());o[s.start=e.start]=a[s.end=r.start]=s}else o[e.start]=a[e.end]=e;else if(e=o[c])if(delete o[e.start],e.unshift(t),e.start=u,r=a[u]){delete a[r.end];var f=r===e?e:r.concat(e);o[f.start=r.start]=a[f.end=e.end]=f}else if(r=o[u]){delete o[r.start],delete a[r.end];var f=r.map(function(t){return~t}).reverse().concat(e);o[f.start=r.end]=a[f.end=e.end]=f}else o[e.start]=a[e.end]=e;else if(e=o[u])if(delete o[e.start],e.unshift(~t),e.start=c,r=a[c]){delete a[r.end];var f=r===e?e:r.concat(e);o[f.start=r.start]=a[f.end=e.end]=f}else if(r=o[c]){delete o[r.start],delete a[r.end];var f=r.map(function(t){return~t}).reverse().concat(e);o[f.start=r.end]=a[f.end=e.end]=f}else o[e.start]=a[e.end]=e;else if(e=a[c])if(delete a[e.end],e.push(~t),e.end=u,r=a[u]){delete o[r.start];var s=r===e?e:e.concat(r);o[s.start=e.start]=a[s.end=r.end]=s}else if(r=o[u]){delete o[r.start],delete a[r.end];var s=e.concat(r.map(function(t){return~t}).reverse());o[s.start=e.start]=a[s.end=r.start]=s}else o[e.start]=a[e.end]=e;else e=[t],o[e.start=u]=a[e.end=c]=e});var i=[];for(var u in a)i.push(a[u]);return i}function e(e,n,r){function a(t){0>t&&(t=~t),(l[t]||(l[t]=[])).push(f)}function i(t){t.forEach(a)}function u(t){t.forEach(i)}function c(t){t.type==="GeometryCollection"?t.geometries.forEach(c):t.type in d&&(f=t,d[t.type](t.arcs))}var s=[];if(arguments.length>1){var f,l=[],d={LineString:i,MultiLineString:u,Polygon:u,MultiPolygon:function(t){t.forEach(u)}};c(n),l.forEach(arguments.length<3?function(t,e){s.push(e)}:function(t,e){r(t[0],t[t.length-1])&&s.push(e)})}else for(var p=0,h=e.arcs.length;h>p;++p)s.push(p);return o(e,{type:"MultiLineString",arcs:t(e,s)})}function n(t,e){return e.type==="GeometryCollection"?{type:"FeatureCollection",features:e.geometries.map(function(e){return r(t,e)})}:r(t,e)}function r(t,e){var n={type:"Feature",id:e.id,properties:e.properties||{},geometry:o(t,e)};return e.id==null&&delete n.id,n}function o(t,e){function n(t,e){e.length&&e.pop();for(var n,r=h[0>t?~t:t],o=0,i=r.length,u=0,c=0;i>o;++o)e.push([(u+=(n=r[o])[0])*f+d,(c+=n[1])*l+p]);0>t&&a(e,i)}function r(t){return[t[0]*f+d,t[1]*l+p]}function o(t){for(var e=[],r=0,o=t.length;o>r;++r)n(t[r],e);return e.length<2&&e.push(e[0]),e}function i(t){for(var e=o(t);e.length<4;)e.push(e[0]);return e}function u(t){return t.map(i)}function c(t){var e=t.type;return"GeometryCollection"===e?{type:e,geometries:t.geometries.map(c)}:e in v?{type:e,coordinates:v[e](t)}:null}var s=t.transform,f=s.scale[0],l=s.scale[1],d=s.translate[0],p=s.translate[1],h=t.arcs,v={Point:function(t){return r(t.coordinates)},MultiPoint:function(t){return t.coordinates.map(r)},LineString:function(t){return o(t.arcs)},MultiLineString:function(t){return t.arcs.map(o)},Polygon:function(t){return u(t.arcs)},MultiPolygon:function(t){return t.arcs.map(u)}};return c(e)}function a(t,e){for(var n,r=t.length,o=r-e;o<--r;)n=t[o],t[o++]=t[r],t[r]=n}function i(t,e){for(var n=0,r=t.length;r>n;){var o=n+r>>>1;t[o]<e?n=o+1:r=o}return n}function u(t){function e(t,e){t.forEach(function(t){0>t&&(t=~t);var n=o[t]||(o[t]=[]);n[e]||(n.forEach(function(t){var n,r;r=i(n=a[e],t),n[r]!==t&&n.splice(r,0,t),r=i(n=a[t],e),n[r]!==e&&n.splice(r,0,e)}),n[e]=e)})}function n(t,n){t.forEach(function(t){e(t,n)})}function r(t,e){t.type==="GeometryCollection"?t.geometries.forEach(function(t){r(t,e)}):t.type in u&&u[t.type](t.arcs,e)}var o=[],a=t.map(function(){return[]}),u={LineString:e,MultiLineString:n,Polygon:n,MultiPolygon:function(t,e){t.forEach(function(t){n(t,e)})}};return t.forEach(r),a}return{version:"1.1.2",mesh:e,feature:n,neighbors:u}}();
