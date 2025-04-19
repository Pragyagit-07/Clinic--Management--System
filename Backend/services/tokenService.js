// Simple token generator (auto-increments)
let currentToken = 1000;

function generateToken() {
  currentToken += 1;
  return currentToken;
}

module.exports = { generateToken };
