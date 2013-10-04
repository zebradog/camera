/**
 * @author Kyle Stangel, ZEBRADOG / kyle@zebradog.com
 * @author Matt Cook, ZEBRADOG / matt@zebradog.com
 *
 * Utility functions for calculating warped coordinates in Javascript
 * Depends on homography.js and three.js
 * based on: https://github.com/roymacdonald/ofxGLWarper
 */

/*
u = screen x coordinate
v = screen y coordinate
h = homography matrix
returns Vector2 of x,y inside warped area
*/
function fromScreenToWarpCoord(u, v, h){


    var screenPoint = new THREE.Vector4(u,v,0,1);

    // i create a ofMatrix4x4 with the ofxGLWarper myMatrixData in column order
    var m = new THREE.Matrix4(h[0], h[4],h[8], h[12],
                              h[1], h[5],h[9], h[13],
                              h[2], h[6],h[10],h[14],
                              h[3], h[7],h[11],h[15]);

    //var invertedMyMatrix = new THREE.Matrix4();
    //m.getInverse(m);

    // multiply both to get the point transformed by the matrix
    var warpedPoint = screenPoint.applyMatrix4(m);

    // we need to normalize the value as described here :
    // http://tech.groups.yahoo.com/group/OpenCV/message/80121
    warpedPoint.x = warpedPoint.x / warpedPoint.w;
    warpedPoint.y = warpedPoint.y / warpedPoint.w;
    warpedPoint.z = warpedPoint.z / warpedPoint.w;

    return new THREE.Vector2(warpedPoint.x, warpedPoint.y);
}


/*
x = x coordinate inside warped area
y = y coordinate inside warped area
h = homography matrix
returns Vector2 of u,v (x,y) screen coordinates
*/
function fromWarpToScreenCoord(x, y, h){
    var warpedPoint = new THREE.Vector4(x,y,0,1);

    // Use Three.js to perform matrix multiplcation
    var m = new THREE.Matrix4(h[0], h[4],h[8], h[12],
                              h[1], h[5],h[9], h[13],
                              h[2], h[6],h[10],h[14],
                              h[3], h[7],h[11],h[15]);

    // multiply both to get the point transformed by the matrix
    var screenPoint = warpedPoint.applyMatrix4(m);

    screenPoint.x = screenPoint.x / screenPoint.w;
    screenPoint.y = screenPoint.y / screenPoint.w;
    screenPoint.z = screenPoint.z / screenPoint.w;

    return new THREE.Vector2(screenPoint.x, screenPoint.y);
}