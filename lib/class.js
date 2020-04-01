module.exports = class SerniteClass {
  constructor(getNit) {
    this.nitmsg = (name, msg) => {
      let nit = getNit(name);
      return nit.send(msg);
    }
  }
}