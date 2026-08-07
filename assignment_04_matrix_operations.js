// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i].join('  '));
  }
}

function readMatrix(rows, cols, label = 'matrix') {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const input = readlineSync.question(`Enter row ${i + 1}: `);
    const row = input.trim().split(/\s+/).map(Number);
    matrix.push(row);
  }
  return matrix;
}

function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const transposed = [];
  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    transposed.push(newRow);
  }
  return transposed;
}

function addMatrices(matA, matB) {
  const rows = matA.length;
  const cols = matA[0].length;
  const result = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(matA[i][j] + matB[i][j]);
    }
    result.push(row);
  }
  return result;
}

function multiplyMatrices(matA, matB) {
  const rowsA = matA.length;
  const colsA = matA[0].length;
  const colsB = matB[0].length;
  const result = [];

  for (let i = 0; i < rowsA; i++) {
    const row = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matA[i][k] * matB[k][j];
      }
      row.push(sum);
    }
    result.push(row);
  }
  return result;
}

function main() {
  console.log('--- PART A: Transpose a Matrix ---');
  const rows = readlineSync.questionInt('Enter number of rows: ');
  const cols = readlineSync.questionInt('Enter number of columns: ');
  const matrix = readMatrix(rows, cols);

  console.log('\nOriginal Matrix:');
  printMatrix(matrix);

  console.log('\nTransposed Matrix:');
  const transposed = transposeMatrix(matrix);
  printMatrix(transposed);

  console.log('\n--- PART B: Add Two Matrices ---');
  console.log(`Entering Matrix A (${rows}x${cols}):`);
  const matA_add = readMatrix(rows, cols);
  console.log(`Entering Matrix B (${rows}x${cols}):`);
  const matB_add = readMatrix(rows, cols);

  console.log('\nMatrix A + Matrix B:');
  const sumMat = addMatrices(matA_add, matB_add);
  printMatrix(sumMat);

  console.log('\n--- PART C: Multiply Two Matrices ---');
  const rowsA = readlineSync.questionInt('Enter rows for Matrix A: ');
  const colsA = readlineSync.questionInt('Enter columns for Matrix A: ');
  const rowsB = readlineSync.questionInt('Enter rows for Matrix B: ');
  const colsB = readlineSync.questionInt('Enter columns for Matrix B: ');

  if (colsA !== rowsB) {
    console.log('Error: Number of columns in A must equal number of rows in B.');
    return;
  }

  console.log(`Entering Matrix A (${rowsA}x${colsA}):`);
  const matA_mult = readMatrix(rowsA, colsA);
  console.log(`Entering Matrix B (${rowsB}x${colsB}):`);
  const matB_mult = readMatrix(rowsB, colsB);

  console.log('\nMatrix A x Matrix B:');
  const prodMat = multiplyMatrices(matA_mult, matB_mult);
  printMatrix(prodMat);
}

main();
