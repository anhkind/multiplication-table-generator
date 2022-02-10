function generatePairs(num, from = 1, to = 9) {
  let res = [];
  for (let i = from; i <= to; i++) {
    res.push([num, i]);
  }
  return res;
}

function shufflePairs(pairs, isShuffled = true) {
  isShuffled && pairs.forEach( (pair, i) => pairs[i] = _.shuffle(pair) );
  return _.shuffle(pairs);
}

function generateTable(num, options = {from: 1, to: 9, isShuffled: true}) {
  let pairs = generatePairs(num, options.from, options.to);
  if (options.isShuffled) {
    pairs = shufflePairs(pairs, options.isShuffled);
  }
  return pairs.map(pair => `${pair.join(' x ')} = `);
}

function createPageElement(title) {
  let $page = $('<div class="page">');
  title && $page.append(`<h2>${title}</h2>`)
  return $page;
}

function createTableElement(table) {
  let $table = $('<div class="time-table">');
  table.forEach( item => {
    $table.append($(`<p>${item}</p>`));
  });
  return $table;
}

function renderTablePage(num, options = {}) {
  options     = Object.assign({ from: 1, to: 9, isShuffled: true }, options);
  let table   = generateTable(num, options);

  let $page   = createPageElement(`Table ${num}`);
  $page.appendTo('body');

  let $table  = createTableElement(table);
  $table.appendTo($page);
}

function getInputsFromQuery(name) {
  const str = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.search)[1];
  return str.split(',').map(table => ({
    num:      +table.charAt(0),
    options: { isShuffled: !!table.charAt(1) }
  }));
}

$(function(){
  getInputsFromQuery('tables').forEach(input => {
    renderTablePage(input.num, input.options);
  })
})
