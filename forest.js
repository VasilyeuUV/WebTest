const forestKoef = 1000;
const woodcutterKoef = 100;
const isTikTak = true;

const forestRules = {
  growLeafTime: 2,
  growTwigTime: 5,
  growBranchTime: 10,
  growTrunkTime: 5
}

const woodcutterTask = {
  maxTrunksInForest: 10,
  maxBranchesOnTrunk: 10,
  maxTwingsOnBranch: 10,
  maxLeafOnTwing: 10,
}


class Forest {
  constructor() {
    this.trunks = [];
  }

  async startLife(forestRules) {
    let trunkCounter = 0;
    this.growTrunk(++trunkCounter)

    this.timer = setInterval(() => {
      this.growTrunk(++trunkCounter);
      if (!isTikTak) {
        clearInterval(this.timer);
      }
    }, forestRules.growTrunkTime * forestKoef)
  }

  growTrunk(counter) {
    this.trunks.push(new Trunk(counter));
    console.log(`Trunk ${this.trunks[this.trunks.length - 1].number} is grow.`);
  }
}

class Trunk {
  constructor(num) {
    this.number = num;
    this.branches = [];
    let branchCounter = 0;
    this.timer = setInterval(() => {
      this.growBranch(++branchCounter);
      if (!isTikTak) {
        clearInterval(this.timer);
      }
    }, forestRules.growBranchTime * forestKoef);
  }

  growBranch(counter) {
    this.branches.push(new Branch(this.number, counter));
    console.log(`Branch ${this.branches[this.branches.length - 1].number} of Trunk ${this.number} is grow.`);
  }
}


class Branch {
  constructor(parentTrunk, num) {
    this.parentTrunk = parentTrunk;
    this.number = num;
    this.twigs = [];
    let twigCounter = 0;
    this.timer = setInterval(() => {
      this.growTwig(++twigCounter);
      if (!isTikTak) {
        clearInterval(this.timer);
      }
    }, forestRules.growTwigTime * forestKoef);
  }
  growTwig(counter) {
    this.twigs.push(new Twig(this.parentTrunk, this.number, counter));
    console.log(`Twig ${this.twigs[this.twigs.length - 1].number} of Branch ${this.number} of Trunk ${this.parentTrunk} is grow.`);
  }
}


class Twig {
  constructor(parentTrunk, parentBranch, num) {
    this.parentTrunk = parentTrunk;
    this.parentBranch = parentBranch;
    this.number = num;
    this.leafs = [];
    let leafCounter = 0;
    this.timer = setInterval(() => {
      this.growLeaf(++leafCounter);
      if (!isTikTak) {
        clearInterval(this.timer);
      }
    }, forestRules.growLeafTime * forestKoef);
  }
  growLeaf(counter) {
    this.leafs.push(new Leaf(this.parentTrunk, this.parentBranch, this.number, counter));
    console.log(`Leaf ${this.leafs[this.leafs.length - 1].number} of Twig ${this.number} of Branch ${this.parentBranch} of Trunk ${this.parentTrunk} is grow.`);
  }
}


class Leaf {
  constructor(parentTrunk, parentBranch, parentTwing, num) {
    this.parentTrunk = parentTrunk;
    this.parentBranch = parentBranch;
    this.parentTwing = parentTwing
    this.number = num;
  }
}





class Woodcutter {

  constructor(name) {
    this.name = name;
    this.isAlive = true;
    this.workPlace = null;
    this.woodcutterTask = null;
    this.abilities = {
      chopLeafTime: 5,
      chopTwigTime: 10,
      chopBranchTime: 20,
      chopTrunkTime: 40,
      deathСonditions: 20
    }
  }

  async startJob(workPlace = null, woodcutterTask = null) {
    if (workPlace === null || woodcutterTask === null) {
      console.log(`${this.name} does not know where to work and/or does not know work assignment.`)
      return;
    }

    this.workPlace = workPlace;
    this.woodcutterTask = woodcutterTask;

    while (this.isAlive) {
      this.calculateForest();
    }
  }

  calculateForest() {
    const forest = this.workPlace;
    const task = this.woodcutterTask;

    if (forest.trunks.length > task.maxTrunksInForest) {
      this.chopTrunk(forest.trunks.length - task.maxTrunksInForest);
      return;
    }

  }

  // remove trunk
  chopTrunk(n) {
    if (n === null || n < 1) {
      console.log('Trunks cannot be chop/');
      return;
    }
    for (let i = 0; i < n; i++) {
      let deleted = setTimeout(chop, this.abilities.chopTrunkTime, this.workPlace.trunks);
      if (deleted !== null || deleted !== undefined) {
        console.log(`Trunks ${deleted.number} was chop. Total Number of Trunks = ${this.workPlace.trunks.length}.`);
      }
    }
    if (n >= this.abilities.deathСonditions) {
      this.isAlive = false;
    }
  }

  // remove branches
  chopBranch(n, branches) {
    if (n === null || n < 1) {
      console.log('Branches cannot be chop.');
      return;
    }

    for (let i = 0; i < n; i++) {
      let deleted = setTimeout(chop, this.abilities.chopBranchTime, branches);
      if (deleted !== null || deleted !== undefined) {
        console.log(`Branch ${deleted.number} of Trunk ${deleted.parentTrunk} was chop. Total number of Branches of Trunk ${deleted.parentTrunk} = ${branches.length}.`);
      }
    }
  }

  // remove twigs
  chopTwig(n, twings) {
    if (n === null || n < 1) {
      console.log('Twings cannot be chop.');
      return;
    }
    for (let i = 0; i < n; i++) {
      let deleted = setTimeout(chop, this.abilities.chopTwigTime, twings);
      if (deleted !== null || deleted !== undefined) {
        console.log(`Twing ${deleted.number} of Branch ${deleted.parentBranch} of Trunk ${deleted.parentTrunk} was chop. Total number of Twings of Branch ${deleted.parentBranch} of Trunk ${deleted.parentTrunk} = ${twings.length}.`);
      }
    }
  }

  // remove leaves
  chopLeaf(n, leafs) {
    if (n === null || n < 1) {
      console.log('Leafs cannot be placked.');
      return;
    }
    for (let i = 0; i < n; i++) {
      let deleted = setTimeout(chop, this.abilities.chopLeafTime, leafs);
      if (deleted !== null || deleted !== undefined) {
        console.log(`Leaf ${deleted.number} of Twing ${deleted.parentTwing} of Branch ${deleted.parentBranch} of Trunk ${deleted.parentTrunk} was chop. Total number of Twings of Twing ${deleted.parentTwing} of Branch ${deleted.parentBranch} of Trunk ${deleted.parentTrunk} = ${leafs.length}.`);
      }
    }
  }

  // remove 
  chop(arr) {
    let rndIndex = tMath.floor(Math.random() * arr.length)
    let selected = arr.indexOf(rndIndex);
    arr.splice(rndIndex, 1);
    return selected;
  }
}



const forest = new Forest();
forest.startLife(forestRules);

const woodcutter = new Woodcutter('Woodcutter_1');
woodcutter.startJob(forest, woodcutterTask);
if (!woodcutter.isAlive) {
  console.log(`${woodcutter.name} died at work.`);
  woodcutter = null;
  isTikTak = false;
}




