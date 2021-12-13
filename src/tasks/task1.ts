abstract class AClass {
  public Numbers: number[] = [];

  constructor(n: number) {
    this.fill(n);
  }

  private fill(length: number) {
    for (let i = 0; i < length; i++) {
      this.Numbers[i] = Math.ceil(Math.random() * 10);
    }
  }

  public factorial() {
    return  this.Numbers.map((el) => {
      let result = 1;
      while (el > 0) {
        result *= el;
        el--;
      }
      return result;
    });
    
    
  }

  abstract sort(): number[];
}

class Class1 extends AClass {
  sort(): number[] {
    let isSort: Boolean = true;
    function swap(arr: number[], a: number, b: number) {
      [arr[a], arr[b]] = [arr[b], arr[a]];
      isSort = false;
    }

    this.Numbers.forEach((el, index) => {
      if (index === 0) return;
      else {
        if (el < this.Numbers[index - 1]) swap(this.Numbers, index, index - 1);
      }
    });

    if (!isSort) {
      this.sort();
      return;
    };

    return this.factorial();
  }
}

class Class2 extends AClass {
  sort(): number[] {
    for (let i = 0; i < this.Numbers.length; i++) {
      let max = this.Numbers[i];

      for (let j = i; j < this.Numbers.length; j++) {
        if (this.Numbers[j] > max) max = this.Numbers[j];
      }

      this.Numbers.splice(this.Numbers.lastIndexOf(max), 1);
      this.Numbers.unshift(max);
    }

    return this.factorial();
  }
}

// export const test = new Class1(5).sort();