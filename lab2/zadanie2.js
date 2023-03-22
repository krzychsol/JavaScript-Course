"use strict";
var expect = chai.expect;

function sum(x, y) {
  return x + y;
}

function cyfry(napis) {
  var odd = 0; //nieparzyste
  var even = 0; //parzyste
  for (let letter of napis) {
    let num = parseInt(letter);
    if (isNaN(num)) continue;
    if(num % 2 == 0){
      even += num;
    }else{
      odd += num
    }
  }
  return [odd,even];
}

function litery(napis) {
  var cnt_lower = 0;
  var cnt_upper = 0;
  for (let letter of napis) {
    if(!letter.match(/[a-z]/i))continue;
    if(letter == letter.toUpperCase()){
      cnt_upper++;
    }
    if(letter == letter.toLowerCase()){
      cnt_lower++;
    }
  }
  return [cnt_lower,cnt_upper];
}

function suma(napis) {
  if (isNaN(parseInt(napis[0]))) return 0;
  return parseInt(napis);
}

function getData() {
  var res = window.prompt("Wczytaj napis");
  var prev = 0;
  while (res != null) {
    console.log(res);
    let r1 = cyfry(res);
    let r2 = litery(res);
    let r3 = prev + suma(res);
    prev = r3;
    console.log("\t" +"["+r1[0]+","+r1[1]+"]" + "\t" + "["+r2[0]+","+r2[1]+"]" + "\t" + r3);
    res = window.prompt("Wczytaj napis");
  }
}

describe("The sum() function", function () {
  it("Returns 4 for 2+2", function () {
    expect(sum(2, 2)).to.equal(4);
  });
  it("Returns 0 for -2+2", function () {
    expect(sum(-2, 2)).to.equal(0);
  });
});

describe('cyfry(), litery(), suma() test on "ONLY DIGITS"', function () {
  it('cyfry("1234") = [4, 6] -> [1+3, 2+4] ', function () {
    expect(cyfry("1234")[0]).to.equal(4) && expect(cyfry("1234")[1]).to.equal(6);
  });
  it('litery("1234") = [0, 0] -> no letters ', function () {
    expect(litery("1234")[0]).to.equal(0) && expect(litery("1234")[1]).to.equal(0);
  });
  it('suma("1234") = 1234 -> 1234 ', function () {
    expect(suma("1234")).to.equal(1234);
  });
});

describe('cyfry(), litery(), suma() test on "ONLY LETTERS"', function () {
  it('cyfry("abcd") = [0, 0] -> no digits ', function () {
    expect(cyfry("abcd")[0]).to.equal(0) && expect(cyfry("abcd")[1]).to.equal(0);
  });
  it('litery("abcd") = [4, 0] -> 4 lowers, 0 uppers', function () {
    expect(litery("abcd")[0]).to.equal(4) && expect(litery("abcd")[1]).to.equal(0);
  });
  it('suma("abcd") = 0 -> does not start with digit ', function () {
    expect(suma("abcd")).to.equal(0);
  });
});

describe('cyfry(), litery(), suma() test on "LETTERS THEN NUMBERS"', function () {
  it('cyfry("abcd1234") = [4, 6] -> [1+3,2+4] ', function () {
    expect(cyfry("abcd1234")[0]).to.equal(4) && expect(cyfry("abcd1234")[1]).to.equal(6);
  });
  it('litery("abcd1234") = [4, 0] -> 4 lowers, 0 uppers', function () {
    expect(litery("abcd1234")[0]).to.equal(4) && expect(litery("abcd1234")[1]).to.equal(0);
  });
  it('suma("abcd1234") = 0 -> does not start with digit ', function () {
    expect(suma("abcd1234")).to.equal(0);
  });
});

describe('cyfry(), litery(), suma() test on "DIGITS THEN LETTERS"', function () {
  it('cyfry("1234abcd") = [4, 6] -> [1+3, 2+4] ', function () {
    expect(cyfry("1234abcd")[0]).to.equal(4) && expect(cyfry("1234abcd")[1]).to.equal(6);
  });
  it('litery("1234abcd") = [4, 0] -> 4 lowers, 0 uppers', function () {
    expect(litery("1234abcd")[0]).to.equal(4) && expect(litery("1234abcd")[1]).to.equal(0);
  });
  it('suma("1234abcd") = 1234 -> starts with 1234 ', function () {
    expect(suma("1234abcd")).to.equal(1234);
  });
});

describe('cyfry(), litery(), suma() test on "EMPTY STRING"', function () {
  it('cyfry("") = 0 -> [0, 0] ', function () {
    expect(cyfry("")[0]).to.equal(0) && expect(cyfry("")[1]).to.equal(0);
  });
  it('litery("1234abcd") = [0, 0]-> 0 lowers, 0 uppers', function () {
    expect(litery("")[0]).to.equal(0) && expect(litery("")[1]).to.equal(0);
  });
  it('suma("") = 0 -> nothing to add ', function () {
    expect(suma("")).to.equal(0);
  });
});