class DB {
  constructor() {
    this._name = "noteContainer";
    this._dbContainer = new Array();
    if (localStorage.getItem(this._name) != null) {
      console.log("local storage is NOT empty");
      this._dbContainer.length = 0;
      this._dbContainer = JSON.parse(localStorage.getItem(this._name));
      console.log(this);
    }
  }
  Save(value) {
    if (localStorage.getItem(this._name) != null) {
      this._dbContainer = JSON.parse(localStorage.getItem(this._name));
    }
    this._dbContainer.push(value);
    localStorage.setItem(this._name, JSON.stringify(this._dbContainer));
  }

  Load(key) {
    this._dbContainer = JSON.parse(localStorage.getItem(this._name));
    const result = this._dbContainer.find((kvp) => kvp.title === key);
    if (result) {
      return result;
    } else {
      console.log("No object with the key was found");
    }
  }

  LoadAll() {
    return (this._dbContainer = JSON.parse(localStorage.getItem(this._name)));
  }

  //Remove(key) {
  // this._dbContainer = JSON.parse(localStorage.getItem(this._name));
  // this._dbContainer.re
  // localStorage.removeItem(key);
  //}

  Debug() {
    console.log(this._dbContainer.length);
    console.log(typeof this._dbContainer);
    // for (let i = 0; i < this._dbContainer.length; i++) {
    //   console.log(this._dbContainer[i]);
    // }
  }
}
