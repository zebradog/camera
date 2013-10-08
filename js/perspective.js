/**
 * @author Kyle Stangel, ZEBRADOG / kyle@zebradog.com
 */

function findHomography(src, dst){
  // create the equation system to be solved
  //
  // from: Multiple View Geometry in Computer Vision 2ed
  //       Hartley R. and Zisserman A.
  //
  // x' = xH
  // where H is the homography: a 3 by 3 matrix
  // that transformed to inhomogeneous coordinates for each point
  // gives the following equations for each point:
  //
  // x' * (h31*x + h32*y + h33) = h11*x + h12*y + h13
  // y' * (h31*x + h32*y + h33) = h21*x + h22*y + h23
  //
  // as the homography is scale independent we can let h33 be 1 (indeed any of the terms)
  // so for 4 points we have 8 equations for 8 terms to solve: h11 - h32
  // after ordering the terms it gives the following matrix
  // that can be solved with gaussian elimination:
  
  var points = [ 
            [-src[0].x, -src[0].y, -1,   0,   0,  0, src[0].x*dst[0].x, src[0].y*dst[0].x, -dst[0].x ], // h11
            [  0,   0,  0, -src[0].x, -src[0].y, -1, src[0].x*dst[0].y, src[0].y*dst[0].y, -dst[0].y ], // h12
  
            [-src[1].x, -src[1].y, -1,   0,   0,  0, src[1].x*dst[1].x, src[1].y*dst[1].x, -dst[1].x ], // h13
            [  0,   0,  0, -src[1].x, -src[1].y, -1, src[1].x*dst[1].y, src[1].y*dst[1].y, -dst[1].y ], // h21
  
            [-src[2].x, -src[2].y, -1,   0,   0,  0, src[2].x*dst[2].x, src[2].y*dst[2].x, -dst[2].x ], // h22
            [  0,   0,  0, -src[2].x, -src[2].y, -1, src[2].x*dst[2].y, src[2].y*dst[2].y, -dst[2].y ], // h23
  
            [-src[3].x, -src[3].y, -1,   0,   0,  0, src[3].x*dst[3].x, src[3].y*dst[3].x, -dst[3].x ], // h31
            [  0,   0,  0, -src[3].x, -src[3].y, -1, src[3].x*dst[3].y, src[3].y*dst[3].y, -dst[3].y ]  // h32
  ];
  
  var points = gaussianElimination(points, 8);
  
  // gaussian elimination gives the results of the equation system
  // in the last column of the original matrix.
  // opengl needs the transposed 4x4 matrix:
  var matrix = [ points[0],points[3],0,points[6], // h11  h21 0 h31
                 points[1],points[4],0,points[7], // h12  h22 0 h32
                 0        ,0        ,0,0,         // 0    0   0 0
                 points[2],points[5],0,1];        // h13  h23 0 h33
  
  return matrix;
}

function gaussianElimination(A, N){
  // ported to c from pseudocode in
  // http://en.wikipedia.org/wiki/Gaussian_elimination

  var i, j, k;
  
  for (i = 0; i < N; i++){
      // find row with maximum in column i
      var max_row = i;
      for (j = i; j < N; j++){
          if (Math.abs(A[j][i]) > Math.abs(A[max_row][i]))
              max_row = j;
      }
  
      // swap max row with row i of [A:y]
      for (k = i; k < N + 1; k++){
          var tmp       = A[i][k];
          A[i][k]       = A[max_row][k];
          A[max_row][k] = tmp;
      }
      
      // eliminate lower diagonal elements of [A]
      for (j = i + 1; j < N; j++){
          for (k = N; k > i; k--){
              if (A[i][i] == 0.0){
                  console.log("singular");
                  return;
              }
              else
                  A[j][k] = A[j][k] - A[i][k]*A[j][i]/A[i][i];
          }
      }
  }
  
  return substitute(A,N);

}

function substitute(A,N){
    var j, k, X = Array();

    for (j = N - 1; j >= 0; j--){
        var sum = 0.0;
        for (k = j+1; k < N; k++)
            sum += A[j][k]*X[k];

        X[j] = (A[j][N] - sum)/A[j][j];
    }
    
    return X;
}