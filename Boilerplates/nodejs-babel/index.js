Number.prototype.times = function(callback) {
  const number = parseInt(this);
  for (let i = 0; i < number; i++) {
    callback();
  }
};

const x = 5;
(3).times(() => {
  console.log('asd');
});
