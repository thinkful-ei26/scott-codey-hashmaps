class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      return null;
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    this._slots[index] = {

      key,
      value,
      deleted: false
    };
    this.length++;
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || (slot.key == key && !slot.deleted)) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length -
    //it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

const lotr = new HashMap;

const arr = [
  {Hobbit:"Bilbo"},
  {Hobbit:"Frodo"},
  {Wizard:"Gandolf"},
  {Human:"Aragon"},
  {Elf: "Legolas"},
  {Maiar:"The Necromancer"},
  {Maiar: "Sauron"},
  {RingBearer: "Gollum"},
  {LadyOfLight: "Galadriel"},
  {HalfElven: "Arwen"},
  {Ent: "Treebeard"}
];

arr.map(obj => lotr.set(Object.keys(obj).toString(), Object.values(obj).toString()));

// Any permutation a palindrome
const palindrome = str => {
  const characters = new HashMap;
  if(str.length < 3) {
    return false;
  }
  for(let i = 0; i < str.length; i++) {
    if(characters.get(str[i])) {
      characters.set(str[i], characters.get(str[i]) + 1)
    } else characters.set(str[i], 1)
  }
  let count = 0;
  for(let j = 0; j < characters._capacity; j++) {
    if(characters._slots[j]) {
      if(characters._slots[j].value % 2 !== 0) {
        count++;
      }
    }
  }
  if(count > 1) {
    return false;
  }
  return true;
}
//console.log(palindrome('solos'));

// Anagram grouping
const anagram = list => {
  const words = new HashMap;

  // for each word make a hash and insert into array of hashes

  // compare each hash in the array to the others and group


}
console.log(anagram(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']))
